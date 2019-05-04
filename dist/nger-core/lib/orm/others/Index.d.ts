import { PropertyContext, PropertyAst } from 'ims-decorator';
export interface Index {
}
export declare const IndexMetadataKey = "IndexMetadataKey";
export declare const Index: {
    (opt?: Index): any;
    (opt?: Index): (target: any, propertyKey?: string | symbol, descriptor?: number | TypedPropertyDescriptor<any>) => any;
    new (opt?: Index): any;
};
export declare class IndexPropertyAst extends PropertyContext<Index> {
}
export declare function isIndexPropertyAst(val: PropertyAst): val is PropertyAst<Index>;
