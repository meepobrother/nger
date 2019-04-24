import { makeDecorator, ClassContext, ClassAst } from 'ims-decorator';
export const ControllerMetadataKey = 'ControllerMetadataKey';
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
export function Controller(): any;
export function Controller(prefix: string): any;
export function Controller(options: ControllerOptions): any;
export function Controller(path?: string | ControllerOptions) {
    const decorator = makeDecorator<ControllerOptions>(ControllerMetadataKey)
    if (typeof path === 'string') {
        return decorator({
            path
        });
    } else {
        return decorator(path)
    }
}
export class ControllerClassAst extends ClassContext<ControllerOptions> {
    path: string;
    constructor(ast: any, context: any) {
        super(ast, context);
        let def = this.ast.metadataDef;
        def.path = def.path || `/${this.ast.target.name}`;
        if (def && def.path) {
            if (def.path.startsWith('/')) {
                if (def.path === '/') {
                    this.path = '';
                } else {
                    this.path = def.path;
                }
            } else {
                console.error(`controller path must start with '/'`)
            }
        }
    }
}
export function isControllerClassAst(ast: ClassAst): ast is ClassAst<ControllerOptions> {
    return ast.metadataKey === ControllerMetadataKey;
}
