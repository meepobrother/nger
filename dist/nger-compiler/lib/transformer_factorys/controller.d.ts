import ts from 'typescript';
export declare const controllerPropertyTransformerFactory: (context: ts.TransformationContext) => ts.Transformer<ts.SourceFile>;
export declare function hasPropertyMetadata(nodes: ts.NodeArray<ts.Decorator>, decorators?: string[]): boolean;
