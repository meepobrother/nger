import { makeDecorator, ConstructorContext, ConstructorAst } from 'ims-decorator';
export const AttributeMetadataKey = 'AttributeMetadataKey';
export interface AttributeOptions {
    attributeName?: string;
}
export const Attribute = (name: string) => makeDecorator<AttributeOptions>(AttributeMetadataKey)({
    attributeName: name
});
export class AttributeConstructorAst extends ConstructorContext<AttributeOptions> { }
export function isAttributeConstructorAst(ast: ConstructorAst): ast is ConstructorAst<AttributeOptions> {
    return ast.metadataKey === AttributeMetadataKey;
}
