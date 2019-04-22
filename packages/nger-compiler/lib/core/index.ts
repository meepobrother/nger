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
import { parseTemplate } from '@angular/compiler'
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

interface TransformHtmlResult {
    type: string;
    props: any;
    children: TransformHtmlResult[];
}
export type ITransformVisitor = Visitor<TransformHtmlResult | void>;
export class NullTransformVisitor implements ITransformVisitor {
    visit(node: Node) { }
    visitElement(element: Element) { }
    visitTemplate(template: Template) { }
    visitContent(content: Content) { }
    visitVariable(variable: Variable) { }
    visitReference(reference: Reference) { }
    visitTextAttribute(attribute: TextAttribute) { }
    visitBoundAttribute(attribute: BoundAttribute) { }
    visitBoundEvent(attribute: BoundEvent) { }
    visitText(text: Text) { }
    visitBoundText(text: BoundText) { }
    visitIcu(icu: Icu) { }
}

export class TransformHtmlVisitor implements ITransformVisitor {
    visitors: ITransformVisitor[] = [];
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
export function transformHtml(source: string, visitor: any) {
    const transformHtmlVisitor = new TransformHtmlVisitor();
    transformHtmlVisitor.visitors.push(visitor);
    const { nodes } = parseTemplate(source, ``);
    return nodes.map(node => node.visit(transformHtmlVisitor))
}