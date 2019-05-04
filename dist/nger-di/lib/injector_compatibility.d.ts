import { Type, InjectFlags } from './type';
import { InjectionToken } from './injection_token';
import { Injector } from './injector';
export declare function setCurrentInjector(injector: Injector | null | undefined): Injector | undefined | null;
export declare function setInjectImplementation(impl: (<T>(token: Type<T> | InjectionToken<T>, flags?: InjectFlags) => T | null) | undefined): (<T>(token: Type<T> | InjectionToken<T>, flags?: InjectFlags) => T | null) | undefined;
export declare function injectInjectorOnly<T>(token: Type<T> | InjectionToken<T>): T;
export declare function injectInjectorOnly<T>(token: Type<T> | InjectionToken<T>, flags?: InjectFlags): T | null;
export declare function ɵɵinject<T>(token: Type<T> | InjectionToken<T>): T;
export declare function ɵɵinject<T>(token: Type<T> | InjectionToken<T>, flags?: InjectFlags): T | null;
/**
 * @deprecated in v8, delete after v10. This API should be used only be generated code, and that
 * code should now use ɵɵinject instead.
 * @publicApi
 */
export declare const inject: typeof ɵɵinject;
/**
 * Injects `root` tokens in limp mode.
 *
 * If no injector exists, we can still inject tree-shakable providers which have `providedIn` set to
 * `"root"`. This is known as the limp mode injection. In such case the value is stored in the
 * `InjectableDef`.
 */
export declare function injectRootLimpMode<T>(token: Type<T> | InjectionToken<T>, notFoundValue: T | undefined, flags: InjectFlags): T | null;
export declare function injectArgs(types: (Type<any> | InjectionToken<any> | any[])[]): any[];
