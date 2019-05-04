import { PropertyContext, PropertyAst } from 'ims-decorator';
export interface CheckOptions {
    expression: string;
}
export declare const CheckMetadataKey = "CheckMetadataKey";
export declare const Check: (expression: string) => any;
export declare class CheckPropertyAst extends PropertyContext<CheckOptions> {
}
export declare function isCheckPropertyAst(val: PropertyAst): val is PropertyAst<CheckOptions>;
