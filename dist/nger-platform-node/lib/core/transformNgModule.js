Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const cli = tslib_1.__importStar(require("@angular/compiler-cli"));
function getNgModuleConfig(data) {
    const { metadata } = data;
    let result = {};
    Object.keys(metadata).map(key => {
        const meta = metadata[key];
        if (cli.isClassMetadata(meta)) {
            const decorator = findDecorator(meta.decorators || [], (meta) => {
                return meta.module === 'nger-core' && meta.name === 'NgModule';
            });
            const args = decorator.arguments;
            args && args.map(arg => {
                let val = transformMetadataValue(arg);
                result = val;
            });
        }
    });
    return result;
}
exports.getNgModuleConfig = getNgModuleConfig;
function getComponentConfig(data) {
    const { metadata } = data;
    let result = {};
    Object.keys(metadata).map(key => {
        const meta = metadata[key];
        if (cli.isClassMetadata(meta)) {
            const decorator = findDecorator(meta.decorators || [], (meta) => {
                return meta.module === 'nger-core' && meta.name === 'Component';
            });
            const args = decorator.arguments;
            args && args.map(arg => {
                let val = transformMetadataValue(arg);
                result = val;
            });
        }
    });
    return result;
}
exports.getComponentConfig = getComponentConfig;
function findDecorator(decorators, filter) {
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
exports.findDecorator = findDecorator;
function transformModuleMetadata(data) {
    const { metadata } = data;
    const result = {};
    Object.keys(metadata).map(key => {
        const meta = metadata[key];
        if (cli.isClassMetadata(meta)) {
            result[key] = transformClassMetadata(meta);
        }
        else if (cli.isInterfaceMetadata(meta)) {
            result[key] = transformInterfaceMetadata(meta);
        }
        else if (cli.isFunctionMetadata(meta)) {
            result[key] = transformFunctionMetadata(meta);
        }
        else {
            result[key] = transformMetadataValue(meta);
        }
    });
    return result;
}
exports.transformModuleMetadata = transformModuleMetadata;
// 是否是nger-core NgModule
function isNgerNgModule(meta) {
    return true;
}
function transformMetadataValue(meta) {
    // string | number | boolean | undefined | null 
    if (typeof meta === 'string') {
        return `${meta}`;
    }
    else if (typeof meta === 'number') {
        return meta;
    }
    else if (typeof meta === 'boolean') {
        return meta;
    }
    else if (typeof meta === 'undefined') {
        return undefined;
    }
    else if (meta === null) {
        return null;
    }
    else if (cli.isMetadataError(meta)) {
        transformMetadataError(meta);
    }
    else if (cli.isMetadataSymbolicSelectExpression(meta)) {
        return transformMetadataSymbolicSelectExpression(meta);
    }
    else if (cli.isMetadataSymbolicSpreadExpression(meta)) {
        return transformMetadataSymbolicSpreadExpression(meta);
    }
    else if (cli.isMetadataSymbolicReferenceExpression(meta)) {
        return transformMetadataSymbolicReferenceExpression(meta);
    }
    else if (cli.isMetadataSymbolicExpression(meta)) {
        debugger;
    }
    else if (cli.isMetadataSymbolicReferenceExpression(meta)) {
        debugger;
    }
    else if (cli.isMetadataSymbolicBinaryExpression(meta)) {
        debugger;
    }
    else if (cli.isMetadataSymbolicIndexExpression(meta)) {
        debugger;
    }
    else if (cli.isMetadataSymbolicCallExpression(meta)) {
        debugger;
    }
    else if (cli.isMetadataSymbolicPrefixExpression(meta)) {
        debugger;
    }
    else if (cli.isMetadataSymbolicIfExpression(meta)) {
        debugger;
    }
    else {
        if (Array.isArray(meta)) {
            return meta.map(me => transformMetadataValue(me));
        }
        else {
            let res = {};
            Object.keys(meta).map((key) => {
                res[key] = transformMetadataValue(meta[key]);
            });
            return res;
        }
    }
}
exports.transformMetadataValue = transformMetadataValue;
function transformMetadataSymbolicReferenceExpression(meta) {
    if (cli.isMetadataImportedSymbolReferenceExpression(meta)) {
        return transformMetadataImportedSymbolReferenceExpression(meta);
    }
    else if (cli.isMetadataGlobalReferenceExpression(meta)) {
        return meta.name;
    }
    else {
        debugger;
    }
}
exports.transformMetadataSymbolicReferenceExpression = transformMetadataSymbolicReferenceExpression;
// import { NgModule } from 'nger-core'
function transformMetadataImportedSymbolReferenceExpression(meta) {
    return {
        module: meta.module,
        name: meta.name
    };
}
exports.transformMetadataImportedSymbolReferenceExpression = transformMetadataImportedSymbolReferenceExpression;
function transformMetadataSymbolicSpreadExpression(meta) {
    const { expression } = meta;
    // todo
    console.log(`todo`);
    return transformMetadataValue(expression);
}
exports.transformMetadataSymbolicSpreadExpression = transformMetadataSymbolicSpreadExpression;
function transformMetadataSymbolicSelectExpression(meta) {
    const { expression, member } = meta;
    // todo
    console.log(`todo`);
    transformMetadataValue(expression);
}
exports.transformMetadataSymbolicSelectExpression = transformMetadataSymbolicSelectExpression;
function transformFunctionMetadata(meta) {
    console.log(meta);
}
exports.transformFunctionMetadata = transformFunctionMetadata;
function transformInterfaceMetadata(meta) {
    console.log(meta);
}
exports.transformInterfaceMetadata = transformInterfaceMetadata;
function transformClassMetadata(meta) {
    const { decorators } = meta;
    const result = [];
    if (decorators) {
        // 治理是所有的装饰器
        decorators.map(meta => {
            if (cli.isMetadataSymbolicExpression(meta)) {
                result.push(transformMetadataSymbolicExpression(meta));
            }
            else {
                transformMetadataError(meta);
            }
        });
    }
}
exports.transformClassMetadata = transformClassMetadata;
function transformMetadataSymbolicExpression(meta) {
    if (cli.isMetadataSymbolicBinaryExpression(meta)) {
        transformMetadataSymbolicBinaryExpression(meta);
    }
    else if (cli.isMetadataSymbolicIndexExpression(meta)) {
        transformMetadataSymbolicIndexExpression(meta);
    }
    else if (cli.isMetadataSymbolicCallExpression(meta)) {
        // 调用装饰器
        transformMetadataSymbolicCallExpression(meta);
    }
    else {
        debugger;
    }
}
exports.transformMetadataSymbolicExpression = transformMetadataSymbolicExpression;
function transformMetadataSymbolicCallExpression(meta) {
    const { expression, arguments: _args } = meta;
    return {
        expression: transformMetadataValue(expression),
        arguments: (_args || []).map(arg => {
            return arg;
        })
    };
}
exports.transformMetadataSymbolicCallExpression = transformMetadataSymbolicCallExpression;
function transformMetadataSymbolicIndexExpression(meta) {
    debugger;
}
exports.transformMetadataSymbolicIndexExpression = transformMetadataSymbolicIndexExpression;
function transformMetadataSymbolicBinaryExpression(meta) {
    const left = transformMetadataValue(meta.left);
    const right = transformMetadataValue(meta.right);
    const operator = meta.operator;
    return `${left}${operator}${right}`;
}
exports.transformMetadataSymbolicBinaryExpression = transformMetadataSymbolicBinaryExpression;
function transformMetadataError(meta) {
    throw new Error(`${meta.module}:${meta.message}`);
}
exports.transformMetadataError = transformMetadataError;
