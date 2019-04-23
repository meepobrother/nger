import { makeDecorator, ClassAst, ClassContext } from 'ims-decorator';
import { ColumnOptions } from 'typeorm'
export interface TableInheritance {
    pattern?: "STI";
    column?: string | ColumnOptions;
}
export const TableInheritanceMetadataKey = 'TableInheritanceMetadataKey'
export const TableInheritance = makeDecorator<TableInheritance>(TableInheritanceMetadataKey);
export function isTableInheritanceClassAst(val: ClassAst): val is ClassAst<TableInheritance> {
    return val.metadataKey === TableInheritanceMetadataKey;
}
export class TableInheritanceAst extends ClassContext<TableInheritance>{ }
