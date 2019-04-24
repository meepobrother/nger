import { makeDecorator, ClassAst, PropertyContext, PropertyAst } from 'ims-decorator';
export const ContentChildMetadataKey = 'ContentChildMetadataKey';
import { Type } from './types'
export interface ContentChildOptions {
    selector: Type<any> | Function | string,
    opts?: {
        read?: any;
    }
}
export const ContentChild = (
    selector: Type<any> | Function | string,
    opts?: {
        read?: any;
    }
) => {
    return makeDecorator<ContentChildOptions>(ContentChildMetadataKey)({
        selector, opts
    });
}
export class ContentChildPropertyAst extends PropertyContext<ContentChildOptions> { }
export function isContentChildPropertyAst(ast: PropertyAst): ast is PropertyAst<ContentChildOptions> {
    return ast.metadataKey === ContentChildMetadataKey;
}

