import { ClassContext, ClassAst } from 'ims-decorator';
export declare const ControllerMetadataKey = "ControllerMetadataKey";
export declare enum Scope {
    DEFAULT = 0,
    TRANSIENT = 1,
    REQUEST = 2
}
export interface ScopeOptions {
    scope?: Scope;
}
export interface ControllerOptions extends ScopeOptions {
    path?: string;
}
export declare function Controller(): any;
export declare function Controller(prefix: string): any;
export declare function Controller(options: ControllerOptions): any;
export declare class ControllerClassAst extends ClassContext<ControllerOptions> {
    path: string;
    constructor(ast: any, context: any);
}
export declare function isControllerClassAst(ast: ClassAst): ast is ClassAst<ControllerOptions>;
