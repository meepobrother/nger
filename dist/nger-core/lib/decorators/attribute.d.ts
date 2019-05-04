import { ConstructorContext, ConstructorAst } from 'ims-decorator';
export declare const AttributeMetadataKey = "AttributeMetadataKey";
export interface AttributeOptions {
    attributeName?: string;
}
export declare const Attribute: (name: string) => any;
export declare class AttributeConstructorAst extends ConstructorContext<AttributeOptions> {
}
export declare function isAttributeConstructorAst(ast: ConstructorAst): ast is ConstructorAst<AttributeOptions>;
