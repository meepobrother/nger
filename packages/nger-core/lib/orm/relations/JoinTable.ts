import { makeDecorator, PropertyAst, PropertyContext } from 'ims-decorator';
import { JoinTableOptions, JoinColumnOptions } from 'typeorm'
export interface JoinTable {
    options?: JoinTableOptions | JoinTableMultipleColumnsOptions
}
export const JoinTableMetadataKey = 'JoinTableMetadataKey'
export interface JoinTableMultipleColumnsOptions {
    name?: string;
    joinColumns?: JoinColumnOptions[];
    inverseJoinColumns?: JoinColumnOptions[];
    database?: string;
    schema?: string;
}
export function JoinTable(): Function;
export function JoinTable(options: JoinTableOptions): Function;
export function JoinTable(options: JoinTableMultipleColumnsOptions): Function;
export function JoinTable(options?: any) {
    return makeDecorator<JoinTable>(JoinTableMetadataKey)({ options });
}
export function isJoinTablePropertyAst(val: PropertyAst): val is PropertyAst<JoinTable> {
    return val.metadataKey === JoinTableMetadataKey;
}
export class JoinTableAst extends PropertyContext<JoinTable>{ }
