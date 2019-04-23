import { makeDecorator, PropertyAst, PropertyContext } from 'ims-decorator';
import { ColumnOptions } from 'typeorm'
export interface PrimaryGeneratedColumn extends ColumnOptions { }
export const PrimaryGeneratedColumnMetadataKey = 'PrimaryGeneratedColumnMetadataKey'
export const PrimaryGeneratedColumn = makeDecorator<PrimaryGeneratedColumn>(PrimaryGeneratedColumnMetadataKey);
export function isPrimaryGeneratedColumnPropertyAst(val: PropertyAst): val is PropertyAst<PrimaryGeneratedColumn> {
    return val.metadataKey === PrimaryGeneratedColumnMetadataKey;
}
export class PrimaryGeneratedColumnAst extends PropertyContext<PrimaryGeneratedColumn>{ }
