import { PropertyAst, PropertyContext } from 'ims-decorator';
import { JoinTableOptions, JoinColumnOptions } from 'typeorm';
export interface JoinTable {
    options?: JoinTableOptions | JoinTableMultipleColumnsOptions;
}
export declare const JoinTableMetadataKey = "JoinTableMetadataKey";
export interface JoinTableMultipleColumnsOptions {
    name?: string;
    joinColumns?: JoinColumnOptions[];
    inverseJoinColumns?: JoinColumnOptions[];
    database?: string;
    schema?: string;
}
export declare function JoinTable(): Function;
export declare function JoinTable(options: JoinTableOptions): Function;
export declare function JoinTable(options: JoinTableMultipleColumnsOptions): Function;
export declare function isJoinTablePropertyAst(val: PropertyAst): val is PropertyAst<JoinTable>;
export declare class JoinTablePropertyAst extends PropertyContext<JoinTable> {
}
