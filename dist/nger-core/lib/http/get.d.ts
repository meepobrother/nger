import { MethodAst, MethodContext, PropertyAst, PropertyContext } from 'ims-decorator';
export declare const GetMetadataKey = "GetMetadataKey";
export interface GetOptions {
    path?: string;
}
export declare const Get: (path?: string) => any;
export declare function isGetMethodAst(val: MethodAst): val is MethodAst<GetOptions>;
export declare class GetMethodAst extends MethodContext<GetOptions> {
    path: string;
    constructor(ast: any, context: any);
}
export declare function isGetPropertyAst(val: PropertyAst): val is PropertyAst<GetOptions>;
export declare class GetPropertyAst extends PropertyContext<GetOptions> {
}
export declare type GetProperty<T> = (...args: any[]) => Promise<T>;
