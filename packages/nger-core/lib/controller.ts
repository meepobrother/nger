import { makeDecorator, ClassContext, ClassAst } from 'ims-decorator';
export const ControllerMetadataKey = 'ControllerMetadataKey';
export interface ControllerOptions {
    path: string;
};
export const Controller = makeDecorator<ControllerOptions>(ControllerMetadataKey);
export class ControllerClassAst extends ClassContext<ControllerOptions> {
    path: string;
    constructor(ast: any, context: any) {
        super(ast, context);
        const def = this.ast.metadataDef;
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
export function isControllerClassAst(ast: ClassAst): ast is ClassAst<ControllerOptions> {
    return ast.metadataKey === ControllerMetadataKey;
}
