import { Type, InjectFlags } from './type';
import { InjectionToken } from './injection_token';
import { StaticProvider } from './type';
export declare const SOURCE = "__source";
export declare const THROW_IF_NOT_FOUND: symbol;
export declare const INJECTOR: InjectionToken<Injector>;
export declare class NullInjector implements Injector {
    get(token: any, notFoundValue?: any): any;
    clearCache(token: any): void;
    create(records: StaticProvider[], source?: string | null): any;
    setStatic(records: StaticProvider[]): void;
}
/**
 * Concrete injectors implement this interface.
 *
 * For more details, see the ["Dependency Injection Guide"](guide/dependency-injection).
 *
 * @usageNotes
 * ### Example
 *
 * {@example core/di/ts/injector_spec.ts region='Injector'}
 *
 * `Injector` returns itself when given `Injector` as a token:
 *
 * {@example core/di/ts/injector_spec.ts region='injectInjector'}
 *
 * @publicApi
 */
export declare abstract class Injector {
    static THROW_IF_NOT_FOUND: symbol;
    static NULL: Injector;
    abstract get<T>(token: IToken<T>, notFoundValue?: T | undefined | null, flags?: InjectFlags): T;
    abstract create(records: StaticProvider[], source?: string | null): Injector;
    abstract setStatic(records: StaticProvider[]): void;
    abstract clearCache(token: any): void;
    static create(providers: StaticProvider[], parent?: Injector): Injector;
    static create(options: {
        providers: StaticProvider[];
        parent?: Injector;
        name?: string;
    }): Injector;
    /** @nocollapse */
    static ngInjectableDef: never;
    /**
     * @internal
     * @nocollapse
     */
    static __NG_ELEMENT_ID__: number;
}
export declare const USE_VALUE: string;
export declare const NG_TEMP_TOKEN_PATH = "ngTempTokenPath";
export interface Abstract<T> extends Function {
    prototype: T;
}
export declare type ITokenString<T> = string & {
    target: T;
};
export declare type ITokenAny<T> = (number | string | object | Function | Array<any>) & {
    target?: T;
};
export declare type IToken<T> = Type<T> | Abstract<T> | InjectionToken<T> | ITokenString<T> | ITokenAny<T>;
export declare class StaticInjector implements Injector {
    readonly parent: Injector;
    readonly source: string | null;
    private _records;
    constructor(providers: StaticProvider[], parent?: Injector, source?: string | null);
    clearCache(token: any): void;
    debug(): void;
    get<T>(token: IToken<T>, notFoundValue?: T | undefined | null, flags?: InjectFlags): T;
    create(records: StaticProvider[], source?: string | null): any;
    setStatic(records: StaticProvider[]): void;
    toString(): string;
}
export declare function catchInjectorError(e: any, token: any, injectorErrorName: string, source: string | null): never;
