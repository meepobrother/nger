import { Type, InjectFlags } from './type';
import { stringify } from './util';
import { InjectionToken } from './injection_token';
import { Injector } from './injector';
import { getInjectableDef, ɵɵInjectableDef } from './def';
let _currentInjector: Injector | undefined | null = undefined;

export function setCurrentInjector(injector: Injector | null | undefined): Injector | undefined | null {
    const former = _currentInjector;
    _currentInjector = injector;
    return former;
}
let _injectImplementation: (<T>(token: Type<T> | InjectionToken<T>, flags: InjectFlags) => T | null) |
    undefined;
export function setInjectImplementation(
    impl: (<T>(token: Type<T> | InjectionToken<T>, flags?: InjectFlags) => T | null) | undefined):
    (<T>(token: Type<T> | InjectionToken<T>, flags?: InjectFlags) => T | null) | undefined {
    const previous = _injectImplementation;
    _injectImplementation = impl;
    return previous;
}

export function injectInjectorOnly<T>(token: Type<T> | InjectionToken<T>): T;
export function injectInjectorOnly<T>(token: Type<T> | InjectionToken<T>, flags?: InjectFlags): T |
    null;
export function injectInjectorOnly<T>(
    token: Type<T> | InjectionToken<T>, flags = InjectFlags.Default): T | null {
    if (_currentInjector === undefined) {
        throw new Error(`inject() must be called from an injection context`);
    } else if (_currentInjector === null) {
        return injectRootLimpMode(token, undefined, flags);
    } else {
        return _currentInjector.get(token, flags & InjectFlags.Optional ? null : undefined, flags);
    }
}
export function ɵɵinject<T>(token: Type<T> | InjectionToken<T>): T;
export function ɵɵinject<T>(token: Type<T> | InjectionToken<T>, flags?: InjectFlags): T | null;
export function ɵɵinject<T>(token: Type<T> | InjectionToken<T>, flags = InjectFlags.Default): T |
    null {
    return (_injectImplementation || injectInjectorOnly)(token, flags);
}
/**
 * @deprecated in v8, delete after v10. This API should be used only be generated code, and that
 * code should now use ɵɵinject instead.
 * @publicApi
 */
export const inject = ɵɵinject;

/**
 * Injects `root` tokens in limp mode.
 *
 * If no injector exists, we can still inject tree-shakable providers which have `providedIn` set to
 * `"root"`. This is known as the limp mode injection. In such case the value is stored in the
 * `InjectableDef`.
 */
export function injectRootLimpMode<T>(
    token: Type<T> | InjectionToken<T>, notFoundValue: T | undefined, flags: InjectFlags): T | null {
    const injectableDef: ɵɵInjectableDef<T> | null = getInjectableDef(token);
    if (injectableDef && injectableDef.providedIn == 'root') {
        return injectableDef.value === undefined ? injectableDef.value = injectableDef.factory() :
            injectableDef.value;
    }
    if (flags & InjectFlags.Optional) return null;
    if (notFoundValue !== undefined) return notFoundValue;
    throw new Error(`Injector: NOT_FOUND [${stringify(token)}]`);
}

export function injectArgs(types: (Type<any> | InjectionToken<any> | any[])[]): any[] {
    const args: any[] = [];
    for (let i = 0; i < types.length; i++) {
        const arg = types[i];
        if (Array.isArray(arg)) {
            if (arg.length === 0) {
                throw new Error('Arguments array must have arguments.');
            }
            let type: Type<any> | undefined = undefined;
            let flags: InjectFlags = InjectFlags.Default;
            for (let j = 0; j < arg.length; j++) {
                const meta = arg[j];
                if (meta === InjectFlags.Optional) {
                    flags |= InjectFlags.Optional;
                } else if (meta === InjectFlags.SkipSelf) {
                    flags |= InjectFlags.SkipSelf;
                } else if (meta === InjectFlags.Self) {
                    flags |= InjectFlags.Self;
                } else {
                    type = meta;
                }
            }
            args.push(ɵɵinject(type!, flags));
        } else {
            args.push(ɵɵinject(arg));
        }
    }
    return args;
}
