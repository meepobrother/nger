"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const cli = tslib_1.__importStar(require("@angular/compiler-cli"));
const h = tslib_1.__importStar(require("./metadata/index"));
const typescript_1 = tslib_1.__importDefault(require("typescript"));
const path_1 = require("path");
const root = process.cwd();
const options = require(path_1.join(root, 'tsconfig.json')).compilerOptions;
class NgerCompilerNgMetadata {
    getMetadata(file, compilerOptions = options) {
        const collector = new cli.MetadataCollector();
        const compilerHost = typescript_1.default.createCompilerHost(compilerOptions);
        const sourceFile = compilerHost.getSourceFile(file, typescript_1.default.ScriptTarget.ESNext);
        if (sourceFile) {
            return collector.getMetadata(sourceFile);
        }
    }
    getNgModuleConfig(data) {
        const { metadata } = data;
        let result;
        Object.keys(metadata).map(key => {
            const meta = metadata[key];
            if (cli.isClassMetadata(meta)) {
                const decorator = this.findDecorator(meta.decorators || [], (meta) => {
                    if (cli.isMetadataImportedSymbolReferenceExpression(meta)) {
                        return meta.module === 'nger-core' && meta.name === 'NgModule';
                    }
                });
                const args = decorator.arguments;
                args && args.map(arg => {
                    let val = h.transformMetadataValue(arg);
                    result = val;
                });
            }
        });
        return result;
    }
    getControllerConfig(data) {
        const { metadata } = data;
        let result;
        Object.keys(metadata).map(key => {
            const meta = metadata[key];
            if (cli.isClassMetadata(meta)) {
                const decorator = this.findDecorator(meta.decorators || [], (meta) => {
                    if (cli.isMetadataImportedSymbolReferenceExpression(meta)) {
                        return meta.module === 'nger-core' && meta.name === 'Controller';
                    }
                });
                const args = decorator && decorator.arguments;
                args && args.map(arg => {
                    let val = h.transformMetadataValue(arg);
                    result = val;
                });
            }
        });
        return result;
    }
    getComponentConfig(data) {
        const { metadata } = data;
        let result;
        Object.keys(metadata).map(key => {
            const meta = metadata[key];
            if (cli.isClassMetadata(meta)) {
                const decorator = this.findDecorator(meta.decorators || [], (meta) => {
                    if (cli.isMetadataImportedSymbolReferenceExpression(meta)) {
                        return meta.module === 'nger-core' && (meta.name === 'Component' || meta.name === 'Page');
                    }
                });
                const args = decorator && decorator.arguments;
                args && args.map(arg => {
                    let val = h.transformMetadataValue(arg);
                    result = val;
                });
            }
        });
        return result;
    }
    transformModuleMetadata(data) {
        const { metadata } = data;
        const result = {};
        Object.keys(metadata).map(key => {
            const meta = metadata[key];
            if (cli.isClassMetadata(meta)) {
                result[key] = h.transformClassMetadata(meta);
            }
            else if (cli.isInterfaceMetadata(meta)) {
                result[key] = h.transformInterfaceMetadata(meta);
            }
            else if (cli.isFunctionMetadata(meta)) {
                result[key] = h.transformFunctionMetadata(meta);
            }
            else {
                result[key] = h.transformMetadataValue(meta);
            }
        });
        return result;
    }
    findDecorator(decorators, filter) {
        return decorators.find(decorator => {
            if (cli.isMetadataError(decorator)) {
                return false;
            }
            else {
                if (cli.isMetadataSymbolicCallExpression(decorator)) {
                    if (filter(decorator.expression)) {
                        return true;
                    }
                    return false;
                }
                else {
                    return false;
                }
            }
        });
    }
}
exports.NgerCompilerNgMetadata = NgerCompilerNgMetadata;
