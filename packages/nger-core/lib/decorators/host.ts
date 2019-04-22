import { makeDecorator, ConstructorContext, ConstructorAst } from 'ims-decorator';
export const HostMetadataKey = 'HostMetadataKey';
export interface HostOptions { }
export const Host = makeDecorator<HostOptions>(HostMetadataKey);
export class HostConstructorAst extends ConstructorContext<HostOptions> { }
export function isHostConstructorAst(ast: ConstructorAst): ast is ConstructorAst<HostOptions> {
    return ast.metadataKey === HostMetadataKey;
}
