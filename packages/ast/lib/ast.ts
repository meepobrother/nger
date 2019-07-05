import * as ts from 'typescript';
// import * as morph from 'ts-morph';
import * as util from './util';
import { join } from 'path';

export abstract class Node<T extends ts.Node = ts.Node> {
    decorators: Decorator[] = [];
    parent: Node;
    modifiers: Modifier[] = [];
    node: T;
    docs: JSDoc[] = [];
    from: string;
    abstract visit(visitor: Visitor, context: any): any;
}

export class TypeChecker {
    node: ts.TypeChecker;
    visit(visitor: Visitor, context: any) {
        if (visitor.visitTypeChecker) {
            return visitor.visitTypeChecker(this, context)
        } else {
            throw new Error(`${visitor.name} 没有 visitTypeChecker 方法`)
        }
    }
}

export class Program {
    node: ts.Program;
    typeChecker: TypeChecker;
    visit(visitor: Visitor, context: any) {
        if (visitor.visitProgram) {
            return visitor.visitProgram(this, context)
        } else {
            throw new Error(`${visitor.name} 没有 visitProgram 方法`)
        }
    }
}

export class LanguageService {
    node: ts.LanguageService;
    program: Program;
    visit(visitor: Visitor, context: any) {
        if (visitor.visitLanguageService) {
            return visitor.visitLanguageService(this, context)
        } else {
            throw new Error(`${visitor.name} 没有 visitLanguageService 方法`)
        }
    }

}

export class Diagnostic {
    node: ts.Diagnostic;
    visit(visitor: Visitor, context: any) {
        if (visitor.visitDiagnostic) {
            return visitor.visitDiagnostic(this, context)
        } else {
            throw new Error(`${visitor.name} 没有 visitDiagnostic 方法`)
        }
    }
}

export class Project {
    languageService: LanguageService;
    program: Program;
    typeChecker: TypeChecker;
    ambientModules: Symbol[] = [];
    sourceFiles: SourceFile[] = [];
    preEmitDiagnostics: Diagnostic[] = [];
    visit(visitor: Visitor, context: any) {
        if (visitor.visitProject) {
            return visitor.visitProject(this, context)
        } else {
            throw new Error(`${visitor.name} 没有 visitProject 方法`)
        }
    }
}

export class Type {
    visit(visitor: Visitor, context: any) {
        if (visitor.visitType) {
            return visitor.visitType(this, context)
        } else {
            throw new Error(`${visitor.name} 没有 visitType 方法`)
        }
    }
}

export class SourceFile extends Node<ts.SourceFile> {
    statements: Statement[];
    fileName: string;
    text: string;
    moduleName: string;
    languageVariant: ts.LanguageVariant;
    isDeclarationFile: boolean;
    hasNoDefaultLib: boolean;
    languageVersion: ts.ScriptTarget;
    visit(visitor: Visitor, context: any) {
        if (visitor.visitSourceFile) {
            return visitor.visitSourceFile(this, context)
        } else {
            throw new Error(`${visitor.name} 没有 visitSourceFile 方法`)
        }
    }
}

/**
 * 无用的
 */
export class Statement extends Node {
    visit(visitor: Visitor, context: any) {
        if (visitor.visitStatement) {
            return visitor.visitStatement(this, context)
        } else {
            throw new Error(`${visitor.name} 没有 visitStatement 方法`)
        }
    }
}

export class ClassDeclaration extends Node<ts.ClassDeclaration> {
    members: (ClassElement | PropertyDeclaration | ConstructorDeclaration | MethodDeclaration | SemicolonClassElement | GetAccessorDeclaration | SetAccessorDeclaration)[] = [];
    name: Identifier;
    typeParameters: TypeParameterDeclaration[] = [];
    heritageClauses: HeritageClause[] = [];
    visit(visitor: Visitor, context: any) {
        if (visitor.visitClassDeclaration) {
            return visitor.visitClassDeclaration(this, context)
        } else {
            throw new Error(`${visitor.name} 没有 visitClassDeclaration 方法`)
        }
    }
    getDecorator<T>(name: string): (visitor: Visitor) => T | undefined {
        return (visitor: Visitor): T | undefined => {
            const decorators = this.decorators.map(dec => dec.visit(visitor, {}));
            const item = decorators.find(dec => dec.name === name);
            if (item) {
                if (item.arguments.length === 1) {
                    return item.arguments[0];
                } else {
                    return item.arguments || {}
                }
            }
            return undefined;
        }
    }
}

/**
 * 无用的
 */
export class ClassElement<T extends ts.ClassElement = ts.ClassElement> extends Node<T> {
    name: PropertyName;
    type: TypeNode;
    questionToken: QuestionToken;
    visit(visitor: Visitor, context: any): any {
        if (visitor.visitClassElement) {
            return visitor.visitClassElement(this, context)
        } else {
            throw new Error(`${visitor.name} 没有 visitClassElement 方法`)
        }
    }
}

export class PropertyDeclaration extends ClassElement<ts.PropertyDeclaration>{
    exclamationToken: ExclamationToken;
    initializer: Expression;
    visit(visitor: Visitor, context: any) {
        if (visitor.visitPropertyDeclaration) {
            return visitor.visitPropertyDeclaration(this, context)
        } else {
            throw new Error(`${visitor.name} 没有 visitPropertyDeclaration 方法`)
        }
    }
    getDecorator<T>(name: string): (visitor: Visitor) => T | undefined {
        return (visitor: Visitor): T | undefined => {
            const decorators = this.decorators.map(dec => dec.visit(visitor, {}));
            const item = decorators.find(dec => dec.name === name);
            if (item) {
                if (item.arguments.length === 1) {
                    return item.arguments[0];
                } else {
                    return item.arguments || {}
                }
            }
            return undefined;
        }
    }
}
export class Identifier extends Node<ts.Identifier> {
    escapedText: ts.__String;
    text: string;
    from: string;
    visit(visitor: Visitor, context: any) {
        if (visitor.visitIdentifier) {
            return visitor.visitIdentifier(this, context)
        } else {
            throw new Error(`${visitor.name} 没有 visitIdentifier 方法`)
        }
    }
}
export class TypeParameterDeclaration extends Node<ts.TypeParameterDeclaration> {
    constraint: TypeNode;
    default: TypeNode;
    expression: Expression;
    name: Identifier;
    visit(visitor: Visitor, context: any) {
        if (visitor.visitTypeParameterDeclaration) {
            return visitor.visitTypeParameterDeclaration(this, context)
        } else {
            throw new Error(`${visitor.name} 没有 visitTypeParameterDeclaration 方法`)
        }
    }
}
export class Decorator extends Node<ts.Decorator> {
    expression: LeftHandSideExpression;
    visit(visitor: Visitor, context: any) {
        if (visitor.visitDecorator) {
            return visitor.visitDecorator(this, context)
        } else {
            throw new Error(`${visitor.name} 没有 visitDecorator 方法`)
        }
    }
}
export class ShorthandPropertyAssignment extends Node<ts.ShorthandPropertyAssignment>{
    visit(visitor: Visitor, context: any) {
        if (visitor.visitShorthandPropertyAssignment) {
            return visitor.visitShorthandPropertyAssignment(this, context)
        } else {
            throw new Error(`${visitor.name} 没有 visitShorthandPropertyAssignment 方法`)
        }
    }
}
export class SpreadAssignment extends Node<ts.SpreadAssignment>{
    visit(visitor: Visitor, context: any) {
        if (visitor.visitSpreadAssignment) {
            return visitor.visitSpreadAssignment(this, context)
        } else {
            throw new Error(`${visitor.name} 没有 visitSpreadAssignment 方法`)
        }
    }
}
export class ObjectLiteralElementLike extends Node<ts.ObjectLiteralElementLike>{
    visit(visitor: Visitor, context: any) {
        if (visitor.visitObjectLiteralElementLike) {
            return visitor.visitObjectLiteralElementLike(this, context)
        } else {
            throw new Error(`${visitor.name} 没有 visitObjectLiteralElementLike 方法`)
        }
    }
}
export class PropertyAssignment extends Node<ts.PropertyAssignment>{
    initializer: Expression;
    name: PropertyName;
    questionToken: QuestionToken;
    visit(visitor: Visitor, context: any) {
        if (visitor.visitPropertyAssignment) {
            return visitor.visitPropertyAssignment(this, context)
        } else {
            throw new Error(`${visitor.name} 没有 visitPropertyAssignment 方法`)
        }
    }
}
export class SetAccessorDeclaration extends Node<ts.SetAccessorDeclaration>{
    name: PropertyName;
    body: FunctionBody;
    asteriskToken: AsteriskToken;
    questionToken: QuestionToken;
    exclamationToken: ExclamationToken;
    typeParameters: TypeParameterDeclaration[];
    parameters: ParameterDeclaration[];
    type: TypeNode;
    visit(visitor: Visitor, context: any) {
        if (visitor.visitSetAccessorDeclaration) {
            return visitor.visitSetAccessorDeclaration(this, context)
        } else {
            throw new Error(`${visitor.name} 没有 visitSetAccessorDeclaration 方法`)
        }
    }
    getDecorator<T>(name: string): (visitor: Visitor) => T | undefined {
        return (visitor: Visitor): T | undefined => {
            const decorators = this.decorators.map(dec => dec.visit(visitor, {}));
            const item = decorators.find(dec => dec.name === name);
            if (item) {
                if (item.arguments.length === 1) {
                    return item.arguments[0];
                } else if (item.arguments.length === 0) {
                    return {} as T;
                } else {
                    return item.arguments
                }
            }
            return undefined;
        }
    }
}
export class GetAccessorDeclaration extends Node<ts.GetAccessorDeclaration>{
    name: PropertyName;
    body: FunctionBody;
    asteriskToken: AsteriskToken;
    questionToken: QuestionToken;
    exclamationToken: ExclamationToken;
    typeParameters: TypeParameterDeclaration[];
    parameters: ParameterDeclaration[];
    type: TypeNode;
    visit(visitor: Visitor, context: any) {
        if (visitor.visitGetAccessorDeclaration) {
            return visitor.visitGetAccessorDeclaration(this, context)
        } else {
            throw new Error(`${visitor.name} 没有 visitGetAccessorDeclaration 方法`)
        }
    }
    getDecorator<T>(name: string): (visitor: Visitor) => T | undefined {
        return (visitor: Visitor): T | undefined => {
            const decorators = this.decorators.map(dec => dec.visit(visitor, {}));
            const item = decorators.find(dec => dec.name === name);
            if (item) {
                if (item.arguments.length === 1) {
                    return item.arguments[0];
                } else if (item.arguments.length === 0) {
                    return {} as T;
                } else {
                    return item.arguments
                }
            }
            return undefined;
        }
    }
}
export class CallExpression extends Node<ts.CallExpression> {
    typeArguments: TypeNode[] = [];
    expression: LeftHandSideExpression;
    arguments: Expression[] = [];
    visit(visitor: Visitor, context: any) {
        if (visitor.visitCallExpression) {
            return visitor.visitCallExpression(this, context)
        } else {
            throw new Error(`${visitor.name} 没有 visitCallExpression 方法`)
        }
    }
}
export class ObjectLiteralExpression extends Node<ts.ObjectLiteralExpression> {
    properties: ObjectLiteralElementLike[];
    visit(visitor: Visitor, context: any) {
        if (visitor.visitObjectLiteralExpression) {
            return visitor.visitObjectLiteralExpression(this, context)
        } else {
            throw new Error(`${visitor.name} 没有 visitObjectLiteralExpression 方法`)
        }
    }
}
export type PropertyName = Identifier | StringLiteral | NumericLiteral | ComputedPropertyName;
// export class PropertyName extends Node<ts.PropertyName>{
//     visit(visitor: Visitor, context: any) {
//         if (visitor.visitPropertyName) {
//             return visitor.visitPropertyName(this, context)
//         } else {
//             throw new Error(`${visitor.name} 没有 visitPropertyName 方法`)
//         }
//     }
// }
export type TypeNode = TypeReferenceNode | TupleTypeNode | UnionTypeNode | KeywordTypeNode | FunctionTypeNode | MappedTypeNode | IndexedAccessTypeNode | TypeOperatorNode | TypeLiteralNode | ArrayTypeNode | LiteralTypeNode | TypePredicateNode | ImportTypeNode | ParenthesizedTypeNode | IntersectionTypeNode | ExpressionWithTypeArguments;
// export class TypeNode extends Node<ts.TypeNode>{
//     visit(visitor: Visitor, context: any) {
//         if (visitor.visitTypeNode) {
//             return visitor.visitTypeNode(this, context)
//         } else {
//             throw new Error(`${visitor.name} 没有 visitTypeNode 方法`)
//         }
//     }
// }
export class QuestionToken extends Node<ts.QuestionToken>{
    visit(visitor: Visitor, context: any) {
        if (visitor.visitQuestionToken) {
            return visitor.visitQuestionToken(this, context)
        } else {
            throw new Error(`${visitor.name} 没有 visitQuestionToken 方法`)
        }
    }
}
export class ExclamationToken extends Node<ts.ExclamationToken>{
    visit(visitor: Visitor, context: any) {
        if (visitor.visitExclamationToken) {
            return visitor.visitExclamationToken(this, context)
        } else {
            throw new Error(`${visitor.name} 没有 visitExclamationToken 方法`)
        }
    }
}
export class Expression extends Node<ts.Expression>{
    visit(visitor: Visitor, context: any) {
        if (visitor.visitExpression) {
            return visitor.visitExpression(this, context)
        } else {
            throw new Error(`${visitor.name} 没有 visitExpression 方法`)
        }
    }
}
export class MethodDeclaration extends Node<ts.MethodDeclaration>{
    body: FunctionBody;
    name: PropertyName;
    type: TypeNode;
    parameters: ParameterDeclaration[] = [];
    typeParameters: TypeParameterDeclaration[] = [];
    questionToken: QuestionToken;
    visit(visitor: Visitor, context: any) {
        if (visitor.visitMethodDeclaration) {
            return visitor.visitMethodDeclaration(this, context)
        } else {
            throw new Error(`${visitor.name} 没有 visitMethodDeclaration 方法`)
        }
    }
    getDecorator<T>(name: string): (visitor: Visitor) => T | undefined {
        return (visitor: Visitor): T | undefined => {
            const decorators = this.decorators.map(dec => dec.visit(visitor, {}));
            const item = decorators.find(dec => dec.name === name);
            if (item) {
                if (item.arguments.length === 1) {
                    return item.arguments[0];
                } else if (item.arguments.length === 0) {
                    return {} as T;
                } else {
                    return item.arguments
                }
            }
            return undefined;
        }
    }
}
export class TypeReferenceNode extends Node<ts.TypeReferenceNode>{
    typeArguments: TypeNode[] = [];
    typeName: EntityName;
    visit(visitor: Visitor, context: any) {
        if (visitor.visitTypeReferenceNode) {
            return visitor.visitTypeReferenceNode(this, context)
        } else {
            throw new Error(`${visitor.name} 没有 visitTypeReferenceNode 方法`)
        }
    }
}
export class EntityName extends Node<ts.EntityName>{
    visit(visitor: Visitor, context: any) {
        if (visitor.visitEntityName) {
            return visitor.visitEntityName(this, context)
        } else {
            throw new Error(`${visitor.name} 没有 visitEntityName 方法`)
        }
    }
}
export class QualifiedName extends Node<ts.QualifiedName>{
    visit(visitor: Visitor, context: any) {
        if (visitor.visitQualifiedName) {
            return visitor.visitQualifiedName(this, context)
        } else {
            throw new Error(`${visitor.name} 没有 visitQualifiedName 方法`)
        }
    }
}
export class StringLiteral extends Node<ts.StringLiteral>{
    text: string;
    visit(visitor: Visitor, context: any) {
        if (visitor.visitStringLiteral) {
            return visitor.visitStringLiteral(this, context)
        } else {
            throw new Error(`${visitor.name} 没有 visitStringLiteral 方法`)
        }
    }
    create() {
        return this.text;
    }
}
export class NumericLiteral extends Node<ts.NumericLiteral>{
    text: string;
    isUnterminated: boolean;
    hasExtendedUnicodeEscape: boolean;
    visit(visitor: Visitor, context: any) {
        if (visitor.visitNumericLiteral) {
            return visitor.visitNumericLiteral(this, context)
        } else {
            throw new Error(`${visitor.name} 没有 visitNumericLiteral 方法`)
        }
    }
}
export class ComputedPropertyName extends Node<ts.ComputedPropertyName>{
    expression: Expression;
    visit(visitor: Visitor, context: any) {
        if (visitor.visitComputedPropertyName) {
            return visitor.visitComputedPropertyName(this, context)
        } else {
            throw new Error(`${visitor.name} 没有 visitComputedPropertyName 方法`)
        }
    }
}
export class SemicolonClassElement extends Node<ts.SemicolonClassElement>{
    visit(visitor: Visitor, context: any) {
        if (visitor.visitSemicolonClassElement) {
            return visitor.visitSemicolonClassElement(this, context)
        } else {
            throw new Error(`${visitor.name} 没有 visitSemicolonClassElement 方法`)
        }
    }
}
export class ConstructorDeclaration extends Node<ts.ConstructorDeclaration>{
    body: FunctionBody;
    asteriskToken: AsteriskToken;
    questionToken: QuestionToken;
    exclamationToken: ExclamationToken;
    name: PropertyName;
    parameters: ParameterDeclaration[] = [];
    typeParameters: TypeParameterDeclaration[] = [];
    type: TypeNode;
    visit(visitor: Visitor, context: any) {
        if (visitor.visitConstructorDeclaration) {
            return visitor.visitConstructorDeclaration(this, context)
        } else {
            throw new Error(`${visitor.name} 没有 visitConstructorDeclaration 方法`)
        }
    }
}
export class AsteriskToken extends Node<ts.AsteriskToken>{
    visit(visitor: Visitor, context: any) {
        if (visitor.visitAsteriskToken) {
            return visitor.visitAsteriskToken(this, context)
        } else {
            throw new Error(`${visitor.name} 没有 visitAsteriskToken 方法`)
        }
    }
}
export class Modifier extends Node<ts.Modifier>{
    name: 'static' | 'readonly' | 'declare'
        | 'protected' | 'private' | 'export'
        | 'default' | 'const' | 'async'
        | 'abstract' | 'public';
    visit(visitor: Visitor, context: any) {
        if (visitor.visitModifier) {
            return visitor.visitModifier(this, context)
        } else {
            throw new Error(`${visitor.name} 没有 visitModifier 方法`)
        }
    }
}
export class FunctionBody extends Node<ts.FunctionBody> {
    statements: Statement[];
    visit(visitor: Visitor, context: any) {
        if (visitor.visitFunctionBody) {
            return visitor.visitFunctionBody(this, context)
        } else {
            throw new Error(`${visitor.name} 没有 visitFunctionBody 方法`)
        }
    }
}
export class ParameterDeclaration extends Node<ts.ParameterDeclaration> {
    dotDotDotToken: DotDotDotToken;
    name: BindingName;
    type: TypeNode;
    questionToken: QuestionToken;
    visit(visitor: Visitor, context: any) {
        if (visitor.visitParameterDeclaration) {
            return visitor.visitParameterDeclaration(this, context)
        } else {
            throw new Error(`${visitor.name} 没有 visitParameterDeclaration 方法`)
        }
    }
}
export class TupleTypeNode extends Node<ts.TupleTypeNode> {
    elementTypes: TypeNode[];
    visit(visitor: Visitor, context: any) {
        if (visitor.visitTupleTypeNode) {
            return visitor.visitTupleTypeNode(this, context)
        } else {
            throw new Error(`${visitor.name} 没有 visitTupleTypeNode 方法`)
        }
    }
}

export class ImportDeclaration extends Node<ts.ImportDeclaration>{
    moduleSpecifier: Expression;
    importClause: ImportClause;
    sourcePath: string;
    visit(visitor: Visitor, context: any) {
        if (visitor.visitImportDeclaration) {
            return visitor.visitImportDeclaration(this, context)
        } else {
            throw new Error(`${visitor.name} 没有 visitImportDeclaration 方法`)
        }
    }
}

export class VariableStatement extends Node<ts.VariableStatement>{
    declarationList: VariableDeclarationList;
    visit(visitor: Visitor, context: any) {
        if (visitor.visitVariableStatement) {
            return visitor.visitVariableStatement(this, context)
        } else {
            throw new Error(`${visitor.name} 没有 visitVariableStatement 方法`)
        }
    }
}
export class FunctionDeclaration extends Node<ts.FunctionDeclaration>{
    body: FunctionBody;
    name: Identifier;
    parameters: ParameterDeclaration[];
    typeParameters: TypeParameterDeclaration[];
    type: TypeNode;
    visit(visitor: Visitor, context: any) {
        if (visitor.visitFunctionDeclaration) {
            return visitor.visitFunctionDeclaration(this, context)
        } else {
            throw new Error(`${visitor.name} 没有 visitFunctionDeclaration 方法`)
        }
    }
}
export class InterfaceDeclaration extends Node<ts.InterfaceDeclaration>{
    members: TypeElement[] = [];
    typeParameters: TypeParameterDeclaration[] = [];
    name: Identifier;
    heritageClauses: HeritageClause[] = [];
    visit(visitor: Visitor, context: any) {
        if (visitor.visitInterfaceDeclaration) {
            return visitor.visitInterfaceDeclaration(this, context)
        } else {
            throw new Error(`${visitor.name} 没有 visitInterfaceDeclaration 方法`)
        }
    }
}
export class HeritageClause extends Node<ts.HeritageClause>{
    token: 'extends' | 'implements';
    types: ExpressionWithTypeArguments[];
    visit(visitor: Visitor, context: any) {
        if (visitor.visitHeritageClause) {
            return visitor.visitHeritageClause(this, context)
        } else {
            throw new Error(`${visitor.name} 没有 visitHeritageClause 方法`)
        }
    }
}
export class EnumDeclaration extends Node<ts.EnumDeclaration>{
    members: EnumMember[] = [];
    name: Identifier;
    visit(visitor: Visitor, context: any) {
        if (visitor.visitEnumDeclaration) {
            return visitor.visitEnumDeclaration(this, context)
        } else {
            throw new Error(`${visitor.name} 没有 visitEnumDeclaration 方法`)
        }
    }
}
export class TypeAliasDeclaration extends Node<ts.TypeAliasDeclaration>{
    name: Identifier;
    type: TypeNode;
    typeParameters: TypeParameterDeclaration[] = [];
    visit(visitor: Visitor, context: any) {
        if (visitor.visitTypeAliasDeclaration) {
            return visitor.visitTypeAliasDeclaration(this, context)
        } else {
            throw new Error(`${visitor.name} 没有 visitTypeAliasDeclaration 方法`)
        }
    }
}
export class UnionTypeNode extends Node<ts.UnionTypeNode> {
    types: TypeNode[] = [];
    visit(visitor: Visitor, context: any) {
        if (visitor.visitUnionTypeNode) {
            return visitor.visitUnionTypeNode(this, context)
        } else {
            throw new Error(`${visitor.name} 没有 visitUnionTypeNode 方法`)
        }
    }
}
export class KeywordTypeNode extends Node<ts.KeywordTypeNode>{
    name: util.KeywordType;
    visit(visitor: Visitor, context: any) {
        if (visitor.visitKeywordTypeNode) {
            return visitor.visitKeywordTypeNode(this, context)
        } else {
            throw new Error(`${visitor.name} 没有 visitKeywordTypeNode 方法`)
        }
    }
}
export class EnumMember extends Node<ts.EnumMember>{
    name: PropertyName;
    initializer: Expression;
    visit(visitor: Visitor, context: any) {
        if (visitor.visitEnumMember) {
            return visitor.visitEnumMember(this, context)
        } else {
            throw new Error(`${visitor.name} 没有 visitEnumMember 方法`)
        }
    }
}
export class TypeElement extends Node<ts.TypeElement>{
    name: PropertyName;
    questionToken: QuestionToken;
    visit(visitor: Visitor, context: any) {
        if (visitor.visitTypeElement) {
            return visitor.visitTypeElement(this, context)
        } else {
            throw new Error(`${visitor.name} 没有 visitTypeElement 方法`)
        }
    }
}
export class PropertySignature extends Node<ts.PropertySignature>{
    name: PropertyName;
    questionToken: QuestionToken;
    type: TypeNode;
    initializer: Expression;
    visit(visitor: Visitor, context: any) {
        if (visitor.visitPropertySignature) {
            return visitor.visitPropertySignature(this, context)
        } else {
            throw new Error(`${visitor.name} 没有 visitPropertySignature 方法`)
        }
    }
}
export class FunctionTypeNode extends Node<ts.FunctionTypeNode>{
    typeParameters: TypeParameterDeclaration[];
    parameters: ParameterDeclaration[];
    type: TypeNode;
    visit(visitor: Visitor, context: any) {
        if (visitor.visitFunctionTypeNode) {
            return visitor.visitFunctionTypeNode(this, context)
        } else {
            throw new Error(`${visitor.name} 没有 visitFunctionTypeNode 方法`)
        }
    }
}

export class MethodSignature extends Node<ts.MethodSignature>{
    name: PropertyName;
    type: TypeNode;
    typeParameters: TypeParameterDeclaration[];
    parameters: ParameterDeclaration[];
    questionToken: QuestionToken;
    visit(visitor: Visitor, context: any) {
        if (visitor.visitMethodSignature) {
            return visitor.visitMethodSignature(this, context)
        } else {
            throw new Error(`${visitor.name} 没有 visitMethodSignature 方法`)
        }
    }
}
export class DotDotDotToken extends Node<ts.DotDotDotToken>{
    visit(visitor: Visitor, context: any) {
        if (visitor.visitDotDotDotToken) {
            return visitor.visitDotDotDotToken(this, context)
        } else {
            throw new Error(`${visitor.name} 没有 visitDotDotDotToken 方法`)
        }
    }
}
export type BindingName = ObjectBindingPattern | ArrayBindingPattern | Identifier;
// export class BindingName extends Node<ts.BindingName>{
//     visit(visitor: Visitor, context: any) {
//         if (visitor.visitBindingName) {
//             return visitor.visitBindingName(this, context)
//         } else {
//             throw new Error(`${visitor.name} 没有 visitBindingName 方法`)
//         }
//     }
// }
export class ObjectBindingPattern extends Node<ts.ObjectBindingPattern>{
    visit(visitor: Visitor, context: any) {
        if (visitor.visitObjectBindingPattern) {
            return visitor.visitObjectBindingPattern(this, context)
        } else {
            throw new Error(`${visitor.name} 没有 visitObjectBindingPattern 方法`)
        }
    }
}
export class ArrayBindingPattern extends Node<ts.ArrayBindingPattern>{
    visit(visitor: Visitor, context: any) {
        if (visitor.visitArrayBindingPattern) {
            return visitor.visitArrayBindingPattern(this, context)
        } else {
            throw new Error(`${visitor.name} 没有 visitArrayBindingPattern 方法`)
        }
    }
}
export class ArrayLiteralExpression extends Node<ts.ArrayLiteralExpression>{
    elements: Expression[] = [];
    visit(visitor: Visitor, context: any) {
        if (visitor.visitArrayLiteralExpression) {
            return visitor.visitArrayLiteralExpression(this, context)
        } else {
            throw new Error(`${visitor.name} 没有 visitArrayLiteralExpression 方法`)
        }
    }
}
export class ReturnStatement extends Node<ts.ReturnStatement>{
    expression: Expression;
    visit(visitor: Visitor, context: any) {
        if (visitor.visitReturnStatement) {
            return visitor.visitReturnStatement(this, context)
        } else {
            throw new Error(`${visitor.name} 没有 visitReturnStatement 方法`)
        }
    }
}
export class AsExpression extends Node<ts.AsExpression>{
    type: TypeNode;
    expression: Expression;
    visit(visitor: Visitor, context: any) {
        if (visitor.visitAsExpression) {
            return visitor.visitAsExpression(this, context)
        } else {
            throw new Error(`${visitor.name} 没有 visitAsExpression 方法`)
        }
    }
}
export class VariableDeclarationList extends Node<ts.VariableDeclarationList>{
    declarations: VariableDeclaration[];
    visit(visitor: Visitor, context: any) {
        if (visitor.visitVariableDeclarationList) {
            return visitor.visitVariableDeclarationList(this, context)
        } else {
            throw new Error(`${visitor.name} 没有 visitVariableDeclarationList 方法`)
        }
    }
}
export class VariableDeclaration extends Node<ts.VariableDeclaration>{
    name: BindingName;
    exclamationToken: ExclamationToken;
    type: TypeNode;
    initializer: Expression;
    visit(visitor: Visitor, context: any) {
        if (visitor.visitVariableDeclaration) {
            return visitor.visitVariableDeclaration(this, context)
        } else {
            throw new Error(`${visitor.name} 没有 visitVariableDeclaration 方法`)
        }
    }
}
export class AwaitExpression extends Node<ts.AwaitExpression>{
    expression: UnaryExpression;
    visit(visitor: Visitor, context: any) {
        if (visitor.visitAwaitExpression) {
            return visitor.visitAwaitExpression(this, context)
        } else {
            throw new Error(`${visitor.name} 没有 visitAwaitExpression 方法`)
        }
    }
}
export class ArrowFunction extends Node<ts.ArrowFunction>{
    equalsGreaterThanToken: EqualsGreaterThanToken;
    body: ConciseBody;
    visit(visitor: Visitor, context: any) {
        if (visitor.visitArrowFunction) {
            return visitor.visitArrowFunction(this, context)
        } else {
            throw new Error(`${visitor.name} 没有 visitArrowFunction 方法`)
        }
    }
}
export class ConciseBody extends Node<ts.ConciseBody>{
    visit(visitor: Visitor, context: any) {
        if (visitor.visitConciseBody) {
            return visitor.visitConciseBody(this, context)
        } else {
            throw new Error(`${visitor.name} 没有 visitConciseBody 方法`)
        }
    }
}
export class EqualsGreaterThanToken extends Node<ts.ConciseBody>{
    visit(visitor: Visitor, context: any) {
        if (visitor.visitEqualsGreaterThanToken) {
            return visitor.visitEqualsGreaterThanToken(this, context)
        } else {
            throw new Error(`${visitor.name} 没有 visitEqualsGreaterThanToken 方法`)
        }
    }
}
export class BooleanLiteral extends Node<ts.BooleanLiteral>{
    value: boolean;
    visit(visitor: Visitor, context: any) {
        if (visitor.visitBooleanLiteral) {
            return visitor.visitBooleanLiteral(this, context)
        } else {
            throw new Error(`${visitor.name} 没有 visitBooleanLiteral 方法`)
        }
    }
}
export class UnaryExpression extends Node<ts.UnaryExpression>{
    visit(visitor: Visitor, context: any) {
        if (visitor.visitUnaryExpression) {
            return visitor.visitUnaryExpression(this, context)
        } else {
            throw new Error(`${visitor.name} 没有 visitUnaryExpression 方法`)
        }
    }
}
export class ElementAccessExpression extends Node<ts.ElementAccessExpression>{
    expression: LeftHandSideExpression;
    argumentExpression: Expression;
    visit(visitor: Visitor, context: any) {
        if (visitor.visitElementAccessExpression) {
            return visitor.visitElementAccessExpression(this, context)
        } else {
            throw new Error(`${visitor.name} 没有 visitElementAccessExpression 方法`)
        }
    }
}
export class ParenthesizedExpression extends Node<ts.ParenthesizedExpression>{
    visit(visitor: Visitor, context: any) {
        if (visitor.visitParenthesizedExpression) {
            return visitor.visitParenthesizedExpression(this, context)
        } else {
            throw new Error(`${visitor.name} 没有 visitParenthesizedExpression 方法`)
        }
    }
}

export class SuperExpression extends Node<ts.SuperExpression>{
    visit(visitor: Visitor, context: any) {
        if (visitor.visitSuperExpression) {
            return visitor.visitSuperExpression(this, context)
        } else {
            throw new Error(`${visitor.name} 没有 visitSuperExpression 方法`)
        }
    }
}

export class ThisExpression extends Node<ts.ThisExpression>{
    visit(visitor: Visitor, context: any) {
        if (visitor.visitThisExpression) {
            return visitor.visitThisExpression(this, context)
        } else {
            throw new Error(`${visitor.name} 没有 visitThisExpression 方法`)
        }
    }
}
export class PropertyAccessExpression extends Node<ts.PropertyAccessExpression>{
    expression: LeftHandSideExpression;
    name: Identifier;
    visit(visitor: Visitor, context: any) {
        if (visitor.visitPropertyAccessExpression) {
            return visitor.visitPropertyAccessExpression(this, context)
        } else {
            throw new Error(`${visitor.name} 没有 visitPropertyAccessExpression 方法`)
        }
    }
}
export class PrefixUnaryExpression extends Node<ts.PrefixUnaryExpression>{
    visit(visitor: Visitor, context: any) {
        if (visitor.visitPrefixUnaryExpression) {
            return visitor.visitPrefixUnaryExpression(this, context)
        } else {
            throw new Error(`${visitor.name} 没有 visitPrefixUnaryExpression 方法`)
        }
    }
}

export class NullLiteral extends Node<ts.PrefixUnaryExpression>{
    visit(visitor: Visitor, context: any) {
        if (visitor.visitNullLiteral) {
            return visitor.visitNullLiteral(this, context)
        } else {
            throw new Error(`${visitor.name} 没有 visitNullLiteral 方法`)
        }
    }
}

export class NoSubstitutionTemplateLiteral extends Node<ts.NoSubstitutionTemplateLiteral>{
    visit(visitor: Visitor, context: any) {
        if (visitor.visitNoSubstitutionTemplateLiteral) {
            return visitor.visitNoSubstitutionTemplateLiteral(this, context)
        } else {
            throw new Error(`${visitor.name} 没有 visitNoSubstitutionTemplateLiteral 方法`)
        }
    }
}

export class TemplateExpression extends Node<ts.TemplateExpression>{
    visit(visitor: Visitor, context: any) {
        if (visitor.visitTemplateExpression) {
            return visitor.visitTemplateExpression(this, context)
        } else {
            throw new Error(`${visitor.name} 没有 visitTemplateExpression 方法`)
        }
    }
}

export class NewExpression extends Node<ts.NewExpression>{
    visit(visitor: Visitor, context: any) {
        if (visitor.visitNewExpression) {
            return visitor.visitNewExpression(this, context)
        } else {
            throw new Error(`${visitor.name} 没有 visitNewExpression 方法`)
        }
    }
}

export class IfStatement extends Node<ts.IfStatement>{
    expression: Expression;
    thenStatement: Statement;
    elseStatement: Statement;
    visit(visitor: Visitor, context: any) {
        if (visitor.visitIfStatement) {
            return visitor.visitIfStatement(this, context)
        } else {
            throw new Error(`${visitor.name} 没有 visitIfStatement 方法`)
        }
    }
}
export class ForOfStatement extends Node<ts.ForOfStatement>{
    awaitModifier: AwaitKeywordToken;
    initializer: Expression | VariableDeclarationList;
    expression: Expression;
    visit(visitor: Visitor, context: any) {
        if (visitor.visitForOfStatement) {
            return visitor.visitForOfStatement(this, context)
        } else {
            throw new Error(`${visitor.name} 没有 visitForOfStatement 方法`)
        }
    }
}
export class ForInitializer extends Node<ts.ForInitializer>{
    initializer: ForInitializer;
    condition: Expression;
    incrementor: Expression;
    visit(visitor: Visitor, context: any) {
        if (visitor.visitForInitializer) {
            return visitor.visitForInitializer(this, context)
        } else {
            throw new Error(`${visitor.name} 没有 visitForInitializer 方法`)
        }
    }
}
export class AwaitKeywordToken extends Node<ts.AwaitKeywordToken>{
    visit(visitor: Visitor, context: any) {
        if (visitor.visitAwaitKeywordToken) {
            return visitor.visitAwaitKeywordToken(this, context)
        } else {
            throw new Error(`${visitor.name} 没有 visitAwaitKeywordToken 方法`)
        }
    }
}
export class ForInStatement extends Node<ts.ForInStatement>{
    initializer: Expression | VariableDeclarationList;
    expression: Expression;
    visit(visitor: Visitor, context: any) {
        if (visitor.visitForInStatement) {
            return visitor.visitForInStatement(this, context)
        } else {
            throw new Error(`${visitor.name} 没有 visitForInStatement 方法`)
        }
    }
}
export class SwitchStatement extends Node<ts.SwitchStatement>{
    expression: Expression;
    caseBlock: CaseBlock;
    possiblyExhaustive: boolean;
    visit(visitor: Visitor, context: any) {
        if (visitor.visitSwitchStatement) {
            return visitor.visitSwitchStatement(this, context)
        } else {
            throw new Error(`${visitor.name} 没有 visitSwitchStatement 方法`)
        }
    }
}
export class CaseBlock extends Node<ts.CaseBlock>{
    clauses: CaseOrDefaultClause[];
    visit(visitor: Visitor, context: any) {
        if (visitor.visitCaseBlock) {
            return visitor.visitCaseBlock(this, context)
        } else {
            throw new Error(`${visitor.name} 没有 visitCaseBlock 方法`)
        }
    }
}
export class CaseOrDefaultClause extends Node<ts.CaseOrDefaultClause>{
    visit(visitor: Visitor, context: any) {
        if (visitor.visitCaseOrDefaultClause) {
            return visitor.visitCaseOrDefaultClause(this, context)
        } else {
            throw new Error(`${visitor.name} 没有 visitCaseOrDefaultClause 方法`)
        }
    }
}
export class CaseClause extends Node<ts.CaseClause>{
    expression: Expression;
    statements: Statement[];
    visit(visitor: Visitor, context: any) {
        if (visitor.visitCaseClause) {
            return visitor.visitCaseClause(this, context)
        } else {
            throw new Error(`${visitor.name} 没有 visitCaseClause 方法`)
        }
    }
}
export class DefaultClause extends Node<ts.DefaultClause>{
    statements: Statement[];
    visit(visitor: Visitor, context: any) {
        if (visitor.visitDefaultClause) {
            return visitor.visitDefaultClause(this, context)
        } else {
            throw new Error(`${visitor.name} 没有 visitDefaultClause 方法`)
        }
    }
}
export class ImportClause extends Node<ts.ImportClause>{
    namedBindings: NamedImportBindings;
    name: Identifier;
    visit(visitor: Visitor, context: any) {
        if (visitor.visitImportClause) {
            return visitor.visitImportClause(this, context)
        } else {
            throw new Error(`${visitor.name} 没有 visitImportClause 方法`)
        }
    }
}
export type NamedImportBindings = NamespaceImport | NamedImports
// export class NamedImportBindings extends Node<ts.NamedImportBindings>{
//     visit(visitor: Visitor, context: any) {
//         if (visitor.visitNamedImportBindings) {
//             return visitor.visitNamedImportBindings(this, context)
//         } else {
//             throw new Error(`${visitor.name} 没有 visitNamedImportBindings 方法`)
//         }
//     }
// }
export class NamespaceImport extends Node<ts.NamespaceImport>{
    name: Identifier;
    visit(visitor: Visitor, context: any) {
        if (visitor.visitNamespaceImport) {
            return visitor.visitNamespaceImport(this, context)
        } else {
            throw new Error(`${visitor.name} 没有 visitNamespaceImport 方法`)
        }
    }
}
export class NamedImports extends Node<ts.NamedImports>{
    elements: ImportSpecifier[];
    visit(visitor: Visitor, context: any) {
        if (visitor.visitNamedImports) {
            return visitor.visitNamedImports(this, context)
        } else {
            throw new Error(`${visitor.name} 没有 visitNamedImports 方法`)
        }
    }
}
export class ImportSpecifier extends Node<ts.ImportSpecifier>{
    propertyName: Identifier;
    name: Identifier;
    visit(visitor: Visitor, context: any) {
        if (visitor.visitImportSpecifier) {
            return visitor.visitImportSpecifier(this, context)
        } else {
            throw new Error(`${visitor.name} 没有 visitImportSpecifier 方法`)
        }
    }
}
export class LeftHandSideExpression extends Node<ts.LeftHandSideExpression> {
    visit(visitor: Visitor, context: any) {
        if (visitor.visitLeftHandSideExpression) {
            return visitor.visitLeftHandSideExpression(this, context)
        } else {
            throw new Error(`${visitor.name} 没有 visitLeftHandSideExpression 方法`)
        }
    }
}

export class ExpressionWithTypeArguments extends Node<ts.ExpressionWithTypeArguments>{
    expression: LeftHandSideExpression;
    typeArguments: TypeNode[] = [];
    visit(visitor: Visitor, context: any) {
        if (visitor.visitExpressionWithTypeArguments) {
            return visitor.visitExpressionWithTypeArguments(this, context)
        } else {
            throw new Error(`${visitor.name} 没有 visitExpressionWithTypeArguments 方法`)
        }
    }
}

export class ExpressionStatement extends Node<ts.ExpressionStatement>{
    expression: Expression;
    visit(visitor: Visitor, context: any) {
        if (visitor.visitExpressionStatement) {
            return visitor.visitExpressionStatement(this, context)
        } else {
            throw new Error(`${visitor.name} 没有 visitExpressionStatement 方法`)
        }
    }
}

export class BreakStatement extends Node<ts.BreakStatement>{
    label: Identifier;
    visit(visitor: Visitor, context: any) {
        if (visitor.visitBreakStatement) {
            return visitor.visitBreakStatement(this, context)
        } else {
            throw new Error(`${visitor.name} 没有 visitBreakStatement 方法`)
        }
    }
}

export class ThrowStatement extends Node<ts.ThrowStatement>{
    expression: Expression;
    visit(visitor: Visitor, context: any) {
        if (visitor.visitThrowStatement) {
            return visitor.visitThrowStatement(this, context)
        } else {
            throw new Error(`${visitor.name} 没有 visitThrowStatement 方法`)
        }
    }
}

export class DebuggerStatement extends Node<ts.DebuggerStatement>{
    visit(visitor: Visitor, context: any) {
        if (visitor.visitDebuggerStatement) {
            return visitor.visitDebuggerStatement(this, context)
        } else {
            throw new Error(`${visitor.name} 没有 visitDebuggerStatement 方法`)
        }
    }
}

export class ExportDeclaration extends Node<ts.ExportDeclaration>{
    exportClause: NamedExports;
    moduleSpecifier: Expression;
    name: Identifier | NumericLiteral | StringLiteral;
    visit(visitor: Visitor, context: any) {
        if (visitor.visitExportDeclaration) {
            return visitor.visitExportDeclaration(this, context)
        } else {
            throw new Error(`${visitor.name} 没有 visitExportDeclaration 方法`)
        }
    }
}

export class Symbol {
    visit(visitor: Visitor, context: any) {
        if (visitor.visitSymbol) {
            return visitor.visitSymbol(this, context)
        } else {
            throw new Error(`${visitor.name} 没有 visitSymbol 方法`)
        }
    }
}

export class NamedExports extends Node<ts.NamedExports>{
    elements: ExportSpecifier[];
    visit(visitor: Visitor, context: any) {
        if (visitor.visitNamedExports) {
            return visitor.visitNamedExports(this, context)
        } else {
            throw new Error(`${visitor.name} 没有 visitNamedExports 方法`)
        }
    }
}

export class ExportSpecifier extends Node<ts.ExportSpecifier>{
    propertyName: Identifier;
    name: Identifier;
    visit(visitor: Visitor, context: any) {
        if (visitor.visitExportSpecifier) {
            return visitor.visitExportSpecifier(this, context)
        } else {
            throw new Error(`${visitor.name} 没有 visitExportSpecifier 方法`)
        }
    }
}

export class ExportAssignment extends Node<ts.ExportAssignment>{
    visit(visitor: Visitor, context: any) {
        if (visitor.visitExportAssignment) {
            return visitor.visitExportAssignment(this, context)
        } else {
            throw new Error(`${visitor.name} 没有 visitExportAssignment 方法`)
        }
    }
}
export class ConditionalExpression extends Node<ts.ConditionalExpression>{
    visit(visitor: Visitor, context: any) {
        if (visitor.visitConditionalExpression) {
            return visitor.visitConditionalExpression(this, context)
        } else {
            throw new Error(`${visitor.name} 没有 visitConditionalExpression 方法`)
        }
    }
}
export class SpreadElement extends Node<ts.SpreadElement>{
    visit(visitor: Visitor, context: any) {
        if (visitor.visitSpreadElement) {
            return visitor.visitSpreadElement(this, context)
        } else {
            throw new Error(`${visitor.name} 没有 visitSpreadElement 方法`)
        }
    }
}
export class EmptyStatement extends Node<ts.EmptyStatement>{
    visit(visitor: Visitor, context: any) {
        if (visitor.visitEmptyStatement) {
            return visitor.visitEmptyStatement(this, context)
        } else {
            throw new Error(`${visitor.name} 没有 visitEmptyStatement 方法`)
        }
    }
}
export class RegularExpressionLiteral extends Node<ts.RegularExpressionLiteral>{
    visit(visitor: Visitor, context: any) {
        if (visitor.visitRegularExpressionLiteral) {
            return visitor.visitRegularExpressionLiteral(this, context)
        } else {
            throw new Error(`${visitor.name} 没有 visitRegularExpressionLiteral 方法`)
        }
    }
}
export class TaggedTemplateExpression extends Node<ts.TaggedTemplateExpression>{
    visit(visitor: Visitor, context: any) {
        if (visitor.visitTaggedTemplateExpression) {
            return visitor.visitTaggedTemplateExpression(this, context)
        } else {
            throw new Error(`${visitor.name} 没有 visitTaggedTemplateExpression 方法`)
        }
    }
}

export class TryStatement extends Node<ts.TryStatement>{
    visit(visitor: Visitor, context: any) {
        if (visitor.visitTryStatement) {
            return visitor.visitTryStatement(this, context)
        } else {
            throw new Error(`${visitor.name} 没有 visitTryStatement 方法`)
        }
    }
}

export class ImportEqualsDeclaration extends Node<ts.ImportEqualsDeclaration>{
    name: Identifier;
    moduleReference: ModuleReference;
    visit(visitor: Visitor, context: any) {
        if (visitor.visitImportEqualsDeclaration) {
            return visitor.visitImportEqualsDeclaration(this, context)
        } else {
            throw new Error(`${visitor.name} 没有 visitImportEqualsDeclaration 方法`)
        }
    }
}

export class ModuleReference extends Node<ts.ModuleReference>{
    visit(visitor: Visitor, context: any) {
        if (visitor.visitModuleReference) {
            return visitor.visitModuleReference(this, context)
        } else {
            throw new Error(`${visitor.name} 没有 visitModuleReference 方法`)
        }
    }
}

export class ContinueStatement extends Node<ts.ContinueStatement>{
    label: Identifier;
    visit(visitor: Visitor, context: any) {
        if (visitor.visitContinueStatement) {
            return visitor.visitContinueStatement(this, context)
        } else {
            throw new Error(`${visitor.name} 没有 visitContinueStatement 方法`)
        }
    }
}

export class JSDoc extends Node<ts.JSDoc>{
    comment: string;
    tags: JSDocTag[] = [];
    visit(visitor: Visitor, context: any) {
        if (visitor.visitJSDoc) {
            return visitor.visitJSDoc(this, context)
        } else {
            throw new Error(`${visitor.name} 没有 visitJSDoc 方法`)
        }
    }
}

export class JSDocTag extends Node<ts.JSDocTag>{
    tagName: Identifier;
    comment: string;
    visit(visitor: Visitor, context: any) {
        if (visitor.visitJSDocTag) {
            return visitor.visitJSDocTag(this, context)
        } else {
            throw new Error(`${visitor.name} 没有 visitJSDocTag 方法`)
        }
    }
}

export class ConstructSignatureDeclaration extends Node<ts.ConstructSignatureDeclaration>{
    name: PropertyName;
    typeParameters: TypeParameterDeclaration[] = [];
    parameters: ParameterDeclaration[] = [];
    type: TypeNode;
    questionToken: QuestionToken;
    visit(visitor: Visitor, context: any) {
        if (visitor.visitConstructSignatureDeclaration) {
            return visitor.visitConstructSignatureDeclaration(this, context)
        } else {
            throw new Error(`${visitor.name} 没有 visitConstructSignatureDeclaration 方法`)
        }
    }
}

export class CallSignatureDeclaration extends Node<ts.CallSignatureDeclaration>{
    name: PropertyName;
    typeParameters: TypeParameterDeclaration[] = [];
    parameters: ParameterDeclaration[] = [];
    type: TypeNode;
    questionToken: QuestionToken;
    visit(visitor: Visitor, context: any) {
        if (visitor.visitCallSignatureDeclaration) {
            return visitor.visitCallSignatureDeclaration(this, context)
        } else {
            throw new Error(`${visitor.name} 没有 visitCallSignatureDeclaration 方法`)
        }
    }
}
export class IndexSignatureDeclaration extends Node<ts.IndexSignatureDeclaration>{
    name: PropertyName;
    typeParameters: TypeParameterDeclaration[];
    parameters: ParameterDeclaration[];
    type: TypeNode;
    questionToken: QuestionToken;
    visit(visitor: Visitor, context: any) {
        if (visitor.visitIndexSignatureDeclaration) {
            return visitor.visitIndexSignatureDeclaration(this, context)
        } else {
            throw new Error(`${visitor.name} 没有 visitIndexSignatureDeclaration 方法`)
        }
    }
}

export class MappedTypeNode extends Node<ts.MappedTypeNode>{
    readonlyToken: ReadonlyToken | PlusToken | MinusToken;
    typeParameter: TypeParameterDeclaration;
    questionToken: QuestionToken | PlusToken | MinusToken;
    type: TypeNode;
    visit(visitor: Visitor, context: any) {
        if (visitor.visitMappedTypeNode) {
            return visitor.visitMappedTypeNode(this, context)
        } else {
            throw new Error(`${visitor.name} 没有 visitMappedTypeNode 方法`)
        }
    }
}

export class MinusToken extends Node<ts.ReadonlyToken>{
    visit(visitor: Visitor, context: any) {
        if (visitor.visitMinusToken) {
            return visitor.visitMinusToken(this, context)
        } else {
            throw new Error(`${visitor.name} 没有 visitMinusToken 方法`)
        }
    }
}

export class PlusToken extends Node<ts.ReadonlyToken>{
    visit(visitor: Visitor, context: any) {
        if (visitor.visitPlusToken) {
            return visitor.visitPlusToken(this, context)
        } else {
            throw new Error(`${visitor.name} 没有 visitPlusToken 方法`)
        }
    }
}

export class ReadonlyToken extends Node<ts.ReadonlyToken>{
    visit(visitor: Visitor, context: any) {
        if (visitor.visitReadonlyToken) {
            return visitor.visitReadonlyToken(this, context)
        } else {
            throw new Error(`${visitor.name} 没有 visitReadonlyToken 方法`)
        }
    }
}

export class IndexedAccessTypeNode extends Node<ts.IndexedAccessTypeNode>{
    visit(visitor: Visitor, context: any) {
        if (visitor.visitIndexedAccessTypeNode) {
            return visitor.visitIndexedAccessTypeNode(this, context)
        } else {
            throw new Error(`${visitor.name} 没有 visitIndexedAccessTypeNode 方法`)
        }
    }
}

export class TypeOperatorNode extends Node<ts.TypeOperatorNode>{
    visit(visitor: Visitor, context: any) {
        if (visitor.visitTypeOperatorNode) {
            return visitor.visitTypeOperatorNode(this, context)
        } else {
            throw new Error(`${visitor.name} 没有 visitTypeOperatorNode 方法`)
        }
    }
}

export class BinaryExpression extends Node<ts.BinaryExpression>{
    left: Expression;
    operatorToken: BinaryOperatorToken;
    right: Expression;
    visit(visitor: Visitor, context: any) {
        if (visitor.visitBinaryExpression) {
            return visitor.visitBinaryExpression(this, context)
        } else {
            throw new Error(`${visitor.name} 没有 visitBinaryExpression 方法`)
        }
    }
}

export class BinaryOperatorToken extends Node<ts.BinaryOperatorToken>{
    visit(visitor: Visitor, context: any) {
        if (visitor.visitBinaryOperatorToken) {
            return visitor.visitBinaryOperatorToken(this, context)
        } else {
            throw new Error(`${visitor.name} 没有 visitBinaryOperatorToken 方法`)
        }
    }
}
export class ArrayTypeNode extends Node<ts.ArrayTypeNode>{
    elementType: TypeNode;
    visit(visitor: Visitor, context: any) {
        if (visitor.visitArrayTypeNode) {
            return visitor.visitArrayTypeNode(this, context)
        } else {
            throw new Error(`${visitor.name} 没有 visitArrayTypeNode 方法`)
        }
    }
}

export class LiteralTypeNode extends Node<ts.LiteralTypeNode>{
    visit(visitor: Visitor, context: any) {
        if (visitor.visitLiteralTypeNode) {
            return visitor.visitLiteralTypeNode(this, context)
        } else {
            throw new Error(`${visitor.name} 没有 visitLiteralTypeNode 方法`)
        }
    }
}

export class TypeLiteralNode extends Node<ts.TypeLiteralNode>{
    members: TypeElement;
    visit(visitor: Visitor, context: any) {
        if (visitor.visitTypeLiteralNode) {
            return visitor.visitTypeLiteralNode(this, context)
        } else {
            throw new Error(`${visitor.name} 没有 visitTypeLiteralNode 方法`)
        }
    }
}
export class TypePredicateNode extends Node<ts.TypePredicateNode>{
    parameterName: Identifier | ThisTypeNode;
    type: TypeNode;
    visit(visitor: Visitor, context: any) {
        if (visitor.visitTypePredicateNode) {
            return visitor.visitTypePredicateNode(this, context)
        } else {
            throw new Error(`${visitor.name} 没有 visitTypePredicateNode 方法`)
        }
    }
}
export class ImportTypeNode extends Node<ts.ImportTypeNode>{
    visit(visitor: Visitor, context: any) {
        if (visitor.visitImportTypeNode) {
            return visitor.visitImportTypeNode(this, context)
        } else {
            throw new Error(`${visitor.name} 没有 visitImportTypeNode 方法`)
        }
    }
}
export class ParenthesizedTypeNode extends Node<ts.ParenthesizedTypeNode>{
    visit(visitor: Visitor, context: any) {
        if (visitor.visitParenthesizedTypeNode) {
            return visitor.visitParenthesizedTypeNode(this, context)
        } else {
            throw new Error(`${visitor.name} 没有 visitParenthesizedTypeNode 方法`)
        }
    }
}
export class IntersectionTypeNode extends Node<ts.IntersectionTypeNode>{
    visit(visitor: Visitor, context: any) {
        if (visitor.visitIntersectionTypeNode) {
            return visitor.visitIntersectionTypeNode(this, context)
        } else {
            throw new Error(`${visitor.name} 没有 visitIntersectionTypeNode 方法`)
        }
    }
}
export class ThisTypeNode extends Node<ts.ThisTypeNode>{
    visit(visitor: Visitor, context: any) {
        if (visitor.visitThisTypeNode) {
            return visitor.visitThisTypeNode(this, context)
        } else {
            throw new Error(`${visitor.name} 没有 visitThisTypeNode 方法`)
        }
    }
}

export interface Visitor<C = any, O = any> {
    name: string;
    visitAsteriskToken?(node: AsteriskToken, context: C): O;
    visitModuleReference?(node: ModuleReference, context: C): O;
    visitImportEqualsDeclaration?(node: ImportEqualsDeclaration, context: C): O;
    visitEqualsGreaterThanToken?(node: EqualsGreaterThanToken, context: C): O;
    visitConciseBody?(node: ConciseBody, context: C): O;
    visitDiagnostic?(node: Diagnostic, context: C): O;
    visitTypeChecker?(node: TypeChecker, context: C): O;
    visitProgram?(node: Program, context: C): O;
    visitLanguageService?(node: LanguageService, context: C): O;
    visitProject?(node: Project, context: C): O;
    visitSymbol?(node: Symbol, context: C): O;
    visitType?(node: Type, context: C): O;
    visitExportSpecifier?(node: ExportSpecifier, context: C): O;
    visit?(node: Node, context: C): O;
    visitNamedExports?(node: NamedExports, context: C): O;
    visitSpreadElement?(node: SpreadElement, context: C): O;
    visitIntersectionTypeNode?(node: IntersectionTypeNode, context: C): O;
    visitTryStatement?(node: TryStatement, context: C): O;
    visitTaggedTemplateExpression?(node: TaggedTemplateExpression, context: C): O;
    visitRegularExpressionLiteral?(node: RegularExpressionLiteral, context: C): O;
    visitEmptyStatement?(node: EmptyStatement, context: C): O;
    visitConditionalExpression?(node: ConditionalExpression, context: C): O;
    visitExportAssignment?(node: ExportAssignment, context: C): O;
    visitNoSubstitutionTemplateLiteral?(node: NoSubstitutionTemplateLiteral, context: C): O;
    visitCallSignatureDeclaration?(node: CallSignatureDeclaration, context: C): O;
    visitParenthesizedTypeNode?(node: ParenthesizedTypeNode, context: C): O;
    visitConstructSignatureDeclaration?(node: ConstructSignatureDeclaration, context: C): O;
    visitNullLiteral?(node: NullLiteral, context: C): O;
    visitImportTypeNode?(node: ImportTypeNode, context: C): O;
    visitSuperExpression?(node: SuperExpression, context: C): O;
    visitExportDeclaration?(node: ExportDeclaration, context: C): O;
    visitThrowStatement?(node: ThrowStatement, context: C): O;
    visitDebuggerStatement?(node: DebuggerStatement, context: C): O;
    visitParenthesizedExpression?(node: ParenthesizedExpression, context: C): O;
    visitNewExpression?(node: NewExpression, context: C): O;
    visitTemplateExpression?(node: TemplateExpression, context: C): O;
    visitPrefixUnaryExpression?(node: PrefixUnaryExpression, context: C): O;
    visitLiteralTypeNode?(node: LiteralTypeNode, context: C): O;
    visitArrayTypeNode?(node: ArrayTypeNode, context: C): O;
    visitTypePredicateNode?(node: TypePredicateNode, context: C): O;
    visitThisTypeNode?(node: ThisTypeNode, context: C): O;
    visitThisExpression?(node: ThisExpression, context: C): O;
    visitElementAccessExpression?(node: ElementAccessExpression, context: C): O;
    visitBinaryOperatorToken?(node: BinaryOperatorToken, context: C): O;
    visitTypeLiteralNode?(node: TypeLiteralNode, context: C): O;
    visitBinaryExpression?(node: BinaryExpression, context: C): O;
    visitTypeOperatorNode?(node: TypeOperatorNode, context: C): O;
    visitIndexedAccessTypeNode?(node: IndexedAccessTypeNode, context: C): O;
    visitMinusToken?(node: MinusToken, context: C): O;
    visitPlusToken?(node: PlusToken, context: C): O;
    visitReadonlyToken?(node: ReadonlyToken, context: C): O;
    visitMappedTypeNode?(node: MappedTypeNode, context: C): O;
    visitIndexSignatureDeclaration?(node: IndexSignatureDeclaration, context: C): O;
    visitContinueStatement?(node: ContinueStatement, context: C): O;
    visitBreakStatement?(node: BreakStatement, context: C): O;
    visitExpressionStatement?(node: ExpressionStatement, context: C): O;
    visitCaseBlock?(node: CaseBlock, context: C): O;
    visitCaseOrDefaultClause?(node: CaseOrDefaultClause, context: C): O;
    visitCaseClause?(node: CaseClause, context: C): O;
    visitDefaultClause?(node: DefaultClause, context: C): O;
    visitForInitializer?(node: ForInitializer, context: C): O;
    visitAwaitKeywordToken?(node: AwaitKeywordToken, context: C): O;
    visitExpressionWithTypeArguments?(node: ExpressionWithTypeArguments, context: C): O;
    visitJSDocTag?(node: JSDocTag, context: C): O;
    visitJSDoc?(node: JSDoc, context: C): O;
    visitStatement?(node: Statement, context: C): O;
    visitNamedImportBindings?(node: NamedImportBindings, context: C): O;
    visitShorthandPropertyAssignment?(node: ShorthandPropertyAssignment, context: C): O;
    visitSpreadAssignment?(node: SpreadAssignment, context: C): O;
    visitObjectLiteralElementLike?(node: ObjectLiteralElementLike, context: C): O;
    visitPropertyAssignment?(node: PropertyAssignment, context: C): O;
    visitSetAccessorDeclaration?(node: SetAccessorDeclaration, context: C): O;
    visitGetAccessorDeclaration?(node: GetAccessorDeclaration, context: C): O;
    visitCallExpression?(node: CallExpression, context: C): O;
    visitObjectLiteralExpression?(node: ObjectLiteralExpression, context: C): O;
    visitPropertyName?(node: PropertyName, context: C): O;
    visitPropertyDeclaration?(node: PropertyDeclaration, context: C): O;
    visitTypeNode?(node: TypeNode, context: C): O;
    visitQuestionToken?(node: QuestionToken, context: C): O;
    visitExclamationToken?(node: ExclamationToken, context: C): O;
    visitExpression?(node: Expression, context: C): O;
    visitMethodDeclaration?(node: MethodDeclaration, context: C): O;
    visitTypeReferenceNode?(node: TypeReferenceNode, context: C): O;
    visitEntityName?(node: EntityName, context: C): O;
    visitQualifiedName?(node: QualifiedName, context: C): O;
    visitStringLiteral?(node: StringLiteral, context: C): O;
    visitNumericLiteral?(node: NumericLiteral, context: C): O;
    visitComputedPropertyName?(node: ComputedPropertyName, context: C): O;
    visitSemicolonClassElement?(node: SemicolonClassElement, context: C): O;
    visitConstructorDeclaration?(node: ConstructorDeclaration, context: C): O;
    visitModifier?(node: Modifier, context: C): O;
    visitFunctionBody?(node: FunctionBody, context: C): O;
    visitParameterDeclaration?(node: ParameterDeclaration, context: C): O;
    visitTupleTypeNode?(node: TupleTypeNode, context: C): O;
    visitImportDeclaration?(node: ImportDeclaration, context: C): O;
    visitVariableStatement?(node: VariableStatement, context: C): O;
    visitInterfaceDeclaration?(node: InterfaceDeclaration, context: C): O;
    visitHeritageClause?(node: HeritageClause, context: C): O;
    visitEnumDeclaration?(node: EnumDeclaration, context: C): O;
    visitTypeAliasDeclaration?(node: TypeAliasDeclaration, context: C): O;
    visitUnionTypeNode?(node: UnionTypeNode, context: C): O;
    visitKeywordTypeNode?(node: KeywordTypeNode, context: C): O;
    visitEnumMember?(node: EnumMember, context: C): O;
    visitTypeElement?(node: TypeElement, context: C): O;
    visitPropertySignature?(node: PropertySignature, context: C): O;
    visitFunctionTypeNode?(node: FunctionTypeNode, context: C): O;
    visitMethodSignature?(node: MethodSignature, context: C): O;
    visitDotDotDotToken?(node: DotDotDotToken, context: C): O;
    visitBindingName?(node: BindingName, context: C): O;
    visitObjectBindingPattern?(node: ObjectBindingPattern, context: C): O;
    visitArrayBindingPattern?(node: ArrayBindingPattern, context: C): O;
    visitArrayLiteralExpression?(node: ArrayLiteralExpression, context: C): O;
    visitReturnStatement?(node: ReturnStatement, context: C): O;
    visitAsExpression?(node: AsExpression, context: C): O;
    visitVariableDeclarationList?(node: VariableDeclarationList, context: C): O;
    visitVariableDeclaration?(node: VariableDeclaration, context: C): O;
    visitAwaitExpression?(node: AwaitExpression, context: C): O;
    visitArrowFunction?(node: ArrowFunction, context: C): O;
    visitBooleanLiteral?(node: BooleanLiteral, context: C): O;
    visitUnaryExpression?(node: UnaryExpression, context: C): O;
    visitPropertyAccessExpression?(node: PropertyAccessExpression, context: C): O;
    visitIfStatement?(node: IfStatement, context: C): O;
    visitForOfStatement?(node: ForOfStatement, context: C): O;
    visitForInStatement?(node: ForInStatement, context: C): O;
    visitSwitchStatement?(node: SwitchStatement, context: C): O;
    visitImportClause?(node: ImportClause, context: C): O;
    visitNamespaceImport?(node: NamespaceImport, context: C): O;
    visitNamedImports?(node: NamedImports, context: C): O;
    visitImportSpecifier?(node: ImportSpecifier, context: C): O;
    visitLeftHandSideExpression?(node: LeftHandSideExpression, context: C): O;
    visitFunctionDeclaration?(node: FunctionDeclaration, context: C): O;
    visitSourceFile?(node: SourceFile, context: C): O;
    visitClassDeclaration?(node: ClassDeclaration, context: C): O;
    visitClassElement?(node: ClassElement, context: C): O;
    visitIdentifier?(node: Identifier, context: C): O;
    visitTypeParameterDeclaration?(node: TypeParameterDeclaration, context: C): O;
    visitDecorator?(node: Decorator, context: C): O;
}

export class TsVisitor implements Visitor {
    name: string = `TsVisitor`;
    visitConciseBody(node: ConciseBody, context: ts.ConciseBody) {
        return node;
    }
    visitEqualsGreaterThanToken(node: EqualsGreaterThanToken, context: ts.EqualsGreaterThanToken) {
        return node;
    }
    visitDiagnostic(node: Diagnostic, context: ts.Diagnostic) {
        return node;
    }
    visitLanguageService(node: LanguageService, context: ts.LanguageService) {
        return node;
    }
    visitProgram(node: Program, context: ts.Program) {
        return node;
    }
    visitTypeChecker(node: TypeChecker, context: ts.TypeChecker) {
        return node;
    }
    visit(node: Node, context: any): any {
        return node.visit(this, context)
    }
    // visitProject(node: Project, context: morph.Project) {
    //     node.languageService = this.visitLanguageService(new LanguageService(), context.getLanguageService().compilerObject as any);
    //     node.ambientModules = context.getAmbientModules().map(ambient => this.visitSymbol(new Symbol(), ambient));
    //     node.sourceFiles = context.getSourceFiles().map(sourceFile => this.visitSourceFile(new SourceFile(), sourceFile.compilerNode as any));
    //     node.preEmitDiagnostics = context.getPreEmitDiagnostics().map(diag => this.visitDiagnostic(new Diagnostic(), diag.compilerObject as any));
    //     node.program = this.visitProgram(new Program(), context.getProgram().compilerObject as any);
    //     node.typeChecker = this.visitTypeChecker(new TypeChecker(), context.getTypeChecker().compilerObject as any)
    //     return node;
    // }
    visitType(node: Type, context: any) {
        return node;
    }
    visitSymbol(node: Symbol, context: any) {
        return node;
    }
    visitExportSpecifier(node: ExportSpecifier, context: ts.ExportSpecifier) {
        if (context.propertyName) {
            node.propertyName = this.visitIdentifier(new Identifier(), context.propertyName);
        }
        node.name = this.visitIdentifier(new Identifier(), context.name)
        return node
    }
    visitNamedExports(node: NamedExports, context: ts.NamedExports) {
        node.node = context;
        node.elements = context.elements.map(ele => this.visitExportSpecifier(new ExportSpecifier(), ele));
        return node;
    }
    visitThisTypeNode(node: ThisTypeNode, context: ts.ThisTypeNode) {
        return node;
    }
    visitBinaryOperatorToken(node: BinaryOperatorToken, context: ts.MinusToken) {
        return node;
    }
    visitMinusToken(node: MinusToken, context: ts.MinusToken) {
        return node;
    }
    visitPlusToken(node: PlusToken, context: ts.PlusToken) {
        return node;
    }
    visitReadonlyToken(node: ReadonlyToken, context: ts.ReadonlyToken) {
        return node;
    }
    visitContinueStatement(node: ContinueStatement, context: ts.ContinueStatement): ContinueStatement {
        node.node = context;
        if (context.label) {
            node.label = this.visitIdentifier(new Identifier(), context.label)
        }
        return node;
    }
    visitCaseBlock(node: CaseBlock, context: ts.CaseBlock) {
        node.node = context;
        node.clauses = context.clauses.map(cla => this.visitCaseOrDefaultClause(new CaseOrDefaultClause(), cla))
        return node;
    }
    visitCaseOrDefaultClause(node: CaseOrDefaultClause, context: ts.CaseOrDefaultClause): CaseClause | DefaultClause {
        node.node = context;
        if (ts.isCaseClause(context)) {
            return this.visitCaseClause(new CaseClause(), context)
        } else {
            return this.visitDefaultClause(new DefaultClause(), context)
        }
    }
    visitCaseClause(node: CaseClause, context: ts.CaseClause): CaseClause {
        node.node = context;
        node.expression = this.visitExpression(new Expression(), context.expression)
        node.statements = context.statements.map(stat => this.visitStatement(new Statement(), stat))
        return node;
    }
    visitDefaultClause(node: DefaultClause, context: ts.DefaultClause): DefaultClause {
        node.node = context;
        node.statements = context.statements.map(stat => this.visitStatement(new Statement(), stat))
        return node;
    }
    visitForInitializer(node: ForInitializer, context: ts.ForInitializer): Expression | VariableDeclarationList {
        node.node = context;
        if (ts.isVariableDeclarationList(context)) {
            return this.visitVariableDeclarationList(new VariableDeclarationList(), context)
        }
        else {
            return this.visitExpression(new Expression(), context)
        }
    }
    visitAwaitKeywordToken(node: AwaitKeywordToken, context: ts.AwaitKeywordToken): AwaitKeywordToken {
        node.node = context;
        return node;
    }
    sourceFile: ts.SourceFile;
    typeChecker: ts.TypeChecker;
    languageService: ts.LanguageService;
    /**
     * 扫描source file 
     * @param {SourceFile} node 
     * @param {ts.SourceFile} context 
     */
    visitSourceFile(node: SourceFile, context: ts.SourceFile): SourceFile {
        this.sourceFile = context;
        node.fileName = context.fileName;
        node.hasNoDefaultLib = context.hasNoDefaultLib;
        node.isDeclarationFile = context.isDeclarationFile;
        node.languageVariant = context.languageVariant;
        node.languageVersion = context.languageVersion;
        if (context.moduleName) {
            node.moduleName = context.moduleName
        };
        node.node = context;
        node.statements = context.statements.map(state => {
            const ast = this.visitStatement(new Statement(), state);
            ast.parent = node;
            ast.from = node.fileName;
            if (ast instanceof ImportDeclaration) {
                const fromPath = (ast.moduleSpecifier as any).text;
                if (typeof fromPath === 'string') {
                    if (fromPath.startsWith('./')) {
                        ast.sourcePath = join(ast.from, fromPath);
                    } else if (fromPath.startsWith('/')) {
                        ast.sourcePath = fromPath;
                    } else {
                        ast.sourcePath = require.resolve(fromPath);
                    }
                }
            }
            return ast;
        });
        node.text = context.text;
        return node;
    }
    /**
     * 生成statement
     * @param {Statement} node 
     * @param {ts.Statement} context 
     */
    visitStatement(node: Statement, context: ts.Statement): Statement {
        node.node = context;
        if (ts.isClassDeclaration(context)) {
            return this.visitClassDeclaration(new ClassDeclaration(), context);
        } else if (ts.isImportDeclaration(context)) {
            return this.visitImportDeclaration(new ImportDeclaration(), context)
        } else if (ts.isVariableStatement(context)) {
            return this.visitVariableStatement(new VariableStatement(), context)
        } else if (ts.isFunctionDeclaration(context)) {
            return this.visitFunctionDeclaration(new FunctionDeclaration(), context)
        } else if (ts.isInterfaceDeclaration(context)) {
            return this.visitInterfaceDeclaration(new InterfaceDeclaration(), context)
        } else if (ts.isEnumDeclaration(context)) {
            return this.visitEnumDeclaration(new EnumDeclaration(), context)
        } else if (ts.isTypeAliasDeclaration(context)) {
            return this.visitTypeAliasDeclaration(new TypeAliasDeclaration(), context)
        } else if (ts.isReturnStatement(context)) {
            return this.visitReturnStatement(new ReturnStatement(), context)
        } else if (ts.isIfStatement(context)) {
            return this.visitIfStatement(new IfStatement(), context)
        } else if (ts.isSwitchStatement(context)) {
            return this.visitSwitchStatement(new SwitchStatement(), context)
        } else if (ts.isForOfStatement(context)) {
            return this.visitForOfStatement(new ForOfStatement(), context)
        } else if (ts.isForInStatement(context)) {
            return this.visitForInStatement(new ForInStatement(), context)
        } else if (ts.isBlock(context)) {
            return this.visitFunctionBody(new FunctionBody(), context)
        } else if (ts.isExpressionStatement(context)) {
            return this.visitExpressionStatement(new ExpressionStatement(), context)
        } else if (ts.isBreakStatement(context)) {
            return this.visitBreakStatement(new BreakStatement(), context)
        } else if (ts.isThrowStatement(context)) {
            return this.visitThrowStatement(new ThrowStatement(), context)
        } else if (ts.isDebuggerStatement(context)) {
            return this.visitDebuggerStatement(new DebuggerStatement(), context)
        } else if (ts.isExportDeclaration(context)) {
            return this.visitExportDeclaration(new ExportDeclaration(), context)
        } else if (ts.isExportAssignment(context)) {
            return this.visitExportAssignment(new ExportAssignment(), context)
        } else if (ts.isEmptyStatement(context)) {
            return this.visitEmptyStatement(new EmptyStatement(), context)
        } else if (ts.isConditionalExpression(context)) {
            return this.visitConditionalExpression(new ConditionalExpression(), context)
        } else if (ts.isRegularExpressionLiteral(context)) {
            return this.visitRegularExpressionLiteral(new RegularExpressionLiteral(), context)
        } else if (ts.isTaggedTemplateExpression(context)) {
            return this.visitTaggedTemplateExpression(new TaggedTemplateExpression(), context)
        } else if (ts.isTryStatement(context)) {
            return this.visitTryStatement(new TryStatement(), context)
        } else if (ts.isImportEqualsDeclaration(context)) {
            return this.visitImportEqualsDeclaration(new ImportEqualsDeclaration(), context)
        } else {
            console.log(`visitStatement Error! ${context.kind}`)
        }
        return node;
    }
    visitImportEqualsDeclaration(node: ImportEqualsDeclaration, context: ts.ImportEqualsDeclaration) {
        node.moduleReference = this.visitModuleReference(new ModuleReference(), context.moduleReference);
        node.name = this.visitIdentifier(new Identifier(), context.name);
        return node;
    }
    visitModuleReference(node: ModuleReference, context: ts.ModuleReference) {
        return node;
    }
    visitTryStatement(node: TryStatement, context: any) {
        return node;
    }
    visitTaggedTemplateExpression(node: TaggedTemplateExpression, context: any) {
        return node;
    }
    visitRegularExpressionLiteral(node: RegularExpressionLiteral, context: any) {
        return node;
    }
    visitConditionalExpression(node: ConditionalExpression, context: any) {
        return node;
    }
    visitEmptyStatement(node: EmptyStatement, context: any) {
        return node;
    }
    visitExportAssignment(node: ExportAssignment, context: any) {
        return node;
    }
    visitExportDeclaration(node: ExportDeclaration, context: ts.ExportDeclaration) {
        node.node = context;
        if (context.exportClause) {
            node.exportClause = this.visitNamedExports(new NamedExports(), context.exportClause);
        }
        if (context.modifiers) {
            node.modifiers = context.modifiers.map(mod => this.visitModifier(new Modifier(), mod))
        }
        if ((context as any).jsDoc) {
            node.docs = (context as any).jsDoc.map((doc: any) => this.visitJSDoc(new JSDoc(), doc))
        }
        if (context.name) {
            if (ts.isIdentifier(context.name)) {
                node.name = this.visitIdentifier(new Identifier(), context.name)
            } else if (ts.isStringLiteral(context.name)) {
                node.name = this.visitStringLiteral(new StringLiteral(), context.name)
            } else if (ts.isNumericLiteral(context.name)) {
                node.name = this.visitNumericLiteral(new NumericLiteral(), context.name)
            }
        }
        if (context.moduleSpecifier) {
            node.moduleSpecifier = this.visitExpression(new Expression(), context.moduleSpecifier)
        }
        return node;
    }
    visitThrowStatement(node: ThrowStatement, context: any) {
        return node;
    }
    visitDebuggerStatement(node: DebuggerStatement, context: any) {
        return node;
    }
    visitBreakStatement(node: BreakStatement, context: ts.BreakStatement) {
        node.node = context;
        if (context.label) {
            node.label = this.visitIdentifier(new Identifier(), context.label)
        }
        return node;
    }
    visitExpressionStatement(node: ExpressionStatement, context: ts.ExpressionStatement) {
        node.node = context;
        node.expression = this.visitExpression(new Expression(), context.expression)
        return node;
    }
    visitForInStatement(node: ForInStatement, context: ts.ForInStatement) {
        node.node = context;
        node.initializer = this.visitForInitializer(new ForInitializer(), context.initializer);
        node.expression = this.visitExpression(new Expression(), context.expression)
        return node;
    }
    visitForOfStatement(node: ForOfStatement, context: ts.ForOfStatement) {
        node.node = context;
        if (context.awaitModifier) {
            node.awaitModifier = this.visitAwaitKeywordToken(new AwaitKeywordToken(), context.awaitModifier)
        }
        node.initializer = this.visitForInitializer(new ForInitializer(), context.initializer);
        node.expression = this.visitExpression(new Expression(), context.expression);
        return node;
    }
    visitSwitchStatement(node: SwitchStatement, context: ts.SwitchStatement) {
        node.node = context;
        node.expression = this.visitExpression(new Expression(), context.expression);
        node.caseBlock = this.visitCaseBlock(new CaseBlock(), context.caseBlock);
        node.possiblyExhaustive = !!context.possiblyExhaustive;
        return node;
    }
    visitIfStatement(node: IfStatement, context: ts.IfStatement) {
        node.node = context;
        node.expression = this.visitExpression(new Expression(), context.expression);
        node.thenStatement = this.visitStatement(new Statement(), context.thenStatement);
        if (context.elseStatement) {
            node.elseStatement = this.visitStatement(new Statement(), context.elseStatement)
        }
        return node;
    }
    visitReturnStatement(node: ReturnStatement, context: ts.ReturnStatement) {
        node.node = context;
        if (context.expression) {
            node.expression = this.visitExpression(new Expression(), context.expression)
        }
        return node;
    }
    /**
     * type Demo = string|number;
     * @param {TypeAliasDeclaration} node
     * @param {ts.TypeAliasDeclaration} context
     */
    visitTypeAliasDeclaration(node: TypeAliasDeclaration, context: ts.TypeAliasDeclaration) {
        node.node = context;
        node.docs = this.createJsDocs((context as any).jsDoc);
        node.modifiers = this.createModifiers(node, context.modifiers)
        node.name = this.visitIdentifier(new Identifier(), context.name);
        node.type = this.visitTypeNode(undefined, context.type);
        if (context.typeParameters) {
            node.typeParameters = context.typeParameters.map(type => this.visitTypeParameterDeclaration(new TypeParameterDeclaration(), type))
        }
        return node;
    }
    /**
     * enum Demo{
     *  Title,
     *  Name
     * }
     * @param {EnumDeclaration} node 
     * @param {ts.EnumDeclaration} context 
     */
    visitEnumDeclaration(node: EnumDeclaration, context: ts.EnumDeclaration) {
        node.node = context;
        node.docs = this.createJsDocs((context as any).jsDoc);
        node.members = context.members.map(member => this.visitEnumMember(new EnumMember(), member))
        node.name = this.visitIdentifier(new Identifier(), context.name);
        node.docs = this.createJsDocs((context as any).jsDoc);
        if (context.modifiers) {
            node.modifiers = context.modifiers.map(mod => this.visitModifier(new Modifier(), mod))
        }
        return node;
    }
    visitJSDoc(node: JSDoc, context: ts.JSDoc) {
        node.node = context;
        if (ts.isJSDoc(context)) {
            if (context.comment) {
                node.comment = context.comment;
            }
            if (context.tags) {
                node.tags = context.tags.map(tag => this.visitJSDocTag(new JSDocTag(), tag))
            }
        } else {
            console.log(`visitJSDoc error! ${(context as any).kind}`)
        }
        return node;
    }
    visitJSDocTag(node: JSDocTag, context: ts.JSDocTag) {
        node.node = context;
        if (context.comment) {
            node.comment = context.comment;
        }
        node.tagName = this.visitIdentifier(new Identifier(), context.tagName)
        return node;
    }
    /**
     * enum member
     * @param {EnumMember} node
     * @param {ts.EnumMember} context
     */
    visitEnumMember(node: EnumMember, context: ts.EnumMember) {
        node.node = context;
        node.docs = this.createJsDocs((context as any).jsDoc);
        node.name = this.visitPropertyName(undefined, context.name);
        if (context.initializer) {
            node.initializer = this.visitExpression(new Expression(), context.initializer)
        }
        return node;
    }
    /**
     * interface
     * @param {InterfaceDeclaration}node 
     * @param {ts.InterfaceDeclaration}context 
     */
    visitInterfaceDeclaration(node: InterfaceDeclaration, context: ts.InterfaceDeclaration) {
        node.node = context;
        node.docs = this.createJsDocs((context as any).jsDoc);
        node.members = context.members.map(member => this.visitTypeElement(new TypeElement(), member));
        node.name = this.visitIdentifier(new Identifier(), context.name);
        node.modifiers = this.createModifiers(node, context.modifiers);
        if (context.typeParameters) {
            node.typeParameters = context.typeParameters.map(type => this.visitTypeParameterDeclaration(new TypeParameterDeclaration(), type))
        }
        if (context.heritageClauses) {
            node.heritageClauses = context.heritageClauses.map(heri => this.visitHeritageClause(new HeritageClause(), heri))
        }
        return node;
    }
    visitHeritageClause(node: HeritageClause, context: ts.HeritageClause) {
        node.node = context;
        if (context.token === ts.SyntaxKind.ExtendsKeyword) {
            node.token = 'extends'
        }
        if (context.token === ts.SyntaxKind.ImplementsKeyword) {
            node.token = 'implements'
        }
        node.types = context.types.map(type => this.visitExpressionWithTypeArguments(new ExpressionWithTypeArguments(), type))
        return node;
    }
    visitExpressionWithTypeArguments(node: ExpressionWithTypeArguments, context: ts.ExpressionWithTypeArguments) {
        node.node = context;
        node.expression = this.visitLeftHandSideExpression(new LeftHandSideExpression(), context.expression);
        if (context.typeArguments) {
            node.typeArguments = context.typeArguments.map(type => this.visitTypeNode(undefined, type))
        }
        return node;
    }
    /**
     * type element
     * @param node 
     * @param context 
     */
    visitTypeElement(node: TypeElement, context: ts.TypeElement) {
        node.node = context;
        if (ts.isPropertySignature(context)) {
            return this.visitPropertySignature(new PropertySignature(), context)
        } else if (ts.isMethodSignature(context)) {
            return this.visitMethodSignature(new MethodSignature(), context)
        } else if (ts.isIndexSignatureDeclaration(context)) {
            return this.visitIndexSignatureDeclaration(new IndexSignatureDeclaration(), context)
        } else if (util.isConstructSignatureDeclaration(context)) {
            return this.visitConstructSignatureDeclaration(new ConstructSignatureDeclaration(), context)
        } else if (ts.isCallSignatureDeclaration(context)) {
            return this.visitCallSignatureDeclaration(new CallSignatureDeclaration(), context)
        } else {
            console.log(`visitTypeElement Error! ${context.kind}`)
        }
        return node;
    }
    visitCallSignatureDeclaration(node: CallSignatureDeclaration, context: any) {
        return node;
    }
    visitConstructSignatureDeclaration(node: ConstructSignatureDeclaration, context: any) {
        return node;
    }
    visitIndexSignatureDeclaration(node: IndexSignatureDeclaration, context: ts.IndexSignatureDeclaration) {
        if (context.name) {
            node.name = this.visitPropertyName(undefined, context.name)
        }
        if (context.questionToken) {
            node.questionToken = this.visitQuestionToken(new QuestionToken(), context.questionToken)
        }
        if (context.type) {
            node.type = this.visitTypeNode(undefined, context.type);
        }
        if (context.typeParameters) {
            node.typeParameters = context.typeParameters.map(t => this.visitTypeParameterDeclaration(new TypeParameterDeclaration(), t));
        }
        if (context.parameters) {
            node.parameters = context.parameters.map(p => this.visitParameterDeclaration(new ParameterDeclaration(), p))
        }
        return node;
    }
    /**
     * interface method
     * @param node 
     * @param context 
     */
    visitMethodSignature(node: MethodSignature, context: ts.MethodSignature) {
        node.node = context;
        node.docs = this.createJsDocs((context as any).jsDoc);
        node.name = this.visitPropertyName(undefined, context.name);
        if (context.type) {
            node.type = this.visitTypeNode(undefined, context.type)
        }
        if (context.typeParameters) {
            node.typeParameters = context.typeParameters.map(type => this.visitTypeParameterDeclaration(new TypeParameterDeclaration(), type))
        }
        if (context.parameters) {
            node.parameters = context.parameters.map(par => this.visitParameterDeclaration(new ParameterDeclaration(), par))
        }
        if (context.questionToken) {
            node.questionToken = this.visitQuestionToken(new QuestionToken(), context.questionToken)
        }
        return node;
    }
    /**
     * interface property
     * @param node 
     * @param context 
     */
    visitPropertySignature(node: PropertySignature, context: ts.PropertySignature) {
        node.node = context;
        node.docs = this.createJsDocs((context as any).jsDoc);
        if (context.name) {
            node.name = this.visitPropertyName(undefined, context.name)
        }
        if (context.questionToken) {
            node.questionToken = this.visitQuestionToken(new QuestionToken(), context.questionToken)
        }
        if (context.type) {
            node.type = this.visitTypeNode(undefined, context.type)
        }
        if (context.initializer) {
            node.initializer = this.visitExpression(new Expression(), context.initializer)
        }
        return node;
    }
    visitFunctionDeclaration(node: FunctionDeclaration, context: ts.FunctionDeclaration) {
        node.node = context;
        node.docs = this.createJsDocs((context as any).jsDoc);
        if (context.body) {
            node.body = this.visitFunctionBody(new FunctionBody(), context.body)
        }
        if (context.name) {
            node.name = this.visitIdentifier(new Identifier(), context.name)
        }
        node.parameters = context.parameters.map(par => this.visitParameterDeclaration(new ParameterDeclaration(), par));
        if (context.typeParameters) {
            node.typeParameters = context.typeParameters.map(par => this.visitTypeParameterDeclaration(new TypeParameterDeclaration(), par))
        }
        if (context.type) {
            node.type = this.visitTypeNode(undefined, context.type)
        }
        return node;
    }
    visitVariableStatement(node: VariableStatement, context: ts.VariableStatement) {
        node.node = context;
        node.docs = this.createJsDocs((context as any).jsDoc);
        node.declarationList = this.visitVariableDeclarationList(new VariableDeclarationList(), context.declarationList);
        return node;
    }
    visitVariableDeclarationList(node: VariableDeclarationList, context: ts.VariableDeclarationList) {
        node.node = context;
        node.declarations = context.declarations.map(dec => this.visitVariableDeclaration(new VariableDeclaration(), dec))
        return node;
    }
    visitVariableDeclaration(node: VariableDeclaration, context: ts.VariableDeclaration) {
        node.node = context;
        node.name = this.visitBindingName(undefined, context.name);
        if (context.exclamationToken) {
            node.exclamationToken = this.visitExclamationToken(new ExclamationToken(), context.exclamationToken)
        }
        if (context.type) {
            node.type = this.visitTypeNode(undefined, context.type)
        }
        if (context.initializer) {
            node.initializer = this.visitExpression(new Expression(), context.initializer)
        }
        return node;
    }
    visitImportDeclaration(node: ImportDeclaration, context: ts.ImportDeclaration) {
        node.node = context;
        node.moduleSpecifier = this.visitExpression(new Expression(), context.moduleSpecifier);

        if (context.importClause) {
            node.importClause = this.visitImportClause(new ImportClause(), context.importClause);
        }
        return node;
    }
    visitImportClause(node: ImportClause, context: ts.ImportClause) {
        node.node = context;
        if (context.name) {
            node.name = this.visitIdentifier(new Identifier(), context.name)
        }
        if (context.namedBindings) {
            node.namedBindings = this.visitNamedImportBindings(undefined, context.namedBindings)
        }
        return node;
    }
    visitNamedImportBindings(node: any, context: ts.NamedImportBindings): NamespaceImport | NamedImports {
        if (ts.isNamespaceImport(context)) {
            return this.visitNamespaceImport(new NamespaceImport(), context)
        } else {
            return this.visitNamedImports(new NamedImports(), context)
        }
    }
    visitNamespaceImport(node: NamespaceImport, context: ts.NamespaceImport) {
        node.node = context;
        node.name = this.visitIdentifier(new Identifier(), context.name)
        return node;
    }
    visitNamedImports(node: NamedImports, context: ts.NamedImports) {
        node.node = context;
        node.elements = context.elements.map(ele => this.visitImportSpecifier(new ImportSpecifier(), ele))
        return node;
    }
    visitImportSpecifier(node: ImportSpecifier, context: ts.ImportSpecifier) {
        node.node = context;
        if (context.propertyName) {
            node.propertyName = this.visitIdentifier(new Identifier(), context.propertyName)
        }
        node.name = this.visitIdentifier(new Identifier(), context.name)
        return node;
    }
    createJsDocs(docs?: ts.JSDoc[]) {
        if (docs) {
            return docs.map(doc => this.visitJSDoc(new JSDoc(), doc))
        }
        return [];
    }
    /**
     * 扫描class declaration
     * @param {ClassDeclaration} node 
     * @param {ts.ClassDeclaration} context 
     */
    visitClassDeclaration(node: ClassDeclaration, context: ts.ClassDeclaration) {
        node.node = context;
        node.docs = this.createJsDocs((context as any).jsDoc);
        node.decorators = this.createDecorators(context, node);
        node.members = context.members.map(member => {
            const ast = this.visitClassElement(new ClassElement(), member);
            ast.parent = node;
            return ast;
        });
        if (context.name) {
            node.name = this.visitIdentifier(new Identifier(), context.name);
            node.name.parent = node;
        }
        if (context.typeParameters) {
            node.typeParameters = context.typeParameters.map(type => {
                const ast = this.visitTypeParameterDeclaration(new TypeParameterDeclaration(), type);
                ast.parent = node;
                return ast;
            });
        }
        if (context.heritageClauses) {
            node.heritageClauses = context.heritageClauses.map(heri => this.visitHeritageClause(new HeritageClause(), heri))
        }
        if (context.modifiers) {
            node.modifiers = context.modifiers.map(mod => this.visitModifier(new Modifier(), mod))
        }
        return node;
    }

    /**
     * 创建type
     * @param {TypeParameterDeclaration} node
     * @param {ts.TypeParameterDeclaration} context
     */
    visitTypeParameterDeclaration(node: TypeParameterDeclaration, context: ts.TypeParameterDeclaration) {
        node.node = context;
        node.name = this.visitIdentifier(new Identifier(), context.name);
        if (context.constraint) {
            node.constraint = this.visitTypeNode(undefined, context.constraint);
        }
        if (context.default) {
            node.default = this.visitTypeNode(undefined, context.default);
        }
        return node;
    }
    /**
     * 遍历identifier
     * @param {Identifier} node
     * @param {ts.Identifier} context
     */
    visitIdentifier(node: Identifier, context: ts.Identifier) {
        node.node = context;
        node.escapedText = context.escapedText;
        node.text = context.text;
        node.from = ``;
        return node;
    }
    /**
     * 遍历类成员
     * @param {ClassElement} node 
     * @param {ts.ClassElement} context 
     */
    visitClassElement(node: ClassElement, context: ts.ClassElement): ClassElement | PropertyDeclaration |
        MethodDeclaration | SemicolonClassElement | ConstructorDeclaration | GetAccessorDeclaration | SetAccessorDeclaration {
        node.node = context;
        if (ts.isPropertyDeclaration(context)) {
            return this.visitPropertyDeclaration(new PropertyDeclaration(), context)
        } else if (ts.isMethodDeclaration(context)) {
            return this.visitMethodDeclaration(new MethodDeclaration(), context)
        } else if (ts.isSemicolonClassElement(context)) {
            return this.visitSemicolonClassElement(new SemicolonClassElement(), context)
        } else if (ts.isConstructorDeclaration(context)) {
            return this.visitConstructorDeclaration(new ConstructorDeclaration(), context)
        } else if (ts.isGetAccessorDeclaration(context)) {
            return this.visitGetAccessorDeclaration(new GetAccessorDeclaration(), context)
        } else if (ts.isSetAccessorDeclaration(context)) {
            return this.visitSetAccessorDeclaration(new SetAccessorDeclaration(), context)
        } else {
            console.log(`visitClassElement Error! ${context.kind}`)
        }
        return node;
    }

    visitConstructorDeclaration(node: ConstructorDeclaration, context: ts.ConstructorDeclaration) {
        if (context.name) {
            node.name = this.visitPropertyName(undefined, context.name)
        }
        if (context.body) {
            node.body = this.visitFunctionBody(new FunctionBody(), context.body)
        }
        if (context.questionToken) {
            node.questionToken = this.visitQuestionToken(new QuestionToken(), context.questionToken)
        }
        if (context.parameters) {
            node.parameters = context.parameters.map(par => this.visitParameterDeclaration(new ParameterDeclaration(), par))
        }
        if (context.modifiers) {
            node.modifiers = context.modifiers.map(mod => this.visitModifier(new Modifier(), mod))
        }
        if (context.decorators) {
            node.decorators = context.decorators.map(dec => this.visitDecorator(new Decorator(), dec))
        }
        if (context.typeParameters) {
            node.typeParameters = context.typeParameters.map(t => this.visitTypeParameterDeclaration(new TypeParameterDeclaration(), t))
        }
        if (context.type) {
            node.type = this.visitTypeNode(undefined, context.type)
        }
        return node;
    }

    /**
     * todo
     * @param node 
     * @param context 
     */
    visitSemicolonClassElement(node: SemicolonClassElement, context: ts.SemicolonClassElement) {
        node.node = context;
        return node;
    }
    /**
     * 创建modifiers
     * @param parent 
     * @param modifiers 
     */
    createModifiers(parent: Node, modifiers: ts.ModifiersArray | undefined): Modifier[] {
        if (modifiers) {
            return modifiers.map(modifier => {
                const ast = this.visitModifier(new Modifier(), modifier);
                ast.parent = parent;
                return ast;
            });
        }
        return [];
    }
    createJsDoc(comment: string) {
        const ast = new JSDoc();
        ast.comment = comment;
        return ast;
    }
    /**
     * 遍历方法
     * @param node 
     * @param context 
     */
    visitMethodDeclaration(node: MethodDeclaration, context: ts.MethodDeclaration) {
        node.node = context;
        node.docs = this.createJsDocs((context as any).jsDoc);
        node.decorators = this.createDecorators(context, node);
        if (context.body) {
            node.body = this.visitFunctionBody(new FunctionBody(), context.body);
        }
        node.modifiers = this.createModifiers(node, context.modifiers)
        node.name = this.visitPropertyName(undefined, context.name);
        if (context.type) {
            node.type = this.visitTypeNode(undefined, context.type);
        }
        if (context.parameters) {
            node.parameters = context.parameters.map(par => this.visitParameterDeclaration(new ParameterDeclaration(), par));
            if (node.docs.length > 0) {
                const doc = node.docs[0];
                const tags = doc.tags.filter(tag => tag.tagName.text === 'param');
                if (tags.length > 0) {
                    node.parameters = node.parameters.map((par, index) => {
                        if (tags.length > index) {
                            const doc = this.createJsDoc(tags[index].comment)
                            par.docs.push(doc)
                        }
                        return par;
                    });
                }
            }
        }
        if (context.typeParameters) {
            node.typeParameters = context.typeParameters.map(par => this.visitTypeParameterDeclaration(new TypeParameterDeclaration(), par))
        }
        if (context.questionToken) {
            node.questionToken = this.visitQuestionToken(new QuestionToken(), context.questionToken)
        }

        return node;
    }

    visitParameterDeclaration(node: ParameterDeclaration, context: ts.ParameterDeclaration) {
        node.node = context;
        node.docs = this.createJsDocs((context as any).jsDoc);
        if (context.dotDotDotToken) {
            node.dotDotDotToken = this.visitDotDotDotToken(new DotDotDotToken(), context.dotDotDotToken)
        }
        node.modifiers = this.createModifiers(node, context.modifiers)
        node.name = this.visitBindingName(undefined, context.name)
        if (context.questionToken) {
            node.questionToken = this.visitQuestionToken(new QuestionToken, context.questionToken);
        }
        if (context.type) {
            node.type = this.visitTypeNode(undefined, context.type)
        }
        return node;
    }
    visitBindingName(node: any, context: ts.BindingName): BindingName {
        if (ts.isObjectBindingPattern(context)) {
            return this.visitObjectBindingPattern(new ObjectBindingPattern(), context)
        }
        else if (ts.isArrayBindingPattern(context)) {
            return this.visitArrayBindingPattern(new ArrayBindingPattern(), context)
        }
        else {
            return this.visitIdentifier(new Identifier(), context)
        }
    }
    visitArrayBindingPattern(node: ArrayBindingPattern, context: ts.ArrayBindingPattern) {
        node.node = context;
        return node;
    }
    visitObjectBindingPattern(node: ObjectBindingPattern, context: ts.ObjectBindingPattern) {
        node.node = context;
        return node;
    }
    /**
     * ...[],{}
     * @param node 
     * @param context 
     */
    visitDotDotDotToken(node: DotDotDotToken, context: ts.DotDotDotToken) {
        node.node = context;
        return node;
    }
    visitFunctionBody(node: FunctionBody, context: ts.FunctionBody) {
        node.node = context;
        node.statements = context.statements.map(state => this.visitStatement(new Statement(), state))
        return node;
    }
    /**
     * 完善类属性
     * @param {PropertyDeclaration} node 
     * @param {ts.PropertyDeclaration} context 
     */
    visitPropertyDeclaration(node: PropertyDeclaration, context: ts.PropertyDeclaration) {
        node.node = context;
        node.decorators = this.createDecorators(context, node);
        node.docs = this.createJsDocs((context as any).jsDoc);
        if (context.name) {
            node.name = this.visitPropertyName(undefined, context.name);
        }
        if (context.type) {
            node.type = this.visitTypeNode(undefined, context.type);
        }
        if (context.questionToken) {
            node.questionToken = this.visitQuestionToken(new QuestionToken(), context.questionToken);
        }
        if (context.exclamationToken) {
            node.exclamationToken = this.visitExclamationToken(new ExclamationToken(), context.exclamationToken)
        }
        if (context.initializer) {
            node.initializer = this.visitExpression(new Expression(), context.initializer)
        }
        if (context.modifiers) {
            node.modifiers = context.modifiers.map(modifier => {
                const ast = this.visitModifier(new Modifier(), modifier);
                ast.parent = node;
                return ast;
            });
        }
        return node;
    }
    /**
     * 完善 Modifier
     * @param {Modifier} node 
     * @param {ts.Modifier} context 
     */
    visitModifier(node: Modifier, context: ts.Modifier) {
        node.node = context;
        if (context.kind === ts.SyntaxKind.PublicKeyword) {
            node.name = 'public';
        } else if (context.kind === ts.SyntaxKind.AbstractKeyword) {
            node.name = 'abstract';
        } else if (context.kind === ts.SyntaxKind.AsyncKeyword) {
            node.name = 'async';
        } else if (context.kind === ts.SyntaxKind.ConstKeyword) {
            node.name = 'const';
        } else if (context.kind === ts.SyntaxKind.DeclareKeyword) {
            node.name = 'declare'
        } else if (context.kind === ts.SyntaxKind.DefaultKeyword) {
            node.name = 'default';
        } else if (context.kind === ts.SyntaxKind.ExportKeyword) {
            node.name = 'export'
        } else if (context.kind === ts.SyntaxKind.PrivateKeyword) {
            node.name = 'private'
        } else if (context.kind === ts.SyntaxKind.ProtectedKeyword) {
            node.name = 'protected'
        } else if (context.kind === ts.SyntaxKind.ReadonlyKeyword) {
            node.name = 'readonly'
        } else if (context.kind === ts.SyntaxKind.StaticKeyword) {
            node.name = 'static';
        }
        return node;
    }

    visitExpression(node: Expression, context: ts.Expression) {
        node.node = context;
        if (ts.isStringLiteral(context)) {
            return this.visitStringLiteral(new StringLiteral(), context)
        } else if (ts.isNumericLiteral(context)) {
            return this.visitNumericLiteral(new NumericLiteral(), context)
        } else if (ts.isObjectLiteralExpression(context)) {
            return this.visitObjectLiteralExpression(new ObjectLiteralExpression(), context);
        } else if (ts.isArrayLiteralExpression(context)) {
            return this.visitArrayLiteralExpression(new ArrayLiteralExpression(), context)
        } else if (ts.isIdentifier(context)) {
            return this.visitIdentifier(new Identifier(), context)
        } else if (ts.isAsExpression(context)) {
            return this.visitAsExpression(new AsExpression(), context)
        } else if (ts.isAwaitExpression(context)) {
            return this.visitAwaitExpression(new AwaitExpression(), context)
        } else if (ts.isArrowFunction(context)) {
            return this.visitArrowFunction(new ArrowFunction(), context)
        } else if (util.isBooleanLiteral(context)) {
            return this.visitBooleanLiteral(new BooleanLiteral(), context)
        } else if (ts.isCallExpression(context)) {
            return this.visitCallExpression(new CallExpression(), context)
        } else if (ts.isBinaryExpression(context)) {
            return this.visitBinaryExpression(new BinaryExpression(), context)
        } else if (ts.isElementAccessExpression(context)) {
            return this.visitElementAccessExpression(new ElementAccessExpression(), context)
        } else if (ts.isPropertyAccessExpression(context)) {
            return this.visitPropertyAccessExpression(new PropertyAccessExpression(), context)
        } else if (ts.isPrefixUnaryExpression(context)) {
            return this.visitPrefixUnaryExpression(new PrefixUnaryExpression(), context)
        } else if (ts.isTemplateExpression(context)) {
            return this.visitTemplateExpression(new TemplateExpression(), context)
        } else if (ts.isNewExpression(context)) {
            return this.visitNewExpression(new NewExpression(), context)
        } else if (util.isThisExpression(context)) {
            return this.visitThisExpression(new ThisExpression(), context)
        } else if (util.isNullLiteral(context)) {
            return this.visitNullLiteral(new NullLiteral(), context)
        } else if (ts.isNoSubstitutionTemplateLiteral(context)) {
            return this.visitNoSubstitutionTemplateLiteral(new NoSubstitutionTemplateLiteral(), context);
        } else if (ts.isConditionalExpression(context)) {
            return this.visitConditionalExpression(new ConditionalExpression(), context)
        } else if (ts.isSpreadElement(context)) {
            return this.visitSpreadElement(new SpreadElement(), context);
        } else if (ts.isTaggedTemplateExpression(context)) {
            return this.visitTaggedTemplateExpression(new TaggedTemplateExpression(), context)
        } else if (ts.isRegularExpressionLiteral(context)) {
            return this.visitRegularExpressionLiteral(new RegularExpressionLiteral(), context)
        } else {
            console.log(`visitExpression Error! ${context.kind}`)
        }
        return node;
    }

    visitSpreadElement(node: SpreadElement, context: any) {
        return node;
    }

    visitNoSubstitutionTemplateLiteral(node: NoSubstitutionTemplateLiteral, context: any) {
        return node;
    }

    visitNullLiteral(node: NullLiteral, context: any) {
        return node;
    }

    visitPrefixUnaryExpression(node: PrefixUnaryExpression, context: any) {
        return node;
    }
    visitTemplateExpression(node: TemplateExpression, context: any) {
        return node;
    }
    visitNewExpression(node: NewExpression, context: any) {
        return node;
    }

    visitElementAccessExpression(node: ElementAccessExpression, context: ts.ElementAccessExpression) {
        return node;
    }

    visitBinaryExpression(node: BinaryExpression, context: ts.BinaryExpression) {
        return node;
    }

    visitBooleanLiteral(node: BooleanLiteral, context: ts.BooleanLiteral) {
        node.node = context;
        if (context.kind === ts.SyntaxKind.TrueKeyword) {
            node.value = true;
        } else {
            node.value = false;
        }
        return node;
    }

    visitArrowFunction(node: ArrowFunction, context: ts.ArrowFunction) {
        node.node = context;
        node.docs = this.createJsDocs((context as any).jsDoc);
        return node;
    }

    visitAwaitExpression(node: AwaitExpression, context: ts.AwaitExpression) {
        node.node = context;
        node.expression = this.visitUnaryExpression(new UnaryExpression(), context.expression);
        return node;
    }

    visitUnaryExpression(node: UnaryExpression, context: ts.UnaryExpression) {
        node.node = context;
        if (ts.isCallExpression(context)) {
            return this.visitCallExpression(new CallExpression(), context)
        } else {
            console.log(`visitUnaryExpression error!! ${context.kind}`)
        }
        return node;
    }

    visitAsExpression(node: AsExpression, context: ts.AsExpression) {
        node.node = context;
        node.type = this.visitTypeNode(undefined, context.type);
        node.expression = this.visitExpression(new Expression(), context.expression)
        return node;
    }

    visitArrayLiteralExpression(node: ArrayLiteralExpression, context: ts.ArrayLiteralExpression) {
        node.node = context;
        node.elements = context.elements.map(ele => this.visitExpression(new Expression(), ele))
        return node;
    }

    visitExclamationToken(node: ExclamationToken, context: ts.ExclamationToken) {
        node.node = context;
        return node;
    }

    visitQuestionToken(node: QuestionToken, context: ts.QuestionToken) {
        node.node = context;
        return node;
    }
    /**
     * type node start
     */
    visitTypeNode(node: any, context: ts.TypeNode): TypeNode {
        if (ts.isTypeReferenceNode(context)) {
            return this.visitTypeReferenceNode(new TypeReferenceNode(), context)
        } else if (ts.isTupleTypeNode(context)) {
            return this.visitTupleTypeNode(new TupleTypeNode(), context)
        } else if (ts.isUnionTypeNode(context)) {
            return this.visitUnionTypeNode(new UnionTypeNode(), context)
        } else if (util.isKeywordTypeNode(context)) {
            return this.visitKeywordTypeNode(new KeywordTypeNode(), context)
        } else if (ts.isFunctionTypeNode(context)) {
            return this.visitFunctionTypeNode(new FunctionTypeNode(), context)
        } else if (ts.isMappedTypeNode(context)) {
            return this.visitMappedTypeNode(new MappedTypeNode(), context);
        } else if (ts.isIndexedAccessTypeNode(context)) {
            return this.visitIndexedAccessTypeNode(new IndexedAccessTypeNode(), context)
        } else if (ts.isTypeOperatorNode(context)) {
            return this.visitTypeOperatorNode(new TypeOperatorNode(), context)
        } else if (ts.isTypeLiteralNode(context)) {
            return this.visitTypeLiteralNode(new TypeLiteralNode(), context)
        } else if (ts.isArrayTypeNode(context)) {
            return this.visitArrayTypeNode(new ArrayTypeNode(), context)
        } else if (ts.isLiteralTypeNode(context)) {
            return this.visitLiteralTypeNode(new LiteralTypeNode(), context)
        } else if (ts.isTypePredicateNode(context)) {
            return this.visitTypePredicateNode(new TypePredicateNode(), context)
        } else if (ts.isImportTypeNode(context)) {
            return this.visitImportTypeNode(new ImportTypeNode(), context)
        } else if (ts.isParenthesizedTypeNode(context)) {
            return this.visitParenthesizedTypeNode(new ParenthesizedTypeNode(), context)
        } else if (ts.isIntersectionTypeNode(context)) {
            return this.visitIntersectionTypeNode(new IntersectionTypeNode(), context)
        } else if (ts.isExpressionWithTypeArguments(context)) {
            return this.visitExpressionWithTypeArguments(new ExpressionWithTypeArguments(), context)
        } else {
            throw new Error(`visitTypeNode Error! ${context.kind}`)
        }
    }
    visitIntersectionTypeNode(node: IntersectionTypeNode, context: any) {
        return node;
    }
    visitParenthesizedTypeNode(node: ParenthesizedTypeNode, context: any) {
        return node;
    }
    visitImportTypeNode(node: ImportTypeNode, context: any) {
        return node;
    }
    visitTypePredicateNode(node: TypePredicateNode, context: any) {
        return node;
    }
    visitLiteralTypeNode(node: LiteralTypeNode, context: any) {
        return node;
    }
    visitArrayTypeNode(node: ArrayTypeNode, context: ts.ArrayTypeNode) {
        node.elementType = this.visitTypeNode(undefined, context.elementType)
        return node;
    }
    visitTypeLiteralNode(node: TypeLiteralNode, context: any) {
        return node;
    }
    visitTypeOperatorNode(node: TypeOperatorNode, context: any) {
        return node;
    }
    visitIndexedAccessTypeNode(node: IndexedAccessTypeNode, context: ts.IndexedAccessTypeNode) {
        return node;
    }
    visitMappedTypeNode(node: MappedTypeNode, context: ts.MappedTypeNode) {
        if (context.type) {
            node.type = this.visitTypeNode(undefined, context.type);
        }
        if (context.questionToken) {
            if (util.isQuestionToken(context.questionToken)) {
                node.questionToken = this.visitQuestionToken(new QuestionToken(), context.questionToken)
            } else if (util.isPlusToken(context.questionToken)) {
                node.questionToken = this.visitPlusToken(new PlusToken(), context.questionToken)
            } else if (util.isMinusToken(context.questionToken)) {
                node.questionToken = this.visitMinusToken(new MinusToken(), context.questionToken)
            }
        }
        if (context.readonlyToken) {
            if (util.isReadonlyToken(context.readonlyToken)) {
                node.readonlyToken = this.visitReadonlyToken(new ReadonlyToken(), context.readonlyToken)
            } else if (util.isPlusToken(context.readonlyToken)) {
                node.readonlyToken = this.visitPlusToken(new PlusToken(), context.readonlyToken)
            } else if (util.isMinusToken(context.readonlyToken)) {
                node.readonlyToken = this.visitMinusToken(new MinusToken(), context.readonlyToken)
            }
        }
        if (context.typeParameter) {
            node.typeParameter = this.visitTypeParameterDeclaration(new TypeParameterDeclaration(), context.typeParameter)
        }
        return node;
    }
    /**
     * [number,string]
     * @param node
     * @param context
     */
    visitTupleTypeNode(node: TupleTypeNode, context: ts.TupleTypeNode) {
        node.node = context;
        node.elementTypes = context.elementTypes.map(ele => this.visitTypeNode(undefined, ele))
        return node;
    }
    visitTypeReferenceNode(node: TypeReferenceNode, context: ts.TypeReferenceNode) {
        node.node = context;
        if (context.typeArguments) {
            node.typeArguments = context.typeArguments.map(type => this.visitTypeNode(undefined, type));
        }
        node.typeName = this.visitEntityName(new EntityName(), context.typeName);
        return node;
    }
    /**
     * getInfo: <T>()=>Promise<T>
     * @param node 
     * @param context 
     */
    visitFunctionTypeNode(node: FunctionTypeNode, context: ts.FunctionTypeNode) {
        node.node = context;
        node.docs = this.createJsDocs((context as any).jsDoc);
        node.parameters = context.parameters.map(par => this.visitParameterDeclaration(new ParameterDeclaration(), par))
        node.type = this.visitTypeNode(undefined, context.type);
        if (context.typeParameters) {
            node.typeParameters = context.typeParameters.map(type => this.visitTypeParameterDeclaration(new TypeParameterDeclaration(), type))
        }
        return node;
    }
    /**
     * number string ...
     * @param node 
     * @param context 
     */
    visitKeywordTypeNode(node: KeywordTypeNode, context: ts.KeywordTypeNode) {
        node.node = context;
        node.name = util.createKeywordTypeNode(context);
        return node;
    }
    /**
     * union
     * @param node 
     * @param context 
     */
    visitUnionTypeNode(node: UnionTypeNode, context: ts.UnionTypeNode) {
        node.node = context;
        node.types = context.types.map(type => this.visitTypeNode(undefined, type))
        return node;
    }
    /**
     * type node end
     */
    visitEntityName(node: EntityName, context: ts.EntityName) {
        node.node = context;
        if (ts.isIdentifier(context)) {
            return this.visitIdentifier(new Identifier(), context)
        } else {
            return this.visitQualifiedName(new QualifiedName(), context)
        }
    }
    visitQualifiedName(node: QualifiedName, context: ts.QualifiedName) {
        node.node = context;
        return node;
    }
    visitPropertyName(node: any, context: ts.PropertyName): PropertyName {
        if (ts.isIdentifier(context)) {
            return this.visitIdentifier(new Identifier(), context);
        } else if (ts.isStringLiteral(context)) {
            return this.visitStringLiteral(new StringLiteral(), context)
        } else if (ts.isNumericLiteral(context)) {
            return this.visitNumericLiteral(new NumericLiteral(), context);
        } else {
            return this.visitComputedPropertyName(new ComputedPropertyName(), context)
        }
    }
    visitComputedPropertyName(node: ComputedPropertyName, context: ts.ComputedPropertyName) {
        node.node = context;
        return node;
    }
    visitNumericLiteral(node: NumericLiteral, context: ts.NumericLiteral) {
        node.node = context;
        node.text = context.text;
        node.isUnterminated = !!context.isUnterminated;
        node.hasExtendedUnicodeEscape = !!context.hasExtendedUnicodeEscape;
        return node;
    }
    visitStringLiteral(node: StringLiteral, context: ts.StringLiteral) {
        node.node = context;
        node.text = context.text;
        return node;
    }
    createDecorators(context: ts.Node, parent: Node): Decorator[] {
        if (context.decorators) {
            return context.decorators.map(dec => {
                const ast = this.visitDecorator(new Decorator(), dec);
                ast.parent = parent;
                return ast;
            })
        }
        return [];
    }
    visitDecorator(node: Decorator, context: ts.Decorator): Decorator {
        node.node = context;
        node.expression = this.visitLeftHandSideExpression(new LeftHandSideExpression(), context.expression)
        return node;
    }
    visitLeftHandSideExpression(node: LeftHandSideExpression, context: ts.LeftHandSideExpression): LeftHandSideExpression | PropertyAccessExpression | Identifier | NumericLiteral | ObjectLiteralExpression | CallExpression {
        node.node = context;
        if (ts.isNumericLiteral(context)) {
            return this.visitNumericLiteral(new NumericLiteral(), context)
        } else if (ts.isObjectLiteralExpression(context)) {
            return this.visitObjectLiteralExpression(new ObjectLiteralExpression(), context)
        } else if (ts.isCallExpression(context)) {
            return this.visitCallExpression(new CallExpression(), context)
        } else if (ts.isIdentifier(context)) {
            return this.visitIdentifier(new Identifier(), context)
        } else if (ts.isPropertyAccessExpression(context)) {
            return this.visitPropertyAccessExpression(new PropertyAccessExpression(), context)
        } else if (util.isThisExpression(context)) {
            return this.visitThisExpression(new ThisExpression(), context);
        } else if (ts.isParenthesizedExpression(context)) {
            return this.visitParenthesizedExpression(new ParenthesizedExpression(), context);
        } else if (ts.isNewExpression(context)) {
            return this.visitNewExpression(new NewExpression(), context);
        } else if (ts.isElementAccessExpression(context)) {
            return this.visitElementAccessExpression(new ElementAccessExpression(), context)
        } else if (util.isSuperExpression(context)) {
            return this.visitSuperExpression(new SuperExpression(), context)
        } else {
            console.log(`visitLeftHandSideExpression ${context.kind}`)
        }
        return node;
    }
    visitSuperExpression(node: SuperExpression, context: any) {
        return node;
    }
    visitParenthesizedExpression(node: ParenthesizedExpression, context: any) {
        return node;
    }
    visitThisExpression(node: ThisExpression, context: ts.ThisExpression) {
        return node;
    }
    visitPropertyAccessExpression(node: PropertyAccessExpression, context: ts.PropertyAccessExpression) {
        node.node = context;
        node.expression = this.visitLeftHandSideExpression(new LeftHandSideExpression(), context.expression)
        node.name = this.visitIdentifier(new Identifier(), context.name)
        return node;
    }
    visitCallExpression(node: CallExpression, context: ts.CallExpression) {
        node.node = context;
        node.expression = this.visitLeftHandSideExpression(new LeftHandSideExpression(), context.expression)
        node.arguments = context.arguments.map(arg => this.visitExpression(new Expression(), arg))
        if (context.typeArguments) {
            node.typeArguments = context.typeArguments.map(arg => this.visitTypeNode(undefined, arg))
        }
        return node;
    }
    visitObjectLiteralExpression(node: ObjectLiteralExpression, context: ts.ObjectLiteralExpression) {
        node.node = context;
        node.properties = context.properties.map(pro => this.visitObjectLiteralElementLike(new ObjectLiteralElementLike(), pro))
        return node;
    }
    visitObjectLiteralElementLike(node: ObjectLiteralElementLike, context: ts.ObjectLiteralElementLike) {
        node.node = context;
        node.docs = this.createJsDocs((context as any).jsDoc);
        if (ts.isPropertyAssignment(context)) {
            return this.visitPropertyAssignment(new PropertyAssignment(), context)
        }
        if (ts.isShorthandPropertyAssignment(context)) {
            return this.visitShorthandPropertyAssignment(new ShorthandPropertyAssignment(), context)
        }
        if (ts.isSpreadAssignment(context)) {
            return this.visitSpreadAssignment(new SpreadAssignment(), context)
        }
        if (ts.isMethodDeclaration(context)) {
            return this.visitMethodDeclaration(new MethodDeclaration(), context)
        }
        if (ts.isGetAccessorDeclaration(context)) {
            return this.visitGetAccessorDeclaration(new GetAccessorDeclaration(), context)
        }
        if (ts.isSetAccessorDeclaration(context)) {
            return this.visitSetAccessorDeclaration(new SetAccessorDeclaration(), context)
        }
        return node;
    }
    visitShorthandPropertyAssignment(node: ShorthandPropertyAssignment, context: ts.ShorthandPropertyAssignment) {
        node.node = context;
        node.docs = this.createJsDocs((context as any).jsDoc);
        return node;
    }
    visitSpreadAssignment(node: SpreadAssignment, context: ts.SpreadAssignment) {
        node.node = context;
        node.docs = this.createJsDocs((context as any).jsDoc);
        return node;
    }
    visitPropertyAssignment(node: PropertyAssignment, context: ts.PropertyAssignment) {
        node.node = context;
        node.docs = this.createJsDocs((context as any).jsDoc);
        node.initializer = this.visitExpression(new Expression(), context.initializer)
        node.name = this.visitPropertyName(undefined, context.name)
        if (context.questionToken) {
            node.questionToken = this.visitQuestionToken(new QuestionToken(), context.questionToken)
        }
        return node;
    }
    visitSetAccessorDeclaration(node: SetAccessorDeclaration, context: ts.SetAccessorDeclaration) {
        node.node = context;
        node.docs = this.createJsDocs((context as any).jsDoc);
        if (context.decorators) {
            node.decorators = context.decorators.map(dec => this.visitDecorator(new Decorator(), dec))
        }
        node.name = this.visitPropertyName(undefined, context.name);
        if (context.body) {
            node.body = this.visitFunctionBody(new FunctionBody(), context.body);
        }
        if (context.parameters) {
            node.parameters = context.parameters.map(par => this.visitParameterDeclaration(new ParameterDeclaration(), par))
        }
        if (context.typeParameters) {
            node.typeParameters = context.typeParameters.map(par => this.visitTypeParameterDeclaration(new TypeParameterDeclaration(), par))
        }
        if (context.asteriskToken) {
            node.asteriskToken = this.visitAsteriskToken(new AsteriskToken(), context.asteriskToken)
        }
        if (context.questionToken) {
            node.questionToken = this.visitQuestionToken(new QuestionToken(), context.questionToken)
        }
        if (context.type) {
            node.type = this.visitTypeNode(undefined, context.type)
        }
        return node;
    }
    visitGetAccessorDeclaration(node: GetAccessorDeclaration, context: ts.GetAccessorDeclaration) {
        node.node = context;
        node.docs = this.createJsDocs((context as any).jsDoc);
        if (context.decorators) {
            node.decorators = context.decorators.map(dec => this.visitDecorator(new Decorator(), dec))
        }
        node.name = this.visitPropertyName(undefined, context.name);
        if (context.body) {
            node.body = this.visitFunctionBody(new FunctionBody(), context.body);
        }
        if (context.parameters) {
            node.parameters = context.parameters.map(par => this.visitParameterDeclaration(new ParameterDeclaration(), par))
        }
        if (context.typeParameters) {
            node.typeParameters = context.typeParameters.map(par => this.visitTypeParameterDeclaration(new TypeParameterDeclaration(), par))
        }
        if (context.asteriskToken) {
            node.asteriskToken = this.visitAsteriskToken(new AsteriskToken(), context.asteriskToken)
        }
        if (context.questionToken) {
            node.questionToken = this.visitQuestionToken(new QuestionToken(), context.questionToken)
        }
        if (context.type) {
            node.type = this.visitTypeNode(undefined, context.type)
        }
        return node;
    }
    visitAsteriskToken(node: AsteriskToken, context: ts.AsteriskToken) {
        return node;
    }
}

export const tsVisitor = new TsVisitor();