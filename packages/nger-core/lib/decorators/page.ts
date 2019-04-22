import { makeDecorator, ClassContext, ClassAst } from 'ims-decorator';
export const PageMetadataKey = 'PageMetadataKey';
import { ComponentOptions } from './component'
export interface PageOptions extends ComponentOptions {
    /** 路由 */
    path: string;
}
export const Page = makeDecorator<PageOptions>(PageMetadataKey);
export class PageClassAst extends ClassContext<PageOptions> {
    path: string;
    constructor(ast: any, context: any) {
        super(ast, context)
        const def = this.ast.metadataDef;
        this.path = def.path;
    }
}
export function isPageClassAst(ast: ClassAst): ast is ClassAst<PageOptions> {
    return ast.metadataKey === PageMetadataKey;
}
