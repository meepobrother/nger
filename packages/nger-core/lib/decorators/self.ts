import { makeDecorator,TypeDecorator, ConstructorContext, ConstructorAst } from 'ims-decorator';
export const SelfMetadataKey = 'SelfMetadataKey';
export interface SelfOptions { }
export interface SelfDecorator {
    (): TypeDecorator;
    new(): SelfOptions;
}
export const Self: SelfDecorator = makeDecorator<SelfOptions>(SelfMetadataKey);
export class SelfConstructorAst extends ConstructorContext<SelfOptions> { }
export function isSelfConstructorAst(ast: ConstructorAst): ast is ConstructorAst<SelfOptions> {
    return ast.metadataKey === SelfMetadataKey;
}
