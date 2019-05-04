import { PropertyContext, PropertyAst } from "ims-decorator";
export declare const OptionMetadataKey = "OptionMetadataKey";
import { Options } from 'yargs';
export interface OptionOptions extends Options {
}
export declare const Option: {
    (opt?: OptionOptions): any;
    (opt?: OptionOptions): (target: any, propertyKey?: string | symbol, descriptor?: number | TypedPropertyDescriptor<any>) => any;
    new (opt?: OptionOptions): any;
};
export interface Option<O, R> {
}
export declare function isOptionPropertyAst(ast: PropertyAst): ast is PropertyAst<OptionOptions>;
export declare class OptionPropertyAst extends PropertyContext<OptionOptions> {
}
