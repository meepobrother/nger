import { makeDecorator, ConstructorContext, ConstructorAst } from 'ims-decorator';
export const SkipSelfMetadataKey = 'SkipSelfMetadataKey';
export interface SkipSelfOptions { }
export const SkipSelf = makeDecorator<SkipSelfOptions>(SkipSelfMetadataKey);
export class SkipSelfConstructorAst extends ConstructorContext<SkipSelfOptions> { }
export function isSkipSelfConstructorAst(ast: ConstructorAst): ast is ConstructorAst<SkipSelfOptions> {
    return ast.metadataKey === SkipSelfMetadataKey;
}
