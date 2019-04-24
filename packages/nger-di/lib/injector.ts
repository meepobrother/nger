import { stringify } from './util';
export interface InjectorType<T> extends Type<T> {
    ngInjectorDef: never;
}
export interface InjectableDef<T> {
    providedIn: InjectorType<any> | 'root' | 'any' | null;
    factory: () => T;
    value: T | undefined;
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
export interface Type<T> extends Function {
    new(...args: any[]): T;
}
export interface ValueSansProvider {
    useValue: any;
}
export interface ValueProvider extends ValueSansProvider {
    provide: any;
    multi?: boolean;
}
export interface StaticClassSansProvider {
    useClass: Type<any>;
    deps: any[];
}
export interface StaticClassProvider extends StaticClassSansProvider {
    provide: any;
    multi?: boolean;
}
export interface ConstructorSansProvider {
    deps?: any[];
}
export interface ConstructorProvider extends ConstructorSansProvider {
    provide: Type<any>;
    multi?: boolean;
}
export interface ExistingSansProvider {
    useExisting: any;
}
export interface ExistingProvider extends ExistingSansProvider {
    provide: any;
    multi?: boolean;
}
export interface FactorySansProvider {
    useFactory: Function;
    deps?: any[];
}
export interface FactoryProvider extends FactorySansProvider {
    provide: any;
    multi?: boolean;
}
export type StaticProvider = ValueProvider | ExistingProvider | StaticClassProvider | ConstructorProvider | FactoryProvider;

import { Logger, ConsoleLogger, LogLevel } from 'nger-logger';
export class Record {
    constructor(
        public fn: Function,
        public deps: DependencyRecord[] = [],
        public value: any = EMPTY
    ) { }
}
export interface DependencyRecord {
    token: any;
    options: number;
}
// 全局record记录map
export const globalRecord: Map<any, Record | Record[]> = new Map();
globalRecord.set(Logger, {
    fn: () => {
        return new ConsoleLogger(LogLevel.debug)
    },
    deps: [],
    value: undefined
});
export function setRecord(token: any, record: Record | Record[] | undefined) {
    if (record) globalRecord.set(token, record)
}
export function inject<T>(token: any, flags: InjectFlags = InjectFlags.Default, notFound?: T): T | T[] | undefined {
    const record = globalRecord.get(token);
    try {
        return tryResolveToken(
            token,
            record,
            globalRecord,
            Injector.NULL as Injector,
            notFound,
            flags
        );
    } catch (e) {
        return catchInjectorError(e, token, 'StaticInjectorError', this.source);
    }
}
const IDENT = function <T>(value: T): T {
    return value;
};
export const NG_TEMP_TOKEN_PATH = 'ngTempTokenPath';
const EMPTY = <any[]>[];
const CIRCULAR = IDENT;
function tryResolveToken(
    token: any,
    record: Record | Record[] | undefined,
    records: Map<any, Record | Record[]>,
    parent: Injector,
    notFoundValue: any,
    flags: InjectFlags
): any {
    try {
        return resolveToken(token, record, records, parent, notFoundValue, flags);
    } catch (e) {
        // ensure that 'e' is of type Error.
        if (!(e instanceof Error)) {
            e = new Error(e);
        }
        const path: any[] = e[NG_TEMP_TOKEN_PATH] = e[NG_TEMP_TOKEN_PATH] || [];
        path.unshift(token);
        if (Array.isArray(record)) {
            record = record.map(rec => {
                if (rec && rec.value == CIRCULAR) {
                    // Reset the Circular flag.
                    rec.value = EMPTY;
                }
                return rec;
            })
        } else {
            if (record && record.value == CIRCULAR) {
                // Reset the Circular flag.
                record.value = EMPTY;
            }
        }
        throw e;
    }
}
const NO_NEW_LINE = 'ɵ';

export function resolveToken(
    token: any,
    record: Record | Record[] | undefined,
    records: Map<any, Record | Record[]>,
    parent: Injector,
    notFoundValue: any,
    flags: InjectFlags
) {
    let value;
    if (record && !(flags & InjectFlags.SkipSelf)) {
        // If we don't have a record, this implies that we don't own the provider hence don't know how
        // to resolve it.
        function handler(record: Record) {
            value = record.value;
            if (value == CIRCULAR) {
                throw Error(NO_NEW_LINE + 'Circular dependency');
            } else if (value === EMPTY) {
                record.value = CIRCULAR;
                let obj = undefined;
                let fn = record.fn;
                let depRecords = record.deps;
                let deps = EMPTY;
                if (depRecords.length) {
                    deps = [];
                    for (let i = 0; i < depRecords.length; i++) {
                        const depRecord: DependencyRecord = depRecords[i];
                        const options = depRecord.options;
                        const childRecord =
                            options & OptionFlags.CheckSelf ? records.get(depRecord.token) : undefined;
                        deps.push(tryResolveToken(
                            // Current Token to resolve
                            depRecord.token,
                            // A record which describes how to resolve the token.
                            // If undefined, this means we don't have such a record
                            childRecord,
                            // Other records we know about.
                            records,
                            // If we don't know how to resolve dependency and we should not check parent for it,
                            // than pass in Null injector.
                            !childRecord && !(options & OptionFlags.CheckParent) ? NULL_INJECTOR : parent,
                            options & OptionFlags.Optional ? null : Injector.THROW_IF_NOT_FOUND,
                            InjectFlags.Default));
                    }
                }
                value = fn.apply(obj, deps);
                record.value = value;
                return value;
            }
        }
        if (Array.isArray(record)) {
            value = record.map(rec => handler(rec))
        } else {
            value = handler(record)
        }
    } else if (!(flags & InjectFlags.Self)) {
        value = parent.get(token, notFoundValue, InjectFlags.Default);
    }
    return value;
}

export function isValueProvider(val: StaticProvider): val is ValueProvider {
    return !!(val as ValueProvider).useValue
}
export function isExistingProvider(val: StaticProvider): val is ExistingProvider {
    return !!(val as ExistingProvider).useExisting
}
export function isStaticClassProvider(val: StaticProvider): val is StaticClassProvider {
    return !!(val as StaticClassProvider).useClass
}
export function isFactoryProvider(val: StaticProvider): val is FactoryProvider {
    return !!(val as FactoryProvider).useFactory
}
export function createFactoryProviderRecord(val: FactoryProvider): Record {
    return new Record(val.useFactory, createDependencyRecord(val.deps), undefined);
}
export function createStaticClassProviderRecord(val: StaticClassProvider): Record {
    return new Record((...params: any[]) => new val.useClass(...params), createDependencyRecord(val.deps), undefined)
}
export function createValueProviderRecord(val: ValueProvider): Record {
    return new Record(() => val.useValue, [], undefined);
}
export function createExistingProviderRecord(val: ExistingProvider): Record {
    return new Record((injector: Injector) => {
        return injector.get(val.useExisting)
    }, [{
        options: 0,
        token: Injector
    }], undefined);
}

/**
 * deps: [
 *  [InjectFlags.Host,InjectFlags.Optional,ImsServices]
 * ImsServices,
 * [ImsServices]
 * ...
 * ]
 */
export function createDeps(deps: any[]): DependencyRecord[] {
    return deps.map((dep, index) => {
        // [InjectFlags.Host]
        if (Array.isArray(dep)) {
            let token, options = OptionFlags.Default;
            dep.map(opt => {
                if (typeof opt === 'number') {
                    if (opt === InjectFlags.Self) {
                        options = options & ~OptionFlags.CheckParent;
                    } else if (opt === InjectFlags.Optional) {
                        options = options | OptionFlags.Optional;
                    } else if (opt === InjectFlags.SkipSelf) {
                        options = options & ~OptionFlags.CheckSelf;
                    }
                } else {
                    token = opt;
                }
            });
            return {
                token,
                options
            }
        } else {
            return {
                token: dep,
                options: OptionFlags.Default
            }
        }
    })
}
/**
 * deps: [
 *  [InjectFlags.Host,InjectFlags.Optional,ImsServices]
 * ImsServices,
 * [ImsServices]
 * ...
 * ]
 */
export function createDependencyRecord(deps: any[] | undefined): DependencyRecord[] {
    if (deps && deps.length > 0) {
        return createDeps(deps)
    }
    return [];
}
export function createConstructorProvider(val: ConstructorProvider): Record {

    return new Record((...params: any[]) => new val.provide(...params), createDependencyRecord(val.deps), undefined)
}
export function createMultiRecord(res: Record | Record[] | undefined, newRecord: Record) {
    let records: Record[] = [];
    if (Array.isArray(res)) {
        records = [...res, newRecord]
    } else {
        if (res) {
            records = [res, newRecord]
        } else {
            records = [newRecord]
        }
    }
    return records;
}
export function createStaticRecrod(record: StaticProvider) {
    if (isValueProvider(record)) {
        if (!!record.multi) {
            return createMultiRecord(this.map.get(record.provide), createValueProviderRecord(record));
        } else {
            return createValueProviderRecord(record)
        }
    } else if (isExistingProvider(record)) {
        if (!!record.multi) {
            return createMultiRecord(this.map.get(record.provide), createExistingProviderRecord(record));
        } else {
            return createExistingProviderRecord(record)
        }
    } else if (isStaticClassProvider(record)) {
        if (!!record.multi) {
            return createMultiRecord(this.map.get(record.provide), createStaticClassProviderRecord(record));
        } else {
            return createStaticClassProviderRecord(record)
        }
    } else if (isFactoryProvider(record)) {
        if (!!record.multi) {
            return createMultiRecord(this.map.get(record.provide), createFactoryProviderRecord(record));
        } else {
            return createFactoryProviderRecord(record)
        }
    } else {
        if (!!record.multi) {
            return createMultiRecord(this.map.get(record.provide), createConstructorProvider(record));
        } else {
            return createConstructorProvider(record)
        }
    }
}
export interface Abstract<T> extends Function {
    prototype: T;
}
export type ITokenString<T> = string & {
    target: T
}
export type IToken<T> = Type<T> | Abstract<T> | InjectionToken<T> | ITokenString<T>;
export enum InjectFlags {
    // TODO(alxhub): make this 'const' when ngc no longer writes exports of it into ngfactory files.
    /** Check self and check parent injector if needed */
    Default = 0b0000,
    /**
     * Specifies that an injector should retrieve a dependency from any injector until reaching the
     * host element of the current component. (Only used with Element Injector)
     */
    Host = 0b0001,
    /** Don't ascend to ancestors of the node requesting injection. */
    Self = 0b0010,
    /** Skip the node that is requesting injection. */
    SkipSelf = 0b0100,
    /** Inject `defaultValue` instead if token not found. */
    Optional = 0b1000,
}

export enum OptionFlags {
    Optional = 1 << 0,
    CheckSelf = 1 << 1,
    CheckParent = 1 << 2,
    Default = CheckSelf | CheckParent
}

export const topInjector = {
    get: inject
} as Injector;

const _THROW_IF_NOT_FOUND = new Object();
export const THROW_IF_NOT_FOUND = _THROW_IF_NOT_FOUND;

export interface IInjector {
    get<T>(token: IToken<T>, notFound?: T, flags?: InjectFlags, ): T | T[] | undefined;
}

export class NullInjector implements IInjector {
    get(token: any, notFoundValue: any = _THROW_IF_NOT_FOUND, flags: InjectFlags): any {
        // 如果是Optional
        if (notFoundValue === _THROW_IF_NOT_FOUND) {
            const error = new Error(`NullInjectorError: No provider for ${stringify(token)}!`);
            error.name = 'NullInjectorError';
            throw error;
        }
        return notFoundValue;
    }
}
export const SOURCE = '__source';
const NG_TOKEN_PATH = 'ngTokenPath';

export function catchInjectorError(
    e: any, token: any, injectorErrorName: string, source: string | null): never {
    const tokenPath: any[] = e[NG_TEMP_TOKEN_PATH];
    if (token[SOURCE]) {
        tokenPath.unshift(token[SOURCE]);
    }
    e.message = formatError('\n' + e.message, tokenPath, injectorErrorName, source);
    e[NG_TOKEN_PATH] = tokenPath;
    e[NG_TEMP_TOKEN_PATH] = null;
    throw e;
}

export class Injector implements IInjector {
    static THROW_IF_NOT_FOUND = THROW_IF_NOT_FOUND;
    static NULL: IInjector = new NullInjector();
    private _records: Map<any, Record | Record[]> = new Map();
    constructor(
        records: StaticProvider[],
        private parent: Injector = Injector.NULL as Injector,
        public source: string | null = null
    ) {
        this._records.set(Injector, new Record(() => this, [], undefined));
        records.map(record => {
            // todo
            this._records.set(record.provide, createStaticRecrod(record))
        });
    }
    create(records: StaticProvider[]) {
        return new Injector(records, this)
    }
    get<T>(token: IToken<T>, notFound?: T, flags: InjectFlags = InjectFlags.Default): T | T[] | undefined {
        const record = this._records.get(token);
        try {
            return tryResolveToken(
                token,
                record,
                this._records,
                this.parent,
                notFound,
                flags
            );
        } catch (e) {
            return catchInjectorError(e, token, 'StaticInjectorError', this.source);
        }
    }
}
const NULL_INJECTOR = Injector.NULL as Injector;

// 其他
export interface ClassSansProvider {
    useClass: Type<any>;
}
export interface ClassProvider extends ClassSansProvider {
    provide: any;
    multi?: boolean;
}
export type Provider = TypeProvider | ValueProvider | ClassProvider | ConstructorProvider |
    ExistingProvider | FactoryProvider;

export interface TypeProvider extends Type<any> { }
export function createTypeProviderRecord(val: TypeProvider): Record {
    return {
        fn: () => new val(),
        deps: [],
        value: undefined
    }
}
export function createClassProviderRecord(val: ClassProvider): Record {
    return {
        fn: (...params: any[]) => new val.useClass(),
        deps: [],
        value: undefined
    }
}

const NEW_LINE = /\n/gm;
function formatError(
    text: string, obj: any, injectorErrorName: string, source: string | null = null): string {
    text = text && text.charAt(0) === '\n' && text.charAt(1) == NO_NEW_LINE ? text.substr(2) : text;
    let context = stringify(obj);
    if (obj instanceof Array) {
        context = obj.map(stringify).join(' -> ');
    } else if (typeof obj === 'object') {
        let parts = <string[]>[];
        for (let key in obj) {
            if (obj.hasOwnProperty(key)) {
                let value = obj[key];
                parts.push(
                    key + ':' + (typeof value === 'string' ? JSON.stringify(value) : stringify(value)));
            }
        }
        context = `{${parts.join(', ')}}`;
    }
    return `${injectorErrorName}${source ? '(' + source + ')' : ''}[${context}]: ${text.replace(NEW_LINE, '\n  ')}`;
}