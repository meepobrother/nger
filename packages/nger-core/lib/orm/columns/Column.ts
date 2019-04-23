import { makeDecorator, PropertyAst, PropertyContext } from 'ims-decorator';
import { ColumnOptions } from 'typeorm'
export type Column = ColumnOptions
export const ColumnMetadataKey = 'ColumnMetadataKey'
export const Column = makeDecorator<Column>(ColumnMetadataKey);
export function isColumnPropertyAst(val: PropertyAst): val is PropertyAst<Column> {
    return val.metadataKey === ColumnMetadataKey;
}
export class ColumnPropertyAst extends PropertyContext<Column>{ }
