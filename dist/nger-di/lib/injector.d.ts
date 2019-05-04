import { Type, FactoryProvider, StaticClassProvider, ValueProvider, ExistingProvider, ConstructorProvider, StaticProvider, InjectFlags } from './type';
import { InjectionToken } from './injection_token';
export declare const NG_TEMP_TOKEN_PATH = "ngTempTokenPath";
export declare const SOURCE = "__source";
export declare const THROW_IF_NOT_FOUND: Object;
export declare class Record {
    fn: Function;
    deps: DependencyRecord[];
    value: any;
    constructor(fn: Function, deps?: DependencyRecord[], value?: any);
}
export interface DependencyRecord {
    token: any;
    options: number;
}
export declare const globalRecord: Map<any, Record | Record[]>;
export declare function setRecord(token: any, record: Record | Record[] | undefined): void;
export declare function setStaticProvider(provider: StaticProvider): void;
export declare function inject<T>(token: any, notFound?: T, flags?: InjectFlags): T | T[] | undefined;
export declare function createFactoryProviderRecord(val: FactoryProvider): Record;
export declare function createStaticClassProviderRecord(val: StaticClassProvider): Record;
export declare function createValueProviderRecord(val: ValueProvider): Record;
export declare function createExistingProviderRecord(val: ExistingProvider): Record;
/**
 * deps: [
 *  [InjectFlags.Host,InjectFlags.Optional,ImsServices]
 * ImsServices,
 * [ImsServices]
 * ...
 * ]
 */
export declare function createDeps(deps: any[]): DependencyRecord[];
/**
 * deps: [
 *  [InjectFlags.Host,InjectFlags.Optional,ImsServices]
 * ImsServices,
 * [ImsServices]
 * ...
 * ]
 */
export declare function createDependencyRecord(deps: any[] | undefined): DependencyRecord[];
export declare function createConstructorProvider(val: ConstructorProvider): Record;
export declare function createMultiRecord(res: Record | Record[] | undefined, newRecord: Record): Record[];
export declare function createStaticRecrod(record: StaticProvider, records: Map<any, Record | Record[]>): Record | Record[];
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
export declare const topInjector: Injector;
export interface IInjector {
    get<T>(token: IToken<T>, notFound?: T, flags?: InjectFlags): T | T[] | undefined;
}
export declare class ErrorInjector implements IInjector {
    source: string;
    get(token: any, notFoundValue: any, flags: InjectFlags): any;
}
export declare class NullInjector implements IInjector {
    source: string | null;
    get(token: any, notFoundValue: any, flags: InjectFlags): any;
}
export declare function catchInjectorError(e: any, token: any, injectorErrorName: string, source: string | null): never;
export declare class Injector implements IInjector {
    source: string | null;
    static THROW_IF_NOT_FOUND: Object;
    static NULL: Injector;
    _records: Map<any, Record | Record[]>;
    exports: Map<any, Record | Record[]>;
    parent: Injector;
    constructor(records: StaticProvider[], parent?: Injector | null, source?: string | null);
    static create(options: {
        providers: StaticProvider[];
        parent?: Injector;
        name?: string;
    }): Injector;
    clearCache(token: any): void;
    create(records: StaticProvider[], source?: string | null): Injector;
    setStatic(records: StaticProvider[]): void;
    debug(): void;
    set(token: any, record: Record | Record[]): void;
    extend(injector: Injector): void;
    setParent(injector: Injector): void;
    get<T>(token: IToken<T>, notFound?: T | null, flags?: InjectFlags): T;
}
export declare function resolveToken(token: any, record: Record | Record[] | undefined, records: Map<any, Record | Record[]>, parent: Injector, notFoundValue: any, flags: InjectFlags, current: Injector | undefined): any;
