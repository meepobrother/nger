import { makeDecorator, ClassAst, PropertyContext, PropertyAst } from 'ims-decorator';
export const ContentChildrenMetadataKey = 'ContentChildrenMetadataKey';
import { Type } from './types'
export interface ContentChildrenOptions {
    selector: Type<any> | Function | string,
    opts?: {
        descendants?: boolean;
        read?: any;
    }
}
export const ContentChildren = (
    selector: Type<any> | Function | string,
    opts?: {
        descendants?: boolean;
        read?: any;
    }
) => {
    return makeDecorator<ContentChildrenOptions>(ContentChildrenMetadataKey)({
        selector, opts
    });
}
export class ContentChildrenPropertyAst extends PropertyContext<ContentChildrenOptions> { }
export function isContentChildrenPropertyAst(ast: PropertyAst): ast is PropertyAst<ContentChildrenOptions> {
    return ast.metadataKey === ContentChildrenMetadataKey;
}

