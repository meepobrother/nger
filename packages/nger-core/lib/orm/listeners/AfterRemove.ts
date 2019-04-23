import { makeDecorator, PropertyAst, PropertyContext } from 'ims-decorator';
export interface AfterRemove { }
export const AfterRemoveMetadataKey = 'AfterRemoveMetadataKey'
export const AfterRemove = () => makeDecorator<AfterRemove>(AfterRemoveMetadataKey)();
export class AfterRemoveAst extends PropertyContext<AfterRemove>{ }
export function isAfterRemovePropertyAst(val: PropertyAst): val is PropertyAst<AfterRemove> {
    return val.metadataKey === AfterRemoveMetadataKey;
}
