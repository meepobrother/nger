import {
    makeDecorator, MethodAst, MethodContext
} from 'ims-decorator';
export const ItMetadataKey = 'ItMetadataKey';
import { expect } from 'chai';
export type ItTopic = string;
export interface ItHandler {
    (_expect: typeof expect, that: any): any;
}
export interface ItOptions {
    topic: ItTopic;
    handler: ItHandler;
}
export const It = (
    topic: ItTopic,
    handler: ItHandler
) => {
    return makeDecorator<ItOptions>(ItMetadataKey)({
        topic, handler
    })
}
export function isItMethodAst(ast: MethodAst): ast is MethodAst<ItOptions> {
    return ast.metadataKey === ItMetadataKey;
}
export class ItMethodAst extends MethodContext<ItOptions> { }
