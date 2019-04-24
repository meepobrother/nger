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
import { isType } from 'ims-decorator';
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
globalRecord.set(Logger, {
    fn: () => {
        return new ConsoleLogger(LogLevel.debug)
    },
    deps: [],
    value: undefined
});
export function setRecord(record: StaticProvider) {
    globalRecord.set(record.provide, createStaticRecrod(record))
}
// todo
export function getRecord(token: any): Record | Record[] | undefined {
    // 根据token 获取record
    return globalRecord.get(token)
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
export function inject<T>(token: any, notFound?: T): T | T[] | undefined {
    const record = getRecord(token);
    if (!!record) {
        return getRecordValue(record)
    }
    return notFound;
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
    return new Record((...params: any[]) => {
        new val.useClass(...params)
    }, createDependencyRecord(val.deps), undefined)
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

export function createDependencyRecord(deps: any[] | undefined): DependencyRecord[] {
    const dependencyRecords: DependencyRecord[] = [];
    if (deps && deps.length > 0) {
        deps.map((dep, index) => {
            dependencyRecords.push({
                token: dep,
                options: index,
            });
        })
    }
    return dependencyRecords;
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

export class Injector {
    map: Map<any, Record | Record[]> = new Map();
    constructor(records: StaticProvider[], private parent?: Injector) {
        this.map.set(Injector, new Record(() => this, [], undefined));
        records.map(record => {
            this.map.set(record.provide, createStaticRecrod(record))
        });
    }
    get<T>(token: IToken<T>, notFound?: T): T | T[] | undefined {
        const record = this.map.get(token);
        if (record) {
            return this.getRecordValue(record)
        } else {
            if (this.parent) return this.parent.get(token, notFound);
            return inject<T>(token, notFound)
        }
    }
    getRecordValue(record: Record | Record[]) {
        if (Array.isArray(record)) {
            return record.map(rec => this.getRecordValue(rec))
        } else {
            if (record.value) return record.value;
            const params = new Array(record.deps.length);
            for (let dep of record.deps) {
                params[dep.options] = this.get(dep.token)
            }
            record.value = record.fn(...params);
            return record.value;
        }
    }
}

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
        fn: () => new val.useClass(),
        deps: [],
        value: undefined
    }
}


