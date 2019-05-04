import ts from 'typescript';
import { Injector } from 'nger-di';
export declare const componentTransformerFactory: (file: string, injector: Injector) => Promise<(context: ts.TransformationContext) => ts.Transformer<ts.SourceFile>>;
