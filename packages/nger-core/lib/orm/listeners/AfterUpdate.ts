import { makeDecorator, PropertyContext, PropertyAst } from 'ims-decorator';
export interface AfterUpdate { }
export const AfterUpdateMetadataKey = 'AfterUpdateMetadataKey'
export const AfterUpdate = () => makeDecorator<AfterUpdate>(AfterUpdateMetadataKey)();
export class AfterUpdateAst extends PropertyContext<AfterUpdate>{ }
export function isAfterUpdatePropertyAst(val: PropertyAst): val is PropertyAst<AfterUpdate> {
    return val.metadataKey === AfterUpdateMetadataKey;
}
