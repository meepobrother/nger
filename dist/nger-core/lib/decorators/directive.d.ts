import { ClassContext, ClassAst } from 'ims-decorator';
export declare const DirectiveMetadataKey = "DirectiveMetadataKey";
import { Provider } from 'nger-di';
export interface DirectiveOptions {
    selector?: string;
    inputs?: string[];
    outputs?: string[];
    providers?: Provider[];
    exportAs?: string;
    queries?: {
        [key: string]: any;
    };
    host?: {
        [key: string]: string;
    };
    jit?: true;
}
export declare const Directive: {
    (opt?: DirectiveOptions): any;
    (opt?: DirectiveOptions): (target: any, propertyKey?: string | symbol, descriptor?: number | TypedPropertyDescriptor<any>) => any;
    new (opt?: DirectiveOptions): any;
};
export declare class DirectiveClassAst extends ClassContext<DirectiveOptions> {
}
export declare function isDirectiveClassAst(ast: ClassAst): ast is ClassAst<DirectiveOptions>;
