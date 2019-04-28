import { APP_INITIALIZER, APP_ALLREADY } from './decorators/ngModule';
import { OnError } from './lifecycle_hooks';
import { InjectFlags, Type, StaticProvider, Injector } from 'nger-di';
import { NgModuleRef } from 'nger-core';
import { ParserVisitor, Scanner, Parser, ScannerVisitor } from './sdk/visitor'
import { NgVisitor } from './visitor'
import { OrmVisitor } from './orm'
import { Logger, ConsoleLogger } from './sdk/logger';
import { NgerConfig, LoggerLevel } from './sdk/nger-config';
import { TypeContext } from 'ims-decorator';
import { createStaticProvider } from './compiler/createStaticProvider';

export class Platform {
    private onErrorHandler: (e: Error) => any;
    constructor(public injector: Injector) { }

    // 启动入口文件
    bootstrap(prividers: StaticProvider[]) {
        this.injector.setStatic(prividers)
        return async <T>(type: Type<T>) => {
            const scannerVisitor = this.injector.get(ScannerVisitor) as ScannerVisitor;
            const context = scannerVisitor.visitType(type);
            const staticProviders = createStaticProvider(context);
            const injector = this.injector.create(staticProviders, type.name);
            console.log(`bootstrap`)
            if (context) {
                const ref = new NgModuleRef<T>(context, injector);
                console.log(`create ref`);
                console.log(`setStatic NgModuleRef`);
                // 添加provider
                if (process) {
                    process.on('uncaughtException', (err: Error) => {
                        return this.catchError(err)
                    });
                }
                try {
                    const instance = ref.instance as any;
                    if ((instance as OnError).ngOnError) this.onErrorHandler = (e) => instance.ngOnError(e);
                    await this.init(ref)
                    await this.run(ref);
                } catch (e) {
                    return this.catchError(e)
                }
            }
        }
    }
    private async init<T>(ref: NgModuleRef<T>) {
        // 遍历然后module创建
        const initializers = ref.injector.get(APP_INITIALIZER, [], InjectFlags.Optional) as any[];
        const errors: any[] = [];
        const initKeys = Object.keys(initializers);
        for (let key of initKeys) {
            const init = initializers[key]
            try {
                await init()
            } catch (e) {
                errors.push(init)
            }
        }
        if (errors.length > 0) {
            console.log(`发现 ${errors.length} 个错误, 正在重试。。。`)
            await Promise.all(errors.map(init => init()))
        }
    }
    // 不同平台可以实现不同的逻辑
    run<T>(ref: NgModuleRef<T>): any {
        const readys = ref.injector.get(APP_ALLREADY, [], InjectFlags.Optional) as any[];
        readys && readys.forEach(res => {
            try {
                res()
            } catch (e) {
                this.catchError(e)
            }
        });
    }
    // 错误捕获
    catchError(e: Error) {
        if (this.onErrorHandler) {
            return this.onErrorHandler(e)
        }
        throw e;
    }
}


export class PlatformFactory {
    static create(name: string, providers: StaticProvider[], parent?: Platform) {
        let injector: Injector = new Injector(providers, null, name);
        if (parent) {
            injector.extend(parent.injector);
            injector.setParent(parent.injector);
        }
        const platform = new Platform(injector)
        return platform;
    }
}
export const CorePlatform = PlatformFactory.create('core', [{
    provide: Scanner,
    useValue: new NgVisitor(),
    multi: true
}, {
    provide: Scanner,
    useValue: new OrmVisitor(),
    multi: true
}, {
    provide: Parser,
    useValue: {
        parse(context: TypeContext) {
            console.log(`parser parse:`, context.target.name)
        }
    },
    multi: true
}, {
    provide: ParserVisitor,
    useFactory: (injector: Injector) => {
        const parser = injector.get(Parser) as Parser[];
        return new ParserVisitor(parser)
    },
    deps: [Injector]
}, {
    provide: ScannerVisitor,
    useFactory: (injector: Injector) => {
        const scanner = injector.get(Scanner) as Scanner[];
        return new ScannerVisitor(scanner)
    },
    deps: [Injector]
}, {
    provide: NgerConfig,
    useFactory: () => {
        const config = new NgerConfig();
        config.watch = true;
        config.loggerLevel = LoggerLevel.debug;
    },
    deps: [],
    multi: true
}, {
    provide: Logger,
    useFactory: (config: NgerConfig) => {
        return new ConsoleLogger(config.loggerLevel)
    },
    deps: [NgerConfig]
}]);
