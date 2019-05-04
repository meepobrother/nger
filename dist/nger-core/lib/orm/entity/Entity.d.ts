import { ClassAst, ClassContext } from 'ims-decorator';
import { EntityOptions } from 'typeorm';
export interface Entity extends EntityOptions {
    /** 简介 */
    desc?: string;
}
export declare const EntityMetadataKey = "EntityMetadataKey";
export declare const Entity: {
    (opt?: Entity): any;
    (opt?: Entity): (target: any, propertyKey?: string | symbol, descriptor?: number | TypedPropertyDescriptor<any>) => any;
    new (opt?: Entity): any;
};
export declare function isEntityClassAst(val: ClassAst): val is ClassAst<Entity>;
export declare class EntityClassAst extends ClassContext<Entity> {
}
