import { Node, Visitor, BoundAttribute, TextAttribute, BoundEvent, Template, Text, Variable, Reference, Element, BoundText, Icu, Content } from '@angular/compiler/src/render3/r3_ast';
import ts from 'typescript';
import { ExpressionVisitor, BindingType } from './expression'
export class ComponentVisitor implements Visitor<ts.Node>{
    public expression: ExpressionVisitor;
    constructor() {
        this.expression = new ExpressionVisitor();
    }
    private createInputs(inputs: any[]) {
        const items = [];
        inputs.map(input => items.push(input.visit(this)));
        const arr = ts.createArrayLiteral(items);
        return ts.createPropertyAssignment(`inputs`, arr);
    }
    private createOutputs(outputs: any[]) {
        const items = [];
        outputs.map(output => items.push(output.visit(this)))
        const arr = ts.createArrayLiteral(items);
        return ts.createPropertyAssignment(`outputs`, arr)
    }
    private createVariable(variables: Variable[]) {
        const items = [];
        variables.map(variable => items.push(variable.visit(this)))
        const arr = ts.createArrayLiteral(items);
        return ts.createPropertyAssignment(`variables`, arr)
    }
    private createAttribute(attributes: TextAttribute[]) {
        const items = [];
        attributes.map(attribute => items.push(attribute.visit(this)));
        const arr = ts.createArrayLiteral(items);
        return ts.createPropertyAssignment(`attributes`, arr);
    }
    private createReferences(references: Reference[]) {
        const items = [];
        references.map(reference => items.push(reference.visit(this)));
        const arr = ts.createArrayLiteral(items);
        return ts.createPropertyAssignment(`references`, arr)
    }
    visit(node: Node): ts.Node {
        return node.visit(this)
    }
    // <ng-template></ng-template>
    // <div *ngFor="let item of items"></div>
    visitTemplate(template: Template): ts.Node {
        // 每个template都相当于一个函数组
        const { tagName, variables, attributes, inputs, outputs, children, references, i18n } = template;
        // 这个相当于起了一个别名,如果value不为空，赋值给响应实例对象
        const propertys: ts.ObjectLiteralElementLike[] = []
        if (references) propertys.push(this.createReferences(references))
        if (attributes) propertys.push(this.createAttribute(attributes))
        if (inputs) propertys.push(this.createInputs(inputs));
        if (outputs) propertys.push(this.createOutputs(outputs))
        if (variables) propertys.push(this.createVariable(variables))
        // tagName
        if (tagName) {
            if (tagName === 'ng-template') { } else { }
        }
        // 转化到小程序是 <template></template>
        return ts.createCall(ts.createIdentifier(`template`), [], [
            ts.createObjectLiteral(propertys),
            ...children.map(child => child.visit(this) as any)
        ]);
    }
    // 一个element
    visitElement(element: Element): ts.Node {
        const propertys = [];
        const {
            name, // tag name
            inputs, // 输入
            outputs, // 输出
            attributes,  // 属性
            children,  // 孩子
            references // # id 同一页面可用
        } = element;
        if (references) propertys.push(this.createReferences(references))
        if (attributes) propertys.push(this.createAttribute(attributes))
        if (inputs) propertys.push(this.createInputs(inputs));
        if (outputs) propertys.push(this.createOutputs(outputs))
        // h(name,{...inputs,...outputs,...attributes},...children)
        return ts.createCall(ts.createIdentifier(`element`), [], [
            ts.createStringLiteral(name),
            ts.createObjectLiteral(propertys),
            ...children.map(child => child.visit(this) as any)
        ]);
    }
    visitContent(content: Content): ts.Node {
        const propertys = [];
        const { selector, attributes } = content;
        propertys.push(ts.createPropertyAssignment(`selector`, ts.createStringLiteral(selector)));
        propertys.push(this.createAttribute(attributes));
        return ts.createCall(ts.createIdentifier(`content`), [], [
            ts.createObjectLiteral(propertys)
        ]);
    }
    visitVariable(variable: Variable): ts.Node {
        const { value, name } = variable;
        return ts.createObjectLiteral([
            ts.createPropertyAssignment(`name`, ts.createStringLiteral(name)),
            ts.createPropertyAssignment(`value`, ts.createStringLiteral(value)),
        ])
    }
    visitReference(reference: Reference): ts.Node {
        const { name, value } = reference;
        return ts.createObjectLiteral([
            ts.createPropertyAssignment(`name`, ts.createStringLiteral(name)),
            ts.createPropertyAssignment(`value`, ts.createStringLiteral(value))
        ]);
    }
    // class="name"
    // finish
    visitTextAttribute(attribute: TextAttribute) {
        const ast = ts.createObjectLiteral([
            ts.createPropertyAssignment(attribute.name, ts.createStringLiteral(attribute.value))
        ]);
        return ts.createCall(
            ts.createIdentifier('textAttribute'),
            undefined, [ast]
        )
    }
    // [class.active]="true" bound
    // finish
    visitBoundAttribute(attribute: BoundAttribute) {
        const { name, type, securityContext, value, unit } = attribute;
        const ast = ts.createObjectLiteral([
            ts.createPropertyAssignment(`name`, ts.createStringLiteral(name)),
            ts.createPropertyAssignment(`type`, ts.createStringLiteral(`${type}`)),
            ts.createPropertyAssignment(`securityContext`, ts.createNumericLiteral(`${securityContext}`)),
            ts.createPropertyAssignment(`unit`, ts.createStringLiteral(unit || '')),
            ts.createPropertyAssignment(`value`, this.expression.createNodeStringLiteral(value.visit(this.expression))),
        ])
        return ts.createCall(
            ts.createIdentifier('boundAttribute'),
            undefined, [ast]
        )
    }
    // (click)="onClick($event)"
    visitBoundEvent(attribute: BoundEvent) {
        const { name, type, handler, target, phase } = attribute;
        const ast = ts.createObjectLiteral([
            ts.createPropertyAssignment(`name`, ts.createStringLiteral(name)),
            ts.createPropertyAssignment(`type`, ts.createStringLiteral(`${type}`)),
            ts.createPropertyAssignment(`target`, ts.createNumericLiteral(`${target}`)),
            ts.createPropertyAssignment(`phase`, ts.createStringLiteral(phase || '')),
            ts.createPropertyAssignment(`handler`, this.expression.createNodeStringLiteral(handler.visit(this.expression)))
        ])
        return ts.createCall(
            ts.createIdentifier('boundEvent'),
            undefined, [ast]
        )
    }
    visitText(text: Text) {
        return ts.createCall(ts.createIdentifier(`text`), [],
            [ts.createStringLiteral(text.value)]
        );
    }
    // {{text}}
    visitBoundText(text: BoundText): ts.Node {
        const { value } = text;
        return ts.createCall(
            ts.createIdentifier('boundText'),
            undefined, [
                // 这里肯定是一个expression
                value.visit(this.expression)
            ].filter(it => !!it)
        );
    };
    visitIcu(icu: Icu): ts.Node {
        return ts.createCall(ts.createIdentifier(`icu`), [], []);
    }
}