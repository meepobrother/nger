import { makeDecorator2, TypeDecorator, ConstructorContext, ConstructorAst, PropertyContext, PropertyAst } from 'ims-decorator';
export const InjectMetadataKey = 'InjectMetadataKey';
export interface InjectOptions {
    token: any;
}
export interface InjectDecorator {
    (token?: any): TypeDecorator;
    new(token?: any): InjectOptions;
}
export const Inject: InjectDecorator = makeDecorator2<InjectOptions>(InjectMetadataKey, (token: any) => ({ token }));
export class InjectConstructorAst extends ConstructorContext<InjectOptions> { }
export class InjectPropertyAst extends PropertyContext<InjectOptions> { }
export function isInjectPropertyAst(ast: PropertyAst): ast is PropertyAst<InjectOptions> {
    return ast.metadataKey === InjectMetadataKey;
}
export function isInjectConstructorAst(ast: ConstructorAst): ast is ConstructorAst<InjectOptions> {
    return ast.metadataKey === InjectMetadataKey;
}
