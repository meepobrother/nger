import {
    Visitor, Node, Text, Element, Template, Content, Variable, Reference,
    TextAttribute, BoundAttribute, BoundEvent, BoundText, Icu, visitAll,
    transformAll, NullVisitor, TransformVisitor, RecursiveVisitor
} from '@angular/compiler/src/render3/r3_ast'
import {
    AST, Quote, AstVisitor, NullAstVisitor,
    RecursiveAstVisitor, AstTransformer,
    AstMemoryEfficientTransformer, visitAstChildren,
    EmptyExpr, ImplicitReceiver, Chain, Conditional,
    PropertyRead, PropertyWrite, SafePropertyRead,
    KeyedRead, KeyedWrite, BindingPipe, LiteralPrimitive,
    LiteralArray, LiteralMapKey, LiteralMap,
    Interpolation, Binary, PrefixNot, NonNullAssert,
    MethodCall, SafeMethodCall, FunctionCall, ASTWithSource,
    TemplateBinding,
} from '@angular/compiler/src/expression_parser/ast';
export {
    Visitor, Node, Text, Element, Template, Content, Variable, Reference,
    TextAttribute, BoundAttribute, BoundEvent, BoundText, Icu, visitAll,
    transformAll, NullVisitor, TransformVisitor, RecursiveVisitor
}
export {
    AST, Quote, AstVisitor, NullAstVisitor,
    RecursiveAstVisitor, AstTransformer,
    AstMemoryEfficientTransformer, visitAstChildren,
    EmptyExpr, ImplicitReceiver, Chain, Conditional,
    PropertyRead, PropertyWrite, SafePropertyRead,
    KeyedRead, KeyedWrite, BindingPipe, LiteralPrimitive,
    LiteralArray, LiteralMapKey, LiteralMap,
    Interpolation, Binary, PrefixNot, NonNullAssert,
    MethodCall, SafeMethodCall, FunctionCall, ASTWithSource,
    TemplateBinding,
}
export type ITransformVisitor = Visitor<any>;
export class NullTransformHtmlVisitor implements ITransformVisitor {
    visit(node: Node, context?: any) { }
    visitElement(element: Element, context?: any) { }
    visitTemplate(template: Template, context?: any) { }
    visitContent(content: Content, context?: any) { }
    visitVariable(variable: Variable, context?: any) { }
    visitReference(reference: Reference, context?: any) { }
    visitTextAttribute(attribute: TextAttribute, context?: any) { }
    visitBoundAttribute(attribute: BoundAttribute, context?: any) { }
    visitBoundEvent(attribute: BoundEvent, context?: any) { }
    visitText(text: Text, context?: any) { }
    visitBoundText(text: BoundText, context?: any) { }
    visitIcu(icu: Icu, context?: any) { }
}

export class TransformHtmlVisitor implements ITransformVisitor {
    constructor(public visitors: Visitor<any>[]) { }
    visit(node: Node) {
        for (let it of this.visitors) {
            let res = node.visit(it);
            return res;
        }
    }
    visitElement(element: Element) {
        for (let it of this.visitors) {
            let res = element.visit(it);
            return res;
        }
    }
    visitTemplate(template: Template) {
        for (let it of this.visitors) {
            let res = template.visit(it);
            return res;
        }
    }
    visitContent(content: Content) {
        for (let it of this.visitors) {
            let res = content.visit(it);
            return res;
        }
    }
    visitVariable(variable: Variable) {
        for (let it of this.visitors) {
            let res = variable.visit(it);
            return res;
        }
    }
    visitReference(reference: Reference) {
        for (let it of this.visitors) {
            let res = reference.visit(it);
            return res;
        }
    }
    visitTextAttribute(attribute: TextAttribute) {
        for (let it of this.visitors) {
            let res = attribute.visit(it);
            return res;
        }
    }
    visitBoundAttribute(attribute: BoundAttribute) {
        for (let it of this.visitors) {
            let res = attribute.visit(it);
            return res;
        }
    }
    visitBoundEvent(attribute: BoundEvent) {
        for (let it of this.visitors) {
            let res = attribute.visit(it);
            return res;
        }
    }
    visitText(text: Text) {
        for (let it of this.visitors) {
            let res = text.visit(it);
            return res;
        }
    }
    visitBoundText(text: BoundText) {
        for (let it of this.visitors) {
            let res = text.visit(it);
            return res;
        }
    }
    visitIcu(icu: Icu) {
        for (let it of this.visitors) {
            let res = icu.visit(it);
            return res;
        }
    }
}
