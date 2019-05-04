import { PropertyContext, PropertyAst } from 'ims-decorator';
import { ColumnOptions } from 'typeorm';
export interface ObjectIdColumn extends ColumnOptions {
}
export declare const ObjectIdColumnMetadataKey = "ObjectIdColumnMetadataKey";
export declare const ObjectIdColumn: {
    (opt?: ObjectIdColumn): any;
    (opt?: ObjectIdColumn): (target: any, propertyKey?: string | symbol, descriptor?: number | TypedPropertyDescriptor<any>) => any;
    new (opt?: ObjectIdColumn): any;
};
export declare function isObjectIdColumnPropertyAst(val: PropertyAst): val is PropertyAst<ObjectIdColumn>;
export declare class ObjectIdColumnPropertyAst extends PropertyContext<ObjectIdColumn> {
}
