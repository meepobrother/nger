import { makeDecorator, PropertyAst, PropertyContext } from 'ims-decorator';
export interface BeforeRemove { }
export const BeforeRemoveMetadataKey = 'BeforeRemoveMetadataKey'
export const BeforeRemove = () => makeDecorator<BeforeRemove>(BeforeRemoveMetadataKey)();
export class BeforeRemoveAst extends PropertyContext<BeforeRemove>{ }
export function isBeforeRemovePropertyAst(val: PropertyAst): val is PropertyAst<BeforeRemove> {
    return val.metadataKey === BeforeRemoveMetadataKey;
}
