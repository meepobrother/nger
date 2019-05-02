import { NgModuleRef } from './ng_module_ref'
import { Injector, Type } from 'nger-di'
import { NgModuleFactory } from './ng_module_factory'
import { ErrorHandler } from './error_handler';
import { remove, optionsReducer } from './lang'
import { ApplicationInitStatus } from './application_init_status'
export abstract class NgModuleBootstrap {
    abstract run<T>(moduleRef: NgModuleRef<T>): Promise<any>;
}
export interface BootstrapOptions { }
export class PlatformRef {
    private _modules: NgModuleRef<any>[] = [];
    private _destroyListeners: Function[] = [];
    private _destroyed: boolean = false;
    get injector(): Injector { return this._injector; }
    get destroyed() { return this._destroyed; }
    constructor(private _injector: Injector) { }

    async bootstrapModule<M>(
        moduleType: Type<M>,
        compilerOptions: BootstrapOptions = {}
    ): Promise<NgModuleRef<M>> {
        const options = optionsReducer({}, compilerOptions);
        // 注册injector
        return compileNgModuleFactory<M>(this.injector, options, moduleType)
            .then(moduleFactory => {
                return this.bootstrapModuleFactory(moduleFactory, options)
            });
    }

    async bootstrapModuleFactory<M>(
        moduleFactory: NgModuleFactory<M>,
        options?: BootstrapOptions
    ): Promise<NgModuleRef<M>> {
        // todo 注入启动参数
        const injector = this.injector.create([], moduleFactory.moduleType.name);
        const moduleRef = moduleFactory.create(injector);
        const exceptionHandler = moduleRef.injector.get(ErrorHandler, undefined) as ErrorHandler;
        if (!exceptionHandler) {
            throw new Error('No ErrorHandler. Please Regist ErrorHandler');
        }
        moduleRef.onDestroy(() => remove(this._modules, moduleRef));
        const initStatus: ApplicationInitStatus = moduleRef.injector.get(ApplicationInitStatus);
        await initStatus.runInitializers();
        await this._moduleDoBootstrap(moduleRef)
        return moduleRef;
    }

    private _moduleDoBootstrap(moduleRef: NgModuleRef<any>) {
        const bootstrap = this.injector.get<NgModuleBootstrap[]>(NgModuleBootstrap, []);
        console.log(`总共有 ${bootstrap.length} 个启动项目`)
        const tasks: any[] = [];
        bootstrap.map((b: NgModuleBootstrap) => {
            tasks.push(b.run(moduleRef));
        });
        return Promise.all(tasks)
    }

    // 注册销毁钩子
    onDestroy(callback: () => void): void {
        this._destroyListeners.push(callback);
    }

    // 销毁
    destroy() {
        if (this._destroyed) {
            throw new Error('The platform has already been destroyed!');
        }
        this._modules.slice().forEach(module => module.destroy());
        this._destroyListeners.forEach(listener => listener());
        this._destroyed = true;
    }
}

function compileNgModuleFactory<M>(
    injector: Injector,
    options: BootstrapOptions,
    moduleType: Type<M>
): Promise<NgModuleFactory<M>> {
    const compilerFactory = injector.get(CompilerFactory) as CompilerFactory;
    const compiler = compilerFactory.createCompiler([options]);
    return compiler.compileModuleAsync(moduleType);
}

export class CompilerFactory {
    createCompiler(options?: BootstrapOptions[]): Compiler {
        return new Compiler(options);
    }
}
// 编译器
export class Compiler {
    constructor(public options?: BootstrapOptions[]) { }
    // 编译
    async compileModuleAsync<M>(moduleType: Type<any>): Promise<NgModuleFactory<M>> {
        return new NgModuleFactory(moduleType)
    }
}
