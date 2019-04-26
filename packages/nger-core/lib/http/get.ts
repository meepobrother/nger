import { makeDecorator, MethodAst, MethodContext, PropertyAst, PropertyContext } from 'ims-decorator'
export const GetMetadataKey = 'GetMetadataKey';
export interface GetOptions {
    path?: string;
}
export const Get = (path?: string) => makeDecorator<GetOptions>(GetMetadataKey)({
    path
});

export function isGetMethodAst(val: MethodAst): val is MethodAst<GetOptions> {
    return val.metadataKey === GetMetadataKey;
}
export class GetMethodAst extends MethodContext<GetOptions>{
    path: string;
    constructor(ast: any, context: any) {
        super(ast, context);
        const def = this.ast.metadataDef;
        this.path = def.path || this.ast.propertyKey as string;
    }
}

export function isGetPropertyAst(val: PropertyAst): val is PropertyAst<GetOptions> {
    return val.metadataKey === GetMetadataKey;
}
export class GetPropertyAst extends PropertyContext<GetOptions>{ }

export type GetProperty<T> = (...args: any[]) => Promise<T>;