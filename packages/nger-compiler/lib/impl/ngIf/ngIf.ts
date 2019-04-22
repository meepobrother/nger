import { NullTransformVisitor, Template } from '../../core'
export class NgIfVisitor extends NullTransformVisitor {
    visitTemplate(template: Template) {
        return {
            type: template.tagName,
            props: {},
            children: template.children.map(child => this.visit(child))
        }
    }
}
