import { makeDecorator, PropertyContext, PropertyAst } from 'ims-decorator';
import { SelectQueryBuilder } from 'typeorm'
export interface RelationId<T = any> {
    relation: string | ((object: T) => any),
    alias?: string,
    queryBuilderFactory?: (qb: SelectQueryBuilder<any>) => SelectQueryBuilder<any>
}
export const RelationIdMetadataKey = 'RelationIdMetadataKey'
export const RelationId = <T>(
    relation: string | ((object: T) => any),
    alias?: string,
    queryBuilderFactory?: (qb: SelectQueryBuilder<any>) => SelectQueryBuilder<any>
) => makeDecorator<RelationId>(RelationIdMetadataKey)({
    relation,
    alias,
    queryBuilderFactory
});
export function isRelationIdPropertyAst(val: PropertyAst): val is PropertyAst<RelationId> {
    return val.metadataKey === RelationIdMetadataKey;
}
export class RelationIdAst extends PropertyContext<RelationId>{ }
