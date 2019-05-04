import { Type, Injector } from 'nger-di';
import { Observable } from 'rxjs';
import { ComponentFactory } from './component_factory';
import { ComponentRef } from './component_ref';
export declare class ApplicationRef {
    injector: Injector;
    readonly componentTypes: Type<any>[];
    readonly components: ComponentRef<any>[];
    readonly isStable: Observable<boolean>;
    constructor(injector: Injector);
    private _views;
    readonly viewCount: number;
    tick(): void;
    bootstrap<C>(componentOrFactory: ComponentFactory<C> | Type<C>, rootSelectorOrNode?: string | any): ComponentRef<C>;
    attachView(view: ComponentRef<any>, injector: Injector): void;
    detachView(view: any): void;
    ngOnDestroy(): void;
}
