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
        public value: any = EMPTY
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
            flags,
            undefined
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
    flags: InjectFlags,
    current: Injector | undefined
): any {
    try {
        return resolveToken(token, record, records, parent, notFoundValue, flags, current);
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
export type IToken<T> =
    Type<T> |
    Abstract<T> |
    InjectionToken<T> |
    ITokenString<T> |
    ITokenAny<T>;
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

export interface IInjector {
    get<T>(token: IToken<T>, notFound?: T, flags?: InjectFlags, ): T | T[] | undefined;
}
export class ErrorInjector implements IInjector {
    source = `ErrorInjector`
    get(token: any, notFoundValue: any = _THROW_IF_NOT_FOUND, flags: InjectFlags): any {
        // 如果是Optional
        if (notFoundValue === _THROW_IF_NOT_FOUND) {
            const error = new Error(`NullInjectorError: No provider for ${stringify(token)}`);
            error.name = 'NullInjectorError';
            throw error;
        }
        return notFoundValue;
    }
}
// null
export class NullInjector implements IInjector {
    source: string | null = 'NullInjector'
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
export class Injector implements IInjector {
    static THROW_IF_NOT_FOUND = THROW_IF_NOT_FOUND;
    static NULL: Injector = NULL_INJECTOR as Injector;
    _records: Map<any, Record | Record[]> = new Map();
    exports: Map<any, Record | Record[]> = new Map();
    logger: Logger;
    parent: Injector;
    constructor(
        records: StaticProvider[],
        parent: Injector | null = null,
        public source: string | null = null
    ) {
        this.logger = inject(Logger, new ConsoleLogger(LogLevel.debug)) as Logger;
        if (!parent) {
            parent = Injector.NULL as Injector;
        }
        this.parent = parent;
        this._records.set(Injector, new Record(() => this, [], undefined));
        setRecord(Injector, new Record(() => this, [], undefined));
        records.map(record => {
            // todo
            this._records.set(record.provide, createStaticRecrod(record, this._records))
        });
    }
    static create(options: { providers: StaticProvider[], parent?: Injector, name?: string }): Injector {
        return new Injector(options.providers, options.parent, options.name)
    }
    clearCache(token: any) {
        const record = this._records.get(token)
        if (Array.isArray(record)) {
            record.map(rec => rec.value = undefined)
        } else if (record) {
            record.value = undefined;
        }
    }
    create(records: StaticProvider[], source: string | null = null) {
        return new Injector(records, this, source)
    }
    setStatic(records: StaticProvider[]) {
        records.map(record => {
            const recs = createStaticRecrod(record, this._records);
            this._records.set(record.provide, recs);
        });
    }
    debug() {
        this._records.forEach((item, key) => {
            if (Array.isArray(item)) {
                this.logger.debug(`injector:multi:${this.source} ${key.name} registed ${item.length}`)
            } else {
                this.logger.debug(`injector:${this.source} ${(key && key.name) || ''} registed, Dependeny: ${stringify(item.deps.map(dep => dep.token))}`)
            }
        });
    }
    set(token: any, record: Record | Record[]) {
        this._records.set(token, record)
    }
    // 这个是替换
    extend(injector: Injector) {
        injector._records.forEach((rec, key) => {
            let record = this._records.get(key)
            if (Array.isArray(record)) {
                if (Array.isArray(rec)) {
                    record = [...record, ...rec]
                    this._records.set(key, record)
                } else {
                    record = [...record, rec]
                    this._records.set(key, record)
                }
            } else if (record) {
                // 啥也不做 还是覆盖 
                // todo todo todo 
                // this._records.set(key, record)
            } else {
                this._records.set(key, rec)
            }
            this._records.set(key, rec)
        });
    }
    setParent(injector: Injector) {
        this.parent = injector;
    }
    get<T>(token: IToken<T>, notFound?: T | null, flags: InjectFlags = InjectFlags.Default): T {
        const record = this._records.get(token);
        try {
            return tryResolveToken(
                token,
                record,
                this._records,
                this.parent,
                notFound,
                flags,
                this
            );
        } catch (e) {
            return catchInjectorError(e, token, `StaticInjectorError`, this.source);
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
    flags: InjectFlags,
    current: Injector | undefined
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
                            InjectFlags.Default,
                            current
                        ));
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

