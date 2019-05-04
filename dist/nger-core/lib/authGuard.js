"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ims_decorator_1 = require("ims-decorator");
exports.AuthGuardMetadataKey = `AuthGuardMetadataKey`;
// 权限控制类
class AuthGuardAbs {
}
exports.AuthGuardAbs = AuthGuardAbs;
function isAuthGuardAbs(val) {
    return val && !!val.canActive;
}
exports.isAuthGuardAbs = isAuthGuardAbs;
function isAuthGuardRight(val) {
    return Array.isArray(val);
}
exports.isAuthGuardRight = isAuthGuardRight;
function isAuthGuardMethod(val) {
    return typeof val === 'function';
}
exports.isAuthGuardMethod = isAuthGuardMethod;
exports.AuthGuard = (allows) => {
    if (!allows)
        allows = ['default'];
    return ims_decorator_1.makeDecorator(exports.AuthGuardMetadataKey)({
        allows
    });
};
function isAuthGuardClassAst(val) {
    return val.metadataKey === exports.AuthGuardMetadataKey;
}
exports.isAuthGuardClassAst = isAuthGuardClassAst;
class AuthGuardClassAst extends ims_decorator_1.ClassContext {
}
exports.AuthGuardClassAst = AuthGuardClassAst;
function isAuthGuardPropertyAst(val) {
    return val.metadataKey === exports.AuthGuardMetadataKey;
}
exports.isAuthGuardPropertyAst = isAuthGuardPropertyAst;
class AuthGuardPropertyAst extends ims_decorator_1.PropertyContext {
}
exports.AuthGuardPropertyAst = AuthGuardPropertyAst;
