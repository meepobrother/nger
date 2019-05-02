import * as cli from '@angular/compiler-cli'

export function transformMetadataValue(meta: cli.MetadataValue) {
    // string | number | boolean | undefined | null 
    if (typeof meta === 'string') {
        return `${meta}`;
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
    } else if (cli.isMetadataSymbolicExpression(meta)) {
        debugger;
    } else if (cli.isMetadataSymbolicReferenceExpression(meta)) {
        debugger;
    } else if (cli.isMetadataSymbolicBinaryExpression(meta)) {
        debugger;
    } else if (cli.isMetadataSymbolicIndexExpression(meta)) {
        debugger;
    } else if (cli.isMetadataSymbolicCallExpression(meta)) {
        debugger;
    } else if (cli.isMetadataSymbolicPrefixExpression(meta)) {
        debugger;
    } else if (cli.isMetadataSymbolicIfExpression(meta)) {
        debugger;
    } else {
        if (Array.isArray(meta)) {
            return meta.map(me => transformMetadataValue(me))
        } else {
            let res: { [key: string]: any } = {};
            Object.keys(meta).map((key) => {
                res[key] = transformMetadataValue(meta[key]);
            })
            return res;
        }
    }
}

export function transformMetadataSymbolicReferenceExpression(meta: cli.MetadataSymbolicReferenceExpression) {
    if (cli.isMetadataImportedSymbolReferenceExpression(meta)) {
        return transformMetadataImportedSymbolReferenceExpression(meta)
    } else if (cli.isMetadataGlobalReferenceExpression(meta)) {
        return meta.name;
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
    return transformMetadataValue(expression)
}
export function transformMetadataSymbolicSelectExpression(meta: cli.MetadataSymbolicSelectExpression) {
    const { expression, member } = meta;
    // todo
    transformMetadataValue(expression)
}
export function transformFunctionMetadata(meta: cli.FunctionMetadata) {
}
export function transformInterfaceMetadata(meta: cli.InterfaceMetadata) {
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
