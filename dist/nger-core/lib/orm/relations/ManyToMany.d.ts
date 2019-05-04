import { PropertyAst, PropertyContext } from 'ims-decorator';
import { ObjectType, RelationOptions } from 'typeorm';
export interface ManyToMany<T = any> {
    typeFunction: (type?: any) => ObjectType<T>;
    options: RelationOptions;
    inverseSide?: string | ((object: T) => any);
}
export declare const ManyToManyMetadataKey = "ManyToManyMetadataKey";
export declare function ManyToMany<T>(typeFunction: (type?: any) => ObjectType<T>, options?: RelationOptions): Function;
export declare function ManyToMany<T>(typeFunction: (type?: any) => ObjectType<T>, inverseSide?: string | ((object: T) => any), options?: RelationOptions): Function;
export declare function isManyToManyPropertyAst(val: PropertyAst): val is PropertyAst<ManyToMany>;
export declare class ManyToManyPropertyAst extends PropertyContext<ManyToMany> {
}
