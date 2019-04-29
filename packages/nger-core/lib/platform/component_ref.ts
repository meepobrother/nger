import { Injector, Type } from 'nger-di'
import { ChangeDetectorRef } from './change_detector_ref'

export class ComponentRef<C> {
    get injector(): Injector {
        return this._injector;
    }
    get instance(): C {
        return this._instance;
    }
    get componentType(): Type<C> {
        return this._componentType;
    }
    get location(): any {
        return this._location;
    }
    get hostView(): any {
        return this._hostView;
    }
    get changeDetectorRef(): ChangeDetectorRef {
        return this._changeDetectorRef;
    }
    _location: any;
    _hostView: any;
    constructor(
        private _injector: Injector,
        private _instance: C,
        // todo
        private _changeDetectorRef: ChangeDetectorRef,
        private _componentType: Type<C>
    ) { }
    destroy(): void { }
    onDestroy(callback: Function): void { }
}

