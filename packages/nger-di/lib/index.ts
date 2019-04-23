import {
    StaticProvider, ValueProvider,
    ExistingProvider, StaticClassProvider,
    ConstructorProvider, FactoryProvider,
    Type, InjectionToken
} from 'nger-core'
export class Record {
    constructor(
        public fn: Function,
        public deps: DependencyRecord[] = [],
        public value: any = undefined
    ) { }
}
export interface DependencyRecord {
    token: any;
    options: number;
}
// 全局record记录map
export const globalRecord: Map<any, Record | Record[]> = new Map();
export function setRecord(record: StaticProvider) {
    globalRecord.set(record.provide, createRecrod(record))
}
// todo
export function getRecord(token: any): Record | Record[] | undefined {
    // 根据token 获取record
    return globalRecord.get(token)
}
export function inject<T>(token: any, notFound?: T): T | T[] | undefined {
    const record = getRecord(token);
    if (!!record) {
        return getRecordValue(record)
    }
    return notFound;
}
export function getRecordValue(record: Record | Record[]) {
    if (Array.isArray(record)) {
        return record.map(rec => getRecordValue(rec))
    } else {
        if (record.value) return record.value;
        const params = new Array(record.deps.length);
        for (let dep of record.deps) {
            params[dep.options] = inject(dep.token)
        }
        record.value = record.fn(...params);
        return record.value;
    }
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
export function createisFactoryProviderRecord(val: FactoryProvider): Record {
    return new Record(val.useFactory, val.deps, undefined);
}
export function createStaticClassProviderRecord(val: StaticClassProvider): Record {
    return new Record((...params: any[]) => {
        new val.useClass(...params)
    }, val.deps, undefined)
}
export function createValueProviderRecord(val: ValueProvider): Record {
    return new Record(() => val.useValue, [], undefined);
}
export function createExistingProviderRecord(val: ExistingProvider): Record {
    return new Record((injector: Injector) => {
        return injector.get(val.useExisting)
    }, [], undefined);
}
export function createConstructorProvider(val: ConstructorProvider): Record {
    return new Record((...params: any[]) => new val.provide(...params), val.deps, undefined)
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
export function createRecrod(record: StaticProvider) {
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
            return createMultiRecord(this.map.get(record.provide), createisFactoryProviderRecord(record));
        } else {
            return createisFactoryProviderRecord(record)
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
export class Injector {
    map: Map<any, Record | Record[]> = new Map();
    constructor(records: StaticProvider[], private parent: Injector) {
        this.map.set(Injector, new Record(() => this, [], undefined));
        records.map(record => {
            this.map.set(record.provide, createRecrod(record))
        });
    }
    get<T>(token: IToken<T>, notFound?: T): T | T[] | undefined {
        const record = this.map.get(token);
        if (record) {
            return getRecordValue(record)
        } else {
            if (this.parent) return this.parent.get(token, notFound);
            return inject<T>(token, notFound)
        }
    }
}