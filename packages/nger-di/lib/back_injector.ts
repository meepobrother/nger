import { ConsoleLogger, LogLevel, Logger } from 'nger-logger';
import { stringify } from './util';
import {
    Type, FactoryProvider, StaticClassProvider, ValueProvider,
    ExistingProvider, ConstructorProvider, isValueProvider,
    StaticProvider, isExistingProvider, isStaticClassProvider,
    isFactoryProvider
} from './type'
import { InjectionToken } from './injection_token';
export const NG_TEMP_TOKEN_PATH = 'ngTempTokenPath';
export const SOURCE = '__source';
const NG_TOKEN_PATH = 'ngTokenPath';
const NEW_LINE = /\n/gm;
const _THROW_IF_NOT_FOUND = new Object();
export const THROW_IF_NOT_FOUND = _THROW_IF_NOT_FOUND;
const NO_NEW_LINE = 'ɵ';
const IDENT = function <T>(value: T): T {
    return value;
};
const EMPTY = <any[]>[];
const CIRCULAR = IDENT;
// record定义
export class Record {
    constructor(
        public fn: Function,
        public deps: DependencyRecord[] = [],
        public value: any = EMPTY,
        public useNew: boolean = false
    ) { }
}
export interface DependencyRecord {
    token: any;
    options: number;
}
// 全局record记录map
export const globalRecord: Map<any, Record | Record[]> = new Map();
globalRecord.set(Logger, new Record(() => {
    return new ConsoleLogger(LogLevel.debug)
}, [], undefined));
// 设置全局record
export function setRecord(token: any, record: Record | Record[] | undefined) {
    if (record) globalRecord.set(token, record)
}
export function setStaticProvider(provider: StaticProvider) {
    createStaticRecrod(provider, globalRecord)
}
// 从全局里获取
export function inject<T>(token: any, notFound?: T, flags: InjectFlags = InjectFlags.Default): T | T[] | undefined {
    const record = globalRecord.get(token);
    try {
        return tryResolveToken(
            token,
            record,
            globalRecord,
            ERROR_INJECTOR,
            notFound,
            flags
        );
    } catch (e) {
        return catchInjectorError(e, token, 'StaticInjectorError', this.source);
    }
}
// 解析token,刨出错误
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


export function createFactoryProviderRecord(val: FactoryProvider): Record {
    return new Record((...params: any[]) => val.useFactory(...params), createDependencyRecord(val.deps), undefined);
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
    }, createDeps([Injector]), undefined);
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
    return new Record((...params: any[]) => {
        if (val.provide) {
            if (typeof val.provide === 'function') {
                return new val.provide(...params)
            }
            return val.provide;
        }
        return undefined;
    }, createDependencyRecord(val.deps), undefined)
}
export function createMultiRecord(res: Record | Record[] | undefined, newRecord: Record) {
    let records: Record[] = [];
    if (Array.isArray(res)) {
        records = [...res, newRecord]
    } else if (res) {
        records = [res, newRecord]
    } else {
        records = [newRecord]
    }
    return records;
}
export function createStaticRecrod(record: StaticProvider, records: Map<any, Record | Record[]>) {
    if (isValueProvider(record)) {
        if (!!record.multi) {
            return createMultiRecord(records.get(record.provide), createValueProviderRecord(record));
        } else {
            return createValueProviderRecord(record)
        }
    } else if (isExistingProvider(record)) {
        if (!!record.multi) {
            return createMultiRecord(records.get(record.provide), createExistingProviderRecord(record));
        } else {
            return createExistingProviderRecord(record)
        }
    } else if (isStaticClassProvider(record)) {
        if (!!record.multi) {
            return createMultiRecord(records.get(record.provide), createStaticClassProviderRecord(record));
        } else {
            return createStaticClassProviderRecord(record)
        }
    } else if (isFactoryProvider(record)) {
        if (!!record.multi) {
            return createMultiRecord(records.get(record.provide), createFactoryProviderRecord(record));
        } else {
            return createFactoryProviderRecord(record)
        }
    } else {
        if (!!record.multi) {
            return createMultiRecord(records.get(record.provide), createConstructorProvider(record));
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
export type ITokenAny<T> = (number | string | object | Function | Array<any>) & {
    target?: T;
}
export type IToken<T> = Type<T> | Abstract<T> | InjectionToken<T> | ITokenString<T> | ITokenAny<T>;
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
    Optional = 0b1000
}

export enum OptionFlags {
    Optional = 1 << 0,
    CheckSelf = 1 << 1,
    CheckParent = 1 << 2,
    Default = CheckSelf | CheckParent,

}

export const topInjector = {
    get: inject
} as Injector;

export interface IInjector {
    get<T>(token: IToken<T>, notFound?: T, flags?: InjectFlags, ): T | T[] | undefined;
}
export class ErrorInjector implements IInjector {
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
// null
export class NullInjector implements IInjector {
    get(token: any, notFoundValue: any = _THROW_IF_NOT_FOUND, flags: InjectFlags): any {
        // 如果是Optional
        const res = inject(token, notFoundValue, flags);
        if (res === _THROW_IF_NOT_FOUND) {
            const error = new Error(`NullInjectorError: No provider for ${stringify(token)}!`);
            error.name = 'NullInjectorError';
            throw error;
        }
        return res;
    }
}
const NULL_INJECTOR = new NullInjector() as Injector;
const ERROR_INJECTOR = new ErrorInjector() as Injector;

export function catchInjectorError(
    e: any,
    token: any,
    injectorErrorName: string,
    source: string | null
): never {
    const tokenPath: any[] = e[NG_TEMP_TOKEN_PATH];
    if (token[SOURCE]) {
        tokenPath.unshift(token[SOURCE]);
    }
    e.message = formatError('\n' + e.message, tokenPath, injectorErrorName, source);
    e[NG_TOKEN_PATH] = tokenPath;
    e[NG_TEMP_TOKEN_PATH] = null;
    throw e;
}
export const INJECTOR = new InjectionToken<Injector>(
    'INJECTOR',
    -1 as any  // `-1` is used by Ivy DI system as special value to recognize it as `Injector`.
);
export class Injector implements IInjector {
    static THROW_IF_NOT_FOUND = THROW_IF_NOT_FOUND;
    static NULL: IInjector = NULL_INJECTOR;
    _records: Map<any, Record | Record> = new Map();
    logger: Logger;
    parent: Injector;
    constructor(
        providers: StaticProvider[],
        parent: Injector | null = null,
        public source: string | null = null
    ) {
        this.logger = inject(Logger, new ConsoleLogger(LogLevel.debug)) as Logger;
        if (!parent) {
            parent = Injector.NULL as Injector;
        }
        this.parent = parent;
        this._records.set(
            Injector, <Record>{ token: Injector, fn: IDENT, deps: EMPTY, value: this, useNew: false });
        this._records.set(
            INJECTOR, <Record>{ token: INJECTOR, fn: IDENT, deps: EMPTY, value: this, useNew: false });

        this._records.set(Injector, new Record(() => this, [], undefined));
        setRecord(Injector, new Record(() => this, [], undefined));
        recursivelyProcessProviders(this._records, providers);
    }
    clearCache(token: any) {
        const record = this._records.get(token)
        if (Array.isArray(record)) { }
    }
    create(records: StaticProvider[], source: string | null = null) {
        return new Injector(records, this, source)
    }
    setStatic(providers: StaticProvider[]) {
        recursivelyProcessProviders(this._records, providers);
    }
    debug() {
        this._records.forEach((item, key) => {
            if (Array.isArray(item)) {
                this.logger.debug(`injector:multi:${this.source} ${key.name} registed ${item.length}`)
            } else {
                this.logger.debug(`injector:${this.source} ${key.name} registed, Dependeny: ${stringify(item.deps.map(dep => dep.token))}`)
            }
        });
    }
    set(token: any, record: Record) {
        this._records.set(token, record)
    }
    extend(injector: Injector) {
        injector._records.forEach((rec, key) => {
            let record = this._records.get(key)
            if (record) {
                // 啥也不做
            } else {
                // 覆盖
                this._records.set(key, rec)
            }
        });
    }
    get<T>(token: IToken<T>, notFound?: T, flags: InjectFlags = InjectFlags.Default): T | T[] | undefined {
        const record = this._records.get(token);
        if (token instanceof InjectionToken) {
            notFound = notFound || {} as T;
        }
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
            return catchInjectorError(e, token, `${this.source}:StaticInjectorError`, this.source);
        }
    }
}
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
// 解析token
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
                            !childRecord && !(options & OptionFlags.CheckParent) ? ERROR_INJECTOR : parent,
                            options & OptionFlags.Optional ? null : Injector.THROW_IF_NOT_FOUND,
                            InjectFlags.Default));
                    }
                }
                value = fn(...deps);
                record.value = value;
                return value;
            }
            return value;
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




/** 解析 */
import { resolveForwardRef, getClosureSafeProperty } from './util';
export const USE_VALUE =
    getClosureSafeProperty<ValueProvider>({ provide: String, useValue: getClosureSafeProperty });
// 解析deps
function computeDeps(provider: StaticProvider): DependencyRecord[] {
    let deps: DependencyRecord[] = EMPTY;
    const providerDeps: any[] =
        (provider as ExistingProvider & StaticClassProvider & ConstructorProvider).deps;
    if (providerDeps && providerDeps.length) {
        deps = [];
        for (let i = 0; i < providerDeps.length; i++) {
            let options = OptionFlags.Default;
            let token = resolveForwardRef(providerDeps[i]);
            if (token instanceof Array) {
                for (let j = 0, annotations = token; j < annotations.length; j++) {
                    const annotation = annotations[j];
                    if (annotation === InjectFlags.Optional) {
                        options = options | OptionFlags.Optional;
                    } else if (annotation === InjectFlags.SkipSelf) {
                        options = options & ~OptionFlags.CheckSelf;
                    } else if (annotation == InjectFlags.Self) {
                        options = options & ~OptionFlags.CheckParent;
                    } else {
                        token = resolveForwardRef(annotation);
                    }
                }
            }
            deps.push({ token, options });
        }
    } else if ((provider as ExistingProvider).useExisting) {
        const token = resolveForwardRef((provider as ExistingProvider).useExisting);
        deps = [{ token, options: OptionFlags.Default }];
    } else if (!providerDeps && !(USE_VALUE in provider)) {
        // useValue & useExisting are the only ones which are exempt from deps all others need it.
        throw staticError('\'deps\' required', provider);
    }
    return deps;
}
function staticError(text: string, obj: any): Error {
    return new Error(formatError(text, obj, 'StaticInjectorError'));
}

type SupportedProvider =
    ValueProvider | ExistingProvider | StaticClassProvider | ConstructorProvider | FactoryProvider;
// 解析provider
function resolveProvider(provider: SupportedProvider): Record {
    const deps = computeDeps(provider);
    let fn: Function = IDENT;
    let value: any = EMPTY;
    let useNew: boolean = false;
    let provide = resolveForwardRef(provider.provide);
    if (USE_VALUE in provider) {
        // We need to use USE_VALUE in provider since provider.useValue could be defined as undefined.
        value = (provider as ValueProvider).useValue;
    } else if ((provider as FactoryProvider).useFactory) {
        fn = (provider as FactoryProvider).useFactory;
    } else if ((provider as ExistingProvider).useExisting) {
        // Just use IDENT
    } else if ((provider as StaticClassProvider).useClass) {
        useNew = true;
        fn = resolveForwardRef((provider as StaticClassProvider).useClass);
    } else if (typeof provide == 'function') {
        useNew = true;
        fn = provide;
    } else {
        throw staticError(
            'StaticProvider does not have [useValue|useFactory|useExisting|useClass] or [provide] is not newable',
            provider);
    }
    return { deps, fn, useNew, value };
}

function multiProviderMixError(token: any) {
    return staticError('Cannot mix multi providers and regular providers', token);
}
const MULTI_PROVIDER_FN = function (): any[] {
    return Array.prototype.slice.call(arguments);
};
// 将static provider保存到record
function recursivelyProcessProviders(records: Map<any, Record>, provider: StaticProvider | StaticProvider[]) {
    if (provider) {
        provider = resolveForwardRef(provider);
        if (provider instanceof Array) {
            // if we have an array recurse into the array
            for (let i = 0; i < provider.length; i++) {
                recursivelyProcessProviders(records, provider[i]);
            }
        } else if (typeof provider === 'function') {
            // Functions were supported in ReflectiveInjector, but are not here. For safety give useful
            // error messages
            throw staticError('Function/Class not supported', provider);
        } else if (provider && typeof provider === 'object' && provider.provide) {
            // At this point we have what looks like a provider: {provide: ?, ....}
            let token = resolveForwardRef(provider.provide);
            const resolvedProvider = resolveProvider(provider);
            if (provider.multi === true) {
                // This is a multi provider.
                let multiProvider: Record | undefined = records.get(token);
                if (multiProvider) {
                    if (multiProvider.fn !== MULTI_PROVIDER_FN) {
                        throw multiProviderMixError(token);
                    }
                } else {
                    // Create a placeholder factory which will look up the constituents of the multi provider.
                    records.set(token, multiProvider = <Record>{
                        token: provider.provide,
                        deps: [],
                        useNew: false,
                        fn: MULTI_PROVIDER_FN,
                        value: EMPTY
                    });
                }
                // Treat the provider as the token.
                token = provider;
                multiProvider.deps.push({ token, options: OptionFlags.Default });
            }
            const record = records.get(token);
            if (record && record.fn == MULTI_PROVIDER_FN) {
                throw multiProviderMixError(token);
            }
            records.set(token, resolvedProvider);
        } else {
            throw staticError('Unexpected provider', provider);
        }
    }
}
