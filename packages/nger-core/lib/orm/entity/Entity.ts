import { makeDecorator, ClassAst, ClassContext } from 'ims-decorator';
import { EntityOptions } from 'typeorm';
export interface Entity extends EntityOptions {
    /** 简介 */
    desc?: string;
}
export const EntityMetadataKey = 'EntityMetadataKey'
export const Entity = makeDecorator<Entity>(EntityMetadataKey);
export function isEntityClassAst(val: ClassAst): val is ClassAst<Entity> {
    return val.metadataKey === EntityMetadataKey;
}
export class EntityAst extends ClassContext<Entity>{ }
