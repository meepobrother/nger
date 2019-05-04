"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const component_factory_resolver_1 = require("./component_factory_resolver");
const ngModule_1 = require("../decorators/ngModule");
class NgModuleRef {
    constructor(_injector, _instance, _context) {
        this._injector = _injector;
        this._instance = _instance;
        this._context = _context;
        this._destroyed = false;
        this._modules = [];
        this._destroyListeners = [];
        // 注册Component,Page,Controller,Pipe,Directive,Command
        const ngModule = this.context.getClass(ngModule_1.NgModuleMetadataKey);
        this._componentFactoryResolver = new component_factory_resolver_1.ComponentFactoryResolver(ngModule.declarations, this._injector);
        this._injector.setStatic([{
                provide: NgModuleRef,
                useValue: this,
            }, {
                provide: component_factory_resolver_1.ComponentFactoryResolver,
                useValue: this._componentFactoryResolver,
            }]);
    }
    get injector() {
        return this._injector;
    }
    get instance() {
        return this._instance;
    }
    get context() {
        return this._context;
    }
    get componentFactoryResolver() {
        return this._componentFactoryResolver;
    }
    destroy() {
        if (this._destroyed) {
            throw new Error('The platform has already been destroyed!');
        }
        this._modules.slice().forEach(module => module.destroy());
        this._destroyListeners.forEach(listener => listener());
        this._destroyed = true;
    }
    onDestroy(callback) {
        this._destroyListeners.push(callback);
    }
}
exports.NgModuleRef = NgModuleRef;
