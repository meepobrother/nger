"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const ast_1 = require("@angular/compiler/src/expression_parser/ast");
exports.AstMemoryEfficientTransformer = ast_1.AstMemoryEfficientTransformer;
const typescript_1 = tslib_1.__importDefault(require("typescript"));
const printer = typescript_1.default.createPrinter();
const sourceFile = typescript_1.default.createSourceFile(``, ``, typescript_1.default.ScriptTarget.Latest, true, typescript_1.default.ScriptKind.TSX);
function createBinaryOperator(operation) {
    switch (operation) {
        case '=':
        default:
            break;
    }
    return typescript_1.default.createToken(typescript_1.default.SyntaxKind.EqualsToken);
}
class ExpressionVisitor {
    createNodeStringLiteral(node) {
        const code = printer.printList(typescript_1.default.ListFormat.NoSpaceIfEmpty, typescript_1.default.createNodeArray([node]), sourceFile);
        return typescript_1.default.createStringLiteral(code);
    }
    visitBinary(ast, context) {
        debugger;
        return typescript_1.default.createBinary(ast.left.visit(this, context), createBinaryOperator(ast.operation), ast.right.visit(this, context));
    }
    visitChain(ast, context) {
        debugger;
    }
    visitConditional(ast, context) {
        const { condition, trueExp, falseExp } = ast;
        let item = {
            condition: this.createNodeStringLiteral(condition.visit(this)),
            trueExp: this.createNodeStringLiteral(trueExp.visit(this)),
            falseExp: this.createNodeStringLiteral(falseExp.visit(this))
        };
        return typescript_1.default.createObjectLiteral([
            typescript_1.default.createPropertyAssignment('condition', item.condition),
            typescript_1.default.createPropertyAssignment('trueExp', item.trueExp),
            typescript_1.default.createPropertyAssignment('falseExp', item.falseExp),
        ]);
    }
    visitFunctionCall(ast, context) {
        debugger;
    }
    // 
    visitImplicitReceiver(ast, context) {
        return undefined;
    }
    // 插值  返回字符串 合适么
    visitInterpolation(ast, context) {
        const { strings, expressions } = ast;
        const exps = expressions.map(exp => exp.visit(this, context));
        const code = printer.printList(typescript_1.default.ListFormat.NoSpaceIfEmpty, typescript_1.default.createNodeArray(exps), sourceFile);
        return typescript_1.default.createStringLiteral(code);
    }
    visitKeyedRead(ast, context) {
        debugger;
    }
    visitKeyedWrite(ast, context) {
        debugger;
    }
    visitLiteralArray(ast, context) {
        debugger;
    }
    visitLiteralMap(ast, context) {
        debugger;
    }
    visitLiteralPrimitive(ast, context) {
        const { value } = ast;
        if (typeof value === 'boolean') {
            return typescript_1.default.createLiteral(value);
        }
        else if (typeof value === 'number') {
            return typescript_1.default.createLiteral(value);
        }
        else if (typeof value === 'string') {
            return typescript_1.default.createLiteral(value);
        }
        else {
            debugger;
        }
    }
    visitMethodCall(ast, context) {
        const { name, args, receiver } = ast;
        const receive = receiver.visit(this, context);
        if (!receive) {
            return typescript_1.default.createObjectLiteral([
                typescript_1.default.createPropertyAssignment(`call`, typescript_1.default.createStringLiteral(name)),
                typescript_1.default.createPropertyAssignment(`args`, typescript_1.default.createArrayLiteral(args.map(arg => this.createNodeStringLiteral(arg.visit(this)))))
            ]);
        }
        else {
            const rec = typescript_1.default.createPropertyAccess(receive, name);
            const code = printer.printList(typescript_1.default.ListFormat.NoSpaceIfEmpty, typescript_1.default.createNodeArray([rec]), sourceFile);
            return typescript_1.default.createObjectLiteral([
                typescript_1.default.createPropertyAssignment(`call`, typescript_1.default.createStringLiteral(code)),
                typescript_1.default.createPropertyAssignment(`args`, typescript_1.default.createArrayLiteral(args.map(arg => this.createNodeStringLiteral(arg.visit(this)))))
            ]);
        }
    }
    visitPipe(ast, context) {
        debugger;
    }
    visitPrefixNot(ast, context) {
        debugger;
    }
    visitNonNullAssert(ast, context) {
        debugger;
    }
    visitPropertyRead(ast, context) {
        const { name, receiver } = ast;
        const rec = receiver.visit(this, context);
        if (!rec) {
            return typescript_1.default.createIdentifier(name);
        }
        else {
            return typescript_1.default.createPropertyAccess(rec, name);
        }
    }
    visitPropertyWrite(ast, context) {
        debugger;
    }
    visitQuote(ast, context) {
        debugger;
    }
    visitSafeMethodCall(ast, context) {
        debugger;
    }
    visitSafePropertyRead(ast, context) {
        const { name, receiver } = ast;
        const rec = receiver.visit(this, context);
        if (!rec) {
            return typescript_1.default.createIdentifier(name);
        }
        else {
            return typescript_1.default.createPropertyAccess(rec, name);
        }
    }
    visit(ast, context) {
        return ast.visit(this, context);
    }
}
exports.ExpressionVisitor = ExpressionVisitor;
