import { Injector, Type } from 'nger-di';
import { ChangeDetectorRef } from './change_detector_ref';
import { Component } from '../decorators/component';
import { Subject } from 'rxjs';
export declare class ComponentRef<C> {
    private _injector;
    private _instance;
    private _changeDetectorRef;
    private _componentType;
    private _props;
    readonly injector: Injector;
    readonly instance: C;
    readonly componentType: Type<C>;
    readonly component: Component;
    readonly location: any;
    readonly hostView: any;
    readonly changeDetectorRef: ChangeDetectorRef;
    readonly $ngOnChange: Subject<any>;
    _location: any;
    _hostView: any;
    _component: Component;
    constructor(_injector: Injector, _instance: C, _changeDetectorRef: ChangeDetectorRef, _componentType: Type<C>, _props: Subject<any>);
    destroy(): void;
    onDestroy(callback: Function): void;
}
