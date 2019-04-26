import { makeDecorator, ConstructorContext, ConstructorAst, PropertyContext, PropertyAst } from 'ims-decorator';
export const InjectMetadataKey = 'InjectMetadataKey';
export interface InjectOptions {
    token: any;
}
export interface Inject {
    (token?: any): any;
    new(token?: any): any;
}
export function Inject(token?: any) {
    return makeDecorator<InjectOptions>(InjectMetadataKey)({ token });
}
export class InjectConstructorAst extends ConstructorContext<InjectOptions> { }
export class InjectPropertyAst extends PropertyContext<InjectOptions> { }
export function isInjectPropertyAst(ast: PropertyAst): ast is PropertyAst<InjectOptions> {
    return ast.metadataKey === InjectMetadataKey;
}
export function isInjectConstructorAst(ast: ConstructorAst): ast is ConstructorAst<InjectOptions> {
    return ast.metadataKey === InjectMetadataKey;
}
