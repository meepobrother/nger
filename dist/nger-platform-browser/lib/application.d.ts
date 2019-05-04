import { ApplicationRef, ComponentFactory, ComponentRef } from 'nger-core';
import { Injector, Type } from 'nger-di';
export declare class BrowserApplicationRef extends ApplicationRef {
    root: HTMLDivElement;
    constructor(injector: Injector);
    bootstrap<C>(componentOrFactory: ComponentFactory<C> | Type<C>, rootSelectorOrNode?: string | any): ComponentRef<C>;
    attachView(ref: ComponentRef<any>, injector: Injector): void;
}
