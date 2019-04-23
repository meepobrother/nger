import { makeDecorator, PropertyContext, PropertyAst } from 'ims-decorator';
export interface TreeLevelColumn { }
export const TreeLevelColumnMetadataKey = 'TreeLevelColumnMetadataKey'
export const TreeLevelColumn = ()=>makeDecorator<TreeLevelColumn>(TreeLevelColumnMetadataKey)();
export function isTreeLevelColumnPropertyAst(val: PropertyAst): val is PropertyAst<TreeLevelColumn> {
    return val.metadataKey === TreeLevelColumnMetadataKey;
}
export class TreeLevelColumnPropertyAst extends PropertyContext<TreeLevelColumn>{ }
