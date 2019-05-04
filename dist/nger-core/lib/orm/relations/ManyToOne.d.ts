import { PropertyAst, PropertyContext } from 'ims-decorator';
import { ObjectType, RelationOptions } from 'typeorm';
export interface ManyToOne<T = any> {
    typeFunction: (type?: any) => ObjectType<T>;
    inverseSide?: string | ((object: T) => any);
    options?: RelationOptions;
}
export declare const ManyToOneMetadataKey = "ManyToOneMetadataKey";
export declare function ManyToOne<T>(typeFunction: (type?: any) => ObjectType<T>, options?: RelationOptions): Function;
export declare function ManyToOne<T>(typeFunction: (type?: any) => ObjectType<T>, inverseSide?: string | ((object: T) => any), options?: RelationOptions): Function;
export declare function isManyToOnePropertyAst(val: PropertyAst): val is PropertyAst<ManyToOne>;
export declare class ManyToOnePropertyAst extends PropertyContext<ManyToOne> {
}
