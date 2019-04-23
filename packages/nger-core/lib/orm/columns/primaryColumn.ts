import { makeDecorator, PropertyAst, PropertyContext } from 'ims-decorator';
import { ColumnOptions } from 'typeorm'
export interface PrimaryColumn extends ColumnOptions{ }
export const PrimaryColumnMetadataKey = 'PrimaryColumnMetadataKey'
export const PrimaryColumn = makeDecorator<PrimaryColumn>(PrimaryColumnMetadataKey);
export function isPrimaryColumnPropertyAst(val: PropertyAst): val is PropertyAst<PrimaryColumn> {
    return val.metadataKey === PrimaryColumnMetadataKey;
}
export class PrimaryColumnPropertyAst extends PropertyContext<PrimaryColumn>{ }
