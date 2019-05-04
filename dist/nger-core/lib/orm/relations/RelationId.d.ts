import { PropertyContext, PropertyAst } from 'ims-decorator';
import { SelectQueryBuilder } from 'typeorm';
export interface RelationId<T = any> {
    relation: string | ((object: T) => any);
    alias?: string;
    queryBuilderFactory?: (qb: SelectQueryBuilder<any>) => SelectQueryBuilder<any>;
}
export declare const RelationIdMetadataKey = "RelationIdMetadataKey";
export declare const RelationId: <T>(relation: string | ((object: T) => any), alias?: string, queryBuilderFactory?: (qb: SelectQueryBuilder<any>) => SelectQueryBuilder<any>) => any;
export declare function isRelationIdPropertyAst(val: PropertyAst): val is PropertyAst<RelationId>;
export declare class RelationIdPropertyAst extends PropertyContext<RelationId> {
}
