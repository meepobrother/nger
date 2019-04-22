import { TemplateVisitor, visitAll } from '../lib'
import { parseTemplate } from '@angular/compiler'
const { nodes, errors } = parseTemplate(`
<view *ngIf="condiction" (click)="doClick($event)">{{index}}</view>
`, ``)
const visitor = new TemplateVisitor();
const res = nodes.map(node => node.visit(visitor)).join('\n')

debugger;