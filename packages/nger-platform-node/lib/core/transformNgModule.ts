import * as cli from '@angular/compiler-cli'
export function transformModuleMetadata(data: cli.ModuleMetadata) {
    const { metadata } = data;
    const result: { [key: string]: any } = {};
    Object.keys(metadata).map(key => {
        const meta = metadata[key];
        if (cli.isClassMetadata(meta)) {
            result[key] = transformClassMetadata(meta)
        } else if (cli.isInterfaceMetadata(meta)) {
            result[key] = transformInterfaceMetadata(meta)
        } else if (cli.isFunctionMetadata(meta)) {
            result[key] = transformFunctionMetadata(meta)
        } else {
            result[key] = transformMetadataValue(meta)
        }
    });
    return result;
}
// 是否是nger-core NgModule
function isNgerNgModule(meta: any): boolean {
    return true;
}

export function transformMetadataValue(meta: cli.MetadataValue) {
    // string | number | boolean | undefined | null 
    if (typeof meta === 'string') {
        return `'${meta}'`;
    } else if (typeof meta === 'number') {
        return meta;
    } else if (typeof meta === 'boolean') {
        return meta;
    } else if (typeof meta === 'undefined') {
        return undefined;
    } else if (meta === null) {
        return null;
    } else if (cli.isMetadataError(meta)) {
        transformMetadataError(meta)
    } else if (cli.isMetadataSymbolicSelectExpression(meta)) {
        return transformMetadataSymbolicSelectExpression(meta)
    } else if (cli.isMetadataSymbolicSpreadExpression(meta)) {
        return transformMetadataSymbolicSpreadExpression(meta)
    } else if (cli.isMetadataSymbolicReferenceExpression(meta)) {
        return transformMetadataSymbolicReferenceExpression(meta)
    } else {
        debugger;
    }
}

export function transformMetadataSymbolicReferenceExpression(meta: cli.MetadataSymbolicReferenceExpression) {
    if (cli.isMetadataImportedSymbolReferenceExpression(meta)) {
        return transformMetadataImportedSymbolReferenceExpression(meta)
    } else {
        debugger;
    }
}
// import { NgModule } from 'nger-core'
export function transformMetadataImportedSymbolReferenceExpression(meta: cli.MetadataImportedSymbolReferenceExpression) {
    return {
        module: meta.module,
        name: meta.name
    }
}

export function transformMetadataSymbolicSpreadExpression(meta: cli.MetadataSymbolicSpreadExpression) {
    const { expression } = meta;
    // todo
    console.log(`todo`)
    return transformMetadataValue(expression)
}
export function transformMetadataSymbolicSelectExpression(meta: cli.MetadataSymbolicSelectExpression) {
    const { expression, member } = meta;
    // todo
    console.log(`todo`)
    transformMetadataValue(expression)
}
export function transformFunctionMetadata(meta: cli.FunctionMetadata) {
    console.log(meta)
}
export function transformInterfaceMetadata(meta: cli.InterfaceMetadata) {
    console.log(meta)
}
export function transformClassMetadata(meta: cli.ClassMetadata) {
    const { decorators } = meta;
    const result: any[] = [];
    if (decorators) {
        // 治理是所有的装饰器
        decorators.map(meta => {
            if (cli.isMetadataSymbolicExpression(meta)) {
                result.push(transformMetadataSymbolicExpression(meta))
            } else {
                transformMetadataError(meta)
            }
        })
    }
}
export function transformMetadataSymbolicExpression(meta: cli.MetadataSymbolicExpression) {
    if (cli.isMetadataSymbolicBinaryExpression(meta)) {
        transformMetadataSymbolicBinaryExpression(meta)
    } else if (cli.isMetadataSymbolicIndexExpression(meta)) {
        transformMetadataSymbolicIndexExpression(meta)
    } else if (cli.isMetadataSymbolicCallExpression(meta)) {
        // 调用装饰器
        transformMetadataSymbolicCallExpression(meta)
    } else {
        debugger;
    }
}

export function transformMetadataSymbolicCallExpression(meta: cli.MetadataSymbolicCallExpression) {
    const { expression, arguments: _args } = meta;
    return {
        expression: transformMetadataValue(expression),
        arguments: (_args || []).map(arg => {
            return arg;
        })
    }
}

export function transformMetadataSymbolicIndexExpression(meta: cli.MetadataSymbolicIndexExpression) {
    debugger;
}
export function transformMetadataSymbolicBinaryExpression(meta: cli.MetadataSymbolicBinaryExpression) {
    const left = transformMetadataValue(meta.left)
    const right = transformMetadataValue(meta.right)
    const operator = meta.operator;
    return `${left}${operator}${right}`
}

export function transformMetadataError(meta: cli.MetadataError) {
    throw new Error(`${meta.module}:${meta.message}`)
}
