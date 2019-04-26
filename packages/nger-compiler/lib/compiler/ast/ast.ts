import {
    ModuleMetadata, ClassMetadata,
    InterfaceMetadata, FunctionMetadata,
    MetadataValue, MetadataMap, MemberMetadata,
    MethodMetadata, ConstructorMetadata,
    MetadataObject, MetadataArray,
    MetadataSymbolicBinaryExpression,
    MetadataSymbolicIndexExpression,
    MetadataSymbolicCallExpression,
    MetadataSymbolicPrefixExpression,
    MetadataSymbolicIfExpression,
    MetadataSourceLocationInfo,
    MetadataGlobalReferenceExpression,
    MetadataModuleReferenceExpression,
    MetadataImportedSymbolReferenceExpression,
    MetadataImportedDefaultReferenceExpression,
    MetadataSymbolicReferenceExpression,
    MetadataSymbolicSelectExpression,
    MetadataSymbolicSpreadExpression,
    MetadataError, ModuleExportMetadata,
    MetadataEntry, MetadataSymbolicExpression
} from '@angular/compiler-cli';

export abstract class Ast {
    abstract visit(visitor: MetadataVisitor, context: any): any;
}

export interface MetadataVisitor<T = any, C = any> {
    visit?(ast: Ast, context: C): T;
    visitModuleMetadataAst(ast: ModuleMetadataAst, context: C): T;
    visitClassMetadataAst(ast: ClassMetadataAst, context: C): T;
    visitInterfaceMetadataAst(ast: InterfaceMetadataAst, context: C): T;
    visitFunctionMetadataAst(ast: FunctionMetadataAst, context: C): T;
    visitMetadataValueAst(ast: MetadataValueAst, context: C): T;
    visitMetadataMapAst(ast: MetadataMapAst, context: C): T;
    visitMemberMetadataAst(ast: MemberMetadataAst, context: C): T;
    visitMethodMetadataAst(ast: MethodMetadataAst, context: C): T;
    visitConstructorMetadataAst(ast: ConstructorMetadataAst, context: C): T;
    visitMetadataSymbolicBinaryExpressionAst(ast: MetadataSymbolicBinaryExpressionAst, context: C): T;
    visitMetadataSymbolicIndexExpressionAst(ast: MetadataSymbolicIndexExpressionAst, context: C): T;
    visitMetadataSymbolicCallExpressionAst(ast: MetadataSymbolicCallExpressionAst, context: C): T;
    visitMetadataSymbolicPrefixExpressionAst(ast: MetadataSymbolicPrefixExpressionAst, context: C): T;
    visitMetadataSymbolicIfExpressionAst(ast: MetadataSymbolicIfExpressionAst, context: C): T;
    visitMetadataSourceLocationInfoAst(ast: MetadataSourceLocationInfoAst, context: C): T;
    visitMetadataGlobalReferenceExpressionAst(ast: MetadataGlobalReferenceExpressionAst, context: C): T;
    visitMetadataModuleReferenceExpressionAst(ast: MetadataModuleReferenceExpressionAst, context: C): T;
    visitMetadataImportedSymbolReferenceExpressionAst(ast: MetadataImportedSymbolReferenceExpressionAst, context: C): T;
    visitMetadataImportedDefaultReferenceExpressionAst(ast: MetadataImportedDefaultReferenceExpressionAst, context: C): T;
    visitMetadataSymbolicReferenceExpressionAst(ast: MetadataSymbolicReferenceExpressionAst, context: C): T;
    visitMetadataSymbolicSelectExpressionAst(ast: MetadataSymbolicSelectExpressionAst, context: C): T;
    visitMetadataSymbolicSpreadExpressionAst(ast: MetadataSymbolicSpreadExpressionAst, context: C): T;
    visitMetadataErrorAst(ast: MetadataErrorAst, context: C): T;
    visitModuleExportMetadataAst(ast: ModuleExportMetadataAst, context: C): T;
    visitMetadataEntryAst(ast: MetadataEntryAst, context: C): T;
    visitMetadataSymbolicExpressionAst(ast: MetadataEntryAst, context: C): T;
}
export class MetadataSymbolicExpressionAst extends Ast {
    constructor(public ast: MetadataSymbolicExpression) {
        super();
    }
    visit(visitor: MetadataVisitor, context: any) {
        return visitor.visitMetadataSymbolicExpressionAst(this, context)
    }
}
export class ModuleExportMetadataAst extends Ast {
    constructor(public ast: ModuleExportMetadata) {
        super();
    }
    visit(visitor: MetadataVisitor, context: any) {
        return visitor.visitModuleExportMetadataAst(this, context)
    }
}
export class MetadataEntryAst extends Ast {
    constructor(public ast: MetadataEntry) {
        super();
    }
    visit(visitor: MetadataVisitor, context: any) {
        return visitor.visitMetadataEntryAst(this, context)
    }
}
export type MetadataEntryAsts = ClassMetadataAst | InterfaceMetadataAst | FunctionMetadataAst | MetadataValueAst;
export class ModuleMetadataAst extends Ast {
    exports?: ModuleExportMetadataAst[];
    metadata: { [key: string]: MetadataEntryAsts } = {};
    constructor(public ast: ModuleMetadata) {
        super();
    }
    visit(visitor: MetadataVisitor, context: any) {
        return visitor.visitModuleMetadataAst(this, context)
    }
}
export class ClassMetadataAst extends Ast {
    _extends?: MetadataSymbolicExpressionAst | MetadataErrorAst;
    decorators?: Array<MetadataSymbolicExpressionAst | MetadataErrorAst>;
    members?: { [name: string]: MemberMetadataAst[]; } = {};
    statics?: { [key: string]: FunctionMetadataAst | MetadataValueAst };
    constructor(public ast: ClassMetadata) {
        super();
    }
    visit(visitor: MetadataVisitor, context: any) {
        return visitor.visitClassMetadataAst(this, context)
    }
}
export class InterfaceMetadataAst extends Ast {
    constructor(public ast: InterfaceMetadata) {
        super();
    }
    visit(visitor: MetadataVisitor, context: any) {
        return visitor.visitInterfaceMetadataAst(this, context)
    }
}
export class FunctionMetadataAst extends Ast {
    defaults?: MetadataValueAst[];
    value: MetadataValueAst;
    constructor(public ast: FunctionMetadata) {
        super();
    }
    visit(visitor: MetadataVisitor, context: any) {
        return visitor.visitFunctionMetadataAst(this, context)
    }
}

// 这个是一类
export type MetadataValueAsts = string | number | boolean | undefined | null | MetadataObjectAst | MetadataArrayAst | MetadataSymbolicExpressionAst | MetadataSymbolicReferenceExpressionAst | MetadataSymbolicBinaryExpressionAst | MetadataSymbolicIndexExpressionAst | MetadataSymbolicCallExpressionAst | MetadataSymbolicPrefixExpressionAst | MetadataSymbolicIfExpressionAst | MetadataSymbolicSpreadExpressionAst | MetadataSymbolicSelectExpressionAsts | MetadataErrorAst;
export class MetadataValueAst extends Ast {
    constructor(public ast: MetadataValue) {
        super();
    }
    visit(visitor: MetadataVisitor, context: any) {
        return visitor.visitMetadataValueAst(this, context)
    }
}

export class MetadataMapAst extends Ast {
    constructor(public ast: MetadataMap) {
        super();
    }
    visit(visitor: MetadataVisitor, context: any) {
        return visitor.visitMetadataMapAst(this, context)
    }
}
export class MemberMetadataAst extends Ast {
    decorators?: Array<MetadataSymbolicExpressionAst | MetadataErrorAst>;
    constructor(public ast: MemberMetadata) {
        super();
    }
    visit(visitor: MetadataVisitor, context: any) {
        return visitor.visitMemberMetadataAst(this, context)
    }
}
export class MethodMetadataAst extends Ast {
    parameterDecorators?: ((MetadataSymbolicExpressionAst | MetadataErrorAst)[] | undefined)[];
    constructor(public ast: MethodMetadata) {
        super();
    }
    visit(visitor: MetadataVisitor, context: any) {
        return visitor.visitMethodMetadataAst(this, context)
    }
}
export class ConstructorMetadataAst extends Ast {
    parameters?: (MetadataSymbolicExpressionAst | MetadataErrorAst | null | undefined)[];
    constructor(public ast: ConstructorMetadata) {
        super();
    }
    visit(visitor: MetadataVisitor, context: any) {
        return visitor.visitConstructorMetadataAst(this, context)
    }
}
export type MetadataObjectAst = { [key: string]: MetadataValueAst }
export type MetadataArrayAst = { [key: number]: MetadataValueAst }

export class MetadataSymbolicBinaryExpressionAst extends Ast {
    left: MetadataValueAst;
    right: MetadataValueAst;
    constructor(public ast: MetadataSymbolicBinaryExpression) {
        super();
    }
    visit(visitor: MetadataVisitor, context: any) {
        return visitor.visitMetadataSymbolicBinaryExpressionAst(this, context)
    }
}
export class MetadataSymbolicIndexExpressionAst extends Ast {
    expression: MetadataValueAst;
    index: MetadataValueAst;
    constructor(public ast: MetadataSymbolicIndexExpression) {
        super();
    }
    visit(visitor: MetadataVisitor, context: any) {
        return visitor.visitMetadataSymbolicIndexExpressionAst(this, context)
    }
}
export class MetadataSymbolicCallExpressionAst extends Ast {
    expression: MetadataValueAst;
    _arguments?: MetadataValueAst[];
    constructor(public ast: MetadataSymbolicCallExpression) {
        super();
    }
    visit(visitor: MetadataVisitor, context: any) {
        return visitor.visitMetadataSymbolicCallExpressionAst(this, context)
    }
}
export class MetadataSymbolicPrefixExpressionAst extends Ast {
    operand: MetadataValueAst;
    constructor(public ast: MetadataSymbolicPrefixExpression) {
        super();
    }
    visit(visitor: MetadataVisitor, context: any) {
        return visitor.visitMetadataSymbolicPrefixExpressionAst(this, context)
    }
}
export class MetadataSymbolicIfExpressionAst extends Ast {
    condition: MetadataValueAst;
    thenExpression: MetadataValueAst;
    elseExpression: MetadataValueAst;
    constructor(public ast: MetadataSymbolicIfExpression) {
        super();
    }
    visit(visitor: MetadataVisitor, context: any) {
        return visitor.visitMetadataSymbolicIfExpressionAst(this, context)
    }
}

export class MetadataSourceLocationInfoAst extends Ast {
    constructor(public ast: MetadataSourceLocationInfo) {
        super();
    }
    visit(visitor: MetadataVisitor, context: any) {
        return visitor.visitMetadataSourceLocationInfoAst(this, context)
    }
}
export class MetadataGlobalReferenceExpressionAst extends Ast {
    _arguments?: MetadataValueAst[];
    constructor(public ast: MetadataGlobalReferenceExpression) {
        super();
    }
    visit(visitor: MetadataVisitor, context: any) {
        return visitor.visitMetadataGlobalReferenceExpressionAst(this, context)
    }
}

export class MetadataModuleReferenceExpressionAst extends Ast {
    constructor(public ast: MetadataModuleReferenceExpression) {
        super();
    }
    visit(visitor: MetadataVisitor, context: any) {
        return visitor.visitMetadataModuleReferenceExpressionAst(this, context)
    }
}

export class MetadataImportedSymbolReferenceExpressionAst extends Ast {
    _arguments: MetadataValueAst[];
    constructor(public ast: MetadataImportedSymbolReferenceExpression) {
        super();
    }
    visit(visitor: MetadataVisitor, context: any) {
        return visitor.visitMetadataImportedSymbolReferenceExpressionAst(this, context)
    }
}

export class MetadataImportedDefaultReferenceExpressionAst extends Ast {
    _arguments: MetadataValueAst[];
    constructor(public ast: MetadataImportedDefaultReferenceExpression) {
        super();
    }
    visit(visitor: MetadataVisitor, context: any) {
        return visitor.visitMetadataImportedDefaultReferenceExpressionAst(this, context)
    }
}

export class MetadataSymbolicReferenceExpressionAst extends Ast {
    expression: MetadataValueAst;
    constructor(public ast: MetadataSymbolicReferenceExpression) {
        super();
    }
    visit(visitor: MetadataVisitor, context: any) {
        return visitor.visitMetadataSymbolicReferenceExpressionAst(this, context)
    }
}
export type MetadataSymbolicSelectExpressionAsts = MetadataGlobalReferenceExpressionAst | MetadataModuleReferenceExpressionAst | MetadataImportedSymbolReferenceExpressionAst | MetadataImportedDefaultReferenceExpressionAst
export class MetadataSymbolicSelectExpressionAst extends Ast {
    expression: MetadataValueAst;
    constructor(public ast: MetadataSymbolicSelectExpression) {
        super();
    }
    visit(visitor: MetadataVisitor, context: any) {
        return visitor.visitMetadataSymbolicSelectExpressionAst(this, context)
    }
}
export class MetadataSymbolicSpreadExpressionAst extends Ast {
    expression: MetadataValueAst;
    constructor(public ast: MetadataSymbolicSpreadExpression) {
        super();
    }
    visit(visitor: MetadataVisitor, context: any) {
        return visitor.visitMetadataSymbolicSpreadExpressionAst(this, context)
    }
}
export class MetadataErrorAst extends Ast {
    constructor(public ast: MetadataError) {
        super();
    }
    visit(visitor: MetadataVisitor, context: any) {
        return visitor.visitMetadataErrorAst(this, context)
    }
}
