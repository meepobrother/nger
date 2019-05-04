import { Type, Injector } from 'nger-di';
import { TypeContext } from 'ims-decorator';
import { ComponentFactory } from './component_factory';
export declare class ComponentFactoryResolver {
    injector: Injector;
    private map;
    constructor(contexts: TypeContext[], injector: Injector);
    resolveComponentFactory<T>(component: Type<T>): ComponentFactory<T>;
    getComponents(): TypeContext[];
}
