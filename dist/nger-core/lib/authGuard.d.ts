import { ClassAst, ClassContext, PropertyContext, PropertyAst } from 'ims-decorator';
export declare const AuthGuardMetadataKey = "AuthGuardMetadataKey";
export declare abstract class AuthGuardAbs {
    abstract canActive(user: any): boolean;
}
export declare type AuthGuardRight = string[];
export declare type AuthGuardMethod = (user: any) => boolean;
export interface AuthGuardOptions {
    allows: AuthGuardRight | AuthGuardMethod | AuthGuardAbs;
}
export declare function isAuthGuardAbs(val: any): val is AuthGuardAbs;
export declare function isAuthGuardRight(val: any): val is AuthGuardRight;
export declare function isAuthGuardMethod(val: any): val is AuthGuardRight;
export declare const AuthGuard: (allows: string[] | AuthGuardAbs | AuthGuardMethod) => any;
export declare function isAuthGuardClassAst(val: ClassAst): val is ClassAst<AuthGuardOptions>;
export declare class AuthGuardClassAst extends ClassContext<AuthGuardOptions> {
}
export declare function isAuthGuardPropertyAst(val: PropertyAst): val is PropertyAst<AuthGuardOptions>;
export declare class AuthGuardPropertyAst extends PropertyContext<AuthGuardOptions> {
}
