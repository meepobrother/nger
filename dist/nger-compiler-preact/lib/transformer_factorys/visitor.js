"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const typescript_1 = tslib_1.__importDefault(require("typescript"));
const expression_1 = require("./expression");
class ComponentVisitor {
    constructor() {
        this.expression = new expression_1.ExpressionVisitor();
    }
    createInputs(inputs) {
        const items = [];
        inputs.map(input => items.push(input.visit(this)));
        const arr = typescript_1.default.createArrayLiteral(items);
        return typescript_1.default.createPropertyAssignment(`inputs`, arr);
    }
    createOutputs(outputs) {
        const items = [];
        outputs.map(output => items.push(output.visit(this)));
        const arr = typescript_1.default.createArrayLiteral(items);
        return typescript_1.default.createPropertyAssignment(`outputs`, arr);
    }
    createVariable(variables) {
        const items = [];
        variables.map(variable => items.push(variable.visit(this)));
        const arr = typescript_1.default.createArrayLiteral(items);
        return typescript_1.default.createPropertyAssignment(`variables`, arr);
    }
    createAttribute(attributes) {
        const items = [];
        attributes.map(attribute => items.push(attribute.visit(this)));
        const arr = typescript_1.default.createArrayLiteral(items);
        return typescript_1.default.createPropertyAssignment(`attributes`, arr);
    }
    createReferences(references) {
        const items = [];
        references.map(reference => items.push(reference.visit(this)));
        const arr = typescript_1.default.createArrayLiteral(items);
        return typescript_1.default.createPropertyAssignment(`references`, arr);
    }
    visit(node) {
        return node.visit(this);
    }
    // <ng-template></ng-template>
    // <div *ngFor="let item of items"></div>
    visitTemplate(template) {
        // 每个template都相当于一个函数组
        const { tagName, variables, attributes, inputs, outputs, children, references, i18n } = template;
        // 这个相当于起了一个别名,如果value不为空，赋值给响应实例对象
        const propertys = [];
        if (references)
            propertys.push(this.createReferences(references));
        if (attributes)
            propertys.push(this.createAttribute(attributes));
        if (inputs)
            propertys.push(this.createInputs(inputs));
        if (outputs)
            propertys.push(this.createOutputs(outputs));
        if (variables)
            propertys.push(this.createVariable(variables));
        // tagName
        if (tagName) {
            if (tagName === 'ng-template') { }
            else { }
        }
        // 转化到小程序是 <template></template>
        return typescript_1.default.createCall(typescript_1.default.createIdentifier(`template`), [], [
            typescript_1.default.createObjectLiteral(propertys),
            ...children.map(child => child.visit(this))
        ]);
    }
    // 一个element
    visitElement(element) {
        const propertys = [];
        const { name, // tag name
        inputs, // 输入
        outputs, // 输出
        attributes, // 属性
        children, // 孩子
        references // # id 同一页面可用
         } = element;
        if (references)
            propertys.push(this.createReferences(references));
        if (attributes)
            propertys.push(this.createAttribute(attributes));
        if (inputs)
            propertys.push(this.createInputs(inputs));
        if (outputs)
            propertys.push(this.createOutputs(outputs));
        // h(name,{...inputs,...outputs,...attributes},...children)
        return typescript_1.default.createCall(typescript_1.default.createIdentifier(`element`), [], [
            typescript_1.default.createStringLiteral(name),
            typescript_1.default.createObjectLiteral(propertys),
            ...children.map(child => child.visit(this))
        ]);
    }
    visitContent(content) {
        const propertys = [];
        const { selector, attributes } = content;
        propertys.push(typescript_1.default.createPropertyAssignment(`selector`, typescript_1.default.createStringLiteral(selector)));
        propertys.push(this.createAttribute(attributes));
        return typescript_1.default.createCall(typescript_1.default.createIdentifier(`content`), [], [
            typescript_1.default.createObjectLiteral(propertys)
        ]);
    }
    visitVariable(variable) {
        const { value, name } = variable;
        return typescript_1.default.createObjectLiteral([
            typescript_1.default.createPropertyAssignment(`name`, typescript_1.default.createStringLiteral(name)),
            typescript_1.default.createPropertyAssignment(`value`, typescript_1.default.createStringLiteral(value)),
        ]);
    }
    visitReference(reference) {
        const { name, value } = reference;
        return typescript_1.default.createObjectLiteral([
            typescript_1.default.createPropertyAssignment(`name`, typescript_1.default.createStringLiteral(name)),
            typescript_1.default.createPropertyAssignment(`value`, typescript_1.default.createStringLiteral(value))
        ]);
    }
    // class="name"
    // finish
    visitTextAttribute(attribute) {
        const ast = typescript_1.default.createObjectLiteral([
            typescript_1.default.createPropertyAssignment(`name`, typescript_1.default.createStringLiteral(attribute.name)),
            typescript_1.default.createPropertyAssignment(`value`, typescript_1.default.createStringLiteral(attribute.value))
        ]);
        return typescript_1.default.createCall(typescript_1.default.createIdentifier('textAttribute'), undefined, [ast]);
    }
    // [class.active]="true" bound
    // finish
    visitBoundAttribute(attribute) {
        const { name, type, securityContext, value, unit } = attribute;
        const ast = typescript_1.default.createObjectLiteral([
            typescript_1.default.createPropertyAssignment(`name`, typescript_1.default.createStringLiteral(name)),
            typescript_1.default.createPropertyAssignment(`type`, typescript_1.default.createStringLiteral(`${type}`)),
            typescript_1.default.createPropertyAssignment(`securityContext`, typescript_1.default.createNumericLiteral(`${securityContext}`)),
            typescript_1.default.createPropertyAssignment(`unit`, typescript_1.default.createStringLiteral(unit || '')),
            typescript_1.default.createPropertyAssignment(`value`, this.expression.createNodeStringLiteral(value.visit(this.expression))),
        ]);
        return typescript_1.default.createCall(typescript_1.default.createIdentifier('boundAttribute'), undefined, [ast]);
    }
    // (click)="onClick($event)"
    visitBoundEvent(attribute) {
        const { name, type, handler, target, phase } = attribute;
        const ast = typescript_1.default.createObjectLiteral([
            typescript_1.default.createPropertyAssignment(`name`, typescript_1.default.createStringLiteral(name)),
            typescript_1.default.createPropertyAssignment(`type`, typescript_1.default.createStringLiteral(`${type}`)),
            typescript_1.default.createPropertyAssignment(`target`, typescript_1.default.createNumericLiteral(`${target}`)),
            typescript_1.default.createPropertyAssignment(`phase`, typescript_1.default.createStringLiteral(phase || '')),
            typescript_1.default.createPropertyAssignment(`handler`, handler.visit(this.expression))
        ]);
        return typescript_1.default.createCall(typescript_1.default.createIdentifier('boundEvent'), undefined, [ast]);
    }
    visitText(text) {
        return typescript_1.default.createCall(typescript_1.default.createIdentifier(`text`), [], [typescript_1.default.createStringLiteral(text.value)]);
    }
    // {{text}}
    visitBoundText(text) {
        const { value } = text;
        return typescript_1.default.createCall(typescript_1.default.createIdentifier('boundText'), undefined, [
            // 这里肯定是一个expression
            value.visit(this.expression)
        ].filter(it => !!it));
    }
    ;
    visitIcu(icu) {
        return typescript_1.default.createCall(typescript_1.default.createIdentifier(`icu`), [], []);
    }
}
exports.ComponentVisitor = ComponentVisitor;
