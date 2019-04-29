import {
    Visitor, Node, Text, Element, Template, Content, Variable, Reference,
    TextAttribute, BoundAttribute, BoundEvent, BoundText, Icu, visitAll,
    transformAll, NullVisitor, TransformVisitor, RecursiveVisitor,
} from '@angular/compiler/src/render3/r3_ast';
import { parseTemplate } from '@angular/compiler';
const res = parseTemplate(`<view *ngFor="let item of items;index as i;" [style.fontSize.px]="fontSize" [class.isActive]="isActive" [class]="mainClass">
<view *ngFor="let it of item.children"></view>
<input [(ngModel)]="item.value" />
<view class="title">{{itme.title}}</view>
<view *ngIf="condiction;else elseBlock;"></view>
<ng-template #elseBlock></ng-template>
</view>`, ``);
function isSignalTag(name: string) {
    return ['input'].includes(name)
}
export class RenderVisitor implements Visitor<string> {
    template: Map<string, any> = new Map();
    content: Map<string, any> = new Map();
    visit(node: Node): string {
        return node.visit(this)
    }
    visitElement(element: Element): string {
        const attributes = element.attributes.map(attr => attr.visit(this)).join(' ')
        const inputs = element.inputs.map(input => input.visit(this)).join(' ')
        const outputs = element.outputs.map(output => output.visit(this)).join(' ')
        const children = element.children.map(child => child.visit(this)).join(' ')
        // todo
        const references = element.references.map(refrence => refrence.visit(this)).join(' ')
        if (isSignalTag(element.name)) {
            return `<${element.name} ${attributes} ${inputs} ${outputs}/>`
        } else {
            return `<${element.name} ${attributes} ${inputs} ${outputs}>${children}</${element.name}>`
        }
    }
    // ng-template
    visitTemplate(template: Template): string {
        const references = template.references.map(reference => reference.visit(this)).join(' ')
        const variables = template.variables.map(reference => reference.visit(this)).join(' ')
        const children = template.children.map(reference => reference.visit(this)).join(' ')
        const outputs = template.outputs.map(reference => reference.visit(this)).join(' ')
        const inputs = template.inputs.map(reference => reference.visit(this)).join(' ')
        const attributes = template.attributes.map(reference => reference.visit(this)).join(' ')
        return `<${template.tagName} ${attributes} ${inputs} ${outputs}>${children}</${template.tagName}/>`
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
        return ``
    }
    visitTextAttribute(attribute: TextAttribute): string {
        return ``
    }
    visitBoundAttribute(attribute: BoundAttribute): string {
        return ``
    }
    visitBoundEvent(attribute: BoundEvent): string {
        return ``
    }
    visitText(text: Text): string {
        return `${text.value}`
    }
    visitBoundText(text: BoundText): string {
        // ast
        return ``
    }
    visitIcu(icu: Icu): string {
        return ``
    }
}
const visitor = new RenderVisitor();
const templateStr = res.nodes.map(node=>node.visit(visitor)).join('\n')
console.log(templateStr)
debugger;
export function renderToString(node: any, attr: string) {
    if (Array.isArray(node.nodes)) {
        console.log('multi nodes')
        return node.nodes.map(no => renderToString(no, ``)).join('\n')
    }
    if (isNgFor(node)) {
        console.log(`isNgFor`)
        return createNgFor(node)
    } else if (isSelfClose(node)) {
        console.log(`self close`)
        return renderSelfClose(node, attr)
    } else {
        console.log(`renderNormal`)
        return renderNormal(node, attr)
    }
}

// 自闭合
function isSelfClose(node: any) {
    if (!!node.name) {
        return ['input'].includes(node.name)
    }
    return false;
}

function renderSelfClose(node: any, attr: string) {
    if (!!node.name) {
        return `<${node.name} ${attr} ${(node.attributes || []).map(attr => createAttribute(attr)).join(' ')}/>`
    }
    return ``
}


function renderNormal(node: any, attr: string) {
    if (!!node.name) {
        return `<${node.name} ${attr} ${(node.attributes || []).map(attr => createAttribute(attr)).join(' ')}>
            ${(node.children || []).map(node => renderToString(node, '')).join('\n')}
        </${node.name}>`
    }
    return ''
}

/** 
 * <ng-template ngFor ngForOf let-item let-index>
 *  <view></view>
 * </ng-template>
 */
function isNgFor(node: any) {
    if (Array.isArray(node.attributes)) {
        return !!node.attributes.find(attr => attr.name = 'ngFor')
    } else {
        return false;
    }
}

function createNgFor(node: any) {
    let attr = ``;
    node.inputs && node.inputs.map(input => {
        if (input.name === 'ngForOf') {
            const name = input.value.ast.name
            const receiver = input.value.ast.receiver.name;
            if (receiver) {
                attr += `wx:for="{{${receiver}.${name}}}" `
            } else {
                attr += `wx:for="{{${name}}}" `
            }
        }
    })
    node.variables && node.variables.map(variable => {
        if (variable.value === 'index') {
            attr += `wx:for-index="${variable.name}" `
        } else if (variable.value === '$implicit') {
            attr += `wx:for-item="${variable.name}" `
        }
    });
    const childNode = node.children[0];
    return renderToString(childNode, attr)
}

function createAttribute(attr: any) {
    if (attr.value && attr.value.length > 0) {
        return `${attr.name}="${attr.value}" `
    }
    return ``;
}

function createInputs(node: any) {
    if (Array.isArray(node)) {

    }
    return ``
}

function createInput(input: any) {
    // [style.fontSize.px]="fontSize"
    if (input.type === 3) {
        return true;
    } else if (input.type === 2) {

    } else if (input.type === 0) {

    }
}