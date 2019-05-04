import { PropertyAst, PropertyContext } from 'ims-decorator';
import { SelectQueryBuilder } from 'typeorm';
export interface RelationCount<T = any> {
    relation: string | ((object: T) => any);
    alias?: string;
    queryBuilderFactory?: (qb: SelectQueryBuilder<any>) => SelectQueryBuilder<any>;
}
export declare const RelationCountMetadataKey = "RelationCountMetadataKey";
export declare const RelationCount: <T>(relation: string | ((object: T) => any), alias?: string, queryBuilderFactory?: (qb: SelectQueryBuilder<any>) => SelectQueryBuilder<any>) => any;
export declare function isRelationCountPropertyAst(val: PropertyAst): val is PropertyAst<RelationCount>;
export declare class RelationCountPropertyAst extends PropertyContext<RelationCount> {
}
