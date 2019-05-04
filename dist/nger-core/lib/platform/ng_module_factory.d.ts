import { Type, Injector } from 'nger-di';
import { NgModuleRef } from './ng_module_ref';
export declare class NgModuleFactory<T> {
    private _moduleType;
    readonly moduleType: Type<T>;
    constructor(_moduleType: Type<T>);
    create(parentInjector: Injector | null): NgModuleRef<T>;
}
export interface InternalNgModuleRef<T> extends NgModuleRef<T> {
    _bootstrapComponents: Type<any>[];
}
