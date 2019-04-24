import { makeDecorator, ClassAst, PropertyContext, PropertyAst } from 'ims-decorator';
export const ViewChildrenMetadataKey = 'ViewChildrenMetadataKey';
import { Type } from './types'
export interface ViewChildrenOptions {
    selector: Type<any> | Function | string,
    opts?: {
        read?: any;
    }
}
export const ViewChildren = (
    selector: Type<any> | Function | string,
    opts?: {
        read?: any;
    }
) => {
    return makeDecorator<ViewChildrenOptions>(ViewChildrenMetadataKey)({
        selector, opts
    });
}
export class ViewChildrenPropertyAst extends PropertyContext<ViewChildrenOptions> { }
export function isViewChildrenPropertyAst(ast: PropertyAst): ast is PropertyAst<ViewChildrenOptions> {
    return ast.metadataKey === ViewChildrenMetadataKey;
}
