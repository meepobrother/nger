import { MethodAst, MethodContext } from 'ims-decorator';
export declare const ItMetadataKey = "ItMetadataKey";
import { expect } from 'chai';
export declare type ItTopic = string;
export interface ItHandler {
    (_expect: typeof expect, that: any): any;
}
export interface ItOptions {
    topic: ItTopic;
    handler: ItHandler;
}
export declare const It: (topic: string, handler: ItHandler) => any;
export declare function isItMethodAst(ast: MethodAst): ast is MethodAst<ItOptions>;
export declare class ItMethodAst extends MethodContext<ItOptions> {
}
