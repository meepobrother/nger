import { makeDecorator, ClassAst, ClassContext, PropertyContext, PropertyAst } from 'ims-decorator'
import { Injector } from 'nger-di';
export const AuthGuardMetadataKey = `AuthGuardMetadataKey`
export interface AuthGuardOptions {
    // 代表权限的字符串或者一个函数
    allows: AuthGuardRight | AuthGuardMethod | AbsAuthGuard;
}
export abstract class AbsAuthGuard {
    abstract canActive(injector: Injector): boolean;
}
export type AuthGuardRight = string[];
// instance是当前对象
export type AuthGuardMethod = (injector: Injector) => boolean;
export function isAuthGuardRight(val: any): val is AuthGuardRight {
    return Array.isArray(val)
}
export function isAuthGuardMethod(val: any): val is AuthGuardRight {
    return typeof val === 'function'
}
export const AuthGuard = (allows: AuthGuardRight | AuthGuardMethod) => {
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
