import { makeDecorator, PropertyContext, PropertyAst } from 'ims-decorator';
export interface AfterLoad { }
export const AfterLoadMetadataKey = 'AfterLoadMetadataKey'
export const AfterLoad = () => makeDecorator<AfterLoad>(AfterLoadMetadataKey)();
export class AfterLoadAst extends PropertyContext<AfterLoad>{ }
export function isAfterLoadPropertyAst(val: PropertyAst): val is PropertyAst<AfterLoad> {
    return val.metadataKey === AfterLoadMetadataKey;
}
