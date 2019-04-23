import { makeDecorator, ClassAst, ClassContext } from 'ims-decorator';
type TreeType = "adjacency-list" | "closure-table" | "nested-set" | "materialized-path";
export interface TreeOptions {
    type: TreeType
}
export const TreeMetadataKey = 'TreeMetadataKey'
export const Tree = (type: TreeType) => makeDecorator<TreeOptions>(TreeMetadataKey)({
    type
});
export function isTreeClassAst(val: ClassAst): val is ClassAst<TreeOptions> {
    return val.metadataKey === TreeMetadataKey;
}
export class TreeAst extends ClassContext<TreeOptions>{ }
