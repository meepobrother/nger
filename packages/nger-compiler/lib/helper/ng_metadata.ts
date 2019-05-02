import * as cli from '@angular/compiler-cli'
import * as h from './metadata/index'
import ts from 'typescript';
import { join } from 'path'
const root = process.cwd();
const options = require(join(root, 'tsconfig.json')).compilerOptions;
export class NgerCompilerNgMetadata {
    getMetadata(file: string, compilerOptions: ts.CompilerOptions = options): cli.ModuleMetadata | undefined {
        const collector = new cli.MetadataCollector();
        const compilerHost = ts.createCompilerHost(compilerOptions);
        const sourceFile = compilerHost.getSourceFile(file, ts.ScriptTarget.ESNext)
        if (sourceFile) {
            return collector.getMetadata(sourceFile)
        }
    }
    getNgModuleConfig(data: cli.ModuleMetadata) {
        const { metadata } = data;
        let result: any;
        Object.keys(metadata).map(key => {
            const meta = metadata[key];
            if (cli.isClassMetadata(meta)) {
                const decorator = this.findDecorator(meta.decorators || [], (meta: cli.MetadataImportedSymbolReferenceExpression) => {
                    return meta.module === 'nger-core' && meta.name === 'NgModule'
                }) as cli.MetadataSymbolicCallExpression;
                const args = decorator.arguments;
                args && args.map(arg => {
                    let val = h.transformMetadataValue(arg);
                    result = val;
                });
            }
        });
        return result;
    }

    getControllerConfig(data: cli.ModuleMetadata) {
        const { metadata } = data;
        let result: any;
        Object.keys(metadata).map(key => {
            const meta = metadata[key];
            if (cli.isClassMetadata(meta)) {
                const decorator = this.findDecorator(meta.decorators || [], (meta: cli.MetadataImportedSymbolReferenceExpression) => {
                    return meta.module === 'nger-core' && meta.name === 'Controller'
                }) as cli.MetadataSymbolicCallExpression;
                const args = decorator && decorator.arguments;
                args && args.map(arg => {
                    let val = h.transformMetadataValue(arg);
                    result = val;
                });
            }
        });
        return result;
    }

    getComponentConfig(data: cli.ModuleMetadata) {
        const { metadata } = data;
        let result: any = {};
        Object.keys(metadata).map(key => {
            const meta = metadata[key];
            if (cli.isClassMetadata(meta)) {
                const decorator = this.findDecorator(meta.decorators || [], (meta: cli.MetadataImportedSymbolReferenceExpression) => {
                    return meta.module === 'nger-core' && meta.name === 'Component'
                }) as cli.MetadataSymbolicCallExpression;
                const args = decorator && decorator.arguments;
                args && args.map(arg => {
                    let val = h.transformMetadataValue(arg);
                    result = val;
                });
            }
        });
        return result;
    }

    transformModuleMetadata(data: cli.ModuleMetadata) {
        const { metadata } = data;
        const result: { [key: string]: any } = {};
        Object.keys(metadata).map(key => {
            const meta = metadata[key];
            if (cli.isClassMetadata(meta)) {
                result[key] = h.transformClassMetadata(meta)
            } else if (cli.isInterfaceMetadata(meta)) {
                result[key] = h.transformInterfaceMetadata(meta)
            } else if (cli.isFunctionMetadata(meta)) {
                result[key] = h.transformFunctionMetadata(meta)
            } else {
                result[key] = h.transformMetadataValue(meta)
            }
        });
        return result;
    }
    findDecorator(
        decorators: (cli.MetadataSymbolicExpression | cli.MetadataError)[],
        filter: (meta: cli.MetadataValue) => boolean
    ): any {
        return decorators.find(decorator => {
            if (cli.isMetadataError(decorator)) {
                return false;
            } else {
                if (cli.isMetadataSymbolicCallExpression(decorator)) {
                    if (filter(decorator.expression)) {
                        return true;
                    }
                    return false;
                } else {
                    return false;
                }
            }
        })
    }
}