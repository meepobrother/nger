import { parser } from './parser';
import { join } from 'path'
const root = process.cwd();
const app = join(root, 'src/app.ts')
const def = parser(app);
import * as ast from './ast'
export class TransformVisitor implements ast.MetadataVisitor {
    visitModuleMetadataAst(ast: ast.ModuleMetadataAst, context: any): any {
        console.log(`visitModuleMetadataAst`)
        const { metadata } = ast;
        if (metadata) {
            Object.keys(metadata).map(key => {
                const item = metadata[key];
                if (item) {
                    item.visit(this, context)
                }
            })
        }
    }
    visitClassMetadataAst(ast: ast.ClassMetadataAst, context: any): any {
        debugger;
        console.log(`visitModuleMetadataAst`)
    }
    visitInterfaceMetadataAst(ast: ast.InterfaceMetadataAst, context: any): any { }
    visitFunctionMetadataAst(ast: ast.FunctionMetadataAst, context: any): any { }
    visitMetadataValueAst(ast: ast.MetadataValueAst, context: any): any { }
    visitMetadataMapAst(ast: ast.MetadataMapAst, context: any): any { }
    visitMemberMetadataAst(ast: ast.MemberMetadataAst, context: any): any { }
    visitMethodMetadataAst(ast: ast.MethodMetadataAst, context: any): any { }
    visitConstructorMetadataAst(ast: ast.ConstructorMetadataAst, context: any): any { }
    visitMetadataSymbolicBinaryExpressionAst(ast: ast.MetadataSymbolicBinaryExpressionAst, context: any): any { }
    visitMetadataSymbolicIndexExpressionAst(ast: ast.MetadataSymbolicIndexExpressionAst, context: any): any { }
    visitMetadataSymbolicCallExpressionAst(ast: ast.MetadataSymbolicCallExpressionAst, context: any): any { }
    visitMetadataSymbolicPrefixExpressionAst(ast: ast.MetadataSymbolicPrefixExpressionAst, context: any): any { }
    visitMetadataSymbolicIfExpressionAst(ast: ast.MetadataSymbolicIfExpressionAst, context: any): any { }
    visitMetadataSourceLocationInfoAst(ast: ast.MetadataSourceLocationInfoAst, context: any): any { }
    visitMetadataGlobalReferenceExpressionAst(ast: ast.MetadataGlobalReferenceExpressionAst, context: any): any { }
    visitMetadataModuleReferenceExpressionAst(ast: ast.MetadataModuleReferenceExpressionAst, context: any): any { }
    visitMetadataImportedSymbolReferenceExpressionAst(ast: ast.MetadataImportedSymbolReferenceExpressionAst, context: any): any { }
    visitMetadataImportedDefaultReferenceExpressionAst(ast: ast.MetadataImportedDefaultReferenceExpressionAst, context: any): any { }
    visitMetadataSymbolicReferenceExpressionAst(ast: ast.MetadataSymbolicReferenceExpressionAst, context: any): any { }
    visitMetadataSymbolicSelectExpressionAst(ast: ast.MetadataSymbolicSelectExpressionAst, context: any): any { }
    visitMetadataSymbolicSpreadExpressionAst(ast: ast.MetadataSymbolicSpreadExpressionAst, context: any): any { }
    visitMetadataErrorAst(ast: ast.MetadataErrorAst, context: any): any { }
    visitModuleExportMetadataAst(ast: ast.ModuleExportMetadataAst, context: any): any { }
    visitMetadataEntryAst(ast: ast.MetadataEntryAst, context: any): any { }
    visitMetadataSymbolicExpressionAst(ast: ast.MetadataEntryAst, context: any): any { }
}
const transform = new TransformVisitor();
const res = def.visit(transform)
debugger;