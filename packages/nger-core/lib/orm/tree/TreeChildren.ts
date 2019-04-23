import { makeDecorator, PropertyContext, PropertyAst } from 'ims-decorator';
export interface TreeChildren {
    cascade?: boolean | ("insert" | "update" | "remove")[];
}
export const TreeChildrenMetadataKey = 'TreeChildrenMetadataKey'
export const TreeChildren = makeDecorator<TreeChildren>(TreeChildrenMetadataKey);
export function isTreeChildrenPropertyAst(val: PropertyAst): val is PropertyAst<TreeChildren> {
    return val.metadataKey === TreeChildrenMetadataKey;
}
export class TreeChildrenPropertyAst extends PropertyContext<TreeChildren>{ }
