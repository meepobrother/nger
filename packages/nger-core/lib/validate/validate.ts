import { makeDecorator, PropertyAst, PropertyContext } from 'ims-decorator';
export type ValidateFN<T = any> = (val: any, that: T) => {
    status: 0 | -1;
    message?: string;
};
export interface ValidateOptions<T = any> {
    validateFn: ValidateFN<T>;
}
export const ValidateMetadataKey = `ValidateMetadataKey`
export const Validate = (validateFn: ValidateFN) => {
    return makeDecorator<ValidateOptions>(ValidateMetadataKey)({
        validateFn
    })
};
export function isIsValidateAst(ast: PropertyAst): ast is PropertyAst<ValidateOptions> {
    return ast.metadataKey === ValidateMetadataKey
}
export class ValidatePropertyAst extends PropertyContext<ValidateOptions> { }
