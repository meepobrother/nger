import { makeDecorator, PropertyAst, PropertyContext } from 'ims-decorator';
import { JoinColumnOptions } from 'typeorm'
export interface JoinColumn {
    options?: JoinColumnOptions | JoinColumnOptions[]
}
export const JoinColumnMetadataKey = 'JoinColumnMetadataKey';

export function JoinColumn(): Function;
export function JoinColumn(options: JoinColumnOptions): Function;
export function JoinColumn(options: JoinColumnOptions[]): Function;
export function JoinColumn(options?: any) {
    return makeDecorator<JoinColumn>(JoinColumnMetadataKey)({
        options
    })
}
export function isJoinColumnPropertyAst(val: PropertyAst): val is PropertyAst<JoinColumn> {
    return val.metadataKey === JoinColumnMetadataKey;
}
export class JoinColumnPropertyAst extends PropertyContext<JoinColumn>{ }
