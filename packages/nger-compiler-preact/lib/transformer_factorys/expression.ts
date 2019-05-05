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

function createBinaryOperator(operation: string): ts.BinaryOperatorToken {
    switch (operation) {
        case '=':
        default:
            break;
    }
    return ts.createToken(ts.SyntaxKind.EqualsToken)
}

export class ExpressionVisitor implements AstVisitor {
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
        debugger;
    }
    visitFunctionCall(ast: FunctionCall, context: any): any {
        debugger;
    }
    // 
    visitImplicitReceiver(ast: ImplicitReceiver, context: any): any {
        return undefined;
    }
    visitInterpolation(ast: Interpolation, context: any): any {
        debugger;
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
            return ts.createCall(
                ts.createIdentifier(name),
                undefined,
                args.map(arg => arg.visit(this, context) as any)
            )
        } else {
            debugger;
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
            return ts.createStringLiteral(name)
        } else {
            debugger;
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
        debugger;
    }
    visit(ast: AST, context?: any): any {
        return ast.visit(this, context)
    }
}