import { PropertyAst, PropertyContext } from 'ims-decorator';
import { ColumnOptions } from 'typeorm';
export interface CreateDateColumn extends ColumnOptions {
}
export declare const CreateDateColumnMetadataKey = "CreateDateColumnMetadataKey";
export declare const CreateDateColumn: {
    (opt?: CreateDateColumn): any;
    (opt?: CreateDateColumn): (target: any, propertyKey?: string | symbol, descriptor?: number | TypedPropertyDescriptor<any>) => any;
    new (opt?: CreateDateColumn): any;
};
export declare function isCreateDateColumnPropertyAst(val: PropertyAst): val is PropertyAst<CreateDateColumn>;
export declare class CreateDateColumnPropertyAst extends PropertyContext<CreateDateColumn> {
}
