import { makeDecorator, ClassAst, ClassContext, PropertyContext, PropertyAst } from 'ims-decorator'
export const AuthGuardMetadataKey = `AuthGuardMetadataKey`;
// 权限控制类
export abstract class AuthGuardAbs {
    abstract canActive(user: any): boolean;
}
// 权限字符串
export type AuthGuardRight = string[];
// 权限控制函数
export type AuthGuardMethod = (user: any) => boolean;
export interface AuthGuardOptions {
    // 代表权限的字符串或者一个函数或者一个类
    allows: AuthGuardRight | AuthGuardMethod | AuthGuardAbs;
}

export function isAuthGuardAbs(val: any): val is AuthGuardAbs {
    return val && !!val.canActive
}
export function isAuthGuardRight(val: any): val is AuthGuardRight {
    return Array.isArray(val)
}
export function isAuthGuardMethod(val: any): val is AuthGuardRight {
    return typeof val === 'function'
}
export const AuthGuard = (allows: AuthGuardRight | AuthGuardMethod | AuthGuardAbs) => {
    if (!allows) allows = ['default'];
    return makeDecorator<AuthGuardOptions>(AuthGuardMetadataKey)({
        allows
    })
};
export function isAuthGuardClassAst(val: ClassAst): val is ClassAst<AuthGuardOptions> {
    return val.metadataKey === AuthGuardMetadataKey;
}
export class AuthGuardClassAst extends ClassContext<AuthGuardOptions>{ }
export function isAuthGuardPropertyAst(val: PropertyAst): val is PropertyAst<AuthGuardOptions> {
    return val.metadataKey === AuthGuardMetadataKey;
}
export class AuthGuardPropertyAst extends PropertyContext<AuthGuardOptions>{ }
