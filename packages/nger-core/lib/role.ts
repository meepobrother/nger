import { makeDecorator, ClassContext, ClassAst, MethodContext, Type, MethodAst } from 'ims-decorator';
export const RoleMetadataKey = 'RoleMetadataKey';
export interface RoleOptions {
    // 权限代码
    code: string;
    // 权限标题
    title: string;
};
export const Role = makeDecorator<RoleOptions>(RoleMetadataKey);
// 定义权限
export class RoleClassAst extends ClassContext<RoleOptions> {
    code: string;
    constructor(ast: any, context: any) {
        super(ast, context);
        const def = this.ast.metadataDef;
        this.code = def.code || this.ast.target.name;
    }
}

export function isRoleClassAst(ast: ClassAst): ast is ClassAst<RoleOptions> {
    return ast.metadataKey === RoleMetadataKey;
}
// 使用权限

export const UseRoleMetadataKey = 'UseRoleMetadataKey';
export interface UseRoleProps {
    roles: Type<any>[];
}
export const UseRole = (...roles: Type<any>[]) => {
    return makeDecorator<UseRoleProps>(UseRoleMetadataKey)({
        roles
    });
}
export class UseRoleMethodAst extends MethodContext<RoleOptions>{ }
export function isUseRoleMethodAst(val: MethodAst): val is MethodAst<RoleOptions> {
    return val.metadataKey === UseRoleMetadataKey;
}