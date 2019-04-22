import { NullTransformHtmlVisitor, Template } from '../../core'
export class NgIfVisitor extends NullTransformHtmlVisitor {
    visitTemplate(template: Template) {
        return {
            type: template.tagName,
            props: {},
            children: template.children.map(child => this.visit(child))
        }
    }
}
