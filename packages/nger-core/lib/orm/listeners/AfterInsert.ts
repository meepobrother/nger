import { makeDecorator, PropertyContext, PropertyAst } from 'ims-decorator';
export interface AfterInsert { }
export const AfterInsertMetadataKey = 'AfterInsertMetadataKey'
export const AfterInsert = () => makeDecorator<AfterInsert>(AfterInsertMetadataKey)();
export class AfterInsertPropertyAst extends PropertyContext<AfterInsert>{ }
export function isAfterInsertPropertyAst(val: PropertyAst): val is PropertyAst<AfterInsert> {
    return val.metadataKey === AfterInsertMetadataKey;
}
