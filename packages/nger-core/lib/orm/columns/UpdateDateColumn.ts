import { makeDecorator, PropertyAst, PropertyContext } from 'ims-decorator';
import { ColumnOptions } from 'typeorm'
export interface UpdateDateColumn extends ColumnOptions { }
export const UpdateDateColumnMetadataKey = 'UpdateDateColumnMetadataKey'
export const UpdateDateColumn = makeDecorator<UpdateDateColumn>(UpdateDateColumnMetadataKey);
export function isUpdateDateColumnPropertyAst(val: PropertyAst): val is PropertyAst<UpdateDateColumn> {
    return val.metadataKey === UpdateDateColumnMetadataKey;
}
export class UpdateDateColumnAst extends PropertyContext<UpdateDateColumn>{ }
