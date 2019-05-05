import ts, { TransformationContext, Transformer } from 'typescript'
import { hasMetadata } from './controller';
export const componentRenderTransformerFactory = (context: TransformationContext): Transformer<ts.SourceFile> => {
    return (node: ts.SourceFile): ts.SourceFile => {
        node.statements = ts.createNodeArray(
            node.statements.map((node: ts.Statement) => {
                if (ts.isImportDeclaration(node)) {
                    return node;
                } else if (ts.isClassDeclaration(node)) {
                    if (hasMetadata(node.decorators, ['Page', 'Component'])) {
                        const classDeclaration = ts.createClassDeclaration(
                            node.decorators,
                            node.modifiers,
                            node.name,
                            node.typeParameters,
                            node.heritageClauses,
                            node.members.map(member => {
                                if (ts.isMethodDeclaration(member)) {
                                    if (ts.isIdentifier(member.name)) {
                                        if (member.name.text === 'render') {
                                            if (member.parameters.length === 0) {
                                                return ts.createMethod(
                                                    member.decorators,
                                                    member.modifiers,
                                                    member.asteriskToken,
                                                    member.name,
                                                    member.questionToken,
                                                    member.typeParameters,
                                                    ts.createNodeArray([
                                                        ts.createParameter(undefined, undefined, undefined, 'h'),
                                                        ts.createParameter(undefined, undefined, undefined, 'element'),
                                                        ts.createParameter(undefined, undefined, undefined, 'template'),
                                                        ts.createParameter(undefined, undefined, undefined, 'content'),
                                                        ts.createParameter(undefined, undefined, undefined, 'textAttribute'),
                                                        ts.createParameter(undefined, undefined, undefined, 'boundAttribute'),
                                                        ts.createParameter(undefined, undefined, undefined, 'boundEvent'),
                                                        ts.createParameter(undefined, undefined, undefined, 'text'),
                                                        ts.createParameter(undefined, undefined, undefined, 'boundText'),
                                                        ts.createParameter(undefined, undefined, undefined, 'icu'),
                                                    ]),
                                                    member.type,
                                                    // 这里的body要处理一下
                                                    member.body
                                                )
                                            }
                                        }
                                    }
                                }
                                return member;
                            }).filter(node => !!node)
                        );
                        return classDeclaration;
                    }
                    return node;
                } else {
                    return node;
                }
            })
        )
        return node;
    }
}

function needReplaceRender() {

}