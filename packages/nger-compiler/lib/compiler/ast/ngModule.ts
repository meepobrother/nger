import { MetadataCollector } from '@angular/compiler-cli/src/metadata/collector'
import { join, dirname } from 'path'
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
    isModuleMetadata, MetadataEntry,
    isClassMetadata, isMetadataSymbolicCallExpression,
    isMetadataImportedSymbolReferenceExpression
} from '@angular/compiler-cli'
import { NgModuleOptions } from 'nger-core';
import { getMetadata } from '../getMetadata';
import { createDeclarations } from './declarations'
export function getNgModuleMetadata(modulePath: string): NgModuleOptions | undefined {
    const metadata = getMetadata(modulePath);
    let ngModuleDef: any = {};
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
                                        if (arg) {
                                            Object.keys(arg).map(key => {
                                                const item = arg[key]
                                                switch (key) {
                                                    case 'declarations':
                                                        createDeclarations(item)
                                                        break;
                                                    case 'providers':
                                                        createProviders(item);
                                                        break;
                                                }
                                            })
                                        }
                                    })
                                } else {
                                    debugger;
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