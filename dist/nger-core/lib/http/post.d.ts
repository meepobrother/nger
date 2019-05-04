import { MethodAst, MethodContext, PropertyAst, PropertyContext } from 'ims-decorator';
export declare const PostMetadataKey = "PostMetadataKey";
export interface PostOptions {
    path?: string;
}
export declare const Post: (path?: string) => any;
export declare function isPostMethodAst(val: MethodAst): val is MethodAst<PostOptions>;
export declare class PostMethodAst extends MethodContext<PostOptions> {
    path: string;
    constructor(ast: any, context: any);
}
export declare function isPostPropertyAst(val: PropertyAst): val is PropertyAst<PostOptions>;
export declare class PostPropertyAst extends PropertyContext<PostOptions> {
}
export declare type PostProperty<T> = (...args: any[]) => Promise<T>;
