import ts, { TransformationContext, Transformer } from 'typescript'
import {hasMetadata} from './controller';
export const componentRenderTransformerFactory = (context: TransformationContext): Transformer<ts.SourceFile> => {
    return (node: ts.SourceFile): ts.SourceFile => {
        node.statements = ts.createNodeArray(
            node.statements.map((node: ts.Statement) => {
                if (ts.isImportDeclaration(node)) {
                    return node;
                } else if (ts.isClassDeclaration(node)) {
                    if(hasMetadata(node.decorators,['Page','Component'])){
                        return ts.createClassDeclaration(
                            node.decorators,
                            node.modifiers,
                            node.name,
                            node.typeParameters,
                            node.heritageClauses,
                            node.members.map(member => {
                                if (ts.isMethodDeclaration(member)) {
                                    if(ts.isIdentifier(member.name)){
                                        if(member.name.text === 'render'){
                                            if(member.parameters.length===0){
                                                 return ts.createMethod(
                                                    member.decorators,
                                                    member.modifiers,
                                                    member.asteriskToken,
                                                    member.name,
                                                    member.questionToken,
                                                    member.typeParameters,
                                                    ts.createNodeArray([
                                                        ts.createParameter(undefined,undefined,undefined,'h')
                                                    ]),
                                                    member.type,
                                                    member.body
                                                )
                                            }
                                        }
                                    }
                                }
                                return member;
                            }).filter(node => !!node)
                        )
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

function needReplaceRender(){

}