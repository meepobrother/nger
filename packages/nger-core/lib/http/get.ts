import { makeDecorator, MethodAst, MethodContext, PropertyAst, PropertyContext } from 'ims-decorator'
export const GetMetadataKey = 'GetMetadataKey';
export interface GetOptions { }
export const Get = makeDecorator<GetOptions>(GetMetadataKey);

export function isGetMethodAst(val: MethodAst): val is MethodAst<GetOptions> {
    return val.metadataKey === GetMetadataKey;
}
export class GetMethodAst extends MethodContext<GetOptions>{ }

export function isGetPropertyAst(val: PropertyAst): val is PropertyAst<GetOptions> {
    return val.metadataKey === GetMetadataKey;
}
export class GetPropertyAst extends PropertyContext<GetOptions>{ }