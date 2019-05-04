import { PropertyContext, PropertyAst } from 'ims-decorator';
export interface TreeParent {
}
export declare const TreeParentMetadataKey = "TreeParentMetadataKey";
export declare const TreeParent: () => any;
export declare function isTreeParentPropertyAst(val: PropertyAst): val is PropertyAst<TreeParent>;
export declare class TreeParentPropertyAst extends PropertyContext<TreeParent> {
}
