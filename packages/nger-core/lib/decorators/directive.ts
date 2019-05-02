import { makeDecorator, ClassContext, ClassAst } from 'ims-decorator';
export const DirectiveMetadataKey = 'DirectiveMetadataKey';
import { Provider } from 'nger-di'

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
export const Directive = makeDecorator<DirectiveOptions>(DirectiveMetadataKey);
export class DirectiveClassAst extends ClassContext<DirectiveOptions> { }
export function isDirectiveClassAst(ast: ClassAst): ast is ClassAst<DirectiveOptions> {
    return ast.metadataKey === DirectiveMetadataKey;
}
