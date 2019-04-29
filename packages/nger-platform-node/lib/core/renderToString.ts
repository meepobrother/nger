import {
    Visitor, Node, Text, Element, Template, Content, Variable, Reference,
    TextAttribute, BoundAttribute, BoundEvent, BoundText, Icu, visitAll,
    transformAll, NullVisitor, TransformVisitor, RecursiveVisitor,
} from '@angular/compiler/src/render3/r3_ast';
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
    TemplateBinding, BindingType
} from '@angular/compiler/src/expression_parser/ast';
import { kebabCase } from 'lodash';

export class ExpressionVisitor implements AstVisitor {
    visitBinary(ast: Binary, context: any): any {
        const left = ast.left.visit(this, context)
        const right = ast.right.visit(this, context)
        return `${left} ${ast.operation} ${right}`
    }
    visitChain(ast: Chain, context: any): any {
        return ast.expressions.join(',')
    }
    visitConditional(ast: Conditional, context: any): any {
        const condition = ast.condition.visit(this, context)
        const trueExp = ast.trueExp.visit(this, context)
        const falseExp = ast.falseExp.visit(this, context)
        return {
            condition,
            trueExp,
            falseExp
        }
    }
    visitFunctionCall(ast: FunctionCall, context: any): any {
        if (ast.target)`${ast.target.visit(this, context)}${ast.args.join(',')}`
    }
    visitImplicitReceiver(ast: ImplicitReceiver, context: any): any { }
    visitInterpolation(ast: Interpolation, context: any): any { }
    visitKeyedRead(ast: KeyedRead, context: any): any {
        let obj = ast.obj.visit(this, context)
        let key = ast.key.visit(this, context)
        return `${obj}.${key}`
    }
    visitKeyedWrite(ast: KeyedWrite, context: any): any {
        let obj = ast.obj.visit(this, context)
        let key = ast.key.visit(this, context)
        let value = ast.value.visit(this, context)
        return `${obj}.${key}=${value}`
    }
    visitLiteralArray(ast: LiteralArray, context: any): any {
        return ast.expressions.map(exp => exp.visit(this, context)).join(',')
    }
    visitLiteralMap(ast: LiteralMap, context: any): any { }
    visitLiteralPrimitive(ast: LiteralPrimitive, context: any): any {
        return ast.value;
    }
    visitMethodCall(ast: MethodCall, context: any): any {
        const receiver = ast.receiver.visit(this)
        if (receiver) return `${receiver}.${ast.name}(${ast.args.join(',')})`
        return `${ast.name}(${ast.args.join(',')})`
    }
    visitPipe(ast: BindingPipe, context: any): any {
        const exp = ast.exp.visit(this, context)
        return `${exp} | ${ast.name}:${ast.args.join(',')}`
    }
    // not
    visitPrefixNot(ast: PrefixNot, context: any): any {
        return ast.expression.visit(this, context)
    }
    // non null assert
    visitNonNullAssert(ast: NonNullAssert, context: any): any {
        return ast.expression.visit(this, context)
    }
    visitPropertyRead(ast: PropertyRead, context: any): any {
        const receiver = ast.receiver.visit(this)
        if (receiver) return `${receiver}.${ast.name}`
        return ast.name;
    }
    visitPropertyWrite(ast: PropertyWrite, context: any): any {
        const receiver = ast.receiver.visit(this)
        const value = ast.value.visit(this)
        if (receiver) return `${receiver}.${ast.name}=${value}`
        return `${ast.name}=${value}`
    }
    visitQuote(ast: Quote, context: any): any {

    }
    visitSafeMethodCall(ast: SafeMethodCall, context: any): any {
        const receiver = ast.receiver.visit(this)
        if (receiver) return `${receiver}.${ast.name}(${ast.args.join(',')})`
        return `${ast.name}(${ast.args.join(',')})`
    }
    visitSafePropertyRead(ast: SafePropertyRead, context: any): any {
        const receiver = ast.receiver.visit(this)
        if (receiver) return `${receiver}.${ast.name}`
        return ast.name;
    }
    visit(ast: AST, context?: any): any {
        return ast.visit(this, context)
    }
}
function isSignalTag(name: string) {
    return ['input'].includes(name)
}
const astVisitor = new ExpressionVisitor();
export class RenderVisitor implements Visitor<any> {
    template: Map<string, any> = new Map();
    content: Map<string, any> = new Map();
    visit(node: Node): string {
        return node.visit(this)
    }
    visitElement(element: Element): string {
        // 所有的输入
        let styleStr = ``;
        let classStr = ``;
        let propertyStr = ``;
        element.attributes.map(attr => attr.visit(this)).map(res => {
            console.log(res)
        })
        element.inputs.map(input => input.visit(this)).map(res => {
            if (res.type === BindingType.Style) {
                styleStr += `${kebabCase(res.name)}:{{${res.value}}}${res.unit || ''};`
            } else if (res.type === BindingType.Class) {
                classStr += `{{${res.value} ? '${res.name}' : ''}}`
            } else if (res.type === BindingType.Property) {
                if (res.name === 'className') {
                    classStr += ` {{${res.value}}}`;
                } else {
                    console.log(res)
                }
            } else {
                console.log(res)
            }
        });
        const outputs = element.outputs.map(output => output.visit(this)).join(' ')
        const children = element.children.map(child => child.visit(this)).join('\n')
        // todo
        const references = element.references.map(refrence => refrence.visit(this)).join(' ')
        if (isSignalTag(element.name)) {
            return `<${element.name} style="${styleStr}" class="${classStr}" ${propertyStr}/>`
        } else {
            return `<${element.name} style="${styleStr}" class="${classStr}" ${propertyStr}>\n\t${children}\n</${element.name}>`
        }
    }
    // ng-template *ngFor *ngIf
    visitTemplate(template: Template): string {
        const references = template.references.map(reference => reference.visit(this)).join(' ')
        const variables = template.variables.map(reference => reference.visit(this)).join(' ')
        const children = template.children.map(reference => reference.visit(this)).join('\n')
        const outputs = template.outputs.map(reference => reference.visit(this)).join(' ')
        const inputs = template.inputs.map(reference => reference.visit(this)).join(' ')
        const attributes = template.attributes.map(reference => reference.visit(this)).join(' ')
        return `${children}`
    }
    visitContent(content: Content): string {
        const attributes = content.attributes.map(attr => attr.visit(this)).join(' ');
        return `<ng-content ${attributes}></ng-content>`
    }
    // let-it="item" let-i="index"
    visitVariable(variable: Variable): string {
        return `${variable.name}=${variable.value}`
    }
    visitReference(reference: Reference): string {
        return `#${reference.name}=${reference.value}`
    }
    visitTextAttribute(attribute: TextAttribute): string {
        return `${attribute.name}="{{${attribute.value}}}"`
    }
    visitBoundAttribute(attribute: BoundAttribute): any {
        const { name, type, securityContext, value, unit } = attribute;
        return {
            name,
            type,
            value: value.visit(astVisitor),
            unit,
            securityContext
        }
    }
    visitBoundEvent(attribute: BoundEvent): string {
        const { name, type, handler, target, phase } = attribute
        return `bind${name}="${handler.visit(astVisitor)}"`
    }
    visitText(text: Text): string {
        return `${text.value}`
    }
    visitBoundText(text: BoundText): string {
        // ast
        const value = text.value.visit(astVisitor);
        return `{{${value}}}`
    }
    visitIcu(icu: Icu): string {
        return ``
    }
}
const visitor = new RenderVisitor();
export function renderToString(nodes: Node[], context: any) {
    return nodes.map(node => node.visit(visitor)).join('\n')
}
