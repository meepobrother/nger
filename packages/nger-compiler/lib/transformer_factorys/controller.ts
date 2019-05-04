import ts, { TransformationContext, Transformer } from 'typescript'
export const controllerPropertyTransformerFactory = (context: TransformationContext): Transformer<ts.SourceFile> => {
    return (node: ts.SourceFile): ts.SourceFile => {
        node.statements = ts.createNodeArray(
            node.statements.map((node: ts.Statement) => {
                if (ts.isImportDeclaration(node)) {
                    return node;
                } else if (ts.isClassDeclaration(node)) {
                    return ts.createClassDeclaration(
                        node.decorators,
                        node.modifiers,
                        node.name,
                        node.typeParameters,
                        node.heritageClauses,
                        node.members.map(member => {
                            if (ts.isMethodDeclaration(member)) {
                                const needReplace = hasPropertyMetadata(member.decorators);
                                if (needReplace) {
                                    return ts.createProperty(
                                        member.decorators,
                                        member.modifiers,
                                        member.name,
                                        undefined,
                                        undefined,
                                        undefined
                                    )
                                }
                            } else if (ts.isPropertyDeclaration(member)) {
                                const needReplace = hasPropertyMetadata(member.decorators);
                                if (needReplace) return member;
                            } else if (ts.isConstructorDeclaration(member)) { }
                        }).filter(node => !!node)
                    )
                } else {
                    return node;
                }
            })
        )
        return node;
    }
}
export function hasPropertyMetadata(nodes: ts.NodeArray<ts.Decorator>, decorators: string[] = ['Get', 'Post']) {
    const item = nodes && nodes.find(node => {
        if (ts.isDecorator(node)) {
            if (ts.isCallExpression(node.expression)) {
                const expression = node.expression
                if (ts.isIdentifier(expression.expression)) {
                    return decorators.indexOf(expression.expression.text) > -1;
                }
            }
        }
        return false;
    })
    return !!item;
}
