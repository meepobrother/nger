import { PropertyAst, PropertyContext } from 'ims-decorator';
import { ColumnOptions } from 'typeorm';
export interface VersionColumn extends ColumnOptions {
}
export declare const VersionColumnMetadataKey = "VersionColumnMetadataKey";
export declare const VersionColumn: {
    (opt?: VersionColumn): any;
    (opt?: VersionColumn): (target: any, propertyKey?: string | symbol, descriptor?: number | TypedPropertyDescriptor<any>) => any;
    new (opt?: VersionColumn): any;
};
export declare function isVersionColumnPropertyAst(val: PropertyAst): val is PropertyAst<VersionColumn>;
export declare class VersionColumnPropertyAst extends PropertyContext<VersionColumn> {
}
