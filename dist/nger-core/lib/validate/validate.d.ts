import { PropertyAst, PropertyContext } from 'ims-decorator';
export declare type ValidateFN<T = any> = (val: any, that: T) => {
    status: 0 | -1;
    message?: string;
};
export interface ValidateOptions<T = any> {
    validateFn: ValidateFN<T>;
}
export declare const ValidateMetadataKey = "ValidateMetadataKey";
export declare const Validate: (validateFn: ValidateFN<any>) => any;
export declare function isIsValidateAst(ast: PropertyAst): ast is PropertyAst<ValidateOptions>;
export declare class ValidatePropertyAst extends PropertyContext<ValidateOptions> {
}
