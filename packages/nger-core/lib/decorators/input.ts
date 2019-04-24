import { makeDecorator, PropertyContext, PropertyAst } from 'ims-decorator';
export const InputMetadataKey = 'InputMetadataKey';

export interface InputOptions {
    bindingPropertyName?: string;
}
export const Input = (bindingPropertyName?: string) => makeDecorator<InputOptions>(InputMetadataKey)({
    bindingPropertyName
});
export class InputPropertyAst extends PropertyContext<InputOptions> { }
export function isInputPropertyAst(ast: PropertyAst): ast is PropertyAst<InputOptions> {
    return ast.metadataKey === InputMetadataKey;
}
