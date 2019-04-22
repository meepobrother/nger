import { makeDecorator, ClassContext, ClassAst } from 'ims-decorator';
export const ControllerMetadataKey = 'ControllerMetadataKey';
export interface ControllerOptions {
    path: string;
};
export const Controller = makeDecorator<ControllerOptions>(ControllerMetadataKey);
export class ControllerClassAst extends ClassContext<ControllerOptions> { }
export function isControllerClassAst(ast: ClassAst): ast is ClassAst<ControllerOptions> {
    return ast.metadataKey === ControllerMetadataKey;
}
