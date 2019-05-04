import { ClassAst, ClassContext } from 'ims-decorator';
declare type TreeType = "adjacency-list" | "closure-table" | "nested-set" | "materialized-path";
export interface TreeOptions {
    type: TreeType;
}
export declare const TreeMetadataKey = "TreeMetadataKey";
export declare const Tree: (type: TreeType) => any;
export declare function isTreeClassAst(val: ClassAst): val is ClassAst<TreeOptions>;
export declare class TreeClassAst extends ClassContext<TreeOptions> {
}
export {};
