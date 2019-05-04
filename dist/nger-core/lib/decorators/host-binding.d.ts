import { PropertyContext, PropertyAst } from 'ims-decorator';
export declare const HostBindingMetadataKey = "HostBindingMetadataKey";
export interface HostBindingOptions {
    hostPropertyName?: string;
}
export declare const HostBinding: (hostPropertyName?: string) => any;
export declare class HostBindingPropertyAst extends PropertyContext<HostBindingOptions> {
}
export declare function isHostBindingPropertyAst(ast: PropertyAst): ast is PropertyAst<HostBindingOptions>;
