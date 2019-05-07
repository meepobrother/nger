import { Node, Visitor, BoundAttribute, TextAttribute, BoundEvent, Template, Text, Variable, Reference, Element, BoundText, Icu, Content } from '@angular/compiler/src/render3/r3_ast';
import ts from 'typescript';
import { ExpressionVisitor } from './expression';
export declare class ComponentVisitor implements Visitor<ts.Node> {
    expression: ExpressionVisitor;
    constructor();
    private createInputs;
    private createOutputs;
    private createVariable;
    private createAttribute;
    private createReferences;
    visit(node: Node): ts.Node;
    visitTemplate(template: Template): ts.Node;
    visitElement(element: Element): ts.Node;
    visitContent(content: Content): ts.Node;
    visitVariable(variable: Variable): ts.Node;
    visitReference(reference: Reference): ts.Node;
    visitTextAttribute(attribute: TextAttribute): ts.CallExpression;
    visitBoundAttribute(attribute: BoundAttribute): ts.CallExpression;
    visitBoundEvent(attribute: BoundEvent): ts.CallExpression;
    visitText(text: Text): ts.CallExpression;
    visitBoundText(text: BoundText): ts.Node;
    visitIcu(icu: Icu): ts.Node;
}
