import { TypeContext } from 'ims-decorator';
import { createTypeRecord } from './createTypeRecord';
import { InjectableMetadataKey, InjectableClassAst, visitor } from 'nger-core';
import {
    ValueSansProvider, ExistingSansProvider,
    StaticClassSansProvider,
    FactorySansProvider, ClassSansProvider, InjectableProvider,
} from 'nger-core';
import { Record, Injector, createDependencyRecord } from './injector'
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

export function createInjectable(context: TypeContext) {
    const injectable = context.getClass(InjectableMetadataKey) as InjectableClassAst;
    const record = injectable.ast.metadataDef as InjectableProvider;
    let item: Record;
    if (isExistingSansProvider(record)) {
        return new Record((injector: Injector) => injector.get(record.useExisting), [{
            token: Injector,
            options: 0
        }], undefined)
    } else if (isStaticClassSansProvider(record)) {
        item = new Record((...params: any[]) => new record.useClass(...params), createDependencyRecord(record.deps), undefined)
    } else if (isFactorySansProvider(record)) {
        item = new Record((...params: any[]) => record.useFactory(...params), createDependencyRecord(record.deps), undefined)
    } else if (isClassSansProvider(record)) {
        // todo [{provide: Type<any>,useClass: Type<any>}]
        const context = visitor.visitType(record.useClass)
        const typeRecord = createTypeRecord(context);
        item = typeRecord.record;
    } else if (isValueSansProvider(record)) {
        item = new Record(() => record.useValue, [], undefined)
    } else {
        // Type<any>
        const typeRecord = createTypeRecord(context);
        item = typeRecord.record;
        if (record.deps) {
            record.deps.map((dep, index) => {
                item.deps
            })
        }
    }
    return {
        token: context.target,
        record: item
    }
}