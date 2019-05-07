
// 权限
import { makeDecorator, MethodAst, MethodContext, PropertyAst, PropertyContext } from 'ims-decorator'
export const AccessMetadataKey = 'AccessMetadataKey';
export interface AccessOptions {
    title?: string;
    desc?: string;
}
export const Access = makeDecorator<AccessOptions>(AccessMetadataKey);
export function isAccessMethodAst(val: MethodAst): val is MethodAst<AccessOptions> {
    return val.metadataKey === AccessMetadataKey;
}
export class AccessMethodAst extends MethodContext<AccessOptions>{
    constructor(ast: any, context: any) {
        super(ast, context);
    }
}
export function isAccessPropertyAst(val: PropertyAst): val is PropertyAst<AccessOptions> {
    return val.metadataKey === AccessMetadataKey;
}
export class AccessPropertyAst extends PropertyContext<AccessOptions>{ }