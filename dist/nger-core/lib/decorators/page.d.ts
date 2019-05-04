import { ClassContext, ClassAst } from 'ims-decorator';
export declare const PageMetadataKey = "PageMetadataKey";
import { ComponentOptions } from './component';
export interface PageOptions extends ComponentOptions {
    path: string;
    title?: string;
}
export declare const Page: {
    (opt?: PageOptions): any;
    (opt?: PageOptions): (target: any, propertyKey?: string | symbol, descriptor?: number | TypedPropertyDescriptor<any>) => any;
    new (opt?: PageOptions): any;
};
export declare class PageClassAst extends ClassContext<PageOptions> {
    path: string;
    constructor(ast: any, context: any);
}
export declare function isPageClassAst(ast: ClassAst): ast is ClassAst<PageOptions>;
