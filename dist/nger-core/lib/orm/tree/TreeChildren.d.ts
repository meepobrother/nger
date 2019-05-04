import { PropertyContext, PropertyAst } from 'ims-decorator';
export interface TreeChildren {
    cascade?: boolean | ("insert" | "update" | "remove")[];
}
export declare const TreeChildrenMetadataKey = "TreeChildrenMetadataKey";
export declare const TreeChildren: {
    (opt?: TreeChildren): any;
    (opt?: TreeChildren): (target: any, propertyKey?: string | symbol, descriptor?: number | TypedPropertyDescriptor<any>) => any;
    new (opt?: TreeChildren): any;
};
export declare function isTreeChildrenPropertyAst(val: PropertyAst): val is PropertyAst<TreeChildren>;
export declare class TreeChildrenPropertyAst extends PropertyContext<TreeChildren> {
}
