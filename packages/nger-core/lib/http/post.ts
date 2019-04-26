import { makeDecorator, MethodAst, MethodContext, PropertyAst, PropertyContext } from 'ims-decorator'
export const PostMetadataKey = 'PostMetadataKey';
export interface PostOptions {
    path?: string;
}
export const Post = (path?: string) => makeDecorator<PostOptions>(PostMetadataKey)({
    path
});

export function isPostMethodAst(val: MethodAst): val is MethodAst<PostOptions> {
    return val.metadataKey === PostMetadataKey;
}
export class PostMethodAst extends MethodContext<PostOptions>{
    path: string;
    constructor(ast: any, context: any) {
        super(ast, context);
        const def = this.ast.metadataDef;
        this.path = def.path || this.ast.propertyKey as string;
    }
}

export function isPostPropertyAst(val: PropertyAst): val is PropertyAst<PostOptions> {
    return val.metadataKey === PostMetadataKey;
}
export class PostPropertyAst extends PropertyContext<PostOptions>{ }

export type PostProperty<T> = (...args: any[]) => Promise<T>;