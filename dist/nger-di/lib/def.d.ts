import { Type } from './type';
import { ClassProvider, ConstructorProvider, ExistingProvider, FactoryProvider, StaticClassProvider, ValueProvider } from './type';
export interface ɵɵInjectableDef<T> {
    providedIn: InjectorType<any> | 'root' | 'any' | null;
    factory: () => T;
    value: T | undefined;
}
export interface ɵɵInjectorDef<T> {
    factory: () => T;
    providers: (Type<any> | ValueProvider | ExistingProvider | FactoryProvider | ConstructorProvider | StaticClassProvider | ClassProvider | any[])[];
    imports: (InjectorType<any> | InjectorTypeWithProviders<any>)[];
}
export interface InjectableType<T> extends Type<T> {
    ngInjectableDef: never;
}
export interface InjectorType<T> extends Type<T> {
    ngInjectorDef: never;
}
export interface InjectorTypeWithProviders<T> {
    ngModule: InjectorType<T>;
    providers?: (Type<any> | ValueProvider | ExistingProvider | FactoryProvider | ConstructorProvider | StaticClassProvider | ClassProvider | any[])[];
}
export declare function ɵɵdefineInjectable<T>(opts: {
    providedIn?: Type<any> | 'root' | 'any' | null;
    factory: () => T;
}): never;
export declare const defineInjectable: typeof ɵɵdefineInjectable;
export declare function ɵɵdefineInjector(options: {
    factory: () => any;
    providers?: any[];
    imports?: any[];
}): never;
export declare function getInjectableDef<T>(type: any): ɵɵInjectableDef<T> | null;
export declare function getInjectorDef<T>(type: any): ɵɵInjectorDef<T> | null;
export declare const NG_INJECTABLE_DEF: string;
export declare const NG_INJECTOR_DEF: string;
