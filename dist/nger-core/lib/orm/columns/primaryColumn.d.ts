import { PropertyAst, PropertyContext } from 'ims-decorator';
import { ColumnOptions } from 'typeorm';
export interface PrimaryColumn extends ColumnOptions {
}
export declare const PrimaryColumnMetadataKey = "PrimaryColumnMetadataKey";
export declare const PrimaryColumn: {
    (opt?: PrimaryColumn): any;
    (opt?: PrimaryColumn): (target: any, propertyKey?: string | symbol, descriptor?: number | TypedPropertyDescriptor<any>) => any;
    new (opt?: PrimaryColumn): any;
};
export declare function isPrimaryColumnPropertyAst(val: PropertyAst): val is PropertyAst<PrimaryColumn>;
export declare class PrimaryColumnPropertyAst extends PropertyContext<PrimaryColumn> {
}
