import { Injector } from 'nger-di'
import { TypeContext } from 'ims-decorator'
import { ComponentFactoryResolver } from './component_factory_resolver'
import { NgModuleMetadataKey, NgModuleClassAst } from '../decorators/ngModule';
export class NgModuleRef<T> {
    get injector(): Injector {
        return this._injector;
    }
    get instance(): T {
        return this._instance;
    }
    get context(): TypeContext {
        return this._context;
    }
    private _componentFactoryResolver: ComponentFactoryResolver;
    get componentFactoryResolver(): ComponentFactoryResolver {
        return this._componentFactoryResolver;
    }
    private _destroyed: boolean = false;
    private _modules: any[] = [];
    private _destroyListeners: Function[] = [];
    constructor(
        private _injector: Injector,
        private _instance: T,
        private _context: TypeContext
    ) {
        // 注册Component,Page,Controller,Pipe,Directive,Command
        const ngModule = this.context.getClass(NgModuleMetadataKey) as NgModuleClassAst;
        this._componentFactoryResolver = new ComponentFactoryResolver(ngModule.declarations);
    }
    destroy(): void {
        if (this._destroyed) {
            throw new Error('The platform has already been destroyed!');
        }
        this._modules.slice().forEach(module => module.destroy());
        this._destroyListeners.forEach(listener => listener());
        this._destroyed = true;
    }
    onDestroy(callback: () => void): void {
        this._destroyListeners.push(callback);
    }
}