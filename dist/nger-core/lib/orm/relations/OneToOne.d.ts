import { PropertyAst, PropertyContext } from 'ims-decorator';
import { ObjectType, RelationOptions } from 'typeorm';
export interface OneToOne<T = any> {
    typeFunction: (type?: any) => ObjectType<T>;
    inverseSide?: string | ((object: T) => any);
    options?: RelationOptions;
}
export declare const OneToOneMetadataKey = "OneToOneMetadataKey";
export declare function OneToOne<T>(typeFunction: (type?: any) => ObjectType<T>, options?: RelationOptions): Function;
export declare function OneToOne<T>(typeFunction: (type?: any) => ObjectType<T>, inverseSide?: string | ((object: T) => any), options?: RelationOptions): Function;
export declare function isOneToOnePropertyAst(val: PropertyAst): val is PropertyAst<OneToOne>;
export declare class OneToOnePropertyAst extends PropertyContext<OneToOne> {
}
