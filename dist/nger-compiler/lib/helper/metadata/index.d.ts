import * as cli from '@angular/compiler-cli';
export declare function transformMetadataValue(meta: cli.MetadataValue): any;
export declare function transformMetadataSymbolicReferenceExpression(meta: cli.MetadataSymbolicReferenceExpression): string | {
    module: string;
    name: string;
};
export declare function transformMetadataImportedSymbolReferenceExpression(meta: cli.MetadataImportedSymbolReferenceExpression): {
    module: string;
    name: string;
};
export declare function transformMetadataSymbolicSpreadExpression(meta: cli.MetadataSymbolicSpreadExpression): any;
export declare function transformMetadataSymbolicSelectExpression(meta: cli.MetadataSymbolicSelectExpression): void;
export declare function transformFunctionMetadata(meta: cli.FunctionMetadata): void;
export declare function transformInterfaceMetadata(meta: cli.InterfaceMetadata): void;
export declare function transformClassMetadata(meta: cli.ClassMetadata): void;
export declare function transformMetadataSymbolicExpression(meta: cli.MetadataSymbolicExpression): void;
export declare function transformMetadataSymbolicCallExpression(meta: cli.MetadataSymbolicCallExpression): {
    expression: any;
    arguments: cli.MetadataValue[];
};
export declare function transformMetadataSymbolicIndexExpression(meta: cli.MetadataSymbolicIndexExpression): void;
export declare function transformMetadataSymbolicBinaryExpression(meta: cli.MetadataSymbolicBinaryExpression): string;
export declare function transformMetadataError(meta: cli.MetadataError): void;
