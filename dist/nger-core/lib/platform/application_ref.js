"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lang_1 = require("./lang");
const component_factory_1 = require("./component_factory");
const component_factory_resolver_1 = require("./component_factory_resolver");
class ApplicationRef {
    constructor(injector) {
        this.injector = injector;
        this.componentTypes = [];
        this.components = [];
        this._views = [];
    }
    get viewCount() { return this._views.length; }
    tick() { }
    bootstrap(componentOrFactory, rootSelectorOrNode) {
        if (componentOrFactory instanceof component_factory_1.ComponentFactory) {
            return componentOrFactory.create(this.injector);
        }
        else {
            const componentFactoryResolver = this.injector.get(component_factory_resolver_1.ComponentFactoryResolver);
            return componentFactoryResolver.resolveComponentFactory(componentOrFactory).create(this.injector);
        }
    }
    attachView(view, injector) {
        this._views.push(view);
    }
    detachView(view) {
        lang_1.remove(this._views, view);
    }
    ngOnDestroy() {
        this._views.slice().forEach((view) => view.destroy());
    }
}
exports.ApplicationRef = ApplicationRef;
