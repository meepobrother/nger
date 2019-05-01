import { makeDecorator,TypeDecorator, ConstructorContext, ConstructorAst } from 'ims-decorator';
export const SkipSelfMetadataKey = 'SkipSelfMetadataKey';
export interface SkipSelfOptions { }
export interface SkipSelfDecorator {
    (): TypeDecorator;
    new(): SkipSelfOptions;
}
export const SkipSelf: SkipSelfDecorator = makeDecorator<SkipSelfOptions>(SkipSelfMetadataKey);
export class SkipSelfConstructorAst extends ConstructorContext<SkipSelfOptions> { }
export function isSkipSelfConstructorAst(ast: ConstructorAst): ast is ConstructorAst<SkipSelfOptions> {
    return ast.metadataKey === SkipSelfMetadataKey;
}
