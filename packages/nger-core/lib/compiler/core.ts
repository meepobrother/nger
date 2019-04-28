import { Injector, Type } from 'nger-di';
import { TypeContext } from 'ims-decorator';
import { ConnectionToken } from '../tokens';
import { Connection } from 'typeorm'
import { EntityRepositoryMetadataKey, EntityRepositoryPropertyAst } from '../orm/index';
import { InjectMetadataKey, InjectPropertyAst } from '../decorators/inject';
import { InputMetadataKey, InputPropertyAst } from '../decorators/input';
// import { NgModuleRef } from '@angular/core'
export class BaseCore<T> {
    readonly lifes: NgerLifes;
    constructor(public readonly instance: T) {
        this.lifes = this.getLifeCycle();
    }
    // 生命周期
    getLifeCycle(): NgerLifes {
        const instance = this.instance as any;
        const { ngOnInit, ngOnError, ngOnDestroy,
            ngOnPageNotFound, ngDoCheck,
            ngAfterContentInit, ngAfterContentChecked,
            ngAfterViewInit, ngAfterViewChecked,
            ngOnChanges
        } = instance;
        const empty = (...args: any[]) => { }
        return {
            ngOnInit: ngOnInit ? ngOnInit.bind(instance) : empty,
            ngOnError: ngOnError ? ngOnError.bind(instance) : empty,
            ngOnDestroy: ngOnDestroy ? ngOnDestroy.bind(instance) : empty,
            ngAfterViewInit: ngAfterViewInit ? ngAfterViewInit.bind(instance) : empty,
            ngOnPageNotFound: ngOnPageNotFound ? ngOnPageNotFound.bind(instance) : empty,
            ngDoCheck: ngDoCheck ? ngDoCheck.bind(instance) : empty,
            ngAfterContentInit: ngAfterContentInit ? ngAfterContentInit.bind(instance) : empty,
            ngAfterContentChecked: ngAfterContentChecked ? ngAfterContentChecked.bind(instance) : empty,
            ngAfterViewChecked: ngAfterViewChecked ? ngAfterViewChecked.bind(instance) : empty,
            ngOnChanges: ngOnChanges ? ngOnChanges.bind(instance) : empty,
        }
    }
}
// 非单例
export class DirectiveRef<T> extends BaseCore<T>{
    readonly key: string;
    readonly injector: Injector;
    constructor(public context: TypeContext, key?: string) {
        super(context.instance);
        this.injector = context.injector;
        this.key = key || '';
        // 注入当前实例
        context.injector.setStatic([{
            provide: context.target,
            useValue: this.instance,
        }]);
        // 更新属性
        this.updateProperty();
    }
    updateProperty() {
        try {
            // injects
            const injects = this.context.getProperty(InjectMetadataKey) as InjectPropertyAst[];
            injects.map(inject => {
                const { metadataDef, propertyKey, propertyType } = inject.ast;
                this.instance[propertyKey] = this.injector.get(metadataDef.token || propertyType)
            });
            // entity
            const entities = this.context.getProperty(EntityRepositoryMetadataKey) as EntityRepositoryPropertyAst[];
            entities.map(entity => {
                const { metadataDef, propertyKey } = entity.ast;
                setTimeout(() => {
                    const connection = this.injector.get(ConnectionToken) as Connection;
                    this.instance[propertyKey] = connection.getRepository(metadataDef.entity);
                }, 0);
            });
        } catch (e) {
            if (this.lifes.ngOnError) {
                return this.lifes.ngOnError(new UpdatePropertyError(e.message, e.stack));
            } else {
                throw new UpdatePropertyError(e.message, e.stack);
            }
        }
    }
    // 输入
    getInputs() {
        let res: any = {};
        const { instance, context } = this;
        const inputs = context.getProperty(InputMetadataKey) as InputPropertyAst[];
        inputs.map(input => {
            const def = input.ast.metadataDef;
            res[def.bindingPropertyName || input.ast.propertyKey] = instance[input.ast.propertyKey];
        });
        return res;
    }
    // 输出
    getOutputs() { }
}
export interface NgerLifes {
    ngOnInit: Function,
    ngOnError: Function,
    ngOnDestroy: Function,
    ngAfterViewInit: Function,
    ngOnPageNotFound: Function,
    ngDoCheck: Function,
    ngAfterContentInit: Function,
    ngAfterContentChecked: Function,
    ngAfterViewChecked: Function,
    ngOnChanges: Function,
}
// 赋值/更新属性时错误
export class UpdatePropertyError extends Error {
    constructor(msg: string, stack: string) {
        super(msg)
        this.stack = stack;
    }
}
export abstract class Resolver {
    constructor(public context: TypeContext) { }
    abstract resolve<T>(type: Type<T>, ...args: any[]): any;
}
// 组件
export class ComponentRef<T> extends DirectiveRef<T>{ }
export class ComponentResolver extends Resolver {
    map: Map<any, TypeContext> = new Map();
    components: Map<string, ComponentRef<any>> = new Map();
    constructor(public context: TypeContext) {
        super(context);
    }
    resolve<T>(type: Type<T>, key: string): ComponentRef<T> | undefined {
        return this._resolve<T, ComponentRef<T>>(type, ComponentRef, key)
    }
    _resolve<T, O>(type: Type<T>, creator: Type<O>, ...args: any[]): O | undefined {
        const context = this.map.get(type)
        if (context) {
            return new creator(context, ...args)
        } else {
            const context = this.context.visitType(type);
            this.map.set(type, context);
            return new creator(context, ...args)
        }
    }
}
export abstract class MultiResolver extends Resolver {
    _resolve<T, O>(type: Type<T>, creator: Type<O>, ...args: any[]): O | undefined {
        const context = this.context.visitType(type);
        return new creator(context, ...args)
    }
}
export abstract class SignalResolver extends Resolver {
    map: Map<any, TypeContext> = new Map();
    _resolve<T, O>(type: Type<T>, creator: Type<O>, ...args: any[]): O | undefined {
        const context = this.map.get(type)
        if (context) {
            return new creator(context, ...args)
        } else {
            const context = this.context.visitType(type);
            this.map.set(type, context);
            return new creator(context, ...args)
        }
    }
}
// 页面
export class PageRef<T> extends ComponentRef<T>{ }
export class PageResolver extends SignalResolver {
    map: Map<any, TypeContext> = new Map();
    resolve<T>(type: Type<T>): PageRef<T> | undefined {
        return this._resolve<T, PageRef<T>>(type, PageRef)
    }
    _resolve<T, O>(type: Type<T>, creator: Type<O>, ...args: any[]): O | undefined {
        const context = this.map.get(type)
        if (context) {
            return new creator(context, ...args)
        } else {
            const context = this.context.visitType(type);
            this.map.set(type, context);
            return new creator(context, ...args)
        }
    }
}
// 控制器
export class ControllerRef<T> extends ComponentRef<T>{ }
export class ControllerResolver extends SignalResolver {
    resolve<T>(type: Type<T>): ControllerRef<T> | undefined {
        return this._resolve<T, ControllerRef<T>>(type, ControllerRef)
    }
}
// cli命令
export class CommandRef<T> extends ComponentRef<T>{ }
export class CommandResolver extends SignalResolver {
    resolve<T>(type: Type<T>): CommandRef<T> | undefined {
        return this._resolve<T, CommandRef<T>>(type, CommandRef)
    }
}
// 数据转换器
export class PipeRef<T> extends ComponentRef<T>{ }
export class PipeResolver extends MultiResolver {
    resolve<T>(type: Type<T>): PipeRef<T> | undefined {
        return this._resolve<T, PipeRef<T>>(type, PipeRef)
    }
}

export class NgModuleRef<T> extends BaseCore<T>{
    instance: T;
    // 非单例
    pipeResolver: PipeResolver;
    // 非单例
    componentResolver: ComponentResolver;

    // 单例
    pageResolver: PageResolver;
    // 单例
    controllerResolver: ControllerResolver;
    // 单例
    commandResolver: CommandResolver;

    constructor(public context: TypeContext, public injector: Injector) {
        super(context.instance);
        context.injector = injector;
        this.injector.setStatic([{
            provide: NgModuleRef,
            useValue: this
        }, {
            provide: context.target,
            useValue: this.instance,
        }]);
        this.updateProperty();
        this.pipeResolver = new PipeResolver(context)
        this.componentResolver = new ComponentResolver(context);
        this.pageResolver = new PageResolver(context);
        this.controllerResolver = new ControllerResolver(context);
        this.commandResolver = new CommandResolver(context);
        this.injector.setStatic([{
            provide: PipeResolver,
            useValue: this.pipeResolver
        }, {
            provide: ComponentResolver,
            useValue: this.componentResolver
        }, {
            provide: PageResolver,
            useValue: this.pageResolver
        }, {
            provide: ControllerResolver,
            useValue: this.controllerResolver
        }, {
            provide: CommandResolver,
            useValue: this.commandResolver
        }])
    }

    createPipeRef(type: Type<T>) {
        return this.pipeResolver.resolve(type);
    }
    // component
    createComponentRef<T>(type: Type<T>, key: string) {
        return this.componentResolver.resolve(type, key);
    }

    // page
    createPageRef<T>(type: Type<T>) {
        return this.pageResolver.resolve(type);
    }

    // controller
    createControllerRef<T>(type: Type<T>) {
        return this.controllerResolver.resolve(type);
    }
    // cli command
    createCommandRef<T>(type: Type<T>) {
        return this.commandResolver.resolve(type);
    }

    updateProperty() {
        // injects
        const injects = this.context.getProperty(InjectMetadataKey) as InjectPropertyAst[];
        injects.map(inject => {
            const { metadataDef, propertyKey, propertyType } = inject.ast;
            this.instance[propertyKey] = this.injector.get(metadataDef.token || propertyType)
        });
        // entity
        const entities = this.context.getProperty(EntityRepositoryMetadataKey) as EntityRepositoryPropertyAst[];
        entities.map(entity => {
            const { metadataDef, propertyKey } = entity.ast;
            setTimeout(() => {
                const connection = this.injector.get(ConnectionToken) as Connection;
                this.instance[propertyKey] = connection.getRepository(metadataDef.entity);
            }, 0);
        });
    }
}
