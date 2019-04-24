import {
    InjectableClassAst, ValueSansProvider, ExistingSansProvider,
    StaticClassSansProvider, Type,
    FactorySansProvider, ClassSansProvider, InjectableProvider,
} from 'nger-core';
import { Record, createDependencyRecord, Injector } from './injector';
import { createTypeRecord } from './createTypeRecord';
export function isExistingSansProvider(val: any): val is ExistingSansProvider {
    return !!(val as ExistingSansProvider).useExisting
}
export function isStaticClassSansProvider(val: any): val is StaticClassSansProvider {
    return !!(val as StaticClassSansProvider).useClass && Array.isArray((val as StaticClassSansProvider).deps)
}
export function isFactorySansProvider(val: any): val is FactorySansProvider {
    return !!(val as FactorySansProvider).useFactory
}
export function isClassSansProvider(val: any): val is ClassSansProvider {
    return !isStaticClassSansProvider(val) && !!(val as ClassSansProvider).useClass
}
export function isValueSansProvider(val: any): val is ValueSansProvider {
    return !!(val as ValueSansProvider).useValue
}
export function createInjectableProviderRecord(record: InjectableProvider, token: Type<any>) {
    if (isExistingSansProvider(record)) {
        return new Record((injector: Injector) => injector.get(record.useExisting), [{
            token: Injector,
            options: 0
        }], undefined)
    } else if (isStaticClassSansProvider(record)) {
        return new Record((...params: any[]) => new record.useClass(...params), createDependencyRecord(record.deps), undefined)
    } else if (isFactorySansProvider(record)) {
        return new Record((...params: any[]) => record.useFactory(...params), createDependencyRecord(record.deps), undefined)
    } else if (isClassSansProvider(record)) {
        // todo [Type<any>,{provide: Type<any>,useClass: Type<any>}]
    } else if (isValueSansProvider(record)) {
        return new Record(() => record.useValue, [], undefined)
    } else {
        return new Record((...params: any[]) => new token(...params), createDependencyRecord(record.deps), undefined)
    }
}
export function createInjectableRecord(context: InjectableClassAst) {
    const def = context.ast.metadataDef;
    return {
        providedIn: def.providedIn,
        record: createInjectableProviderRecord(def as InjectableProvider, context.ast.target)
    }
}
