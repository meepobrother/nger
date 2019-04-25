import { MetadataCollector } from '@angular/compiler-cli/src/metadata/collector'
import ts from 'typescript'
const root = process.cwd();
import { join } from 'path'
const tsconfig = require(join(root, 'tsconfig.json'))
export {
    ModuleMetadata, isModuleMetadata, MetadataEntry,
    isClassMetadata, isMetadataSymbolicExpression,
    isMetadataSymbolicCallExpression, isMetadataSymbolicBinaryExpression,
    isConstructorMetadata, isFunctionMetadata, isInterfaceMetadata, isMemberMetadata,
    isMetadataError, isMetadataGlobalReferenceExpression, isMetadataImportDefaultReference,
    isMetadataImportedSymbolReferenceExpression, isMetadataModuleReferenceExpression,
    isMetadataSymbolicIfExpression, isMetadataSymbolicIndexExpression, isMetadataSymbolicPrefixExpression,
    isMetadataSymbolicReferenceExpression, isMetadataSymbolicSelectExpression, isMetadataSymbolicSpreadExpression,
    isMethodMetadata, isNgDiagnostic, isTsDiagnostic
} from '@angular/compiler-cli'
import {
    ModuleMetadata, isModuleMetadata, MetadataEntry,
    isClassMetadata, isMetadataSymbolicCallExpression,
    isMetadataImportedSymbolReferenceExpression
} from '@angular/compiler-cli'
import { NgModuleOptions } from 'nger-core';

export function getMetadata(file: string): ModuleMetadata | undefined {
    const collector = new MetadataCollector();
    const compilerHost = ts.createCompilerHost(tsconfig.compilerOptions);
    const sourceFile = compilerHost.getSourceFile(file, ts.ScriptTarget.ESNext)
    if (sourceFile) {
        return collector.getMetadata(sourceFile)
    }
}

export function getNgModuleMetadata(modulePath: string): NgModuleOptions | undefined {
    const metadata = getMetadata(modulePath);
    let ngModuleDef: NgModuleOptions | undefined = undefined;
    if (isModuleMetadata(metadata)) {
        const metadataMap = metadata.metadata;
        Object.keys(metadataMap).map((className: string) => {
            const metadataEntry: MetadataEntry = metadataMap[className];
            if (isClassMetadata(metadataEntry)) {
                const { decorators } = metadataEntry;
                if (decorators) {
                    decorators.map(decorator => {
                        if (isMetadataSymbolicCallExpression(decorator)) {
                            const { expression, arguments: _arguments } = decorator;
                            if (isMetadataImportedSymbolReferenceExpression(expression)) {
                                const { name, module } = expression;
                                if (name === "NgModule" && module === "nger-core") {
                                    _arguments && _arguments.map((arg) => {
                                        debugger;
                                    })
                                }
                            }
                        } else {
                            console.error(`没有处理`, decorator)
                        }
                    })
                }
            }
        })
    }
    return ngModuleDef;
}