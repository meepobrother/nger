import { PropertyRead, NullTransformHtmlVisitor, Template, TextAttribute, BoundAttribute, NullAstVisitor } from '../../core'

export class ExpressAstVisitor extends NullAstVisitor {
    visitPropertyRead(ast: PropertyRead) {
        if (ast.receiver) {
            const receiver = ast.receiver.visit(this);
            if (receiver) {
                return `${receiver}.${ast.name}`
            }
        }
        return ast.name
    }
}

export class NgIfVisitor extends NullTransformHtmlVisitor {
    expressVisitor: ExpressAstVisitor = new ExpressAstVisitor();
    visitTemplate(template: Template) {
        const props: any = {};
        template.attributes.map(att => {
            const { name, value } = this.visitTextAttribute(att)
            props[name] = value;
        });
        template.inputs.map(input => {
            const { name, value } = input.visit(this) as any;
            props[name] = value;
        })
        return {
            type: template.tagName,
            props: props,
            children: template.children.map(child => this.visit(child))
        }
    }
    visitBoundAttribute(ast: BoundAttribute) {
        const value = ast.value.visit(this.expressVisitor);
        return {
            name: ast.name,
            value: value
        }
    }
    visitTextAttribute(ast: TextAttribute) {
        return {
            name: ast.name,
            value: ast.value
        }
    }
}
