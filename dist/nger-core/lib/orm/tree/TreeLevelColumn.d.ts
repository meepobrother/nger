import { PropertyContext, PropertyAst } from 'ims-decorator';
export interface TreeLevelColumn {
}
export declare const TreeLevelColumnMetadataKey = "TreeLevelColumnMetadataKey";
export declare const TreeLevelColumn: () => any;
export declare function isTreeLevelColumnPropertyAst(val: PropertyAst): val is PropertyAst<TreeLevelColumn>;
export declare class TreeLevelColumnPropertyAst extends PropertyContext<TreeLevelColumn> {
}
