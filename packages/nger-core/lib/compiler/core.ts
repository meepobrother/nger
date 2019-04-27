import { Injector, Type } from 'nger-di';
import { TypeContext } from 'ims-decorator';
import { ConnectionToken } from '../tokens';
import { Connection } from 'typeorm'
import { EntityRepositoryMetadataKey, EntityRepositoryPropertyAst } from '../orm/index';
import { InjectMetadataKey, InjectPropertyAst } from '../decorators/inject';
export class ComponentRef<T>{
    instance: T;
    injector: Injector;
    constructor(public context: TypeContext) {
        this.instance = context.instance;
        this.injector = context.injector;
        // 更新属性
        this.updateProperty();
        // 注入当前实例
        context.injector.setStatic([{
            provide: context.target,
            useValue: this.instance,
        }])
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

export class PageRef<T> extends ComponentRef<T>{ }

export class ControllerRef<T> extends ComponentRef<T>{ }

export class CommandRef<T> extends ComponentRef<T>{ }

export class NgModuleRef<T>{
    instance: T;
    injector: Injector;
    constructor(public context: TypeContext) {
        this.instance = context.instance;
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
