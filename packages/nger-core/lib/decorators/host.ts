import { makeDecorator,TypeDecorator, ConstructorContext, ConstructorAst } from 'ims-decorator';
export const HostMetadataKey = 'HostMetadataKey';
export interface HostOptions { }
export interface HostDecorator {
    (): TypeDecorator;
    new(): HostOptions;
}
export const Host: HostDecorator = makeDecorator<HostOptions>(HostMetadataKey);
export class HostConstructorAst extends ConstructorContext<HostOptions> { }
export function isHostConstructorAst(ast: ConstructorAst): ast is ConstructorAst<HostOptions> {
    return ast.metadataKey === HostMetadataKey;
}
