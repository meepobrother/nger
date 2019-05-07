import { MethodAst, MethodContext, PropertyAst, PropertyContext } from 'ims-decorator';
export declare const AccessMetadataKey = "AccessMetadataKey";
export interface AccessOptions {
    title?: string;
    desc?: string;
}
export declare const Access: {
    (opt?: AccessOptions): any;
    (opt?: AccessOptions): (target: any, propertyKey?: string | symbol, descriptor?: number | TypedPropertyDescriptor<any>) => any;
    new (opt?: AccessOptions): any;
};
export declare function isAccessMethodAst(val: MethodAst): val is MethodAst<AccessOptions>;
export declare class AccessMethodAst extends MethodContext<AccessOptions> {
    constructor(ast: any, context: any);
}
export declare function isAccessPropertyAst(val: PropertyAst): val is PropertyAst<AccessOptions>;
export declare class AccessPropertyAst extends PropertyContext<AccessOptions> {
}
