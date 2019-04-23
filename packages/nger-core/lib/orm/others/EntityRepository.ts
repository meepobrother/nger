import { makeDecorator, ClassAst, PropertyContext } from 'ims-decorator';

export interface EntityRepositoryOptions {
    entity?: any;
};
export const EntityRepositoryMetadataKey = 'EntityRepositoryMetadataKey'
export const EntityRepository = (entity?: any) => makeDecorator<EntityRepositoryOptions>(EntityRepositoryMetadataKey)({
    entity
});
export function isEntityRepositoryPropertyAst(val: ClassAst): val is ClassAst<EntityRepositoryOptions> {
    return val.metadataKey === EntityRepositoryMetadataKey;
}
export class EntityRepositoryAst extends PropertyContext<EntityRepositoryOptions> { }
import { Repository } from 'typeorm';
export type EntityRepository<T> = Repository<T>;