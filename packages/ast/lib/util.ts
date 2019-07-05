import * as ts from 'typescript';
export type KeywordType =
    'any' | 'unknown' | 'number' | 'bigint'
    | 'object' | 'object' | 'boolean' | 'string'
    | 'symbol' | 'this' | 'void' | 'undefined' | 'null' | 'never';
export function createKeywordTypeNode(node: ts.Node): KeywordType {
    switch (node.kind) {
        case ts.SyntaxKind.AnyKeyword:
            return 'any';
        case ts.SyntaxKind.UnknownKeyword:
            return 'unknown';
        case ts.SyntaxKind.NumberKeyword:
            return 'number';
        case ts.SyntaxKind.BigIntKeyword:
            return 'bigint';
        case ts.SyntaxKind.ObjectKeyword:
            return 'object';
        case ts.SyntaxKind.BooleanKeyword:
            return 'boolean';
        case ts.SyntaxKind.StringKeyword:
            return 'string';
        case ts.SyntaxKind.SymbolKeyword:
            return 'symbol';
        case ts.SyntaxKind.ThisKeyword:
            return 'this';
        case ts.SyntaxKind.VoidKeyword:
            return 'void';
        case ts.SyntaxKind.UndefinedKeyword:
            return 'undefined'
        case ts.SyntaxKind.NullKeyword:
            return 'null'
        case ts.SyntaxKind.NeverKeyword:
            return 'never';
        default:
            return 'any';
    }
}
export function isKeywordTypeNode(node: ts.Node): node is ts.KeywordTypeNode {
    switch (node.kind) {
        case ts.SyntaxKind.AnyKeyword:
        case ts.SyntaxKind.UnknownKeyword:
        case ts.SyntaxKind.NumberKeyword:
        case ts.SyntaxKind.BigIntKeyword:
        case ts.SyntaxKind.ObjectKeyword:
        case ts.SyntaxKind.BooleanKeyword:
        case ts.SyntaxKind.StringKeyword:
        case ts.SyntaxKind.SymbolKeyword:
        case ts.SyntaxKind.ThisKeyword:
        case ts.SyntaxKind.VoidKeyword:
        case ts.SyntaxKind.UndefinedKeyword:
        case ts.SyntaxKind.NullKeyword:
        case ts.SyntaxKind.NeverKeyword:
            return true;
        default:
            return false;
    }
}
export function isBooleanLiteral(node: ts.Node): node is ts.BooleanLiteral {
    return node.kind === ts.SyntaxKind.FalseKeyword || node.kind === ts.SyntaxKind.TrueKeyword;
}

export function isQuestionToken(node: ts.Node): node is ts.QuestionToken {
    return node.kind === ts.SyntaxKind.QuestionToken
}

export function isPlusToken(node: ts.Node): node is ts.PlusToken {
    return node.kind === ts.SyntaxKind.PlusToken
}

export function isMinusToken(node: ts.Node): node is ts.MinusToken {
    return node.kind === ts.SyntaxKind.MinusToken;
}

export function isReadonlyToken(node: ts.Node): node is ts.ReadonlyToken {
    return node.kind === ts.SyntaxKind.ReadonlyKeyword;
}

export function isThisExpression(node: ts.Node): node is ts.ThisExpression {
    return node.kind === ts.SyntaxKind.ThisKeyword
}

export function isSuperExpression(node: ts.Node): node is ts.SuperExpression {
    return node.kind === ts.SyntaxKind.SuperKeyword;
}

export function isNullLiteral(node: ts.Node): node is ts.NullLiteral {
    return node.kind === ts.SyntaxKind.NullKeyword
}

export function isConstructSignatureDeclaration(node: ts.Node): node is ts.ConstructSignatureDeclaration {
    return node.kind === ts.SyntaxKind.ConstructSignature
}


export class TypeHelper {
    visit(val: ts.Type) {
        return {
            isAny: this.isAny(val),
            isBigInt: this.isBigInt(val),
            isBigIntLike: this.isBigIntLike(val),
            isBigIntLiteral: this.isBigIntLiteral(val),
            isBoolean: this.isBoolean(val),
            isBooleanLike: this.isBooleanLike(val),
            isBooleanLiteral: this.isBooleanLiteral(val),
            isClass: this.isClass(val),
            isClassOrInterface: this.isClassOrInterface(val),
            isConditional: this.isConditional(val),
            isESSymbol: this.isESSymbol(val),
            isESSymbolLike: this.isESSymbolLike(val),
            isEnum: this.isEnum(val),
            isEnumLike: this.isEnumLike(val),
            isEnumLiteral: this.isEnumLiteral(val),
            isIndex: this.isIndex(val),
            isIndexedAccess: this.isIndexedAccess(val),
            isInstantiable: this.isInstantiable(val),
            isInstantiableNonPrimitive: this.isInstantiableNonPrimitive(val),
            isInstantiablePrimitive: this.isInstantiablePrimitive(val),
            isIntersection: this.isIntersection(val),
            isLiteral: this.isLiteral(val),
            isNarrowable: this.isNarrowable(val),
            isNever: this.isNever(val),
            isNonPrimitive: this.isNonPrimitive(val),
            isNotUnionOrUnit: this.isNotUnionOrUnit(val),
            isNull: this.isNull(val),
            isNumber: this.isNumber(val),
            isNumberLike: this.isNumberLike(val),
            isNumberLiteral: this.isNumberLiteral(val),
            isObject: this.isObject(val),
            isPossiblyFalsy: this.isPossiblyFalsy(val),
            isString: this.isString(val),
            isStringLike: this.isStringLike(val),
            isStringLiteral: this.isStringLiteral(val),
            isStringOrNumberLiteral: this.isStringOrNumberLiteral(val),
            isStructuredOrInstantiable: this.isStructuredOrInstantiable(val),
            isSubstitution: this.isSubstitution(val),
            isTypeParameter: this.isTypeParameter(val),
            isTypeVariable: this.isTypeVariable(val),
            isUndefined: this.isUndefined(val),
            isUnion: this.isUnion(val),
            isUnionOrIntersection: this.isUnionOrIntersection(val),
            isUniqueESSymbol: this.isUniqueESSymbol(val),
            isUnit: this.isUnit(val),
            isUnknown: this.isUnknown(val),
            isVoid: this.isVoid(val),
            isVoidLike: this.isVoidLike(val),
        }
    }
    isAny(val: ts.Type): boolean {
        return val.flags === ts.TypeFlags.Any;
    }
    isUnknown(val: ts.Type): boolean {
        return val.flags === ts.TypeFlags.Unknown;
    }
    isLiteral(val: ts.Type): val is ts.LiteralType {
        return val.isLiteral();
    }
    isVoid(val: ts.Type): boolean {
        return val.flags === ts.TypeFlags.Void;
    }
    isVoidLike(val: ts.Type): boolean {
        return val.flags === ts.TypeFlags.VoidLike;
    }
    isUndefined(val: ts.Type): boolean {
        return val.flags === ts.TypeFlags.Undefined;
    }
    isNull(val: ts.Type): boolean {
        return val.flags === ts.TypeFlags.Null;
    }
    isNever(val: ts.Type): boolean {
        return val.flags === ts.TypeFlags.Never;
    }
    /**
     * string
     * @param {ts.Type} val 
     */
    isStringLiteral(val: ts.Type): val is ts.StringLiteralType {
        return val.isStringLiteral();
    }
    isString(val: ts.Type): boolean {
        return val.flags === ts.TypeFlags.String;
    }
    isStringLike(val: ts.Type): boolean {
        return val.flags === ts.TypeFlags.StringLike;
    }
    /**
     * number
     * @param {ts.Type} val 
     */
    isNumberLiteral(val: ts.Type): val is ts.NumberLiteralType {
        return val.isNumberLiteral();
    }
    isNumber(val: ts.Type): boolean {
        return val.flags === ts.TypeFlags.Number;
    }
    isNumberLike(val: ts.Type): boolean {
        return val.flags === ts.TypeFlags.NumberLike;
    }
    /**
     * bigint
     * @param {ts.Type} val 
     */
    isBigIntLiteral(val: ts.Type): val is ts.BigIntLiteralType {
        return val.flags === ts.TypeFlags.BigIntLiteral
    }
    isBigInt(val: ts.Type): boolean {
        return val.flags === ts.TypeFlags.BigInt
    }
    isBigIntLike(val: ts.Type): boolean {
        return val.flags === ts.TypeFlags.BigIntLike
    }
    /**
     * boolean
     * @param {ts.Type}val 
     */
    isBoolean(val: ts.Type): boolean {
        return val.flags === ts.TypeFlags.Boolean
    }
    isBooleanLike(val: ts.Type): boolean {
        return val.flags === ts.TypeFlags.BooleanLike
    }
    isBooleanLiteral(val: ts.Type): boolean {
        return val.flags === ts.TypeFlags.BooleanLiteral
    }
    /**
     * enum
     * @param {ts.Type}val 
     */
    isEnum(val: ts.Type): boolean {
        return val.flags === ts.TypeFlags.Enum
    }
    isEnumLike(val: ts.Type): boolean {
        return val.flags === ts.TypeFlags.EnumLike
    }
    isEnumLiteral(val: ts.Type): boolean {
        return val.flags === ts.TypeFlags.EnumLiteral
    }
    isStringOrNumberLiteral(val: ts.Type): boolean {
        return val.flags === ts.TypeFlags.StringOrNumberLiteral
    }
    /**
     * 
     * @param {ts.Type}val 
     */
    isClass(val: ts.Type): val is ts.InterfaceType {
        return val.isClass();
    }
    isClassOrInterface(val: ts.Type): val is ts.InterfaceType {
        return val.isClassOrInterface();
    }
    isTypeParameter(val: ts.Type): val is ts.TypeParameter {
        return val.isTypeParameter();
    }
    isUnionOrIntersection(val: ts.Type): val is ts.UnionOrIntersectionType {
        return val.isUnionOrIntersection();
    }
    isIntersection(val: ts.Type): val is ts.IntersectionType {
        return val.isIntersection();
    }
    isUnion(val: ts.Type): val is ts.UnionType {
        return val.isUnion();
    }
    isObject(val: ts.Type): boolean {
        return val.flags === ts.TypeFlags.Object
    }
    isIndex(val: ts.Type): boolean {
        return val.flags === ts.TypeFlags.Index
    }
    isConditional(val: ts.Type): boolean {
        return val.flags === ts.TypeFlags.Conditional
    }
    isSubstitution(val: ts.Type): boolean {
        return val.flags === ts.TypeFlags.Substitution
    }
    isIndexedAccess(val: ts.Type): boolean {
        return val.flags === ts.TypeFlags.IndexedAccess
    }
    isUnit(val: ts.Type): boolean {
        return val.flags === ts.TypeFlags.Unit
    }
    isNonPrimitive(val: ts.Type): boolean {
        return val.flags === ts.TypeFlags.NonPrimitive
    }
    isESSymbolLike(val: ts.Type): boolean {
        return val.flags === ts.TypeFlags.ESSymbolLike
    }
    isUniqueESSymbol(val: ts.Type): boolean {
        return val.flags === ts.TypeFlags.UniqueESSymbol
    }
    isPossiblyFalsy(val: ts.Type): boolean {
        return val.flags === ts.TypeFlags.PossiblyFalsy
    }
    isStructuredType(val: ts.Type): boolean {
        return val.flags === ts.TypeFlags.StructuredType
    }
    isTypeVariable(val: ts.Type): boolean {
        return val.flags === ts.TypeFlags.TypeVariable
    }
    isInstantiableNonPrimitive(val: ts.Type): boolean {
        return val.flags === ts.TypeFlags.InstantiableNonPrimitive
    }
    isInstantiablePrimitive(val: ts.Type): boolean {
        return val.flags === ts.TypeFlags.InstantiablePrimitive
    }
    isInstantiable(val: ts.Type): boolean {
        return val.flags === ts.TypeFlags.Instantiable
    }
    isESSymbol(val: ts.Type): boolean {
        return val.flags === ts.TypeFlags.ESSymbol
    }
    isNarrowable(val: ts.Type): boolean {
        return val.flags === ts.TypeFlags.Narrowable
    }
    isNotUnionOrUnit(val: ts.Type): boolean {
        return val.flags === ts.TypeFlags.NotUnionOrUnit
    }
    isStructuredOrInstantiable(val: ts.Type): boolean {
        return val.flags === ts.TypeFlags.StructuredOrInstantiable
    }
}
export const typeHelper = new TypeHelper();