import { Node, Visitor, BoundAttribute, TextAttribute, BoundEvent, Template, Text, Variable, Reference, Element, BoundText, Icu, Content } from '@angular/compiler/src/render3/r3_ast';
import ts from 'typescript';
import { ExpressionVisitor, BindingType } from './expression'
import { createObject } from './createObject'
export class ComponentVisitor implements Visitor<ts.Node>{
    public expression: ExpressionVisitor;
    constructor() {
        this.expression = new ExpressionVisitor();
    }
    visit(node: Node): ts.Node {
        return node.visit(this)
    }
    // <ng-template></ng-template>
    // <div *ngFor="let item of items"></div>
    tindex: number = 0;
    visitTemplate(template: Template): ts.Node {
        this.tindex += 1
        // 每个template都相当于一个函数组
        const { tagName, variables, attributes, inputs, outputs, children, references, i18n } = template;
        // 这个相当于起了一个别名,如果value不为空，赋值给响应实例对象
        const propertys: ts.ObjectLiteralElementLike[] = []
        if (references) {
            references.map(reference => {
                const { name, value } = reference;
                propertys.push(
                    ts.createPropertyAssignment(name, ts.createStringLiteral(value))
                )
            });
        }
        // 属性
        if (attributes) {
            attributes.map(attribute => {
                const { name, value } = attribute;
            });
        }
        // 输入
        if (inputs) {
            inputs.map(input => {
                const { name, type, securityContext, value, unit } = input;
                // 这里的value要经过特殊处理
            })
        }
        if (outputs) {
            outputs.map(output => {
                const { name, type, handler, target, phase } = output;
            })
        }
        if (variables) {
            variables.map(variable => {
                const { value, name } = variable;
            })
        }
        // tagName
        if (tagName) {
            if (tagName === 'ng-template') { } else { }
        }
        // 转化到小程序是 <template></template>
        return ts.createCall(ts.createIdentifier(`template`), [], [
            ts.createObjectLiteral(propertys)
        ]);
    }

    // 一个element
    visitElement(element: Element): ts.Node {
        const {
            name, // tag name
            inputs, // 输入
            outputs, // 输出
            attributes,  // 属性
            children,  // 孩子
            references // # id 同一页面可用
        } = element;
        const props = ts.createObjectLiteral([
            ...attributes.map(attr => attr.visit(this) as any),
            ...inputs.map(input => input.visit(this) as any),
            // ...outputs.map(output => output.visit(this) as any)
        ].filter(it => !!it));
        // h(name,{...inputs,...outputs,...attributes},...children)
        return undefined;
    }

    visitContent(content: Content): ts.Node {
        const { selector, attributes } = content;
        debugger;
        return undefined;
    }

    visitVariable(variable: Variable): ts.Node {
        const { name, value } = variable;
        debugger;
        return undefined;
    }
    visitReference(reference: Reference): ts.Node {
        debugger;
        return undefined;
    }
    // class="name"
    // finish
    visitTextAttribute(attribute: TextAttribute): ts.PropertyAssignment {
        return ts.createPropertyAssignment(attribute.name, ts.createStringLiteral(attribute.value))
    }
    // [class.active]="true" bound
    // finish
    visitBoundAttribute(attribute: BoundAttribute): ts.ObjectLiteralElementLike {
        const { name, type, unit, value } = attribute;
        const attr = ts.createPropertyAssignment(name,
            ts.createCall(ts.createIdentifier('boundAttribute'), undefined, [
                ts.createStringLiteral(`${type}`),
                ts.createStringLiteral(`${unit || ''}`),
                ts.createStringLiteral(`${(value as any).source || ''}`),
            ])
        )
        switch (type) {
            case BindingType.Property:
                return ts.createPropertyAssignment('property', ts.createObjectLiteral([
                    attr
                ]))
            case BindingType.Attribute:
                return ts.createPropertyAssignment('pttribute', ts.createObjectLiteral([
                    attr
                ]))
            case BindingType.Class:
                return ts.createPropertyAssignment('class', ts.createObjectLiteral([
                    attr
                ]))
            case BindingType.Style:
                return ts.createPropertyAssignment('style', ts.createObjectLiteral([
                    attr
                ]))
            case BindingType.Animation:
                return ts.createPropertyAssignment('animation', ts.createObjectLiteral([
                    attr
                ]))
            default:
                break;
        }
    }
    // (click)="onClick($event)"
    visitBoundEvent(attribute: BoundEvent): ts.ObjectLiteralElementLike {
        const { name, type, handler, target, phase } = attribute;
        return ts.createPropertyAssignment(name, ts.createCall(
            ts.createIdentifier('boundEvent'),
            undefined,
            []
        ))
    }
    visitText(text: Text): ts.StringLiteral {
        return ts.createStringLiteral(text.value)
    }
    // {{text}}
    visitBoundText(text: BoundText): ts.Node {
        const { value } = text;
        return ts.createCall(
            ts.createIdentifier('boundText'),
            undefined,
            [
                value.visit(this.expression, this)
            ]
        );
    };
    visitIcu(icu: Icu): ts.Node {
        debugger;
        return undefined;
    }
}