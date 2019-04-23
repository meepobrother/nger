import { makeDecorator, ClassContext, ClassAst, MethodContext, Type } from 'ims-decorator';
export const RoleMetadataKey = 'RoleMetadataKey';
export interface BaseRole<T> {
    /**
     * 是否可激活
     * @param user 当前用户
     */
    canActive?(user: T): true | {
        // 失败是重定向，跳转到vip购买页面或提示没有权限页面
        redirect: string;
        // 附加消息
        message?: string;
    };
}
export interface RoleOptions {
    /** 权限名 */
    name?: string;
    /** 权限名标题 */
    title?: string;
    /** 权限名描述 */
    desc?: string;
    /** 使用权限 */
    target?: Type<any>;
};
export const Role = makeDecorator<RoleOptions>(RoleMetadataKey);
// 定义权限
export class RoleClassAst extends ClassContext<RoleOptions> {
    name: string;
    constructor(ast: any, context: any) {
        super(ast, context);
        const def = this.ast.metadataDef;
        this.name = def.name || this.ast.target.name;
    }
}
export function isRoleClassAst(ast: ClassAst): ast is ClassAst<RoleOptions> {
    return ast.metadataKey === RoleMetadataKey;
}
// 使用权限
export class RoleMethodAst extends MethodContext<RoleOptions>{ }
