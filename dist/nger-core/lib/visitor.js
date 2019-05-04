"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ims_decorator_1 = require("ims-decorator");
const public_api_1 = require("./decorators/public_api");
const command_1 = require("./cli/command");
const option_1 = require("./cli/option");
const it_1 = require("./it");
const controller_1 = require("./controller");
const get_1 = require("./http/get");
const post_1 = require("./http/post");
const orm_1 = require("./orm");
const authGuard_1 = require("./authGuard");
const effect_1 = require("./effect");
class NgVisitor extends ims_decorator_1.NullAstVisitor {
    visitClass(ast, context) {
        if (authGuard_1.isAuthGuardClassAst(ast)) {
            return new authGuard_1.AuthGuardClassAst(ast, context);
        }
        if (controller_1.isControllerClassAst(ast)) {
            return new controller_1.ControllerClassAst(ast, context);
        }
        if (command_1.isCommandClassAst(ast)) {
            return new command_1.CommandClassAst(ast, context);
        }
        if (public_api_1.isComponentClassAst(ast)) {
            return new public_api_1.ComponentClassAst(ast, context);
        }
        if (public_api_1.isDirectiveClassAst(ast)) {
            return new public_api_1.DirectiveClassAst(ast, context);
        }
        if (public_api_1.isPipeClassAst(ast)) {
            return new public_api_1.PipeClassAst(ast, context);
        }
        if (public_api_1.isNgModuleClassAst(ast)) {
            return new public_api_1.NgModuleClassAst(ast, context);
        }
        if (public_api_1.isInjectableClassAst(ast)) {
            return new public_api_1.InjectableClassAst(ast, context);
        }
        if (public_api_1.isPageClassAst(ast)) {
            return new public_api_1.PageClassAst(ast, context);
        }
    }
    visitConstructor(ast, context) {
        if (public_api_1.isHostConstructorAst(ast)) {
            return new public_api_1.HostConstructorAst(ast, context);
        }
        if (public_api_1.isSelfConstructorAst(ast)) {
            return new public_api_1.SelfConstructorAst(ast, context);
        }
        if (public_api_1.isInjectConstructorAst(ast)) {
            return new public_api_1.InjectConstructorAst(ast, context);
        }
        if (public_api_1.isOptionalConstructorAst(ast)) {
            return new public_api_1.OptionalConstructorAst(ast, context);
        }
        if (public_api_1.isSkipSelfConstructorAst(ast)) {
            return new public_api_1.SkipSelfConstructorAst(ast, context);
        }
        if (public_api_1.isAttributeConstructorAst(ast)) {
            return new public_api_1.AttributeConstructorAst(ast, context);
        }
    }
    visitProperty(ast, context) {
        if (effect_1.isEffectPropertyAst(ast)) {
            return new effect_1.EffectPropertyAst(ast, context);
        }
        if (authGuard_1.isAuthGuardPropertyAst(ast)) {
            return new authGuard_1.AuthGuardPropertyAst(ast, context);
        }
        if (get_1.isGetPropertyAst(ast)) {
            return new get_1.GetPropertyAst(ast, context);
        }
        if (post_1.isPostPropertyAst(ast)) {
            return new post_1.PostPropertyAst(ast, context);
        }
        if (public_api_1.isInjectPropertyAst(ast)) {
            return new public_api_1.InjectPropertyAst(ast, context);
        }
        if (option_1.isOptionPropertyAst(ast)) {
            return new option_1.OptionPropertyAst(ast, context);
        }
        if (public_api_1.isContentChildPropertyAst(ast)) {
            return new public_api_1.ContentChildPropertyAst(ast, context);
        }
        if (public_api_1.isContentChildrenPropertyAst(ast)) {
            return new public_api_1.ContentChildrenPropertyAst(ast, context);
        }
        if (public_api_1.isViewChildPropertyAst(ast)) {
            return new public_api_1.ViewChildPropertyAst(ast, context);
        }
        if (public_api_1.isViewChildrenPropertyAst(ast)) {
            return new public_api_1.ViewChildrenPropertyAst(ast, context);
        }
        if (public_api_1.isInputPropertyAst(ast)) {
            return new public_api_1.InputPropertyAst(ast, context);
        }
        if (public_api_1.isOutputPropertyAst(ast)) {
            return new public_api_1.OutputPropertyAst(ast, context);
        }
        if (public_api_1.isHostBindingPropertyAst(ast)) {
            return new public_api_1.HostBindingPropertyAst(ast, context);
        }
        if (public_api_1.isHostListenerPropertyAst(ast)) {
            return new public_api_1.HostListenerPropertyAst(ast, context);
        }
    }
    visitMethod(ast, context) {
        if (it_1.isItMethodAst(ast)) {
            return new it_1.ItMethodAst(ast, context);
        }
        if (get_1.isGetMethodAst(ast)) {
            return new get_1.GetMethodAst(ast, context);
        }
        if (post_1.isPostMethodAst(ast)) {
            return new post_1.PostMethodAst(ast, context);
        }
    }
}
exports.NgVisitor = NgVisitor;
exports.visitor = new ims_decorator_1.Visitors([
    new NgVisitor(),
    new orm_1.OrmVisitor()
]);
