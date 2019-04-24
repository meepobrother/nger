import { makeDecorator, ConstructorContext, ConstructorAst } from 'ims-decorator';
export const InjectMetadataKey = 'InjectMetadataKey';
export interface InjectOptions {
    token: any;
}
export const Inject = (token?: any) => {
    return makeDecorator<InjectOptions>(InjectMetadataKey)({ token });
}
export class InjectConstructorAst extends ConstructorContext<InjectOptions> { }
export function isInjectConstructorAst(ast: ConstructorAst): ast is ConstructorAst<InjectOptions> {
    return ast.metadataKey === InjectMetadataKey;
}
