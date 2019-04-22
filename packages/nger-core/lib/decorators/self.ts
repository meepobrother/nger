import { makeDecorator, ConstructorContext, ConstructorAst } from 'ims-decorator';
export const SelfMetadataKey = 'SelfMetadataKey';
export interface SelfOptions { }
export const Self = makeDecorator<SelfOptions>(SelfMetadataKey);
export class SelfConstructorAst extends ConstructorContext<SelfOptions> { }
export function isSelfConstructorAst(ast: ConstructorAst): ast is ConstructorAst<SelfOptions> {
    return ast.metadataKey === SelfMetadataKey;
}
