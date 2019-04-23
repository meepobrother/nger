import { makeDecorator, PropertyContext, PropertyAst } from 'ims-decorator';
export interface TreeParent { }
export const TreeParentMetadataKey = 'TreeParentMetadataKey'
export const TreeParent = () => makeDecorator<TreeParent>(TreeParentMetadataKey)();
export function isTreeParentPropertyAst(val: PropertyAst): val is PropertyAst<TreeParent> {
    return val.metadataKey === TreeParentMetadataKey;
}
export class TreeParentPropertyAst extends PropertyContext<TreeParent>{ }
