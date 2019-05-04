import { PropertyAst, PropertyContext } from 'ims-decorator';
export interface PrimaryGeneratedColumnUUIDOptions {
    name?: string;
    comment?: string;
}
export declare type PrimaryGeneratedColumnType = "int" | "int2" | "int4" | "int8" | "integer" | "tinyint" | "smallint" | "mediumint" | "bigint" | "dec" | "decimal" | "fixed" | "numeric" | "number";
export interface PrimaryGeneratedColumnNumericOptions {
    type?: PrimaryGeneratedColumnType;
    name?: string;
    comment?: string;
    zerofill?: boolean;
    unsigned?: boolean;
}
export interface PrimaryGeneratedColumn {
    strategy?: 'increment' | 'uuid' | 'rowid';
    options?: PrimaryGeneratedColumnNumericOptions | PrimaryGeneratedColumnUUIDOptions;
}
export declare const PrimaryGeneratedColumnMetadataKey = "PrimaryGeneratedColumnMetadataKey";
export declare function PrimaryGeneratedColumn(): Function;
export declare function PrimaryGeneratedColumn(options: PrimaryGeneratedColumnNumericOptions): Function;
export declare function PrimaryGeneratedColumn(strategy: "increment", options?: PrimaryGeneratedColumnNumericOptions): Function;
export declare function PrimaryGeneratedColumn(strategy: "uuid", options?: PrimaryGeneratedColumnUUIDOptions): Function;
export declare function PrimaryGeneratedColumn(strategy: "rowid", options?: PrimaryGeneratedColumnUUIDOptions): Function;
export declare function isPrimaryGeneratedColumnPropertyAst(val: PropertyAst): val is PropertyAst<PrimaryGeneratedColumn>;
export declare class PrimaryGeneratedColumnPropertyAst extends PropertyContext<PrimaryGeneratedColumn> {
}
