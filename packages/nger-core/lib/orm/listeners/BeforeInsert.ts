import { makeDecorator, PropertyAst, PropertyContext } from 'ims-decorator';
export interface BeforeInsert { }
export const BeforeInsertMetadataKey = 'BeforeInsertMetadataKey'
export const BeforeInsert = () => makeDecorator<BeforeInsert>(BeforeInsertMetadataKey)();
export class BeforeInsertPropertyAst extends PropertyContext<BeforeInsert>{ }
export function isBeforeInsertPropertyAst(val: PropertyAst): val is PropertyAst<BeforeInsert> {
    return val.metadataKey === BeforeInsertMetadataKey;
}
