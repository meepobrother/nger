import { Type } from './type';
import { getClosureSafeProperty } from './util';
import { ClassProvider, ConstructorProvider, ExistingProvider, FactoryProvider, StaticClassProvider, ValueProvider } from './type';
export interface ɵɵInjectableDef<T> {
    providedIn: InjectorType<any> | 'root' | 'any' | null;
    factory: () => T;
    value: T | undefined;
}
export interface ɵɵInjectorDef<T> {
    factory: () => T;
    providers: (Type<any> | ValueProvider | ExistingProvider | FactoryProvider | ConstructorProvider |
        StaticClassProvider | ClassProvider | any[])[];
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
    providers?: (Type<any> | ValueProvider | ExistingProvider | FactoryProvider | ConstructorProvider |
        StaticClassProvider | ClassProvider | any[])[];
}
export function ɵɵdefineInjectable<T>(opts: {
    providedIn?: Type<any> | 'root' | 'any' | null,
    factory: () => T,
}): never {
    return ({
        providedIn: opts.providedIn as any || null, factory: opts.factory, value: undefined,
    } as ɵɵInjectableDef<T>) as never;
}
export const defineInjectable = ɵɵdefineInjectable;
export function ɵɵdefineInjector(options: { factory: () => any, providers?: any[], imports?: any[] }):
    never {
    return ({
        factory: options.factory, providers: options.providers || [], imports: options.imports || [],
    } as ɵɵInjectorDef<any>) as never;
}
export function getInjectableDef<T>(type: any): ɵɵInjectableDef<T> | null {
    return type && type.hasOwnProperty(NG_INJECTABLE_DEF) ? (type as any)[NG_INJECTABLE_DEF] : null;
}
export function getInjectorDef<T>(type: any): ɵɵInjectorDef<T> | null {
    return type && type.hasOwnProperty(NG_INJECTOR_DEF) ? (type as any)[NG_INJECTOR_DEF] : null;
}
export const NG_INJECTABLE_DEF = getClosureSafeProperty({ ngInjectableDef: getClosureSafeProperty });
export const NG_INJECTOR_DEF = getClosureSafeProperty({ ngInjectorDef: getClosureSafeProperty });
