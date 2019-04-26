import ts from 'typescript';
export class CustomTransformers {
    beforeTs?: ts.TransformerFactory<ts.SourceFile>[];
    afterTs?: ts.TransformerFactory<ts.SourceFile>[];
}