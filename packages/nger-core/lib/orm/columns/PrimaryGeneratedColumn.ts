import { makeDecorator, PropertyAst, PropertyContext } from 'ims-decorator';
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
    strategy?: 'increment' | 'uuid' | 'rowid',
    options?: PrimaryGeneratedColumnNumericOptions | PrimaryGeneratedColumnUUIDOptions;
}
export const PrimaryGeneratedColumnMetadataKey = 'PrimaryGeneratedColumnMetadataKey'
export function PrimaryGeneratedColumn(): Function;
export function PrimaryGeneratedColumn(options: PrimaryGeneratedColumnNumericOptions): Function;
export function PrimaryGeneratedColumn(strategy: "increment", options?: PrimaryGeneratedColumnNumericOptions): Function;
export function PrimaryGeneratedColumn(strategy: "uuid", options?: PrimaryGeneratedColumnUUIDOptions): Function;
export function PrimaryGeneratedColumn(strategy: "rowid", options?: PrimaryGeneratedColumnUUIDOptions): Function;
export function PrimaryGeneratedColumn(strategy?: any, options?: any) {
    const decorator = makeDecorator<PrimaryGeneratedColumn>(PrimaryGeneratedColumnMetadataKey);
    return decorator({
        strategy,
        options
    });
}
export function isPrimaryGeneratedColumnPropertyAst(val: PropertyAst): val is PropertyAst<PrimaryGeneratedColumn> {
    return val.metadataKey === PrimaryGeneratedColumnMetadataKey;
}
export class PrimaryGeneratedColumnPropertyAst extends PropertyContext<PrimaryGeneratedColumn>{ }
