import { Type, Injector } from 'nger-di'
import { Observable } from 'rxjs'
import { remove } from './lang'
import { ComponentFactory } from './component_factory'
import { ComponentRef } from './component_ref'
import { ComponentFactoryResolver } from './component_factory_resolver';

export class ApplicationRef {
    public readonly componentTypes: Type<any>[] = [];
    public readonly components: ComponentRef<any>[] = [];
    public readonly isStable !: Observable<boolean>;
    constructor(public injector: Injector) { }
    private _views: any[] = [];
    get viewCount() { return this._views.length; }
    tick(): void { }
    bootstrap<C>(
        componentOrFactory: ComponentFactory<C> | Type<C>,
        rootSelectorOrNode?: string | any
    ): ComponentRef<C> {
        if (componentOrFactory instanceof ComponentFactory) {
            return componentOrFactory.create(this.injector)
        } else {
            const componentFactoryResolver = this.injector.get(ComponentFactoryResolver)
            return componentFactoryResolver.resolveComponentFactory(componentOrFactory).create(this.injector)
        }
    }
    attachView(view: ComponentRef<any>, injector: Injector) {
        this._views.push(view);
    }
    detachView(view: any) {
        remove(this._views, view);
    }
    ngOnDestroy() {
        this._views.slice().forEach((view) => view.destroy());
    }
}