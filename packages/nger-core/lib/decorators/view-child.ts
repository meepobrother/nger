import { makeDecorator, ClassAst, PropertyContext, PropertyAst } from 'ims-decorator';
export const ViewChildMetadataKey = 'ViewChildMetadataKey';
import { Type } from './types'
export interface ViewChildOptions {
    selector: Type<any> | Function | string,
    opts?: {
        read?: any;
    }
}
export const ViewChild = (
    selector: Type<any> | Function | string,
    opts?: {
        read?: any;
    }
) => {
    return makeDecorator<ViewChildOptions>(ViewChildMetadataKey)({
        selector, opts
    });
}
export class ViewChildPropertyAst extends PropertyContext<ViewChildOptions> { }
export function isViewChildPropertyAst(ast: PropertyAst): ast is PropertyAst<ViewChildOptions> {
    return ast.metadataKey === ViewChildMetadataKey;
}

