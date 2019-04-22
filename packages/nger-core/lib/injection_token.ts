
import { Type, ValueProvider, StaticClassProvider, ClassProvider, ExistingProvider, FactoryProvider, ConstructorProvider } from './decorators/types';
export interface InjectorType<T> extends Type<T> {
    ngInjectorDef: never;
}
export interface InjectorTypeWithProviders<T> {
    ngModule: InjectorType<T>;
    providers?: (Type<any> | ValueProvider | ExistingProvider | FactoryProvider | ConstructorProvider |
        StaticClassProvider | ClassProvider | any[])[];
}
export interface InjectorDef<T> {
    factory: () => T;
    providers: (Type<any> | ValueProvider | ExistingProvider | FactoryProvider | ConstructorProvider |
        StaticClassProvider | ClassProvider | any[])[];
    imports: (InjectorType<any> | InjectorTypeWithProviders<any>)[];
}
export function defineInjector<T>(options: { factory: () => any, providers?: any[], imports?: any[] }):
    InjectorDef<T> {
    return ({
        factory: options.factory,
        providers: options.providers || [],
        imports: options.imports || [],
    } as InjectorDef<T>);
}
export function defineInjectable<T>(opts: {
    providedIn?: Type<any> | 'root' | 'any' | null,
    factory: () => T,
}): InjectableDef<T> {
    return ({
        providedIn: opts.providedIn as any || null,
        factory: opts.factory,
        value: undefined,
    } as InjectableDef<T>);
}
export interface InjectableDef<T> {
    providedIn: InjectorType<any> | 'root' | 'any' | null;
    factory: () => T;
    value: T | undefined;
}
export class InjectionToken<T> {
    readonly ngMetadataName = 'InjectionToken';
    readonly ngInjectableDef: InjectableDef<T> | undefined;
    constructor(
        protected _desc: string,
        options?: {
            providedIn?: Type<any> | 'root' | null,
            factory: () => T
        }
    ) {
        this.ngInjectableDef = undefined;
        if (typeof options == 'number') {
            (this as any).__NG_ELEMENT_ID__ = options;
        } else if (options !== undefined) {
            this.ngInjectableDef = defineInjectable<T>({
                providedIn: options.providedIn || 'root',
                factory: options.factory,
            });
        }
    }
    toString(): string { return `InjectionToken ${this._desc}`; }
}
export interface InjectableDefToken<T> extends InjectionToken<T> { ngInjectableDef: InjectableDef<T>; }
