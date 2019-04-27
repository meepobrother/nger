import { Injector, Type } from 'nger-di';
import { TypeContext } from 'ims-decorator';
import { ConnectionToken } from '../tokens';
import { Connection } from 'typeorm'
import { EntityRepositoryMetadataKey, EntityRepositoryPropertyAst } from '../orm/index';
import { InjectMetadataKey, InjectPropertyAst } from '../decorators/inject';
import { InputMetadataKey, InputPropertyAst } from '../decorators/input';
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
export class ComponentRef<T> extends BaseCore<T>{
    readonly injector: Injector;

    constructor(public context: TypeContext) {
        super(context.instance);
        this.injector = context.injector;
        // 注入当前实例
        context.injector.setStatic([{
            provide: context.target,
            useValue: this.instance,
        }]);

        // 更新属性
        this.updateProperty();
        // 监听Input变化 nger-store模块
        // todo
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

export class PageRef<T> extends ComponentRef<T>{ }

export class ControllerRef<T> extends ComponentRef<T>{ }

export class CommandRef<T> extends ComponentRef<T>{ }

export class NgModuleRef<T> extends BaseCore<T>{
    instance: T;
    injector: Injector;
    constructor(public context: TypeContext) {
        super(context.instance);
        this.injector = context.injector;
        this.updateProperty();
        context.injector.setStatic([{
            provide: context.target,
            useValue: this.instance,
        }]);
    }
    // component
    createComponentRef<T>(type: Type<T>): ComponentRef<T> {
        const ctx = this.context.visitType(type)
        return new ComponentRef<T>(ctx);
    }

    // page
    createPageRef<T>(type: Type<T>): PageRef<T> {
        const ctx = this.context.visitType(type)
        return new PageRef<T>(ctx);
    }

    // controller
    createControllerRef<T>(type: Type<T>): ControllerRef<T> {
        const ctx = this.context.visitType(type)
        return new ControllerRef<T>(ctx);
    }
    // cli command
    createCommandRef<T>(type: Type<T>): CommandRef<T> {
        const ctx = this.context.visitType(type)
        return new CommandRef<T>(ctx);
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
