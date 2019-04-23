import { makeDecorator, PropertyContext, PropertyAst } from 'ims-decorator';
import { ColumnOptions } from 'typeorm'
export interface ObjectIdColumn extends ColumnOptions { }
export const ObjectIdColumnMetadataKey = 'ObjectIdColumnMetadataKey'
export const ObjectIdColumn = makeDecorator<ObjectIdColumn>(ObjectIdColumnMetadataKey);
export function isObjectIdColumnPropertyAst(val: PropertyAst): val is PropertyAst<ObjectIdColumn> {
    return val.metadataKey === ObjectIdColumnMetadataKey;
}
export class ObjectIdColumnAst extends PropertyContext<ObjectIdColumn>{ }
