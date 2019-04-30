Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
class ExpressionVisitor {
    visitBinary(ast, context) {
        const left = ast.left.visit(this, context);
        const right = ast.right.visit(this, context);
        return `${left} ${ast.operation} ${right}`;
    }
    visitChain(ast, context) {
        return ast.expressions.join(',');
    }
    visitConditional(ast, context) {
        const condition = ast.condition.visit(this, context);
        const trueExp = ast.trueExp.visit(this, context);
        const falseExp = ast.falseExp.visit(this, context);
        return {
            condition,
            trueExp,
            falseExp
        };
    }
    visitFunctionCall(ast, context) {
        if (ast.target)
            `${ast.target.visit(this, context)}${ast.args.join(',')}`;
    }
    visitImplicitReceiver(ast, context) { }
    visitInterpolation(ast, context) { }
    visitKeyedRead(ast, context) {
        let obj = ast.obj.visit(this, context);
        let key = ast.key.visit(this, context);
        return `${obj}.${key}`;
    }
    visitKeyedWrite(ast, context) {
        let obj = ast.obj.visit(this, context);
        let key = ast.key.visit(this, context);
        let value = ast.value.visit(this, context);
        return `${obj}.${key}=${value}`;
    }
    visitLiteralArray(ast, context) {
        return ast.expressions.map(exp => exp.visit(this, context)).join(',');
    }
    visitLiteralMap(ast, context) { }
    visitLiteralPrimitive(ast, context) {
        return ast.value;
    }
    visitMethodCall(ast, context) {
        const receiver = ast.receiver.visit(this);
        if (receiver)
            return `${receiver}.${ast.name}(${ast.args.join(',')})`;
        return `${ast.name}(${ast.args.join(',')})`;
    }
    visitPipe(ast, context) {
        const exp = ast.exp.visit(this, context);
        return `${exp} | ${ast.name}:${ast.args.join(',')}`;
    }
    // not
    visitPrefixNot(ast, context) {
        return ast.expression.visit(this, context);
    }
    // non null assert
    visitNonNullAssert(ast, context) {
        return ast.expression.visit(this, context);
    }
    visitPropertyRead(ast, context) {
        const receiver = ast.receiver.visit(this);
        if (receiver)
            return `${receiver}.${ast.name}`;
        return ast.name;
    }
    visitPropertyWrite(ast, context) {
        const receiver = ast.receiver.visit(this);
        const value = ast.value.visit(this);
        if (receiver)
            return `${receiver}.${ast.name}=${value}`;
        return `${ast.name}=${value}`;
    }
    visitQuote(ast, context) {
    }
    visitSafeMethodCall(ast, context) {
        const receiver = ast.receiver.visit(this);
        if (receiver)
            return `${receiver}.${ast.name}(${ast.args.join(',')})`;
        return `${ast.name}(${ast.args.join(',')})`;
    }
    visitSafePropertyRead(ast, context) {
        const receiver = ast.receiver.visit(this);
        if (receiver)
            return `${receiver}.${ast.name}`;
        return ast.name;
    }
    visit(ast, context) {
        return ast.visit(this, context);
    }
}
exports.ExpressionVisitor = ExpressionVisitor;
function isSignalTag(name) {
    return ['input'].includes(name);
}
const astVisitor = new ExpressionVisitor();
class RenderVisitor {
    constructor() {
        this.template = new Map();
        this.content = new Map();
    }
    visit(node) {
        return node.visit(this);
    }
    visitElement(element) {
        // 所有的输入
        let styleStr = ``;
        let classStr = ``;
        let propertyStr = ``;
        element.attributes.map(attr => attr.visit(this)).map(res => {
            console.log(res);
        });
        element.inputs.map(input => input.visit(this)).map(res => {
            if (res.type === 3 /* Style */) {
                styleStr += `${lodash_1.kebabCase(res.name)}:{{${res.value}}}${res.unit || ''};`;
            }
            else if (res.type === 2 /* Class */) {
                classStr += `{{${res.value} ? '${res.name}' : ''}}`;
            }
            else if (res.type === 0 /* Property */) {
                if (res.name === 'className') {
                    classStr += ` {{${res.value}}}`;
                }
                else {
                    console.log(res);
                }
            }
            else {
                console.log(res);
            }
        });
        const outputs = element.outputs.map(output => output.visit(this)).join(' ');
        const children = element.children.map(child => child.visit(this)).join('\n');
        // todo
        const references = element.references.map(refrence => refrence.visit(this)).join(' ');
        if (isSignalTag(element.name)) {
            return `<${element.name} style="${styleStr}" class="${classStr}" ${propertyStr}/>`;
        }
        else {
            return `<${element.name} style="${styleStr}" class="${classStr}" ${propertyStr}>\n\t${children}\n</${element.name}>`;
        }
    }
    // ng-template *ngFor *ngIf
    visitTemplate(template) {
        const references = template.references.map(reference => reference.visit(this)).join(' ');
        const variables = template.variables.map(reference => reference.visit(this)).join(' ');
        const children = template.children.map(reference => reference.visit(this)).join('\n');
        const outputs = template.outputs.map(reference => reference.visit(this)).join(' ');
        const inputs = template.inputs.map(reference => reference.visit(this)).join(' ');
        const attributes = template.attributes.map(reference => reference.visit(this)).join(' ');
        return `${children}`;
    }
    visitContent(content) {
        const attributes = content.attributes.map(attr => attr.visit(this)).join(' ');
        return `<ng-content ${attributes}></ng-content>`;
    }
    // let-it="item" let-i="index"
    visitVariable(variable) {
        return `${variable.name}=${variable.value}`;
    }
    visitReference(reference) {
        return `#${reference.name}=${reference.value}`;
    }
    visitTextAttribute(attribute) {
        return `${attribute.name}="{{${attribute.value}}}"`;
    }
    visitBoundAttribute(attribute) {
        const { name, type, securityContext, value, unit } = attribute;
        return {
            name,
            type,
            value: value.visit(astVisitor),
            unit,
            securityContext
        };
    }
    visitBoundEvent(attribute) {
        const { name, type, handler, target, phase } = attribute;
        return `bind${name}="${handler.visit(astVisitor)}"`;
    }
    visitText(text) {
        return `${text.value}`;
    }
    visitBoundText(text) {
        // ast
        const value = text.value.visit(astVisitor);
        return `{{${value}}}`;
    }
    visitIcu(icu) {
        return ``;
    }
}
exports.RenderVisitor = RenderVisitor;
const visitor = new RenderVisitor();
function renderToString(nodes, context) {
    return nodes.map(node => node.visit(visitor)).join('\n');
}
exports.renderToString = renderToString;
