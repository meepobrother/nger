import { Injector } from 'nger-di';
import { TypeContext } from 'ims-decorator';
import { ComponentFactoryResolver } from './component_factory_resolver';
export declare class NgModuleRef<T> {
    private _injector;
    private _instance;
    private _context;
    readonly injector: Injector;
    readonly instance: T;
    readonly context: TypeContext;
    private _componentFactoryResolver;
    readonly componentFactoryResolver: ComponentFactoryResolver;
    private _destroyed;
    private _modules;
    private _destroyListeners;
    constructor(_injector: Injector, _instance: T, _context: TypeContext);
    destroy(): void;
    onDestroy(callback: () => void): void;
}
