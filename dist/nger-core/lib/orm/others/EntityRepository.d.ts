import { PropertyAst, PropertyContext } from 'ims-decorator';
export interface EntityRepositoryOptions {
    entity?: any;
}
export declare const EntityRepositoryMetadataKey = "EntityRepositoryMetadataKey";
export declare const EntityRepository: (entity?: any) => any;
export declare function isEntityRepositoryPropertyAst(val: PropertyAst): val is PropertyAst<EntityRepositoryOptions>;
export declare class EntityRepositoryPropertyAst extends PropertyContext<EntityRepositoryOptions> {
}
import { Repository } from 'typeorm';
export declare type EntityRepository<T> = Repository<T>;
