import { PropertyContext, PropertyAst } from 'ims-decorator';
export declare const HostListenerMetadataKey = "HostListenerMetadataKey";
export interface HostListenerOptions {
    eventName?: string;
    args?: string[];
}
export declare const HostListener: (eventName?: string, args?: string[]) => any;
export declare class HostListenerPropertyAst extends PropertyContext<HostListenerOptions> {
}
export declare function isHostListenerPropertyAst(ast: PropertyAst): ast is PropertyAst<HostListenerOptions>;
