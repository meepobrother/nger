import { makeDecorator, ConstructorContext, ConstructorAst } from 'ims-decorator';
export const OptionalMetadataKey = 'OptionalMetadataKey';
export interface OptionalOptions { }
export const Optional = makeDecorator<OptionalOptions>(OptionalMetadataKey);
export class OptionalConstructorAst extends ConstructorContext<OptionalOptions> { }
export function isOptionalConstructorAst(ast: ConstructorAst): ast is ConstructorAst<OptionalOptions> {
    return ast.metadataKey === OptionalMetadataKey;
}
