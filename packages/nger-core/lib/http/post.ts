import { makeDecorator, MethodAst, MethodContext, PropertyAst, PropertyContext } from 'ims-decorator'
export const PostMetadataKey = 'PostMetadataKey';
export interface PostOptions { }
export const Post = makeDecorator<PostOptions>(PostMetadataKey);

export function isPostMethodAst(val: MethodAst): val is MethodAst<PostOptions> {
    return val.metadataKey === PostMetadataKey;
}
export class PostMethodAst extends MethodContext<PostOptions>{ }

export function isPostPropertyAst(val: PropertyAst): val is PropertyAst<PostOptions> {
    return val.metadataKey === PostMetadataKey;
}
export class PostPropertyAst extends PropertyContext<PostOptions>{ }