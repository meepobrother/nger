import { PropertyContext, PropertyAst } from 'ims-decorator';
import { ObjectType, RelationOptions } from 'typeorm';
export interface OneToMany<T = any> {
    typeFunction: (type?: any) => ObjectType<T>;
    inverseSide: string | ((object: T) => any);
    options?: RelationOptions;
}
export declare const OneToManyMetadataKey = "OneToManyMetadataKey";
export declare const OneToMany: <T>(typeFunction: (type?: any) => ObjectType<T>, inverseSide: string | ((object: T) => any), options?: RelationOptions) => any;
export declare function isOneToManyPropertyAst(val: PropertyAst): val is PropertyAst<OneToMany>;
export declare class OneToManyPropertyAst extends PropertyContext<OneToMany> {
}
