import { ClassContext, ClassAst, MethodContext, Type, MethodAst } from 'ims-decorator';
export declare const RoleMetadataKey = "RoleMetadataKey";
export interface RoleOptions {
    code: string;
    title: string;
}
export declare const Role: {
    (opt?: RoleOptions): any;
    (opt?: RoleOptions): (target: any, propertyKey?: string | symbol, descriptor?: number | TypedPropertyDescriptor<any>) => any;
    new (opt?: RoleOptions): any;
};
export declare class RoleClassAst extends ClassContext<RoleOptions> {
    code: string;
    constructor(ast: any, context: any);
}
export declare function isRoleClassAst(ast: ClassAst): ast is ClassAst<RoleOptions>;
export declare const UseRoleMetadataKey = "UseRoleMetadataKey";
export interface UseRoleProps {
    roles: Type<any>[];
}
export declare const UseRole: (...roles: Type<any>[]) => any;
export declare class UseRoleMethodAst extends MethodContext<RoleOptions> {
}
export declare function isUseRoleMethodAst(val: MethodAst): val is MethodAst<RoleOptions>;
