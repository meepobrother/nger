import { PropertyAst, PropertyContext } from 'ims-decorator';
import { ColumnOptions } from 'typeorm';
export interface UpdateDateColumn extends ColumnOptions {
}
export declare const UpdateDateColumnMetadataKey = "UpdateDateColumnMetadataKey";
export declare const UpdateDateColumn: {
    (opt?: UpdateDateColumn): any;
    (opt?: UpdateDateColumn): (target: any, propertyKey?: string | symbol, descriptor?: number | TypedPropertyDescriptor<any>) => any;
    new (opt?: UpdateDateColumn): any;
};
export declare function isUpdateDateColumnPropertyAst(val: PropertyAst): val is PropertyAst<UpdateDateColumn>;
export declare class UpdateDateColumnPropertyAst extends PropertyContext<UpdateDateColumn> {
}
