import { makeDecorator, PropertyAst, PropertyContext } from 'ims-decorator';
import { ColumnOptions } from 'typeorm'
export interface CreateDateColumn extends ColumnOptions { }
export const CreateDateColumnMetadataKey = 'CreateDateColumnMetadataKey'
export const CreateDateColumn = makeDecorator<CreateDateColumn>(CreateDateColumnMetadataKey);
export function isCreateDateColumnPropertyAst(val: PropertyAst): val is PropertyAst<CreateDateColumn> {
    return val.metadataKey === CreateDateColumnMetadataKey;
}
export class CreateDateColumnAst extends PropertyContext<CreateDateColumn>{ }
