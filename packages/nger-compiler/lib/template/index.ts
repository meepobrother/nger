import {
    Visitor, Node, Text, Element, Template, Content, Variable, Reference,
    TextAttribute, BoundAttribute, BoundEvent, BoundText, Icu, visitAll,
    transformAll, NullVisitor, TransformVisitor, RecursiveVisitor
} from '@angular/compiler/src/render3/r3_ast'
export {
    Visitor, Node, Text, Element, Template, Content, Variable, Reference,
    TextAttribute, BoundAttribute, BoundEvent, BoundText, Icu, visitAll,
    transformAll, NullVisitor, TransformVisitor, RecursiveVisitor
}
import { expressionVisitor } from '../expression';
export class TemplateVisitor implements Visitor<string> {
    visit(node: Node, context?: any) {
        return node.visit(this)
    }
    visitElement(element: Element, context?: any) {
        return `
        <${element.name} ${element.attributes.map(attr => this.visit(attr)).join(' ')} ${element.inputs.map(attr => this.visit(attr)).join(' ')} ${element.outputs.map(attr => this.visit(attr)).join(' ')}>
            ${element.children.map(child => this.visit(child)).join('\n')}
        </${element.name}>
        `
    }
    /**
     * ng-template
     * @param template 
     * @param context 
     */
    visitTemplate(template: Template, context?: any) {
        return `<ng-template ${template.attributes.map(attr => this.visit(attr)).join(' ')} ${template.inputs.map(attr => this.visit(attr)).join(' ')} ${template.outputs.map(attr => this.visit(attr)).join(' ')} >
        ${template.children.map(child => this.visit(child)).join('\n')}
        </ng-template>`
    }
    visitContent(content: Content, context?: any) {
        return `visitContent`;
    }
    visitVariable(variable: Variable, context?: any) {
        return `visitVariable`;
    }
    visitReference(reference: Reference, context?: any) {
        return `visitReference`;
    }
    visitTextAttribute(attribute: TextAttribute, context?: any) {
        return `visitTextAttribute`;
    }
    visitBoundAttribute(attribute: BoundAttribute, context?: any) {
        if (attribute.name === 'ngIf') {
            attribute.name = 'wx:if'
        } else if (attribute.name === 'ngIfElse') { 
            
        }
        return `${attribute.name}="{{${attribute.value.visit(expressionVisitor)}}}"`;
    }
    visitBoundEvent(attribute: BoundEvent, context?: any) {
        return `visitBoundEvent`;
    }
    visitText(text: Text, context?: any) {
        return `${text.value}`;
    }
    visitBoundText(text: BoundText, context?: any) {
        return `${text.value.visit(expressionVisitor)}`;
    }
    visitIcu(icu: Icu, context?: any) {
        return `visitIcu`;
    }
}

export const templateVisitor = new TemplateVisitor();