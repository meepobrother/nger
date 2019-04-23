import { makeDecorator, PropertyAst, PropertyContext } from 'ims-decorator';
import { SelectQueryBuilder } from 'typeorm'
export interface RelationCount<T = any> {
    relation: string | ((object: T) => any),
    alias?: string,
    queryBuilderFactory?: (qb: SelectQueryBuilder<any>) => SelectQueryBuilder<any>
}
export const RelationCountMetadataKey = 'RelationCountMetadataKey'
export const RelationCount = <T>(
    relation: string | ((object: T) => any),
    alias?: string,
    queryBuilderFactory?: (qb: SelectQueryBuilder<any>) => SelectQueryBuilder<any>
) => makeDecorator<RelationCount>(RelationCountMetadataKey)({
    relation, alias, queryBuilderFactory
});
export function isRelationCountPropertyAst(val: PropertyAst): val is PropertyAst<RelationCount> {
    return val.metadataKey === RelationCountMetadataKey;
}
export class RelationCountPropertyAst extends PropertyContext<RelationCount>{ }
