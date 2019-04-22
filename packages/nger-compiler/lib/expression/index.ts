import {
    AST, Quote, AstVisitor, NullAstVisitor,
    RecursiveAstVisitor, AstTransformer,
    AstMemoryEfficientTransformer, visitAstChildren,
    EmptyExpr, ImplicitReceiver, Chain, Conditional,
    PropertyRead, PropertyWrite, SafePropertyRead,
    KeyedRead, KeyedWrite, BindingPipe, LiteralPrimitive,
    LiteralArray, LiteralMapKey, LiteralMap,
    Interpolation, Binary, PrefixNot, NonNullAssert,
    MethodCall, SafeMethodCall, FunctionCall, ASTWithSource,
    TemplateBinding,
} from '@angular/compiler/src/expression_parser/ast'
export {
    AST, Quote, AstVisitor, NullAstVisitor, RecursiveAstVisitor,
    AstTransformer, AstMemoryEfficientTransformer, visitAstChildren,
    EmptyExpr, ImplicitReceiver, Chain, Conditional,
    PropertyRead, PropertyWrite, SafePropertyRead,
    KeyedRead, KeyedWrite, BindingPipe, LiteralPrimitive,
    LiteralArray, LiteralMapKey, LiteralMap,
    Interpolation, Binary, PrefixNot, NonNullAssert,
    MethodCall, SafeMethodCall, FunctionCall, ASTWithSource,
    TemplateBinding,
}

export class ExpressionVisitor implements AstVisitor {
    visitBinary(ast: Binary, context: any): any {
        return `visitBinary`
    }
    visitChain(ast: Chain, context: any): any {
        return `visitChain`
    }
    visitConditional(ast: Conditional, context: any): any {
        return `visitConditional`
    }
    visitFunctionCall(ast: FunctionCall, context: any): any {
        return `visitFunctionCall`
    }
    visitImplicitReceiver(ast: ImplicitReceiver, context: any): any {
        return ``
    }
    visitInterpolation(ast: Interpolation, context: any): any {
        return `visitInterpolation`
    }
    visitKeyedRead(ast: KeyedRead, context: any): any {
        return `visitKeyedRead`
    }
    visitKeyedWrite(ast: KeyedWrite, context: any): any {
        return `visitKeyedWrite`
    }
    visitLiteralArray(ast: LiteralArray, context: any): any {
        return `visitLiteralArray`
    }
    visitLiteralMap(ast: LiteralMap, context: any): any {
        return `visitLiteralMap`
    }
    visitLiteralPrimitive(ast: LiteralPrimitive, context: any): any {
        return `visitLiteralPrimitive`
    }
    visitMethodCall(ast: MethodCall, context: any): any {
        return `visitMethodCall`
    }
    visitPipe(ast: BindingPipe, context: any): any {
        return `visitPipe`
    }
    visitPrefixNot(ast: PrefixNot, context: any): any {
        return `visitPrefixNot`
    }
    visitNonNullAssert(ast: NonNullAssert, context: any): any {
        return `visitNonNullAssert`
    }
    visitPropertyRead(ast: PropertyRead, context: any): any {
        return `${ast.receiver.visit(this, context)}${ast.name}`
    }
    visitPropertyWrite(ast: PropertyWrite, context: any): any {
        return `visitPropertyWrite`
    }
    visitQuote(ast: Quote, context: any): any {
        return `visitQuote`
    }
    visitSafeMethodCall(ast: SafeMethodCall, context: any): any {
        return `visitSafeMethodCall`
    }
    visitSafePropertyRead(ast: SafePropertyRead, context: any): any {
        return `visitSafePropertyRead`
    }
    visit?(ast: AST, context?: any): string {
        return ast.visit(this, context)
    }
}

export const expressionVisitor = new ExpressionVisitor();