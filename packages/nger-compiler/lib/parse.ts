import { NgIfVisitor } from './impl/ngIf/ngIf'
import { TransformHtmlVisitor } from './core'
import { parseTemplate } from '@angular/compiler'
export function transformHtml(source: string) {
    const transformHtmlVisitor = new TransformHtmlVisitor([
        new NgIfVisitor()
    ]);
    const { nodes } = parseTemplate(source, ``);
    return nodes.map(node => node.visit(transformHtmlVisitor))
}

const result = transformHtml(`
<div *ngFor="let item of items">{{item.title}}</div>
`)

debugger;