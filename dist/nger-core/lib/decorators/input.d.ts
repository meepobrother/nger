import { PropertyContext, PropertyAst } from 'ims-decorator';
export declare const InputMetadataKey = "InputMetadataKey";
export interface InputOptions {
    bindingPropertyName?: string;
}
export declare const Input: (bindingPropertyName?: string) => any;
export declare class InputPropertyAst extends PropertyContext<InputOptions> {
}
export declare function isInputPropertyAst(ast: PropertyAst): ast is PropertyAst<InputOptions>;
