import {
    BindingType, AstVisitor, Binary,
    Conditional, Chain, FunctionCall,
    ImplicitReceiver, Interpolation, KeyedRead,
    KeyedWrite, LiteralArray, LiteralMap, LiteralPrimitive,
    MethodCall, BindingPipe, PrefixNot, NonNullAssert,
    PropertyRead, PropertyWrite, Quote, SafeMethodCall,
    SafePropertyRead, AST, AstMemoryEfficientTransformer,
} from '@angular/compiler/src/expression_parser/ast'
export { AstMemoryEfficientTransformer, BindingType }
import ts from 'typescript';
const printer = ts.createPrinter()
const sourceFile = ts.createSourceFile(``, ``, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX)
function createBinaryOperator(operation: string): ts.BinaryOperatorToken {
    switch (operation) {
        case '=':
        default:
            break;
    }
    return ts.createToken(ts.SyntaxKind.EqualsToken)
}

export class ExpressionVisitor implements AstVisitor {

    createNodeStringLiteral(node: any) {
        const code = printer.printList(ts.ListFormat.NoSpaceIfEmpty, ts.createNodeArray([node]), sourceFile)
        return ts.createStringLiteral(code);
    }

    visitBinary(ast: Binary, context: any): any {
        debugger;
        return ts.createBinary(
            ast.left.visit(this, context),
            createBinaryOperator(ast.operation),
            ast.right.visit(this, context)
        )
    }
    visitChain(ast: Chain, context: any): any {
        debugger;
    }
    visitConditional(ast: Conditional, context: any): any {
        const { condition, trueExp, falseExp } = ast;
        let item = {
            condition: this.createNodeStringLiteral(condition.visit(this)),
            trueExp: this.createNodeStringLiteral(trueExp.visit(this)),
            falseExp: this.createNodeStringLiteral(falseExp.visit(this))
        }
        return ts.createObjectLiteral([
            ts.createPropertyAssignment('condition', item.condition),
            ts.createPropertyAssignment('trueExp', item.trueExp),
            ts.createPropertyAssignment('falseExp', item.falseExp),
        ])
    }
    visitFunctionCall(ast: FunctionCall, context: any): any {
        debugger;
    }
    // 
    visitImplicitReceiver(ast: ImplicitReceiver, context: any): any {
        return undefined;
    }
    // 插值  返回字符串 合适么
    visitInterpolation(ast: Interpolation, context: any) {
        const { strings, expressions } = ast;
        const exps = expressions.map(exp => exp.visit(this, context))
        const code = printer.printList(ts.ListFormat.NoSpaceIfEmpty, ts.createNodeArray(exps), sourceFile)
        return ts.createStringLiteral(code);
    }
    visitKeyedRead(ast: KeyedRead, context: any): any {
        debugger;
    }
    visitKeyedWrite(ast: KeyedWrite, context: any): any {
        debugger;
    }
    visitLiteralArray(ast: LiteralArray, context: any): any {
        debugger;
    }
    visitLiteralMap(ast: LiteralMap, context: any): any {
        debugger;
    }
    visitLiteralPrimitive(ast: LiteralPrimitive, context: any): any {
        const { value } = ast;
        if (typeof value === 'boolean') {
            return ts.createLiteral(value)
        }
        else if (typeof value === 'number') {
            return ts.createLiteral(value)
        }
        else if (typeof value === 'string') {
            return ts.createLiteral(value)
        } else {
            debugger;
        }
    }
    visitMethodCall(ast: MethodCall, context: any): any {
        const { name, args, receiver } = ast;
        const receive = receiver.visit(this, context);
        if (!receive) {
            return ts.createObjectLiteral([
                ts.createPropertyAssignment(`call`, ts.createStringLiteral(name)),
                ts.createPropertyAssignment(`args`, ts.createArrayLiteral(
                    args.map(arg => this.createNodeStringLiteral(arg.visit(this)))
                ))
            ]);
        } else {
            const rec = ts.createPropertyAccess(
                receive,
                name
            );
            const code = printer.printList(ts.ListFormat.NoSpaceIfEmpty, ts.createNodeArray([rec]), sourceFile)
            return ts.createObjectLiteral([
                ts.createPropertyAssignment(`call`, ts.createStringLiteral(code)),
                ts.createPropertyAssignment(`args`, ts.createArrayLiteral(
                    args.map(arg => this.createNodeStringLiteral(arg.visit(this)))
                ))
            ]);
        }
    }
    visitPipe(ast: BindingPipe, context: any): any {
        debugger;
    }
    visitPrefixNot(ast: PrefixNot, context: any): any {
        debugger;
    }
    visitNonNullAssert(ast: NonNullAssert, context: any): any {
        debugger;
    }
    visitPropertyRead(ast: PropertyRead, context: any): any {
        const { name, receiver } = ast;
        const rec = receiver.visit(this, context)
        if (!rec) {
            return ts.createIdentifier(name)
        } else {
            return ts.createPropertyAccess(
                rec,
                name
            );
        }
    }
    visitPropertyWrite(ast: PropertyWrite, context: any): any {
        debugger;
    }
    visitQuote(ast: Quote, context: any): any {
        debugger;
    }
    visitSafeMethodCall(ast: SafeMethodCall, context: any): any {
        debugger;
    }
    visitSafePropertyRead(ast: SafePropertyRead, context: any): any {
        const { name, receiver } = ast;
        const rec = receiver.visit(this, context)
        if (!rec) {
            return ts.createIdentifier(name)
        } else {
            return ts.createPropertyAccess(
                rec,
                name
            );
        }
    }
    visit(ast: AST, context?: any): any {
        return ast.visit(this, context)
    }
}