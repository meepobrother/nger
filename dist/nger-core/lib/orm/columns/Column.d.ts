import { PropertyAst, PropertyContext } from 'ims-decorator';
import { ColumnOptions } from 'typeorm';
export declare type Column = ColumnOptions;
export declare const ColumnMetadataKey = "ColumnMetadataKey";
export declare const Column: {
    (opt?: ColumnOptions): any;
    (opt?: ColumnOptions): (target: any, propertyKey?: string | symbol, descriptor?: number | TypedPropertyDescriptor<any>) => any;
    new (opt?: ColumnOptions): any;
};
export declare function isColumnPropertyAst(val: PropertyAst): val is PropertyAst<Column>;
export declare class ColumnPropertyAst extends PropertyContext<Column> {
}
