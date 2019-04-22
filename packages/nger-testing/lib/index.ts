import {
    makeDecorator, Visitors, NullAstVisitor, MethodAst,
    ParserAstContext, MethodContext, ClassContext, ClassAst
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
export function isItClassAst(ast: ClassAst): ast is ClassAst<ItOptions> {
    return ast.metadataKey === ItMetadataKey;
}
export class ItMethodAst extends MethodContext<ItOptions> { }
export class ItClassAst extends ClassContext<ItOptions> { }

class ItVisitor extends NullAstVisitor {
    visitMethod(ast: MethodAst, context: ParserAstContext) {
        if (isItMethodAst(ast)) {
            return new ItMethodAst(ast, context);
        }
    }
    visitClass(ast: ClassAst, context: ParserAstContext) {
        if (isItClassAst(ast)) {
            return new ItClassAst(ast, context);
        }
    }
}

export const visitors = new Visitors([
    new ItVisitor()
]);

export default visitors.visitType.bind(visitors);
