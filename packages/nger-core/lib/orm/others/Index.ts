import { makeDecorator, PropertyContext, PropertyAst } from 'ims-decorator';
export interface Index { }
export const IndexMetadataKey = 'IndexMetadataKey'
export const Index = makeDecorator<Index>(IndexMetadataKey);
export class IndexPropertyAst extends PropertyContext<Index>{ }
export function isIndexPropertyAst(val: PropertyAst): val is PropertyAst<Index> {
    return val.metadataKey === IndexMetadataKey;
}
