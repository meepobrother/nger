import { getMetadata } from '../../getMetadata';
import {
    ModuleMetadataAst, MetadataVisitor,
    Ast, ClassMetadataAst, InterfaceMetadataAst,
    FunctionMetadataAst, MetadataValueAst,
    MetadataMapAst, MemberMetadataAst,
    MethodMetadataAst, ConstructorMetadataAst,
    MetadataSymbolicBinaryExpressionAst,
    MetadataSymbolicIndexExpressionAst,
    MetadataSymbolicCallExpressionAst,
    MetadataSymbolicPrefixExpressionAst,
    MetadataSymbolicIfExpressionAst,
    MetadataSourceLocationInfoAst,
    MetadataGlobalReferenceExpressionAst,
    MetadataModuleReferenceExpressionAst,
    MetadataImportedSymbolReferenceExpressionAst,
    MetadataImportedDefaultReferenceExpressionAst,
    MetadataSymbolicReferenceExpressionAst,
    MetadataSymbolicSelectExpressionAst,
    MetadataSymbolicSpreadExpressionAst,
    MetadataErrorAst, ModuleExportMetadataAst,
    MetadataEntryAst, MetadataEntryAsts,
    MetadataSymbolicExpressionAst, MetadataValueAsts
} from './ast';
import {
    isModuleMetadata, isClassMetadata, isInterfaceMetadata,
    isFunctionMetadata, isMetadataSymbolicExpression,
    isMetadataSymbolicBinaryExpression, isMetadataSymbolicIndexExpression,
    isMetadataSymbolicCallExpression, isMetadataSymbolicIfExpression,
    isMetadataGlobalReferenceExpression, isMetadataModuleReferenceExpression,
    isMetadataImportedSymbolReferenceExpression, isMetadataImportDefaultReference,
    isMetadataSymbolicSelectExpression, isMetadataSymbolicSpreadExpression,
    isMetadataSymbolicPrefixExpression, isMetadataSymbolicReferenceExpression,
    isMetadataError
} from '@angular/compiler-cli';

export class ParserMetadataVisitor implements MetadataVisitor<any, any> {
    visit(ast: Ast, context: any): any {
        return ast.visit(this, context)
    }
    visitModuleMetadataAst(ast: ModuleMetadataAst, context: any): any {
        const def = ast.ast;
        const { exports, metadata } = def;
        if (exports) {
            ast.exports = exports.map(exp => {
                return new ModuleExportMetadataAst(exp).visit(this, context);
            });
        }
        if (metadata) {
            const res: { [key: string]: MetadataEntryAsts } = {};
            Object.keys(metadata).map(key => {
                const val = metadata[key]
                res[key] = new MetadataEntryAst(val).visit(this, context);
            });
            ast.metadata = res;
        }
        return ast;
    }
    visitMetadataEntryAst(ast: MetadataEntryAst, context: any): MetadataEntryAsts {
        const def = ast.ast;
        if (isClassMetadata(def)) {
            return new ClassMetadataAst(def).visit(this, context)
        } else if (isInterfaceMetadata(def)) {
            return new InterfaceMetadataAst(def).visit(this, context)
        } else if (isFunctionMetadata(def)) {
            return new FunctionMetadataAst(def).visit(this, context)
        } else {
            return new MetadataValueAst(def).visit(this, context)
        }
    }
    visitModuleExportMetadataAst(ast: ModuleExportMetadataAst, context: any) {
        return ast;
    }
    // MetadataSymbolicBinaryExpression | MetadataSymbolicIndexExpression | 
    // MetadataSymbolicCallExpression |  MetadataSymbolicPrefixExpression | 
    // MetadataSymbolicIfExpression | MetadataGlobalReferenceExpression | 
    // MetadataModuleReferenceExpression | MetadataImportedSymbolReferenceExpression | 
    // MetadataImportedDefaultReferenceExpression | MetadataSymbolicSelectExpression | 
    // MetadataSymbolicSpreadExpression
    visitMetadataSymbolicExpressionAst(ast: MetadataEntryAst, context: any) {
        const def = ast.ast;
        if (isMetadataSymbolicBinaryExpression(def)) {
            return new MetadataSymbolicBinaryExpressionAst(def).visit(this, context)
        } else if (isMetadataSymbolicIndexExpression(def)) {
            return new MetadataSymbolicIndexExpressionAst(def).visit(this, context)
        } else if (isMetadataSymbolicCallExpression(def)) {
            return new MetadataSymbolicCallExpressionAst(def).visit(this, context)
        } else if (isMetadataSymbolicIfExpression(def)) {
            return new MetadataSymbolicIfExpressionAst(def).visit(this, context)
        } else if (isMetadataGlobalReferenceExpression(def)) {
            return new MetadataGlobalReferenceExpressionAst(def).visit(this, context)
        } else if (isMetadataModuleReferenceExpression(def)) {
            return new MetadataModuleReferenceExpressionAst(def).visit(this, context)
        } else if (isMetadataImportedSymbolReferenceExpression(def)) {
            return new MetadataImportedSymbolReferenceExpressionAst(def).visit(this, context)
        } else if (isMetadataImportDefaultReference(def)) {
            return new MetadataImportedDefaultReferenceExpressionAst(def).visit(this, context)
        } else if (isMetadataSymbolicSelectExpression(def)) {
            return new MetadataSymbolicSelectExpressionAst(def).visit(this, context)
        } else if (isMetadataSymbolicSpreadExpression(def)) {
            return new MetadataSymbolicSpreadExpressionAst(def).visit(this, context)
        } else if (isMetadataSymbolicPrefixExpression(def)) {
            return new MetadataSymbolicPrefixExpressionAst(def).visit(this, context)
        }
        return ast;
    }

    visitClassMetadataAst(ast: ClassMetadataAst, context: any) {
        const { extends: _extends, decorators, members, statics } = ast.ast;
        if (_extends) {
            if (isMetadataSymbolicExpression(_extends)) {
                ast._extends = new MetadataSymbolicExpressionAst(_extends).visit(this, context)
            } else {
                ast._extends = new MetadataErrorAst(_extends).visit(this, context)
            }
        }
        if (decorators) {
            ast.decorators = decorators.map(decorator => {
                // MetadataSymbolicExpression | MetadataError
                if (isMetadataSymbolicExpression(decorator)) {
                    return new MetadataSymbolicExpressionAst(decorator).visit(this, context)
                } else {
                    return new MetadataErrorAst(decorator).visit(this, context)
                }
            })
        }
        if (members) {
            ast.members = new MetadataMapAst(members).visit(this, context)
        }
        if (statics) {
            const res: { [key: string]: FunctionMetadataAst | MetadataValueAst } = {};
            Object.keys(statics).map(key => {
                const val = statics[key];
                // MetadataValue | FunctionMetadata
                if (isFunctionMetadata(val)) {
                    res[key] = new FunctionMetadataAst(val).visit(this, context)
                } else {
                    res[key] = new MetadataValueAst(val).visit(this, context)
                }
            });
            ast.statics = res;
        }
        return ast;
    }

    visitInterfaceMetadataAst(ast: InterfaceMetadataAst, context: any): any {
        return ast;
    }
    visitFunctionMetadataAst(ast: FunctionMetadataAst, context: any): any {
        const { defaults, value } = ast.ast;
        if (defaults) {
            ast.defaults = defaults.map(de => new MetadataValueAst(de).visit(this, context))
        }
        ast.value = new MetadataValueAst(value).visit(this, context)
    }
    visitMetadataValueAst(ast: MetadataValueAst, context: any): MetadataValueAsts {
        const def = ast.ast;
        if (typeof def === 'string') {
            return def;
        } else if (typeof def === 'number') {
            return def;
        } else if (typeof def === 'boolean') {
            return def;
        } else if (typeof def === 'undefined') {
            return def;
        } else if (def === null) {
            return def;
        } else if (typeof def === 'object') {
            let res: { [key: string]: MetadataValueAst } = {};
            Object.keys(def).map(key => {
                res[key] = new MetadataValueAst(def[key]).visit(this, context)
            });
            return res;
        } else if (isMetadataSymbolicExpression(def)) {
            return new MetadataSymbolicExpressionAst(def).visit(this, context)
        } else if (isMetadataSymbolicReferenceExpression(def)) {
            return new MetadataSymbolicReferenceExpressionAst(def).visit(this, context)
        } else if (isMetadataSymbolicBinaryExpression(def)) {
            return new MetadataSymbolicBinaryExpressionAst(def).visit(this, context)
        } else if (isMetadataSymbolicIndexExpression(def)) {
            return new MetadataSymbolicIndexExpressionAst(def).visit(this, context)
        } else if (isMetadataSymbolicCallExpression(def)) {
            return new MetadataSymbolicCallExpressionAst(def).visit(this, context)
        } else if (isMetadataSymbolicPrefixExpression(def)) {
            return new MetadataSymbolicPrefixExpressionAst(def).visit(this, context)
        } else if (isMetadataSymbolicIfExpression(def)) {
            return new MetadataSymbolicIfExpressionAst(def).visit(this, context)
        } else if (isMetadataSymbolicSpreadExpression(def)) {
            return new MetadataSymbolicSpreadExpressionAst(def).visit(this, context)
        } else if (isMetadataSymbolicSelectExpression(def)) {
            return new MetadataSymbolicSelectExpressionAst(def).visit(this, context)
        } else if (isMetadataError(def)) {
            return new MetadataErrorAst(def).visit(this, context)
        }
    }
    visitMetadataMapAst(ast: MetadataMapAst, context: any): any {
        let def = ast.ast;
        const res: { [name: string]: MemberMetadataAst[]; } = {};
        Object.keys(def).map(key => {
            let items = def[key];
            res[key] = items.map(item => new MemberMetadataAst(item).visit(this, context))
        })
        return def;
    }
    visitMemberMetadataAst(ast: MemberMetadataAst, context: any): any {
        //decorators?: (MetadataSymbolicExpression | MetadataError)[];
        const { decorators } = ast.ast;
        if (decorators) {
            ast.decorators = decorators.map(de => {
                if (isMetadataSymbolicExpression(de)) {
                    return new MetadataSymbolicExpressionAst(de).visit(this, context)
                } else {
                    return new MetadataErrorAst(de).visit(this, context)
                }
            })
        }
        return ast;
    }
    visitMethodMetadataAst(ast: MethodMetadataAst, context: any): any {
        // parameterDecorators?: ((MetadataSymbolicExpression | MetadataError)[] | undefined)[];
        const { parameterDecorators } = ast.ast;
        if (parameterDecorators) {
            ast.parameterDecorators = parameterDecorators.map(pars => {
                if (Array.isArray(pars)) {
                    return pars.map(par => {
                        if (isMetadataSymbolicExpression(par)) {
                            return new MetadataSymbolicExpressionAst(par).visit(this, context)
                        } else {
                            return new MetadataErrorAst(par).visit(this, context)
                        }
                    })
                } else {
                    return undefined
                }
            })
        }
        return ast;
    }
    visitConstructorMetadataAst(ast: ConstructorMetadataAst, context: any): any {
        const { parameters } = ast.ast;
        if (parameters) {
            ast.parameters = parameters.map(par => {
                if (isMetadataSymbolicExpression(par)) {
                    return new MetadataSymbolicExpressionAst(par).visit(this, context)
                } else if (isMetadataError(par)) {
                    return new MetadataErrorAst(par).visit(this, context)
                } else if (typeof par === null) {
                    return null;
                } else {
                    return undefined;
                }
            })
        }
        return ast;
    }
    visitMetadataSymbolicBinaryExpressionAst(ast: MetadataSymbolicBinaryExpressionAst, context: any): any {
        // left: MetadataValue;
        // right: MetadataValue;
        const { left, right } = ast.ast;
        ast.left = new MetadataValueAst(left).visit(this, context)
        ast.right = new MetadataValueAst(right).visit(this, context)
        return ast;
    }
    visitMetadataSymbolicIndexExpressionAst(ast: MetadataSymbolicIndexExpressionAst, context: any): any {
        //expression: MetadataValue;
        // index: MetadataValue;
        const { expression, index } = ast.ast;
        ast.expression = new MetadataValueAst(expression).visit(this, context)
        ast.index = new MetadataValueAst(index).visit(this, context)
        return ast;
    }
    visitMetadataSymbolicCallExpressionAst(ast: MetadataSymbolicCallExpressionAst, context: any): any {
        //expression: MetadataValue;
        // arguments?: MetadataValue[];
        const { expression, arguments: _arguments } = ast.ast;
        ast.expression = new MetadataValueAst(expression).visit(this, context)
        if (_arguments) {
            ast._arguments = _arguments.map(arg => new MetadataValueAst(arg).visit(this, context))
        }
        return ast;
    }
    visitMetadataSymbolicPrefixExpressionAst(ast: MetadataSymbolicPrefixExpressionAst, context: any): any {
        // operand: MetadataValue;
        const { operand } = ast.ast;
        ast.operand = new MetadataValueAst(operand).visit(this, context)
        return ast;
    }
    visitMetadataSymbolicIfExpressionAst(ast: MetadataSymbolicIfExpressionAst, context: any): any {
        // condition: MetadataValue;
        // thenExpression: MetadataValue;
        // elseExpression: MetadataValue;
        const { condition, thenExpression, elseExpression } = ast.ast;
        ast.condition = new MetadataValueAst(condition).visit(this, context)
        ast.thenExpression = new MetadataValueAst(thenExpression).visit(this, context)
        ast.elseExpression = new MetadataValueAst(elseExpression).visit(this, context)
        return ast;
    }
    visitMetadataSourceLocationInfoAst(ast: MetadataSourceLocationInfoAst, context: any): any {
        return ast;
    }
    visitMetadataGlobalReferenceExpressionAst(ast: MetadataGlobalReferenceExpressionAst, context: any): any {
        const { arguments: _arguments } = ast.ast;
        if (_arguments) ast._arguments = _arguments.map(arg => new MetadataValueAst(arg).visit(this, context))
        return ast;
    }
    visitMetadataModuleReferenceExpressionAst(ast: MetadataModuleReferenceExpressionAst, context: any): any {
        return ast;
    }
    visitMetadataImportedSymbolReferenceExpressionAst(ast: MetadataImportedSymbolReferenceExpressionAst, context: any): any {
        // arguments?: MetadataValue[];
        const { arguments: _arguments } = ast.ast;
        if (_arguments) ast._arguments = _arguments.map(arg => new MetadataValueAst(arg).visit(this, context))
        return ast;
    }
    visitMetadataImportedDefaultReferenceExpressionAst(ast: MetadataImportedDefaultReferenceExpressionAst, context: any): any {
        // arguments?: MetadataValue[];
        const { arguments: _arguments } = ast.ast;
        if (_arguments) ast._arguments = _arguments.map(arg => new MetadataValueAst(arg).visit(this, context))
        return ast;
    }
    // MetadataGlobalReferenceExpression | MetadataModuleReferenceExpression | MetadataImportedSymbolReferenceExpression | MetadataImportedDefaultReferenceExpression
    visitMetadataSymbolicReferenceExpressionAst(ast: MetadataSymbolicReferenceExpressionAst, context: any): any {
        // expression: MetadataValue;
        const def = ast.ast;
        if (isMetadataGlobalReferenceExpression(def)) {
            return new MetadataGlobalReferenceExpressionAst(def).visit(this, context)
        } else if (isMetadataModuleReferenceExpression(def)) {
            return new MetadataModuleReferenceExpressionAst(def).visit(this, context)
        } else if (isMetadataImportedSymbolReferenceExpression(def)) {
            return new MetadataImportedSymbolReferenceExpressionAst(def).visit(this, context)
        } else if (isMetadataImportDefaultReference(def)) {
            return new MetadataImportedDefaultReferenceExpressionAst(def).visit(this, context)
        }
        return ast;
    }
    visitMetadataSymbolicSelectExpressionAst(ast: MetadataSymbolicSelectExpressionAst, context: any): any {
        // expression: MetadataValue;
        const { expression } = ast.ast;
        ast.expression = new MetadataValueAst(expression).visit(this, context);
        return ast;
    }
    visitMetadataSymbolicSpreadExpressionAst(ast: MetadataSymbolicSpreadExpressionAst, context: any): any {
        const { expression } = ast.ast;
        ast.expression = new MetadataValueAst(expression).visit(this, context);
        return ast;
    }
    visitMetadataErrorAst(ast: MetadataErrorAst, context: any): any {
        return ast;
    }
}

export class MetadataParser {
    parse(path: string) {
        const metadata = getMetadata(path);
        if (isModuleMetadata(metadata)) {
            const moduleAst = new ModuleMetadataAst(metadata)
            const parser = new ParserMetadataVisitor();
            const context = { path };
            return moduleAst.visit(parser, context);
        }
    }
}
export const parser = (path: string) => new MetadataParser().parse(path);
