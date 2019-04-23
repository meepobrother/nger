import { makeDecorator, PropertyContext, PropertyAst } from 'ims-decorator';
export interface BeforeUpdate { }
export const BeforeUpdateMetadataKey = 'BeforeUpdateMetadataKey'
export const BeforeUpdate = () => makeDecorator<BeforeUpdate>(BeforeUpdateMetadataKey)();
export class BeforeUpdatePropertyAst extends PropertyContext<BeforeUpdate>{ }
export function isBeforeUpdatePropertyAst(val: PropertyAst): val is PropertyAst<BeforeUpdate> {
    return val.metadataKey === BeforeUpdateMetadataKey;
}
