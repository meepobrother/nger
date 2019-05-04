"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const cli = tslib_1.__importStar(require("@angular/compiler-cli"));
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
    return transformMetadataValue(expression);
}
exports.transformMetadataSymbolicSpreadExpression = transformMetadataSymbolicSpreadExpression;
function transformMetadataSymbolicSelectExpression(meta) {
    const { expression, member } = meta;
    // todo
    transformMetadataValue(expression);
}
exports.transformMetadataSymbolicSelectExpression = transformMetadataSymbolicSelectExpression;
function transformFunctionMetadata(meta) {
}
exports.transformFunctionMetadata = transformFunctionMetadata;
function transformInterfaceMetadata(meta) {
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
