import { PropertyContext, PropertyAst } from 'ims-decorator';
export interface Unique {
    name?: string;
    fields?: string[] | Fields;
}
declare type Fields = (object?: any) => (any[] | {
    [key: string]: number;
});
export declare const UniqueMetadataKey = "UniqueMetadataKey";
export declare function Unique(name: string, fields: string[]): any;
export declare function Unique(fields: string[]): any;
export declare function Unique(fields: Fields): any;
export declare function Unique(name: string, fields: Fields): any;
export declare class UniquePropertyAst extends PropertyContext<Unique> {
}
export declare function isUniquePropertyAst(val: PropertyAst): val is PropertyAst<Unique>;
export {};
