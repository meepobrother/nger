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

Object.defineProperty(exports, "__esModule", { value: true });
const ims_decorator_1 = require("ims-decorator");
exports.ControllerMetadataKey = 'ControllerMetadataKey';
function Controller(path) {
    const decorator = ims_decorator_1.makeDecorator(exports.ControllerMetadataKey);
    if (typeof path === 'string') {
        return decorator({
            path
        });
    }
    else {
        return decorator(path);
    }
}
exports.Controller = Controller;
class ControllerClassAst extends ims_decorator_1.ClassContext {
    constructor(ast, context) {
        super(ast, context);
        let def = this.ast.metadataDef;
        def.path = def.path || `/${this.ast.target.name}`;
        if (def && def.path) {
            if (def.path.startsWith('/')) {
                if (def.path === '/') {
                    this.path = '';
                }
                else {
                    this.path = def.path;
                }
            }
            else {
                console.error(`controller path must start with '/'`);
            }
        }
    }
}
exports.ControllerClassAst = ControllerClassAst;
function isControllerClassAst(ast) {
    return ast.metadataKey === exports.ControllerMetadataKey;
}
exports.isControllerClassAst = isControllerClassAst;

Object.defineProperty(exports, "__esModule", { value: true });
const ims_decorator_1 = require("ims-decorator");
exports.EffectMetadataKey = 'EffectMetadataKey';
function isEffectPropertyAst(ast) {
    return ast.metadataKey === exports.EffectMetadataKey;
}
exports.isEffectPropertyAst = isEffectPropertyAst;
class EffectPropertyAst extends ims_decorator_1.PropertyContext {
}
exports.EffectPropertyAst = EffectPropertyAst;

Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
tslib_1.__exportStar(require("./decorators/public_api"), exports);
tslib_1.__exportStar(require("./lifecycle_hooks"), exports);
tslib_1.__exportStar(require("./cli/command"), exports);
tslib_1.__exportStar(require("./cli/option"), exports);
tslib_1.__exportStar(require("./it"), exports);
tslib_1.__exportStar(require("./visitor"), exports);
tslib_1.__exportStar(require("./http/get"), exports);
tslib_1.__exportStar(require("./http/post"), exports);
tslib_1.__exportStar(require("./controller"), exports);
tslib_1.__exportStar(require("./orm/index"), exports);
tslib_1.__exportStar(require("./tokens"), exports);
tslib_1.__exportStar(require("./authGuard"), exports);
tslib_1.__exportStar(require("./isDevMode"), exports);
tslib_1.__exportStar(require("./effect"), exports);
tslib_1.__exportStar(require("./sdk"), exports);
tslib_1.__exportStar(require("./validate/index"), exports);
/** platform */
tslib_1.__exportStar(require("./platform/application_init_status"), exports);
tslib_1.__exportStar(require("./platform/change_detector_ref"), exports);
tslib_1.__exportStar(require("./platform/component_factory"), exports);
tslib_1.__exportStar(require("./platform/component_factory_resolver"), exports);
tslib_1.__exportStar(require("./platform/component_ref"), exports);
tslib_1.__exportStar(require("./platform/error_handler"), exports);
tslib_1.__exportStar(require("./platform/lang"), exports);
tslib_1.__exportStar(require("./platform/ng_module_factory"), exports);
tslib_1.__exportStar(require("./platform/ng_module_ref"), exports);
tslib_1.__exportStar(require("./platform/parser_visitor"), exports);
tslib_1.__exportStar(require("./platform/platform_ref"), exports);
tslib_1.__exportStar(require("./platform/scanner_visitor"), exports);
tslib_1.__exportStar(require("./platform/platform_core"), exports);
tslib_1.__exportStar(require("./platform/scanner_visitor"), exports);
tslib_1.__exportStar(require("./platform/parser_visitor"), exports);
tslib_1.__exportStar(require("./platform/createPlatform"), exports);
tslib_1.__exportStar(require("./platform/createPlatformFactory"), exports);
tslib_1.__exportStar(require("./platform/platform_core"), exports);
tslib_1.__exportStar(require("./platform/application_ref"), exports);
tslib_1.__exportStar(require("./platform/custom_elements"), exports);

Object.defineProperty(exports, "__esModule", { value: true });
let _dev = false;
function isDevMode() {
    return _dev;
}
exports.isDevMode = isDevMode;
function setDevMode(d) {
    _dev = d;
}
exports.setDevMode = setDevMode;
let _port = 3000;
function getPort() {
    return _port;
}
exports.getPort = getPort;
function setPort(port) {
    _port = port;
}
exports.setPort = setPort;

Object.defineProperty(exports, "__esModule", { value: true });
const ims_decorator_1 = require("ims-decorator");
exports.ItMetadataKey = 'ItMetadataKey';
exports.It = (topic, handler) => {
    return ims_decorator_1.makeDecorator(exports.ItMetadataKey)({
        topic, handler
    });
};
function isItMethodAst(ast) {
    return ast.metadataKey === exports.ItMetadataKey;
}
exports.isItMethodAst = isItMethodAst;
class ItMethodAst extends ims_decorator_1.MethodContext {
}
exports.ItMethodAst = ItMethodAst;

Object.defineProperty(exports, "__esModule", { value: true });
class SimpleChange {
    constructor(previousValue, currentValue, firstChange) {
        this.previousValue = previousValue;
        this.currentValue = currentValue;
        this.firstChange = firstChange;
    }
    isFirstChange() { return this.firstChange; }
}
exports.SimpleChange = SimpleChange;

Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const ims_decorator_1 = require("ims-decorator");
const orm = tslib_1.__importStar(require("./orm/index"));
class OrmVisitor extends ims_decorator_1.NullAstVisitor {
    visitClass(ast, context) {
        // entity
        if (orm.isEntityClassAst(ast)) {
            return new orm.EntityClassAst(ast, context);
        }
        if (orm.isChildEntityClassAst(ast)) {
            return new orm.ChildEntityClassAst(ast, context);
        }
        if (orm.isTableInheritanceClassAst(ast)) {
            return new orm.TableInheritanceClassAst(ast, context);
        }
        // tree
        if (orm.isTreeClassAst(ast)) {
            return new orm.TreeClassAst(ast, context);
        }
        // listener
        if (orm.isEventSubscriberClassAst(ast)) {
            return new orm.EventSubscriberClassAst(ast, context);
        }
        if (orm.isMigrationClassAst(ast)) {
            return new orm.MigrationClassAst(ast, context);
        }
        if (orm.isTypeormClassAst(ast)) {
            return new orm.TypeormClassAst(ast, context);
        }
    }
    visitProperty(ast, context) {
        // listener
        if (orm.isAfterInsertPropertyAst(ast)) {
            return new orm.AfterInsertPropertyAst(ast, context);
        }
        if (orm.isAfterLoadPropertyAst(ast)) {
            return new orm.AfterLoadPropertyAst(ast, context);
        }
        if (orm.isAfterRemovePropertyAst(ast)) {
            return new orm.AfterRemovePropertyAst(ast, context);
        }
        if (orm.isAfterUpdatePropertyAst(ast)) {
            return new orm.AfterUpdatePropertyAst(ast, context);
        }
        if (orm.isBeforeInsertPropertyAst(ast)) {
            return new orm.BeforeInsertPropertyAst(ast, context);
        }
        if (orm.isBeforeRemovePropertyAst(ast)) {
            return new orm.BeforeRemovePropertyAst(ast, context);
        }
        if (orm.isBeforeUpdatePropertyAst(ast)) {
            return new orm.BeforeUpdatePropertyAst(ast, context);
        }
        // other
        if (orm.isEntityRepositoryPropertyAst(ast)) {
            return new orm.EntityRepositoryPropertyAst(ast, context);
        }
        if (orm.isCheckPropertyAst(ast)) {
            return new orm.CheckPropertyAst(ast, context);
        }
        if (orm.isExclusionPropertyAst(ast)) {
            return new orm.ExclusionPropertyAst(ast, context);
        }
        if (orm.isGeneratedPropertyAst(ast)) {
            return new orm.GeneratedPropertyAst(ast, context);
        }
        if (orm.isIndexPropertyAst(ast)) {
            return new orm.IndexPropertyAst(ast, context);
        }
        if (orm.isUniquePropertyAst(ast)) {
            return new orm.UniquePropertyAst(ast, context);
        }
        // column
        if (orm.isColumnPropertyAst(ast)) {
            return new orm.ColumnPropertyAst(ast, context);
        }
        if (orm.isPrimaryColumnPropertyAst(ast)) {
            return new orm.PrimaryColumnPropertyAst(ast, context);
        }
        if (orm.isCreateDateColumnPropertyAst(ast)) {
            return new orm.CreateDateColumnPropertyAst(ast, context);
        }
        if (orm.isObjectIdColumnPropertyAst(ast)) {
            return new orm.ObjectIdColumnPropertyAst(ast, context);
        }
        if (orm.isPrimaryGeneratedColumnPropertyAst(ast)) {
            return new orm.PrimaryGeneratedColumnPropertyAst(ast, context);
        }
        if (orm.isUpdateDateColumnPropertyAst(ast)) {
            return new orm.UpdateDateColumnPropertyAst(ast, context);
        }
        if (orm.isVersionColumnPropertyAst(ast)) {
            return new orm.VersionColumnPropertyAst(ast, context);
        }
        if (orm.isTreeChildrenPropertyAst(ast)) {
            return new orm.TreeChildrenPropertyAst(ast, context);
        }
        if (orm.isTreeLevelColumnPropertyAst(ast)) {
            return new orm.TreeLevelColumnPropertyAst(ast, context);
        }
        if (orm.isTreeParentPropertyAst(ast)) {
            return new orm.TreeParentPropertyAst(ast, context);
        }
        // relation
        if (orm.isJoinColumnPropertyAst(ast)) {
            return new orm.JoinColumnPropertyAst(ast, context);
        }
        if (orm.isJoinTablePropertyAst(ast)) {
            return new orm.JoinTablePropertyAst(ast, context);
        }
        if (orm.isManyToManyPropertyAst(ast)) {
            return new orm.ManyToManyPropertyAst(ast, context);
        }
        if (orm.isManyToOnePropertyAst(ast)) {
            return new orm.ManyToOnePropertyAst(ast, context);
        }
        if (orm.isOneToManyPropertyAst(ast)) {
            return new orm.OneToManyPropertyAst(ast, context);
        }
        if (orm.isOneToOnePropertyAst(ast)) {
            return new orm.OneToOnePropertyAst(ast, context);
        }
        if (orm.isRelationCountPropertyAst(ast)) {
            return new orm.RelationCountPropertyAst(ast, context);
        }
        if (orm.isRelationIdPropertyAst(ast)) {
            return new orm.RelationIdPropertyAst(ast, context);
        }
    }
    visitMethod(ast, context) {
        if (orm.isTransactionMethodAst(ast)) {
            return new orm.TransactionMethodAst(ast, context);
        }
    }
    visitParameter(ast, context) {
        if (orm.isTransactionManagerParameterAst(ast)) {
            return new orm.TransactionManagerParameterAst(ast, context);
        }
        if (orm.isTransactionRepositoryParameterAst(ast)) {
            return new orm.TransactionRepositoryParameterAst(ast, context);
        }
    }
}
exports.OrmVisitor = OrmVisitor;

Object.defineProperty(exports, "__esModule", { value: true });
const ims_decorator_1 = require("ims-decorator");
exports.RoleMetadataKey = 'RoleMetadataKey';
;
exports.Role = ims_decorator_1.makeDecorator(exports.RoleMetadataKey);
// 定义权限
class RoleClassAst extends ims_decorator_1.ClassContext {
    constructor(ast, context) {
        super(ast, context);
        const def = this.ast.metadataDef;
        this.code = def.code || this.ast.target.name;
    }
}
exports.RoleClassAst = RoleClassAst;
function isRoleClassAst(ast) {
    return ast.metadataKey === exports.RoleMetadataKey;
}
exports.isRoleClassAst = isRoleClassAst;
// 使用权限
exports.UseRoleMetadataKey = 'UseRoleMetadataKey';
exports.UseRole = (...roles) => {
    return ims_decorator_1.makeDecorator(exports.UseRoleMetadataKey)({
        roles
    });
};
class UseRoleMethodAst extends ims_decorator_1.MethodContext {
}
exports.UseRoleMethodAst = UseRoleMethodAst;
function isUseRoleMethodAst(val) {
    return val.metadataKey === exports.UseRoleMetadataKey;
}
exports.isUseRoleMethodAst = isUseRoleMethodAst;

Object.defineProperty(exports, "__esModule", { value: true });
const nger_di_1 = require("nger-di");
// @Typeorm装饰的类 Multi:true
exports.TypeormToken = new nger_di_1.InjectionToken(`TypeormToken`);
// Typeorm配置
exports.TypeormOptionsToken = new nger_di_1.InjectionToken(`TypeormOptionsToken`);
// Typeorm Connection
exports.ConnectionToken = new nger_di_1.InjectionToken(`ConnectionToken`);
// ConnectionManagerToken
exports.ConnectionManagerToken = new nger_di_1.InjectionToken(`ConnectionManagerToken`);
exports.DevModelToken = new nger_di_1.InjectionToken(`DevModelToken`);
// 运行平台
exports.PlatformToken = new nger_di_1.InjectionToken(`PlatformToken`);

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


Object.defineProperty(exports, "__esModule", { value: true });

Object.defineProperty(exports, "__esModule", { value: true });
const ims_decorator_1 = require("ims-decorator");
exports.CommandMetadataKey = 'CommandMetadataKey';
exports.Command = ims_decorator_1.makeDecorator(exports.CommandMetadataKey);
function isCommandClassAst(val) {
    return val.metadataKey === exports.CommandMetadataKey;
}
exports.isCommandClassAst = isCommandClassAst;
class CommandClassAst extends ims_decorator_1.ClassContext {
}
exports.CommandClassAst = CommandClassAst;

Object.defineProperty(exports, "__esModule", { value: true });
const ims_decorator_1 = require("ims-decorator");
exports.OptionMetadataKey = 'OptionMetadataKey';
exports.Option = ims_decorator_1.makeDecorator(exports.OptionMetadataKey);
function isOptionPropertyAst(ast) {
    return ast.metadataKey === exports.OptionMetadataKey;
}
exports.isOptionPropertyAst = isOptionPropertyAst;
class OptionPropertyAst extends ims_decorator_1.PropertyContext {
}
exports.OptionPropertyAst = OptionPropertyAst;

Object.defineProperty(exports, "__esModule", { value: true });
const ims_decorator_1 = require("ims-decorator");
exports.AttributeMetadataKey = 'AttributeMetadataKey';
exports.Attribute = (name) => ims_decorator_1.makeDecorator(exports.AttributeMetadataKey)({
    attributeName: name
});
class AttributeConstructorAst extends ims_decorator_1.ConstructorContext {
}
exports.AttributeConstructorAst = AttributeConstructorAst;
function isAttributeConstructorAst(ast) {
    return ast.metadataKey === exports.AttributeMetadataKey;
}
exports.isAttributeConstructorAst = isAttributeConstructorAst;

Object.defineProperty(exports, "__esModule", { value: true });
const ims_decorator_1 = require("ims-decorator");
exports.ComponentMetadataKey = 'ComponentMetadataKey';
exports.Component = ims_decorator_1.makeDecorator(exports.ComponentMetadataKey);
class ComponentClassAst extends ims_decorator_1.ClassContext {
}
exports.ComponentClassAst = ComponentClassAst;
function isComponentClassAst(ast) {
    return ast.metadataKey === exports.ComponentMetadataKey;
}
exports.isComponentClassAst = isComponentClassAst;

Object.defineProperty(exports, "__esModule", { value: true });
const ims_decorator_1 = require("ims-decorator");
exports.ContentChildMetadataKey = 'ContentChildMetadataKey';
exports.ContentChild = (selector, opts) => {
    return ims_decorator_1.makeDecorator(exports.ContentChildMetadataKey)({
        selector, opts
    });
};
class ContentChildPropertyAst extends ims_decorator_1.PropertyContext {
}
exports.ContentChildPropertyAst = ContentChildPropertyAst;
function isContentChildPropertyAst(ast) {
    return ast.metadataKey === exports.ContentChildMetadataKey;
}
exports.isContentChildPropertyAst = isContentChildPropertyAst;

Object.defineProperty(exports, "__esModule", { value: true });
const ims_decorator_1 = require("ims-decorator");
exports.ContentChildrenMetadataKey = 'ContentChildrenMetadataKey';
exports.ContentChildren = (selector, opts) => {
    return ims_decorator_1.makeDecorator(exports.ContentChildrenMetadataKey)({
        selector, opts
    });
};
class ContentChildrenPropertyAst extends ims_decorator_1.PropertyContext {
}
exports.ContentChildrenPropertyAst = ContentChildrenPropertyAst;
function isContentChildrenPropertyAst(ast) {
    return ast.metadataKey === exports.ContentChildrenMetadataKey;
}
exports.isContentChildrenPropertyAst = isContentChildrenPropertyAst;

Object.defineProperty(exports, "__esModule", { value: true });
const ims_decorator_1 = require("ims-decorator");
exports.DirectiveMetadataKey = 'DirectiveMetadataKey';
exports.Directive = ims_decorator_1.makeDecorator(exports.DirectiveMetadataKey);
class DirectiveClassAst extends ims_decorator_1.ClassContext {
}
exports.DirectiveClassAst = DirectiveClassAst;
function isDirectiveClassAst(ast) {
    return ast.metadataKey === exports.DirectiveMetadataKey;
}
exports.isDirectiveClassAst = isDirectiveClassAst;

Object.defineProperty(exports, "__esModule", { value: true });
const ims_decorator_1 = require("ims-decorator");
exports.HostBindingMetadataKey = 'HostBindingMetadataKey';
exports.HostBinding = (hostPropertyName) => {
    return ims_decorator_1.makeDecorator(exports.HostBindingMetadataKey)({
        hostPropertyName
    });
};
class HostBindingPropertyAst extends ims_decorator_1.PropertyContext {
}
exports.HostBindingPropertyAst = HostBindingPropertyAst;
function isHostBindingPropertyAst(ast) {
    return ast.metadataKey === exports.HostBindingMetadataKey;
}
exports.isHostBindingPropertyAst = isHostBindingPropertyAst;

Object.defineProperty(exports, "__esModule", { value: true });
const ims_decorator_1 = require("ims-decorator");
exports.HostListenerMetadataKey = 'HostListenerMetadataKey';
exports.HostListener = (eventName, args) => {
    return ims_decorator_1.makeDecorator(exports.HostListenerMetadataKey)({
        eventName,
        args
    });
};
class HostListenerPropertyAst extends ims_decorator_1.PropertyContext {
}
exports.HostListenerPropertyAst = HostListenerPropertyAst;
function isHostListenerPropertyAst(ast) {
    return ast.metadataKey === exports.HostListenerMetadataKey;
}
exports.isHostListenerPropertyAst = isHostListenerPropertyAst;

Object.defineProperty(exports, "__esModule", { value: true });
const ims_decorator_1 = require("ims-decorator");
exports.HostMetadataKey = 'HostMetadataKey';
exports.Host = ims_decorator_1.makeDecorator(exports.HostMetadataKey);
class HostConstructorAst extends ims_decorator_1.ConstructorContext {
}
exports.HostConstructorAst = HostConstructorAst;
function isHostConstructorAst(ast) {
    return ast.metadataKey === exports.HostMetadataKey;
}
exports.isHostConstructorAst = isHostConstructorAst;

Object.defineProperty(exports, "__esModule", { value: true });
const ims_decorator_1 = require("ims-decorator");
exports.InjectMetadataKey = 'InjectMetadataKey';
function Inject(token) {
    return ims_decorator_1.makeDecorator(exports.InjectMetadataKey)({ token });
}
exports.Inject = Inject;
class InjectConstructorAst extends ims_decorator_1.ConstructorContext {
}
exports.InjectConstructorAst = InjectConstructorAst;
class InjectPropertyAst extends ims_decorator_1.PropertyContext {
}
exports.InjectPropertyAst = InjectPropertyAst;
function isInjectPropertyAst(ast) {
    return ast.metadataKey === exports.InjectMetadataKey;
}
exports.isInjectPropertyAst = isInjectPropertyAst;
function isInjectConstructorAst(ast) {
    return ast.metadataKey === exports.InjectMetadataKey;
}
exports.isInjectConstructorAst = isInjectConstructorAst;

Object.defineProperty(exports, "__esModule", { value: true });
const ims_decorator_1 = require("ims-decorator");
exports.InjectableMetadataKey = 'InjectableMetadataKey';
exports.Injectable = ims_decorator_1.makeDecorator(exports.InjectableMetadataKey);
class InjectableClassAst extends ims_decorator_1.ClassContext {
}
exports.InjectableClassAst = InjectableClassAst;
function isInjectableClassAst(ast) {
    return ast.metadataKey === exports.InjectableMetadataKey;
}
exports.isInjectableClassAst = isInjectableClassAst;

Object.defineProperty(exports, "__esModule", { value: true });
const ims_decorator_1 = require("ims-decorator");
exports.InputMetadataKey = 'InputMetadataKey';
exports.Input = (bindingPropertyName) => ims_decorator_1.makeDecorator(exports.InputMetadataKey)({
    bindingPropertyName
});
class InputPropertyAst extends ims_decorator_1.PropertyContext {
}
exports.InputPropertyAst = InputPropertyAst;
function isInputPropertyAst(ast) {
    return ast.metadataKey === exports.InputMetadataKey;
}
exports.isInputPropertyAst = isInputPropertyAst;

Object.defineProperty(exports, "__esModule", { value: true });
const ims_decorator_1 = require("ims-decorator");
exports.NgModuleMetadataKey = 'NgModuleMetadataKey';
const nger_di_1 = require("nger-di");
exports.NgModule = ims_decorator_1.makeDecorator(exports.NgModuleMetadataKey);
exports.APP_ALLREADY = new nger_di_1.InjectionToken(`APP_ALLREADY`);
class NgModuleClassAst extends ims_decorator_1.ClassContext {
    constructor(ast, context) {
        super(ast, context);
        this.declarations = [];
        const def = this.ast.metadataDef;
    }
}
exports.NgModuleClassAst = NgModuleClassAst;
function isNgModuleClassAst(ast) {
    return ast.metadataKey === exports.NgModuleMetadataKey;
}
exports.isNgModuleClassAst = isNgModuleClassAst;

Object.defineProperty(exports, "__esModule", { value: true });
const ims_decorator_1 = require("ims-decorator");
exports.OptionalMetadataKey = 'OptionalMetadataKey';
exports.Optional = ims_decorator_1.makeDecorator(exports.OptionalMetadataKey);
class OptionalConstructorAst extends ims_decorator_1.ConstructorContext {
}
exports.OptionalConstructorAst = OptionalConstructorAst;
function isOptionalConstructorAst(ast) {
    return ast.metadataKey === exports.OptionalMetadataKey;
}
exports.isOptionalConstructorAst = isOptionalConstructorAst;

Object.defineProperty(exports, "__esModule", { value: true });
const ims_decorator_1 = require("ims-decorator");
const rxjs_1 = require("rxjs");
exports.OutputMetadataKey = 'OutputMetadataKey';
exports.Output = ims_decorator_1.makeDecorator(exports.OutputMetadataKey);
class OutputPropertyAst extends ims_decorator_1.PropertyContext {
}
exports.OutputPropertyAst = OutputPropertyAst;
function isOutputPropertyAst(ast) {
    return ast.metadataKey === exports.OutputMetadataKey;
}
exports.isOutputPropertyAst = isOutputPropertyAst;
class EventEmitter extends rxjs_1.Subject {
    constructor(isAsync) {
        super();
        this.__isAsync = !!isAsync;
    }
}
exports.EventEmitter = EventEmitter;

Object.defineProperty(exports, "__esModule", { value: true });
const ims_decorator_1 = require("ims-decorator");
exports.PageMetadataKey = 'PageMetadataKey';
exports.Page = ims_decorator_1.makeDecorator(exports.PageMetadataKey);
class PageClassAst extends ims_decorator_1.ClassContext {
    constructor(ast, context) {
        super(ast, context);
        const def = this.ast.metadataDef;
        if (def.path)
            this.path = def.path;
    }
}
exports.PageClassAst = PageClassAst;
function isPageClassAst(ast) {
    return ast.metadataKey === exports.PageMetadataKey;
}
exports.isPageClassAst = isPageClassAst;

Object.defineProperty(exports, "__esModule", { value: true });
const ims_decorator_1 = require("ims-decorator");
exports.PipeMetadataKey = 'PipeMetadataKey';
exports.Pipe = ims_decorator_1.makeDecorator(exports.PipeMetadataKey);
class PipeClassAst extends ims_decorator_1.ClassContext {
}
exports.PipeClassAst = PipeClassAst;
function isPipeClassAst(ast) {
    return ast.metadataKey === exports.PipeMetadataKey;
}
exports.isPipeClassAst = isPipeClassAst;

Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
tslib_1.__exportStar(require("./ngModule"), exports);
tslib_1.__exportStar(require("./component"), exports);
tslib_1.__exportStar(require("./directive"), exports);
tslib_1.__exportStar(require("./pipe"), exports);
tslib_1.__exportStar(require("./injectable"), exports);
tslib_1.__exportStar(require("./input"), exports);
tslib_1.__exportStar(require("./host-binding"), exports);
tslib_1.__exportStar(require("./host-listener"), exports);
tslib_1.__exportStar(require("./host"), exports);
tslib_1.__exportStar(require("./inject"), exports);
tslib_1.__exportStar(require("./self"), exports);
tslib_1.__exportStar(require("./skip-self"), exports);
tslib_1.__exportStar(require("./optional"), exports);
tslib_1.__exportStar(require("./attribute"), exports);
tslib_1.__exportStar(require("./view-child"), exports);
tslib_1.__exportStar(require("./view-children"), exports);
tslib_1.__exportStar(require("./content-child"), exports);
tslib_1.__exportStar(require("./content-children"), exports);
tslib_1.__exportStar(require("./output"), exports);
tslib_1.__exportStar(require("./page"), exports);
tslib_1.__exportStar(require("./types"), exports);

Object.defineProperty(exports, "__esModule", { value: true });
const ims_decorator_1 = require("ims-decorator");
exports.SelfMetadataKey = 'SelfMetadataKey';
exports.Self = ims_decorator_1.makeDecorator(exports.SelfMetadataKey);
class SelfConstructorAst extends ims_decorator_1.ConstructorContext {
}
exports.SelfConstructorAst = SelfConstructorAst;
function isSelfConstructorAst(ast) {
    return ast.metadataKey === exports.SelfMetadataKey;
}
exports.isSelfConstructorAst = isSelfConstructorAst;

Object.defineProperty(exports, "__esModule", { value: true });
const ims_decorator_1 = require("ims-decorator");
exports.SkipSelfMetadataKey = 'SkipSelfMetadataKey';
exports.SkipSelf = ims_decorator_1.makeDecorator(exports.SkipSelfMetadataKey);
class SkipSelfConstructorAst extends ims_decorator_1.ConstructorContext {
}
exports.SkipSelfConstructorAst = SkipSelfConstructorAst;
function isSkipSelfConstructorAst(ast) {
    return ast.metadataKey === exports.SkipSelfMetadataKey;
}
exports.isSkipSelfConstructorAst = isSkipSelfConstructorAst;

Object.defineProperty(exports, "__esModule", { value: true });
function isType(val) {
    return typeof val === 'function';
}
exports.isType = isType;
var ChangeDetectionStrategy;
(function (ChangeDetectionStrategy) {
    ChangeDetectionStrategy[ChangeDetectionStrategy["OnPush"] = 0] = "OnPush";
    ChangeDetectionStrategy[ChangeDetectionStrategy["Default"] = 1] = "Default";
})(ChangeDetectionStrategy = exports.ChangeDetectionStrategy || (exports.ChangeDetectionStrategy = {}));
var ViewEncapsulation;
(function (ViewEncapsulation) {
    ViewEncapsulation[ViewEncapsulation["Emulated"] = 0] = "Emulated";
    ViewEncapsulation[ViewEncapsulation["Native"] = 1] = "Native";
    ViewEncapsulation[ViewEncapsulation["None"] = 2] = "None";
    ViewEncapsulation[ViewEncapsulation["ShadowDom"] = 3] = "ShadowDom";
})(ViewEncapsulation = exports.ViewEncapsulation || (exports.ViewEncapsulation = {}));
class QueryList {
    constructor() {
        this.dirty = true;
    }
}
exports.QueryList = QueryList;
class ActivatedRouteSnapshot {
}
exports.ActivatedRouteSnapshot = ActivatedRouteSnapshot;
class UrlSegmentGroup {
}
exports.UrlSegmentGroup = UrlSegmentGroup;
class UrlSegment {
}
exports.UrlSegment = UrlSegment;

Object.defineProperty(exports, "__esModule", { value: true });
const ims_decorator_1 = require("ims-decorator");
exports.ViewChildMetadataKey = 'ViewChildMetadataKey';
exports.ViewChild = (selector, opts) => {
    return ims_decorator_1.makeDecorator(exports.ViewChildMetadataKey)({
        selector, opts
    });
};
class ViewChildPropertyAst extends ims_decorator_1.PropertyContext {
}
exports.ViewChildPropertyAst = ViewChildPropertyAst;
function isViewChildPropertyAst(ast) {
    return ast.metadataKey === exports.ViewChildMetadataKey;
}
exports.isViewChildPropertyAst = isViewChildPropertyAst;

Object.defineProperty(exports, "__esModule", { value: true });
const ims_decorator_1 = require("ims-decorator");
exports.ViewChildrenMetadataKey = 'ViewChildrenMetadataKey';
exports.ViewChildren = (selector, opts) => {
    return ims_decorator_1.makeDecorator(exports.ViewChildrenMetadataKey)({
        selector, opts
    });
};
class ViewChildrenPropertyAst extends ims_decorator_1.PropertyContext {
}
exports.ViewChildrenPropertyAst = ViewChildrenPropertyAst;
function isViewChildrenPropertyAst(ast) {
    return ast.metadataKey === exports.ViewChildrenMetadataKey;
}
exports.isViewChildrenPropertyAst = isViewChildrenPropertyAst;


Object.defineProperty(exports, "__esModule", { value: true });
const ims_decorator_1 = require("ims-decorator");
exports.GetMetadataKey = 'GetMetadataKey';
exports.Get = (path) => ims_decorator_1.makeDecorator(exports.GetMetadataKey)({
    path
});
function isGetMethodAst(val) {
    return val.metadataKey === exports.GetMetadataKey;
}
exports.isGetMethodAst = isGetMethodAst;
class GetMethodAst extends ims_decorator_1.MethodContext {
    constructor(ast, context) {
        super(ast, context);
        const def = this.ast.metadataDef;
        this.path = def.path || this.ast.propertyKey;
    }
}
exports.GetMethodAst = GetMethodAst;
function isGetPropertyAst(val) {
    return val.metadataKey === exports.GetMetadataKey;
}
exports.isGetPropertyAst = isGetPropertyAst;
class GetPropertyAst extends ims_decorator_1.PropertyContext {
}
exports.GetPropertyAst = GetPropertyAst;

Object.defineProperty(exports, "__esModule", { value: true });
const ims_decorator_1 = require("ims-decorator");
exports.PostMetadataKey = 'PostMetadataKey';
exports.Post = (path) => ims_decorator_1.makeDecorator(exports.PostMetadataKey)({
    path
});
function isPostMethodAst(val) {
    return val.metadataKey === exports.PostMetadataKey;
}
exports.isPostMethodAst = isPostMethodAst;
class PostMethodAst extends ims_decorator_1.MethodContext {
    constructor(ast, context) {
        super(ast, context);
        const def = this.ast.metadataDef;
        this.path = def.path || this.ast.propertyKey;
    }
}
exports.PostMethodAst = PostMethodAst;
function isPostPropertyAst(val) {
    return val.metadataKey === exports.PostMetadataKey;
}
exports.isPostPropertyAst = isPostPropertyAst;
class PostPropertyAst extends ims_decorator_1.PropertyContext {
}
exports.PostPropertyAst = PostPropertyAst;




Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
tslib_1.__exportStar(require("./columns/index"), exports);
tslib_1.__exportStar(require("./entity/index"), exports);
tslib_1.__exportStar(require("./relations/index"), exports);
tslib_1.__exportStar(require("./listeners/index"), exports);
tslib_1.__exportStar(require("./transaction/index"), exports);
tslib_1.__exportStar(require("./tree/index"), exports);
tslib_1.__exportStar(require("./others/Check"), exports);
tslib_1.__exportStar(require("./others/EntityRepository"), exports);
tslib_1.__exportStar(require("./others/Exclusion"), exports);
tslib_1.__exportStar(require("./others/Generated"), exports);
tslib_1.__exportStar(require("./others/Index"), exports);
tslib_1.__exportStar(require("./others/Unique"), exports);
tslib_1.__exportStar(require("./migration"), exports);
tslib_1.__exportStar(require("./typeorm"), exports);

Object.defineProperty(exports, "__esModule", { value: true });
const ims_decorator_1 = require("ims-decorator");
exports.MigrationMetadataKey = 'MigrationMetadataKey';
exports.Migration = ims_decorator_1.makeDecorator(exports.MigrationMetadataKey);
function isMigrationClassAst(val) {
    return val.metadataKey === exports.MigrationMetadataKey;
}
exports.isMigrationClassAst = isMigrationClassAst;
class MigrationClassAst extends ims_decorator_1.ClassContext {
    constructor(ast, context) {
        super(ast, context);
    }
}
exports.MigrationClassAst = MigrationClassAst;

Object.defineProperty(exports, "__esModule", { value: true });
const ims_decorator_1 = require("ims-decorator");
exports.TypeormMetadataKey = 'TypeormMetadataKey';
exports.Typeorm = ims_decorator_1.makeDecorator(exports.TypeormMetadataKey);
function isTypeormClassAst(val) {
    return val.metadataKey === exports.TypeormMetadataKey;
}
exports.isTypeormClassAst = isTypeormClassAst;
class TypeormClassAst extends ims_decorator_1.ClassContext {
    constructor(ast, context) {
        super(ast, context);
        this.entities = [];
        this.migrations = [];
        this.subscribers = [];
        const def = this.ast.metadataDef;
        if (def.entities)
            this.entities = this.forEachObjectToTypeContent(def.entities);
        if (def.migrations)
            this.migrations = this.forEachObjectToTypeContent(def.migrations);
        if (def.subscribers)
            this.subscribers = this.forEachObjectToTypeContent(def.subscribers);
    }
}
exports.TypeormClassAst = TypeormClassAst;

Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const lang_1 = require("./lang");
const inject_1 = require("../decorators/inject");
const injectable_1 = require("../decorators/injectable");
const optional_1 = require("../decorators/optional");
const nger_di_1 = require("nger-di");
// import { APP_INITIALIZER } from './application_tokens'
exports.APP_INITIALIZER = new nger_di_1.InjectionToken('Application Initializer');
let ApplicationInitStatus = class ApplicationInitStatus {
    constructor(appInits) {
        this.appInits = appInits;
        this.initialized = false;
        this.done = false;
        this.donePromise = new Promise((res, rej) => {
            this.resolve = res;
            this.reject = rej;
        });
    }
    /** @internal */
    runInitializers() {
        if (this.initialized) {
            return;
        }
        const asyncInitPromises = [];
        const complete = () => {
            this.done = true;
            this.resolve();
        };
        if (this.appInits) {
            for (let i = 0; i < this.appInits.length; i++) {
                const initResult = this.appInits[i]();
                if (lang_1.isPromise(initResult)) {
                    asyncInitPromises.push(initResult);
                }
            }
        }
        Promise.all(asyncInitPromises).then(() => { complete(); }).catch(e => { this.reject(e); });
        if (asyncInitPromises.length === 0) {
            complete();
        }
        this.initialized = true;
    }
};
ApplicationInitStatus = tslib_1.__decorate([
    injectable_1.Injectable(),
    tslib_1.__param(0, inject_1.Inject(exports.APP_INITIALIZER)), tslib_1.__param(0, optional_1.Optional()),
    tslib_1.__metadata("design:paramtypes", [Array])
], ApplicationInitStatus);
exports.ApplicationInitStatus = ApplicationInitStatus;

Object.defineProperty(exports, "__esModule", { value: true });
const lang_1 = require("./lang");
const component_factory_1 = require("./component_factory");
const component_factory_resolver_1 = require("./component_factory_resolver");
class ApplicationRef {
    constructor(injector) {
        this.injector = injector;
        this.componentTypes = [];
        this.components = [];
        this._views = [];
    }
    get viewCount() { return this._views.length; }
    tick() { }
    bootstrap(componentOrFactory, rootSelectorOrNode) {
        if (componentOrFactory instanceof component_factory_1.ComponentFactory) {
            return componentOrFactory.create(this.injector);
        }
        else {
            const componentFactoryResolver = this.injector.get(component_factory_resolver_1.ComponentFactoryResolver);
            return componentFactoryResolver.resolveComponentFactory(componentOrFactory).create(this.injector);
        }
    }
    attachView(view) {
        this._views.push(view);
    }
    detachView(view) {
        lang_1.remove(this._views, view);
    }
    ngOnDestroy() {
        this._views.slice().forEach((view) => view.destroy());
    }
}
exports.ApplicationRef = ApplicationRef;

Object.defineProperty(exports, "__esModule", { value: true });
const nger_di_1 = require("nger-di");
exports.APP_ID = new nger_di_1.InjectionToken('AppId');
function _appIdRandomProviderFactory() {
    return `${_randomChar()}${_randomChar()}${_randomChar()}`;
}
exports._appIdRandomProviderFactory = _appIdRandomProviderFactory;
exports.APP_ID_RANDOM_PROVIDER = {
    provide: exports.APP_ID,
    useFactory: _appIdRandomProviderFactory,
    deps: [],
};
function _randomChar() {
    return String.fromCharCode(97 + Math.floor(Math.random() * 25));
}
exports._randomChar = _randomChar;
exports.PLATFORM_INITIALIZER = new nger_di_1.InjectionToken('Platform Initializer');
exports.PLATFORM_ID = new nger_di_1.InjectionToken('Platform ID');
exports.APP_BOOTSTRAP_LISTENER = new nger_di_1.InjectionToken('appBootstrapListener');
exports.PACKAGE_ROOT_URL = new nger_di_1.InjectionToken('Application Packages Root URL');

Object.defineProperty(exports, "__esModule", { value: true });
class ChangeDetectorRef {
}
exports.ChangeDetectorRef = ChangeDetectorRef;
class DefaultChangeDetectorRef extends ChangeDetectorRef {
    markForCheck() { }
    detach() { }
    detectChanges() { }
    checkNoChanges() { }
    reattach() { }
}
exports.DefaultChangeDetectorRef = DefaultChangeDetectorRef;

Object.defineProperty(exports, "__esModule", { value: true });
const nger_di_1 = require("nger-di");
const component_ref_1 = require("./component_ref");
const parser_visitor_1 = require("./parser_visitor");
const page_1 = require("../decorators/page");
const component_1 = require("../decorators/component");
const change_detector_ref_1 = require("./change_detector_ref");
const input_1 = require("../decorators/input");
exports.ComponentTemplateToken = new nger_di_1.InjectionToken(`ComponentTemplateToken`);
exports.ComponentStyleToken = new nger_di_1.InjectionToken(`ComponentStyleToken`);
exports.ComponentPropToken = new nger_di_1.InjectionToken(`ComponentPropToken`);
exports.ElementRef = new nger_di_1.InjectionToken(`ElementRef`);
exports.StyleRef = new nger_di_1.InjectionToken(`StyleRef`);
exports.ComponentCreator = new nger_di_1.InjectionToken(`ComponentCreator`);
class ComponentFactory {
    constructor(_context) {
        this._context = _context;
        this._inputs = [];
        this.context.classes.map(cls => {
            if (cls instanceof component_1.ComponentClassAst || cls instanceof component_1.ComponentClassAst) {
                this.handlerComponent(cls);
            }
        });
        const inputs = this.context.getProperty(input_1.InputMetadataKey);
        inputs.map(input => {
            const ast = input.ast;
            const def = ast.metadataDef;
            this._inputs.push({
                propName: ast.propertyKey,
                templateName: def.bindingPropertyName || ast.propertyKey
            });
        });
    }
    get selector() {
        return this._selector;
    }
    get componentType() {
        return this._componentType;
    }
    get ngContentSelectors() {
        return this._ngContentSelectors || [];
    }
    get inputs() {
        return this._inputs || [];
    }
    get outputs() {
        return this._outputs || [];
    }
    ;
    get context() {
        return this._context;
    }
    get type() {
        return this._type;
    }
    // 处理Component
    handlerComponent(cls) {
        const ast = cls.ast;
        const def = ast.metadataDef;
        if (def.selector)
            this._selector = def.selector;
    }
    // 创建
    create(injector, ngModule) {
        const { target } = this._context;
        // 新建一个
        // Component,Directive,Pipe每次取都要创建
        // Page/Controller单例
        let item = this._context.classes.find(cls => [page_1.PageMetadataKey, component_1.ComponentMetadataKey].includes(cls.ast.metadataKey));
        // 这里需要运行custom element
        // const customElementRegistry = injector.get(CustomElementRegistry);
        // customElementRegistry.define(this)
        if (injector.create) {
            this._context.injector = injector.create([]);
        }
        const creators = injector.get(exports.ComponentCreator);
        // 处理Component
        creators.map(creat => {
            creat(this._context);
        });
        const instance = this._context.injector.get(target);
        // 属性
        // 解析一些属性并赋值
        const parserVisitor = this._context.injector.get(parser_visitor_1.ParserVisitor);
        parserVisitor.parse(instance, this._context);
        const change = this._context.injector.get(change_detector_ref_1.ChangeDetectorRef);
        return new component_ref_1.ComponentRef(this._context.injector, instance, change, target);
    }
}
exports.ComponentFactory = ComponentFactory;

Object.defineProperty(exports, "__esModule", { value: true });
const component_factory_1 = require("./component_factory");
class ComponentFactoryResolver {
    constructor(contexts) {
        this.map = new Map();
        contexts.map(ctx => this.map.set(ctx.target, ctx));
    }
    resolveComponentFactory(component) {
        const context = this.map.get(component);
        if (context)
            return new component_factory_1.ComponentFactory(context);
        throw new Error(`ComponentFactoryResolver: resolve component error`);
    }
    getComponents() {
        let arr = [];
        this.map.forEach((item, key) => arr.push(item));
        return arr;
    }
}
exports.ComponentFactoryResolver = ComponentFactoryResolver;

Object.defineProperty(exports, "__esModule", { value: true });
class ComponentRef {
    constructor(_injector, _instance, 
    // todo
    _changeDetectorRef, _componentType) {
        this._injector = _injector;
        this._instance = _instance;
        this._changeDetectorRef = _changeDetectorRef;
        this._componentType = _componentType;
    }
    get injector() {
        return this._injector;
    }
    get instance() {
        return this._instance;
    }
    get componentType() {
        return this._componentType;
    }
    get location() {
        return this._location;
    }
    get hostView() {
        return this._hostView;
    }
    get changeDetectorRef() {
        return this._changeDetectorRef;
    }
    destroy() { }
    onDestroy(callback) { }
}
exports.ComponentRef = ComponentRef;

Object.defineProperty(exports, "__esModule", { value: true });
const nger_di_1 = require("nger-di");
const platform_ref_1 = require("./platform_ref");
const application_tokens_1 = require("./application_tokens");
let _platform;
function getPlatform() {
    return _platform && !_platform.destroyed ? _platform : null;
}
exports.getPlatform = getPlatform;
exports.ALLOW_MULTIPLE_PLATFORMS = new nger_di_1.InjectionToken('AllowMultipleToken');
function createPlatform(injector) {
    if (_platform && !_platform.destroyed &&
        !_platform.injector.get(exports.ALLOW_MULTIPLE_PLATFORMS, false)) {
        throw new Error('There can be only one platform. Destroy the previous one to create a new one.');
    }
    _platform = injector.get(platform_ref_1.PlatformRef);
    const inits = injector.get(application_tokens_1.PLATFORM_INITIALIZER, undefined, nger_di_1.InjectFlags.Optional) || [];
    if (inits)
        inits.forEach((init) => init());
    return _platform;
}
exports.createPlatform = createPlatform;

Object.defineProperty(exports, "__esModule", { value: true });
const nger_di_1 = require("nger-di");
const createPlatform_1 = require("./createPlatform");
function createPlatformFactory(parentPlatformFactory, name, providers = []) {
    const desc = `Platform: ${name}`;
    const marker = new nger_di_1.InjectionToken(desc);
    return (extraProviders = []) => {
        let platform = createPlatform_1.getPlatform();
        if (!platform || platform.injector.get(createPlatform_1.ALLOW_MULTIPLE_PLATFORMS, false)) {
            if (parentPlatformFactory) {
                parentPlatformFactory(providers.concat(extraProviders)
                    .concat({ provide: marker, useValue: true }));
            }
            else {
                const injectedProviders = providers.concat(extraProviders).concat({ provide: marker, useValue: true });
                createPlatform_1.createPlatform(nger_di_1.Injector.create({ providers: injectedProviders, name: desc }));
            }
        }
        return assertPlatform(marker);
    };
}
exports.createPlatformFactory = createPlatformFactory;
function assertPlatform(requiredToken) {
    const platform = createPlatform_1.getPlatform();
    if (!platform) {
        throw new Error('No platform exists!');
    }
    if (!platform.injector.get(requiredToken, null)) {
        throw new Error('A platform with a different configuration has been created. Please destroy it first.');
    }
    return platform;
}
exports.assertPlatform = assertPlatform;

Object.defineProperty(exports, "__esModule", { value: true });
const ims_decorator_1 = require("ims-decorator");
const ngModule_1 = require("../decorators/ngModule");
const self_1 = require("../decorators/self");
const inject_1 = require("../decorators/inject");
const host_1 = require("../decorators/host");
const skip_self_1 = require("../decorators/skip-self");
const optional_1 = require("../decorators/optional");
const nger_di_1 = require("nger-di");
function providerToStaticProvider(provider, context) {
    if (nger_di_1.isTypeProvider(provider)) {
        const ctx = context.visitType(provider);
        return {
            provide: provider,
            useFactory: (...args) => new provider(...args),
            deps: handlerTypeContextToParams(ctx)
        };
    }
    else if (nger_di_1.isClassProvider(provider)) {
        const ctx = context.visitType(provider.useClass);
        return {
            // 修复
            ...provider,
            deps: handlerTypeContextToParams(ctx)
        };
    }
    else if (Array.isArray(provider)) {
        console.error(`providerToStaticProvider:Error`, provider);
        // return provider.map(pro => providerToStaticProvider(pro, context))
        return provider;
    }
    else {
        return provider;
    }
}
exports.providerToStaticProvider = providerToStaticProvider;
const set = new Set();
function clearCache() {
    set.clear();
}
exports.clearCache = clearCache;
function getModules() {
    return set;
}
exports.getModules = getModules;
function createTypeProvider(imp, context) {
    return {
        provide: imp,
        useFactory: (...params) => new imp(...params),
        deps: handlerTypeContextToParams(context)
    };
}
exports.createTypeProvider = createTypeProvider;
function createStaticProvider(context, providers = []) {
    if (hasExist(context.target))
        return [];
    const ngModule = context.getClass(ngModule_1.NgModuleMetadataKey);
    if (ngModule) {
        const def = ngModule.ast.metadataDef;
        // 拿到import
        let imports = [];
        let declarations = [];
        // 初始化
        if (def.providers)
            def.providers.map(pro => {
                providers.push(providerToStaticProvider(pro, context));
            });
        if (def.imports)
            imports = def.imports;
        if (def.declarations)
            declarations = def.declarations;
        // 不用处理providers
        // console.info(`after import \n\t providers: ${providers.length}`)
        // 类 👌
        declarations.map(imp => {
            let impContext = context.visitType(imp);
            // 是否要记录呢
            ngModule.declarations.push(impContext);
            // 这部分不加入依赖注入
            providers.push({
                provide: imp,
                useFactory: (...params) => new imp(...params),
                deps: handlerTypeContextToParams(impContext)
            });
        });
        // todo ngmodule 不应该在依赖注入里
        // providers.push({
        //     provide: context.target,
        //     useFactory: (...params: any[]) => new context.target(...params),
        //     deps: handlerTypeContextToParams(context)
        // });
        if (imports) {
            // 解析imports
            imports.map(imp => {
                createChildProviders(imp, context, providers);
            });
        }
    }
    return providers;
}
exports.createStaticProvider = createStaticProvider;
// 子模块 import ngModule
function hasExist(target) {
    if (set.has(target)) {
        return true;
    }
    set.add(target);
    return false;
}
function createChildProviders(imp, context, providers) {
    // 这是一个独立的module
    let impContext;
    if (ims_decorator_1.isType(imp)) {
        // 获取context
        impContext = context.visitType(imp);
    }
    else {
        // ModuleWithProviders
        const moduleWithProviders = imp;
        impContext = context.visitType(moduleWithProviders.ngModule);
        moduleWithProviders.providers.map(pro => {
            providers.push(providerToStaticProvider(pro, impContext));
        });
    }
    createStaticProvider(impContext, providers);
}
function handlerConstructorContext(deps, ast) {
    deps[ast.ast.parameterIndex] = deps[ast.ast.parameterIndex] || [];
    // 构造函数装饰器 这里就要判断了 目的是拿到token即可
    // 如果是Inject 那就是inject的target
    if (ast instanceof inject_1.InjectConstructorAst) {
        deps[ast.ast.parameterIndex].push(ast.ast.metadataDef.token || ast.ast.parameterType);
    }
    if (ast instanceof host_1.HostConstructorAst) {
        deps[ast.ast.parameterIndex].push(nger_di_1.InjectFlags.Host);
    }
    if (ast instanceof skip_self_1.SkipSelfConstructorAst) {
        deps[ast.ast.parameterIndex].push(nger_di_1.InjectFlags.SkipSelf);
    }
    if (ast instanceof self_1.SelfConstructorAst) {
        deps[ast.ast.parameterIndex].push(nger_di_1.InjectFlags.Self);
    }
    if (ast instanceof optional_1.OptionalConstructorAst) {
        deps[ast.ast.parameterIndex].push(nger_di_1.InjectFlags.Optional);
    }
}
function handlerTypeContextToParams(dec) {
    const deps = new Array(dec.paramsLength);
    dec.getConstructor().map(ast => {
        handlerConstructorContext(deps, ast);
    });
    dec.paramsTypes && dec.paramsTypes.map((par, index) => {
        if (!deps[index])
            deps[index] = par;
    });
    // 还要找到属性的 不赋值
    return deps;
}
exports.handlerTypeContextToParams = handlerTypeContextToParams;

Object.defineProperty(exports, "__esModule", { value: true });
class CustomElementRegistry {
}
exports.CustomElementRegistry = CustomElementRegistry;

Object.defineProperty(exports, "__esModule", { value: true });
class ErrorHandler {
}
exports.ErrorHandler = ErrorHandler;
class DefaultErrorHandler extends ErrorHandler {
    constructor(log) {
        super();
        this.log = log;
    }
    handleError(error) {
        this.log.error(`${error.message}`);
    }
}
exports.DefaultErrorHandler = DefaultErrorHandler;

Object.defineProperty(exports, "__esModule", { value: true });
function isPromise(obj) {
    return !!obj && typeof obj.then === 'function';
}
exports.isPromise = isPromise;
function remove(list, el) {
    const index = list.indexOf(el);
    if (index > -1) {
        list.splice(index, 1);
    }
}
exports.remove = remove;
function optionsReducer(dst, objs) {
    if (Array.isArray(objs)) {
        dst = objs.reduce(optionsReducer, dst);
    }
    else {
        dst = { ...dst, ...objs };
    }
    return dst;
}
exports.optionsReducer = optionsReducer;

Object.defineProperty(exports, "__esModule", { value: true });
const nger_di_1 = require("nger-di");
const ng_module_ref_1 = require("./ng_module_ref");
const scanner_visitor_1 = require("./scanner_visitor");
const parser_visitor_1 = require("./parser_visitor");
const createStaticProvider_1 = require("./createStaticProvider");
const ngModule_1 = require("../decorators/ngModule");
class NgModuleFactory {
    constructor(_moduleType) {
        this._moduleType = _moduleType;
    }
    get moduleType() {
        return this._moduleType;
    }
    create(parentInjector) {
        let injector = parentInjector || nger_di_1.Injector.create([]);
        const scannerVisitor = injector.get(scanner_visitor_1.ScannerVisitor);
        const context = scannerVisitor.visitType(this.moduleType);
        // 获取依赖参数
        const staticProviders = createStaticProvider_1.createStaticProvider(context);
        if (injector.setStatic)
            injector.setStatic(staticProviders);
        context.injector = injector;
        const _tempInjector = injector.create([{
                provide: context.target,
                useFactory: (...params) => new context.target(...params),
                deps: createStaticProvider_1.handlerTypeContextToParams(context)
            }]);
        // 启动imports
        // 运行imports
        const instance = _tempInjector.get(context.target);
        // 解析一些属性并赋值
        const parserVisitor = injector.get(parser_visitor_1.ParserVisitor);
        parserVisitor.parse(instance, context);
        const ngModule = context.getClass(ngModule_1.NgModuleMetadataKey);
        const imports = ngModule.ast.metadataDef.imports;
        if (imports) {
            imports.map(imp => {
                if (nger_di_1.isType(imp)) {
                    // new NgModuleFactory(imp).create(context.injector)
                }
                else {
                    // new NgModuleFactory(imp.ngModule).create(context.injector)
                }
            });
        }
        if (instance) {
            return new ng_module_ref_1.NgModuleRef(injector, instance, context);
        }
        else {
            throw new Error(`NgMoteduleFactory create ${this._moduleType.name} fail!`);
        }
    }
}
exports.NgModuleFactory = NgModuleFactory;

Object.defineProperty(exports, "__esModule", { value: true });
const component_factory_resolver_1 = require("./component_factory_resolver");
const ngModule_1 = require("../decorators/ngModule");
class NgModuleRef {
    constructor(_injector, _instance, _context) {
        this._injector = _injector;
        this._instance = _instance;
        this._context = _context;
        this._destroyed = false;
        this._modules = [];
        this._destroyListeners = [];
        // 注册Component,Page,Controller,Pipe,Directive,Command
        const ngModule = this.context.getClass(ngModule_1.NgModuleMetadataKey);
        this._componentFactoryResolver = new component_factory_resolver_1.ComponentFactoryResolver(ngModule.declarations);
        this._injector.setStatic([{
                provide: NgModuleRef,
                useValue: this,
            }, {
                provide: component_factory_resolver_1.ComponentFactoryResolver,
                useValue: this._componentFactoryResolver,
            }]);
    }
    get injector() {
        return this._injector;
    }
    get instance() {
        return this._instance;
    }
    get context() {
        return this._context;
    }
    get componentFactoryResolver() {
        return this._componentFactoryResolver;
    }
    destroy() {
        if (this._destroyed) {
            throw new Error('The platform has already been destroyed!');
        }
        this._modules.slice().forEach(module => module.destroy());
        this._destroyListeners.forEach(listener => listener());
        this._destroyed = true;
    }
    onDestroy(callback) {
        this._destroyListeners.push(callback);
    }
}
exports.NgModuleRef = NgModuleRef;

Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const inject_1 = require("../decorators/inject");
const index_1 = require("../orm/index");
const tokens_1 = require("../tokens");
/** 解析器 */
class Parser {
}
exports.Parser = Parser;
class DefaultParser extends Parser {
    parse(instance, context) {
        const injects = context.getProperty(inject_1.InjectMetadataKey);
        injects.map(inject => {
            const { metadataDef, propertyKey, propertyType } = inject.ast;
            instance[propertyKey] = context.injector.get(metadataDef.token || propertyType);
        });
        // entity
        const entities = context.getProperty(index_1.EntityRepositoryMetadataKey);
        entities.map(entity => {
            const { metadataDef, propertyKey } = entity.ast;
            setTimeout(() => {
                const connection = context.injector.get(tokens_1.ConnectionToken);
                instance[propertyKey] = connection.getRepository(metadataDef.entity);
            }, 0);
        });
        return instance;
    }
}
exports.DefaultParser = DefaultParser;
/** 外观模式 提供统一接口 */
let ParserVisitor = class ParserVisitor extends Parser {
    constructor(allParser) {
        super();
        this.allParser = allParser;
    }
    parse(instance, context) {
        for (let item of this.allParser) {
            item.parse(instance, context);
        }
        return instance;
    }
};
ParserVisitor = tslib_1.__decorate([
    tslib_1.__param(0, inject_1.Inject(Parser)),
    tslib_1.__metadata("design:paramtypes", [Array])
], ParserVisitor);
exports.ParserVisitor = ParserVisitor;

Object.defineProperty(exports, "__esModule", { value: true });
const createPlatformFactory_1 = require("./createPlatformFactory");
const parser_visitor_1 = require("./parser_visitor");
const scanner_visitor_1 = require("./scanner_visitor");
const nger_di_1 = require("nger-di");
const sdk_1 = require("../sdk");
const orm_1 = require("../orm");
const visitor_1 = require("../visitor");
const platform_ref_1 = require("./platform_ref");
const error_handler_1 = require("./error_handler");
const application_init_status_1 = require("./application_init_status");
const createPlatform_1 = require("./createPlatform");
const change_detector_ref_1 = require("./change_detector_ref");
const application_ref_1 = require("./application_ref");
const component_factory_1 = require("./component_factory");
const application_tokens_1 = require("./application_tokens");
exports.platformCore = createPlatformFactory_1.createPlatformFactory(null, 'core', [{
        provide: application_init_status_1.APP_INITIALIZER,
        useValue: () => { },
        deps: [],
        multi: true
    }, {
        provide: application_tokens_1.PLATFORM_INITIALIZER,
        useValue: () => { },
        deps: [],
        multi: true
    }, {
        provide: component_factory_1.ComponentCreator,
        multi: true,
        useValue: (val) => val,
    }, {
        provide: application_init_status_1.ApplicationInitStatus,
        useClass: application_init_status_1.ApplicationInitStatus,
        deps: [
            [nger_di_1.InjectFlags.Optional, application_init_status_1.APP_INITIALIZER]
        ]
    }, {
        provide: application_ref_1.ApplicationRef,
        useClass: application_ref_1.ApplicationRef,
        deps: [nger_di_1.Injector]
    }, {
        provide: change_detector_ref_1.ChangeDetectorRef,
        useClass: change_detector_ref_1.DefaultChangeDetectorRef,
        deps: [],
        multi: false
    }, {
        provide: createPlatform_1.ALLOW_MULTIPLE_PLATFORMS,
        useValue: true
    }, {
        provide: error_handler_1.ErrorHandler,
        useClass: error_handler_1.DefaultErrorHandler,
        deps: [sdk_1.Logger]
    }, {
        provide: parser_visitor_1.Parser,
        useClass: parser_visitor_1.DefaultParser,
        multi: true,
        deps: []
    }, {
        provide: platform_ref_1.PlatformRef,
        deps: [nger_di_1.Injector]
    }, {
        provide: platform_ref_1.CompilerFactory,
        deps: []
    }, {
        provide: scanner_visitor_1.Scanner,
        useValue: new visitor_1.NgVisitor(),
        multi: true
    }, {
        provide: scanner_visitor_1.Scanner,
        useValue: new orm_1.OrmVisitor(),
        multi: true
    }, {
        provide: parser_visitor_1.ParserVisitor,
        useFactory: (injector) => {
            const parser = injector.get(parser_visitor_1.Parser);
            return new parser_visitor_1.ParserVisitor(parser);
        },
        deps: [nger_di_1.Injector]
    }, {
        provide: scanner_visitor_1.ScannerVisitor,
        useFactory: (injector) => {
            const scanner = injector.get(scanner_visitor_1.Scanner);
            return new scanner_visitor_1.ScannerVisitor(scanner);
        },
        deps: [nger_di_1.Injector]
    }, {
        provide: sdk_1.NgerConfig,
        useFactory: () => {
            const config = new sdk_1.NgerConfig();
            config.watch = true;
            config.loggerLevel = sdk_1.LoggerLevel.debug;
        },
        deps: [],
        multi: true
    }, {
        provide: sdk_1.Logger,
        useFactory: (config) => {
            return new sdk_1.ConsoleLogger(config.loggerLevel || sdk_1.LoggerLevel.debug);
        },
        deps: [sdk_1.NgerConfig]
    }]);

Object.defineProperty(exports, "__esModule", { value: true });
const ng_module_factory_1 = require("./ng_module_factory");
const error_handler_1 = require("./error_handler");
const lang_1 = require("./lang");
const application_init_status_1 = require("./application_init_status");
class NgModuleBootstrap {
}
exports.NgModuleBootstrap = NgModuleBootstrap;
class PlatformRef {
    constructor(_injector) {
        this._injector = _injector;
        this._modules = [];
        this._destroyListeners = [];
        this._destroyed = false;
    }
    get injector() { return this._injector; }
    get destroyed() { return this._destroyed; }
    async bootstrapModule(moduleType, compilerOptions = {}) {
        const options = lang_1.optionsReducer({}, compilerOptions);
        // 注册injector
        return compileNgModuleFactory(this.injector, options, moduleType)
            .then(moduleFactory => {
            return this.bootstrapModuleFactory(moduleFactory, options);
        });
    }
    async bootstrapModuleFactory(moduleFactory, options) {
        // todo 注入启动参数
        const injector = this.injector.create([]);
        const moduleRef = moduleFactory.create(injector);
        const exceptionHandler = moduleRef.injector.get(error_handler_1.ErrorHandler, undefined);
        if (!exceptionHandler) {
            throw new Error('No ErrorHandler. Please Regist ErrorHandler');
        }
        moduleRef.onDestroy(() => lang_1.remove(this._modules, moduleRef));
        const initStatus = moduleRef.injector.get(application_init_status_1.ApplicationInitStatus);
        await initStatus.runInitializers();
        await this._moduleDoBootstrap(moduleRef);
        return moduleRef;
    }
    async _moduleDoBootstrap(moduleRef) {
        const bootstrap = this.injector.get(NgModuleBootstrap, []);
        const allBoot = bootstrap.map(async (b) => {
            return await b.run(moduleRef);
        });
        return Promise.all(allBoot);
    }
    // 注册销毁钩子
    onDestroy(callback) {
        this._destroyListeners.push(callback);
    }
    // 销毁
    destroy() {
        if (this._destroyed) {
            throw new Error('The platform has already been destroyed!');
        }
        this._modules.slice().forEach(module => module.destroy());
        this._destroyListeners.forEach(listener => listener());
        this._destroyed = true;
    }
}
exports.PlatformRef = PlatformRef;
function compileNgModuleFactory(injector, options, moduleType) {
    const compilerFactory = injector.get(CompilerFactory);
    const compiler = compilerFactory.createCompiler([options]);
    return compiler.compileModuleAsync(moduleType);
}
class CompilerFactory {
    createCompiler(options) {
        return new Compiler(options);
    }
}
exports.CompilerFactory = CompilerFactory;
// 编译器
class Compiler {
    constructor(options) {
        this.options = options;
    }
    // 编译
    async compileModuleAsync(moduleType) {
        return new ng_module_factory_1.NgModuleFactory(moduleType);
    }
}
exports.Compiler = Compiler;

Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const ims_decorator_1 = require("ims-decorator");
const inject_1 = require("../decorators/inject");
/** 扫描生成ast */
class Scanner extends ims_decorator_1.NullAstVisitor {
}
exports.Scanner = Scanner;
/** 外观模式 提供统一的接口 用于负责多个scanner统一调用 */
let ScannerVisitor = class ScannerVisitor extends ims_decorator_1.Visitors {
    constructor(visitors) {
        super(visitors);
    }
};
ScannerVisitor = tslib_1.__decorate([
    tslib_1.__param(0, inject_1.Inject(Scanner)),
    tslib_1.__metadata("design:paramtypes", [Array])
], ScannerVisitor);
exports.ScannerVisitor = ScannerVisitor;

Object.defineProperty(exports, "__esModule", { value: true });
class Cache {
}
exports.Cache = Cache;

Object.defineProperty(exports, "__esModule", { value: true });
class Compiler {
    constructor(config) {
        this.config = config;
    }
}
exports.Compiler = Compiler;

Object.defineProperty(exports, "__esModule", { value: true });
const nger_di_1 = require("nger-di");
exports.FileSystem = new nger_di_1.InjectionToken(`FileSystem`);

Object.defineProperty(exports, "__esModule", { value: true });
class History {
}
exports.History = History;

Object.defineProperty(exports, "__esModule", { value: true });
class Http {
}
exports.Http = Http;

Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
tslib_1.__exportStar(require("./http"), exports);
tslib_1.__exportStar(require("./logger"), exports);
tslib_1.__exportStar(require("./nger-config"), exports);
tslib_1.__exportStar(require("./history"), exports);
tslib_1.__exportStar(require("./file_system"), exports);

Object.defineProperty(exports, "__esModule", { value: true });
class Logger {
}
exports.Logger = Logger;
const RESET = '\x1b[0m';
const RED = '\x1b[31m';
const YELLOW = '\x1b[33m';
const BLUE = '\x1b[36m';
const ZI = '\x1B[35m';
const DEBUG = `${BLUE}Debug:${RESET}`;
const WARN = `${YELLOW}Warning:${RESET}`;
const ERROR = `${RED}Error:${RESET}`;
const INFO = `${ZI}Info:${RESET}`;
const nger_config_1 = require("./nger-config");
class ConsoleLogger extends Logger {
    constructor(loggerLevel) {
        super();
        this.loggerLevel = loggerLevel;
    }
    debug(...args) {
        if (this.loggerLevel <= nger_config_1.LoggerLevel.debug)
            console.debug(DEBUG, ...args);
    }
    info(...args) {
        if (this.loggerLevel <= nger_config_1.LoggerLevel.info)
            console.info(INFO, ...args);
    }
    warn(...args) {
        if (this.loggerLevel <= nger_config_1.LoggerLevel.warn)
            console.warn(WARN, ...args);
    }
    error(...args) {
        if (this.loggerLevel <= nger_config_1.LoggerLevel.error)
            console.error(ERROR, ...args);
    }
}
exports.ConsoleLogger = ConsoleLogger;

Object.defineProperty(exports, "__esModule", { value: true });
// 所有的配置都在放在这里
var LoggerLevel;
(function (LoggerLevel) {
    LoggerLevel[LoggerLevel["debug"] = 0] = "debug";
    LoggerLevel[LoggerLevel["info"] = 1] = "info";
    LoggerLevel[LoggerLevel["warn"] = 2] = "warn";
    LoggerLevel[LoggerLevel["error"] = 3] = "error";
})(LoggerLevel = exports.LoggerLevel || (exports.LoggerLevel = {}));
class NgerConfig {
}
exports.NgerConfig = NgerConfig;

Object.defineProperty(exports, "__esModule", { value: true });
class Path {
}
exports.Path = Path;

Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const inject_1 = require("../decorators/inject");
class Task {
}
exports.Task = Task;
class TaskNotFoundError extends Error {
}
exports.TaskNotFoundError = TaskNotFoundError;
let TaskManager = class TaskManager {
    constructor(tasks) {
        this.tasks = tasks;
    }
    getTaskByName(name) {
        return this.tasks.find(task => task.name === name);
    }
    runTaskByName(name) {
        return new Promise((resolve, reject) => {
            const task = this.getTaskByName(name);
            if (task) {
                task.run((error) => {
                    if (error)
                        return reject(error);
                    return resolve();
                });
            }
            else {
                return reject(new TaskNotFoundError(`${name}`));
            }
        });
    }
};
TaskManager = tslib_1.__decorate([
    tslib_1.__param(0, inject_1.Inject(Task)),
    tslib_1.__metadata("design:paramtypes", [Array])
], TaskManager);
exports.TaskManager = TaskManager;

Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
tslib_1.__exportStar(require("./validate"), exports);

Object.defineProperty(exports, "__esModule", { value: true });
const ims_decorator_1 = require("ims-decorator");
exports.ValidateMetadataKey = `ValidateMetadataKey`;
exports.Validate = (validateFn) => {
    return ims_decorator_1.makeDecorator(exports.ValidateMetadataKey)({
        validateFn
    });
};
function isIsValidateAst(ast) {
    return ast.metadataKey === exports.ValidateMetadataKey;
}
exports.isIsValidateAst = isIsValidateAst;
class ValidatePropertyAst extends ims_decorator_1.PropertyContext {
}
exports.ValidatePropertyAst = ValidatePropertyAst;

Object.defineProperty(exports, "__esModule", { value: true });
const ims_decorator_1 = require("ims-decorator");
exports.ColumnMetadataKey = 'ColumnMetadataKey';
exports.Column = ims_decorator_1.makeDecorator(exports.ColumnMetadataKey);
function isColumnPropertyAst(val) {
    return val.metadataKey === exports.ColumnMetadataKey;
}
exports.isColumnPropertyAst = isColumnPropertyAst;
class ColumnPropertyAst extends ims_decorator_1.PropertyContext {
}
exports.ColumnPropertyAst = ColumnPropertyAst;

Object.defineProperty(exports, "__esModule", { value: true });
const ims_decorator_1 = require("ims-decorator");
exports.CreateDateColumnMetadataKey = 'CreateDateColumnMetadataKey';
exports.CreateDateColumn = ims_decorator_1.makeDecorator(exports.CreateDateColumnMetadataKey);
function isCreateDateColumnPropertyAst(val) {
    return val.metadataKey === exports.CreateDateColumnMetadataKey;
}
exports.isCreateDateColumnPropertyAst = isCreateDateColumnPropertyAst;
class CreateDateColumnPropertyAst extends ims_decorator_1.PropertyContext {
}
exports.CreateDateColumnPropertyAst = CreateDateColumnPropertyAst;

Object.defineProperty(exports, "__esModule", { value: true });
const ims_decorator_1 = require("ims-decorator");
exports.ObjectIdColumnMetadataKey = 'ObjectIdColumnMetadataKey';
exports.ObjectIdColumn = ims_decorator_1.makeDecorator(exports.ObjectIdColumnMetadataKey);
function isObjectIdColumnPropertyAst(val) {
    return val.metadataKey === exports.ObjectIdColumnMetadataKey;
}
exports.isObjectIdColumnPropertyAst = isObjectIdColumnPropertyAst;
class ObjectIdColumnPropertyAst extends ims_decorator_1.PropertyContext {
}
exports.ObjectIdColumnPropertyAst = ObjectIdColumnPropertyAst;

Object.defineProperty(exports, "__esModule", { value: true });
const ims_decorator_1 = require("ims-decorator");
exports.PrimaryGeneratedColumnMetadataKey = 'PrimaryGeneratedColumnMetadataKey';
function PrimaryGeneratedColumn(strategy, options) {
    const decorator = ims_decorator_1.makeDecorator(exports.PrimaryGeneratedColumnMetadataKey);
    return decorator({
        strategy,
        options
    });
}
exports.PrimaryGeneratedColumn = PrimaryGeneratedColumn;
function isPrimaryGeneratedColumnPropertyAst(val) {
    return val.metadataKey === exports.PrimaryGeneratedColumnMetadataKey;
}
exports.isPrimaryGeneratedColumnPropertyAst = isPrimaryGeneratedColumnPropertyAst;
class PrimaryGeneratedColumnPropertyAst extends ims_decorator_1.PropertyContext {
}
exports.PrimaryGeneratedColumnPropertyAst = PrimaryGeneratedColumnPropertyAst;

Object.defineProperty(exports, "__esModule", { value: true });
const ims_decorator_1 = require("ims-decorator");
exports.UpdateDateColumnMetadataKey = 'UpdateDateColumnMetadataKey';
exports.UpdateDateColumn = ims_decorator_1.makeDecorator(exports.UpdateDateColumnMetadataKey);
function isUpdateDateColumnPropertyAst(val) {
    return val.metadataKey === exports.UpdateDateColumnMetadataKey;
}
exports.isUpdateDateColumnPropertyAst = isUpdateDateColumnPropertyAst;
class UpdateDateColumnPropertyAst extends ims_decorator_1.PropertyContext {
}
exports.UpdateDateColumnPropertyAst = UpdateDateColumnPropertyAst;

Object.defineProperty(exports, "__esModule", { value: true });
const ims_decorator_1 = require("ims-decorator");
exports.VersionColumnMetadataKey = 'VersionColumnMetadataKey';
exports.VersionColumn = ims_decorator_1.makeDecorator(exports.VersionColumnMetadataKey);
function isVersionColumnPropertyAst(val) {
    return val.metadataKey === exports.VersionColumnMetadataKey;
}
exports.isVersionColumnPropertyAst = isVersionColumnPropertyAst;
class VersionColumnPropertyAst extends ims_decorator_1.PropertyContext {
}
exports.VersionColumnPropertyAst = VersionColumnPropertyAst;

Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
tslib_1.__exportStar(require("./Column"), exports);
tslib_1.__exportStar(require("./CreateDateColumn"), exports);
tslib_1.__exportStar(require("./ObjectIdColumn"), exports);
tslib_1.__exportStar(require("./PrimaryGeneratedColumn"), exports);
tslib_1.__exportStar(require("./UpdateDateColumn"), exports);
tslib_1.__exportStar(require("./VersionColumn"), exports);
tslib_1.__exportStar(require("./primaryColumn"), exports);

Object.defineProperty(exports, "__esModule", { value: true });
const ims_decorator_1 = require("ims-decorator");
exports.PrimaryColumnMetadataKey = 'PrimaryColumnMetadataKey';
exports.PrimaryColumn = ims_decorator_1.makeDecorator(exports.PrimaryColumnMetadataKey);
function isPrimaryColumnPropertyAst(val) {
    return val.metadataKey === exports.PrimaryColumnMetadataKey;
}
exports.isPrimaryColumnPropertyAst = isPrimaryColumnPropertyAst;
class PrimaryColumnPropertyAst extends ims_decorator_1.PropertyContext {
}
exports.PrimaryColumnPropertyAst = PrimaryColumnPropertyAst;

Object.defineProperty(exports, "__esModule", { value: true });
const ims_decorator_1 = require("ims-decorator");
exports.ChildEntityMetadataKey = 'ChildEntityMetadataKey';
exports.ChildEntity = (discriminatorValue) => ims_decorator_1.makeDecorator(exports.ChildEntityMetadataKey)({
    discriminatorValue
});
function isChildEntityClassAst(val) {
    return val.metadataKey === exports.ChildEntityMetadataKey;
}
exports.isChildEntityClassAst = isChildEntityClassAst;
class ChildEntityClassAst extends ims_decorator_1.ClassContext {
}
exports.ChildEntityClassAst = ChildEntityClassAst;

Object.defineProperty(exports, "__esModule", { value: true });
const ims_decorator_1 = require("ims-decorator");
exports.EntityMetadataKey = 'EntityMetadataKey';
exports.Entity = ims_decorator_1.makeDecorator(exports.EntityMetadataKey);
function isEntityClassAst(val) {
    return val.metadataKey === exports.EntityMetadataKey;
}
exports.isEntityClassAst = isEntityClassAst;
class EntityClassAst extends ims_decorator_1.ClassContext {
}
exports.EntityClassAst = EntityClassAst;

Object.defineProperty(exports, "__esModule", { value: true });
const ims_decorator_1 = require("ims-decorator");
exports.TableInheritanceMetadataKey = 'TableInheritanceMetadataKey';
exports.TableInheritance = ims_decorator_1.makeDecorator(exports.TableInheritanceMetadataKey);
function isTableInheritanceClassAst(val) {
    return val.metadataKey === exports.TableInheritanceMetadataKey;
}
exports.isTableInheritanceClassAst = isTableInheritanceClassAst;
class TableInheritanceClassAst extends ims_decorator_1.ClassContext {
}
exports.TableInheritanceClassAst = TableInheritanceClassAst;

Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
tslib_1.__exportStar(require("./ChildEntity"), exports);
tslib_1.__exportStar(require("./Entity"), exports);
tslib_1.__exportStar(require("./TableInheritance"), exports);

Object.defineProperty(exports, "__esModule", { value: true });
const ims_decorator_1 = require("ims-decorator");
exports.AfterInsertMetadataKey = 'AfterInsertMetadataKey';
exports.AfterInsert = () => ims_decorator_1.makeDecorator(exports.AfterInsertMetadataKey)();
class AfterInsertPropertyAst extends ims_decorator_1.PropertyContext {
}
exports.AfterInsertPropertyAst = AfterInsertPropertyAst;
function isAfterInsertPropertyAst(val) {
    return val.metadataKey === exports.AfterInsertMetadataKey;
}
exports.isAfterInsertPropertyAst = isAfterInsertPropertyAst;

Object.defineProperty(exports, "__esModule", { value: true });
const ims_decorator_1 = require("ims-decorator");
exports.AfterLoadMetadataKey = 'AfterLoadMetadataKey';
exports.AfterLoad = () => ims_decorator_1.makeDecorator(exports.AfterLoadMetadataKey)();
class AfterLoadPropertyAst extends ims_decorator_1.PropertyContext {
}
exports.AfterLoadPropertyAst = AfterLoadPropertyAst;
function isAfterLoadPropertyAst(val) {
    return val.metadataKey === exports.AfterLoadMetadataKey;
}
exports.isAfterLoadPropertyAst = isAfterLoadPropertyAst;

Object.defineProperty(exports, "__esModule", { value: true });
const ims_decorator_1 = require("ims-decorator");
exports.AfterRemoveMetadataKey = 'AfterRemoveMetadataKey';
exports.AfterRemove = () => ims_decorator_1.makeDecorator(exports.AfterRemoveMetadataKey)();
class AfterRemovePropertyAst extends ims_decorator_1.PropertyContext {
}
exports.AfterRemovePropertyAst = AfterRemovePropertyAst;
function isAfterRemovePropertyAst(val) {
    return val.metadataKey === exports.AfterRemoveMetadataKey;
}
exports.isAfterRemovePropertyAst = isAfterRemovePropertyAst;

Object.defineProperty(exports, "__esModule", { value: true });
const ims_decorator_1 = require("ims-decorator");
exports.AfterUpdateMetadataKey = 'AfterUpdateMetadataKey';
exports.AfterUpdate = () => ims_decorator_1.makeDecorator(exports.AfterUpdateMetadataKey)();
class AfterUpdatePropertyAst extends ims_decorator_1.PropertyContext {
}
exports.AfterUpdatePropertyAst = AfterUpdatePropertyAst;
function isAfterUpdatePropertyAst(val) {
    return val.metadataKey === exports.AfterUpdateMetadataKey;
}
exports.isAfterUpdatePropertyAst = isAfterUpdatePropertyAst;

Object.defineProperty(exports, "__esModule", { value: true });
const ims_decorator_1 = require("ims-decorator");
exports.BeforeInsertMetadataKey = 'BeforeInsertMetadataKey';
exports.BeforeInsert = () => ims_decorator_1.makeDecorator(exports.BeforeInsertMetadataKey)();
class BeforeInsertPropertyAst extends ims_decorator_1.PropertyContext {
}
exports.BeforeInsertPropertyAst = BeforeInsertPropertyAst;
function isBeforeInsertPropertyAst(val) {
    return val.metadataKey === exports.BeforeInsertMetadataKey;
}
exports.isBeforeInsertPropertyAst = isBeforeInsertPropertyAst;

Object.defineProperty(exports, "__esModule", { value: true });
const ims_decorator_1 = require("ims-decorator");
exports.BeforeRemoveMetadataKey = 'BeforeRemoveMetadataKey';
exports.BeforeRemove = () => ims_decorator_1.makeDecorator(exports.BeforeRemoveMetadataKey)();
class BeforeRemovePropertyAst extends ims_decorator_1.PropertyContext {
}
exports.BeforeRemovePropertyAst = BeforeRemovePropertyAst;
function isBeforeRemovePropertyAst(val) {
    return val.metadataKey === exports.BeforeRemoveMetadataKey;
}
exports.isBeforeRemovePropertyAst = isBeforeRemovePropertyAst;

Object.defineProperty(exports, "__esModule", { value: true });
const ims_decorator_1 = require("ims-decorator");
exports.BeforeUpdateMetadataKey = 'BeforeUpdateMetadataKey';
exports.BeforeUpdate = () => ims_decorator_1.makeDecorator(exports.BeforeUpdateMetadataKey)();
class BeforeUpdatePropertyAst extends ims_decorator_1.PropertyContext {
}
exports.BeforeUpdatePropertyAst = BeforeUpdatePropertyAst;
function isBeforeUpdatePropertyAst(val) {
    return val.metadataKey === exports.BeforeUpdateMetadataKey;
}
exports.isBeforeUpdatePropertyAst = isBeforeUpdatePropertyAst;

Object.defineProperty(exports, "__esModule", { value: true });
const ims_decorator_1 = require("ims-decorator");
exports.EventSubscriberMetadataKey = 'EventSubscriberMetadataKey';
exports.EventSubscriber = () => ims_decorator_1.makeDecorator(exports.EventSubscriberMetadataKey)();
function isEventSubscriberClassAst(val) {
    return val.metadataKey === exports.EventSubscriberMetadataKey;
}
exports.isEventSubscriberClassAst = isEventSubscriberClassAst;
class EventSubscriberClassAst extends ims_decorator_1.ClassContext {
}
exports.EventSubscriberClassAst = EventSubscriberClassAst;

Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
tslib_1.__exportStar(require("./AfterInsert"), exports);
tslib_1.__exportStar(require("./AfterLoad"), exports);
tslib_1.__exportStar(require("./AfterRemove"), exports);
tslib_1.__exportStar(require("./AfterUpdate"), exports);
tslib_1.__exportStar(require("./BeforeInsert"), exports);
tslib_1.__exportStar(require("./BeforeRemove"), exports);
tslib_1.__exportStar(require("./BeforeUpdate"), exports);
tslib_1.__exportStar(require("./EventSubscriber"), exports);

Object.defineProperty(exports, "__esModule", { value: true });
const ims_decorator_1 = require("ims-decorator");
;
exports.CheckMetadataKey = 'CheckMetadataKey';
exports.Check = (expression) => ims_decorator_1.makeDecorator(exports.CheckMetadataKey)({
    expression
});
class CheckPropertyAst extends ims_decorator_1.PropertyContext {
}
exports.CheckPropertyAst = CheckPropertyAst;
function isCheckPropertyAst(val) {
    return val.metadataKey === exports.CheckMetadataKey;
}
exports.isCheckPropertyAst = isCheckPropertyAst;

Object.defineProperty(exports, "__esModule", { value: true });
const ims_decorator_1 = require("ims-decorator");
;
exports.EntityRepositoryMetadataKey = 'EntityRepositoryMetadataKey';
exports.EntityRepository = (entity) => ims_decorator_1.makeDecorator(exports.EntityRepositoryMetadataKey)({
    entity
});
function isEntityRepositoryPropertyAst(val) {
    return val.metadataKey === exports.EntityRepositoryMetadataKey;
}
exports.isEntityRepositoryPropertyAst = isEntityRepositoryPropertyAst;
class EntityRepositoryPropertyAst extends ims_decorator_1.PropertyContext {
}
exports.EntityRepositoryPropertyAst = EntityRepositoryPropertyAst;

Object.defineProperty(exports, "__esModule", { value: true });
const ims_decorator_1 = require("ims-decorator");
;
exports.ExclusionMetadataKey = 'ExclusionMetadataKey';
exports.Exclusion = (expression) => ims_decorator_1.makeDecorator(exports.ExclusionMetadataKey)({
    expression
});
class ExclusionPropertyAst extends ims_decorator_1.PropertyContext {
}
exports.ExclusionPropertyAst = ExclusionPropertyAst;
function isExclusionPropertyAst(val) {
    return val.metadataKey === exports.ExclusionMetadataKey;
}
exports.isExclusionPropertyAst = isExclusionPropertyAst;

Object.defineProperty(exports, "__esModule", { value: true });
const ims_decorator_1 = require("ims-decorator");
exports.GeneratedMetadataKey = 'GeneratedMetadataKey';
exports.Generated = (strategy) => ims_decorator_1.makeDecorator(exports.GeneratedMetadataKey)({
    strategy
});
class GeneratedPropertyAst extends ims_decorator_1.PropertyContext {
}
exports.GeneratedPropertyAst = GeneratedPropertyAst;
function isGeneratedPropertyAst(val) {
    return val.metadataKey === exports.GeneratedMetadataKey;
}
exports.isGeneratedPropertyAst = isGeneratedPropertyAst;

Object.defineProperty(exports, "__esModule", { value: true });
const ims_decorator_1 = require("ims-decorator");
exports.IndexMetadataKey = 'IndexMetadataKey';
exports.Index = ims_decorator_1.makeDecorator(exports.IndexMetadataKey);
class IndexPropertyAst extends ims_decorator_1.PropertyContext {
}
exports.IndexPropertyAst = IndexPropertyAst;
function isIndexPropertyAst(val) {
    return val.metadataKey === exports.IndexMetadataKey;
}
exports.isIndexPropertyAst = isIndexPropertyAst;

Object.defineProperty(exports, "__esModule", { value: true });
const ims_decorator_1 = require("ims-decorator");
exports.UniqueMetadataKey = 'UniqueMetadataKey';
function Unique(name, fields) {
    if (typeof name === 'function') {
        fields = name;
        name = null;
    }
    else if (Array.isArray(name)) {
        fields = name;
        name = null;
    }
    return ims_decorator_1.makeDecorator(exports.UniqueMetadataKey)({
        name, fields
    });
}
exports.Unique = Unique;
class UniquePropertyAst extends ims_decorator_1.PropertyContext {
}
exports.UniquePropertyAst = UniquePropertyAst;
function isUniquePropertyAst(val) {
    return val.metadataKey === exports.UniqueMetadataKey;
}
exports.isUniquePropertyAst = isUniquePropertyAst;

Object.defineProperty(exports, "__esModule", { value: true });
const ims_decorator_1 = require("ims-decorator");
exports.TransactionMetadataKey = 'TransactionMetadataKey';
function Transaction(options) {
    return ims_decorator_1.makeDecorator(exports.TransactionMetadataKey)({
        options
    });
}
exports.Transaction = Transaction;
function isTransactionMethodAst(val) {
    return val.metadataKey === exports.TransactionMetadataKey;
}
exports.isTransactionMethodAst = isTransactionMethodAst;
class TransactionMethodAst extends ims_decorator_1.MethodContext {
}
exports.TransactionMethodAst = TransactionMethodAst;

Object.defineProperty(exports, "__esModule", { value: true });
const ims_decorator_1 = require("ims-decorator");
exports.TransactionManagerMetadataKey = 'TransactionManagerMetadataKey';
exports.TransactionManager = () => ims_decorator_1.makeDecorator(exports.TransactionManagerMetadataKey)();
function isTransactionManagerParameterAst(val) {
    return val.metadataKey === exports.TransactionManagerMetadataKey;
}
exports.isTransactionManagerParameterAst = isTransactionManagerParameterAst;
class TransactionManagerParameterAst extends ims_decorator_1.ParameterContext {
}
exports.TransactionManagerParameterAst = TransactionManagerParameterAst;

Object.defineProperty(exports, "__esModule", { value: true });
const ims_decorator_1 = require("ims-decorator");
exports.TransactionRepositoryMetadataKey = 'TransactionRepositoryMetadataKey';
exports.TransactionRepository = (entityType) => ims_decorator_1.makeDecorator(exports.TransactionRepositoryMetadataKey)({
    entityType
});
function isTransactionRepositoryParameterAst(val) {
    return val.metadataKey === exports.TransactionRepositoryMetadataKey;
}
exports.isTransactionRepositoryParameterAst = isTransactionRepositoryParameterAst;
class TransactionRepositoryParameterAst extends ims_decorator_1.ParameterContext {
}
exports.TransactionRepositoryParameterAst = TransactionRepositoryParameterAst;

Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
tslib_1.__exportStar(require("./Transaction"), exports);
tslib_1.__exportStar(require("./TransactionManager"), exports);
tslib_1.__exportStar(require("./TransactionRepository"), exports);

Object.defineProperty(exports, "__esModule", { value: true });
const ims_decorator_1 = require("ims-decorator");
exports.JoinColumnMetadataKey = 'JoinColumnMetadataKey';
function JoinColumn(options) {
    return ims_decorator_1.makeDecorator(exports.JoinColumnMetadataKey)({
        options
    });
}
exports.JoinColumn = JoinColumn;
function isJoinColumnPropertyAst(val) {
    return val.metadataKey === exports.JoinColumnMetadataKey;
}
exports.isJoinColumnPropertyAst = isJoinColumnPropertyAst;
class JoinColumnPropertyAst extends ims_decorator_1.PropertyContext {
}
exports.JoinColumnPropertyAst = JoinColumnPropertyAst;

Object.defineProperty(exports, "__esModule", { value: true });
const ims_decorator_1 = require("ims-decorator");
exports.JoinTableMetadataKey = 'JoinTableMetadataKey';
function JoinTable(options) {
    return ims_decorator_1.makeDecorator(exports.JoinTableMetadataKey)({ options });
}
exports.JoinTable = JoinTable;
function isJoinTablePropertyAst(val) {
    return val.metadataKey === exports.JoinTableMetadataKey;
}
exports.isJoinTablePropertyAst = isJoinTablePropertyAst;
class JoinTablePropertyAst extends ims_decorator_1.PropertyContext {
}
exports.JoinTablePropertyAst = JoinTablePropertyAst;

Object.defineProperty(exports, "__esModule", { value: true });
const ims_decorator_1 = require("ims-decorator");
exports.ManyToManyMetadataKey = 'ManyToManyMetadataKey';
function ManyToMany(typeFunction, inverseSide, options) {
    const decorator = ims_decorator_1.makeDecorator(exports.ManyToManyMetadataKey);
    if (options) {
        return decorator({
            typeFunction,
            options,
            inverseSide
        });
    }
    else {
        return decorator({
            typeFunction,
            options: inverseSide
        });
    }
}
exports.ManyToMany = ManyToMany;
function isManyToManyPropertyAst(val) {
    return val.metadataKey === exports.ManyToManyMetadataKey;
}
exports.isManyToManyPropertyAst = isManyToManyPropertyAst;
class ManyToManyPropertyAst extends ims_decorator_1.PropertyContext {
}
exports.ManyToManyPropertyAst = ManyToManyPropertyAst;

Object.defineProperty(exports, "__esModule", { value: true });
const ims_decorator_1 = require("ims-decorator");
exports.ManyToOneMetadataKey = 'ManyToOneMetadataKey';
const factory = ims_decorator_1.makeDecorator(exports.ManyToOneMetadataKey);
function ManyToOne(typeFunction, inverseSide, options) {
    const decorator = ims_decorator_1.makeDecorator(exports.ManyToOneMetadataKey);
    if (options) {
        return decorator({
            typeFunction,
            options,
            inverseSide
        });
    }
    else {
        return decorator({
            typeFunction,
            options: inverseSide
        });
    }
}
exports.ManyToOne = ManyToOne;
function isManyToOnePropertyAst(val) {
    return val.metadataKey === exports.ManyToOneMetadataKey;
}
exports.isManyToOnePropertyAst = isManyToOnePropertyAst;
class ManyToOnePropertyAst extends ims_decorator_1.PropertyContext {
}
exports.ManyToOnePropertyAst = ManyToOnePropertyAst;

Object.defineProperty(exports, "__esModule", { value: true });
const ims_decorator_1 = require("ims-decorator");
exports.OneToManyMetadataKey = 'OneToManyMetadataKey';
const factory = ims_decorator_1.makeDecorator(exports.OneToManyMetadataKey);
exports.OneToMany = (typeFunction, inverseSide, options) => {
    const opt = {
        typeFunction,
        inverseSide,
        options
    };
    return factory(opt);
};
function isOneToManyPropertyAst(val) {
    return val.metadataKey === exports.OneToManyMetadataKey;
}
exports.isOneToManyPropertyAst = isOneToManyPropertyAst;
class OneToManyPropertyAst extends ims_decorator_1.PropertyContext {
}
exports.OneToManyPropertyAst = OneToManyPropertyAst;

Object.defineProperty(exports, "__esModule", { value: true });
const ims_decorator_1 = require("ims-decorator");
exports.OneToOneMetadataKey = 'OneToOneMetadataKey';
function OneToOne(typeFunction, inverseSide, options) {
    const decorator = ims_decorator_1.makeDecorator(exports.OneToOneMetadataKey);
    if (options) {
        return decorator({
            typeFunction,
            options,
            inverseSide
        });
    }
    else {
        return decorator({
            typeFunction,
            options: inverseSide
        });
    }
}
exports.OneToOne = OneToOne;
function isOneToOnePropertyAst(val) {
    return val.metadataKey === exports.OneToOneMetadataKey;
}
exports.isOneToOnePropertyAst = isOneToOnePropertyAst;
class OneToOnePropertyAst extends ims_decorator_1.PropertyContext {
}
exports.OneToOnePropertyAst = OneToOnePropertyAst;

Object.defineProperty(exports, "__esModule", { value: true });
const ims_decorator_1 = require("ims-decorator");
exports.RelationCountMetadataKey = 'RelationCountMetadataKey';
exports.RelationCount = (relation, alias, queryBuilderFactory) => ims_decorator_1.makeDecorator(exports.RelationCountMetadataKey)({
    relation, alias, queryBuilderFactory
});
function isRelationCountPropertyAst(val) {
    return val.metadataKey === exports.RelationCountMetadataKey;
}
exports.isRelationCountPropertyAst = isRelationCountPropertyAst;
class RelationCountPropertyAst extends ims_decorator_1.PropertyContext {
}
exports.RelationCountPropertyAst = RelationCountPropertyAst;

Object.defineProperty(exports, "__esModule", { value: true });
const ims_decorator_1 = require("ims-decorator");
exports.RelationIdMetadataKey = 'RelationIdMetadataKey';
exports.RelationId = (relation, alias, queryBuilderFactory) => ims_decorator_1.makeDecorator(exports.RelationIdMetadataKey)({
    relation,
    alias,
    queryBuilderFactory
});
function isRelationIdPropertyAst(val) {
    return val.metadataKey === exports.RelationIdMetadataKey;
}
exports.isRelationIdPropertyAst = isRelationIdPropertyAst;
class RelationIdPropertyAst extends ims_decorator_1.PropertyContext {
}
exports.RelationIdPropertyAst = RelationIdPropertyAst;

Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
tslib_1.__exportStar(require("./JoinColumn"), exports);
tslib_1.__exportStar(require("./JoinTable"), exports);
tslib_1.__exportStar(require("./ManyToMany"), exports);
tslib_1.__exportStar(require("./ManyToOne"), exports);
tslib_1.__exportStar(require("./OneToMany"), exports);
tslib_1.__exportStar(require("./OneToOne"), exports);
tslib_1.__exportStar(require("./RelationCount"), exports);
tslib_1.__exportStar(require("./RelationId"), exports);

Object.defineProperty(exports, "__esModule", { value: true });
const ims_decorator_1 = require("ims-decorator");
exports.TreeMetadataKey = 'TreeMetadataKey';
exports.Tree = (type) => ims_decorator_1.makeDecorator(exports.TreeMetadataKey)({
    type
});
function isTreeClassAst(val) {
    return val.metadataKey === exports.TreeMetadataKey;
}
exports.isTreeClassAst = isTreeClassAst;
class TreeClassAst extends ims_decorator_1.ClassContext {
}
exports.TreeClassAst = TreeClassAst;

Object.defineProperty(exports, "__esModule", { value: true });
const ims_decorator_1 = require("ims-decorator");
exports.TreeChildrenMetadataKey = 'TreeChildrenMetadataKey';
exports.TreeChildren = ims_decorator_1.makeDecorator(exports.TreeChildrenMetadataKey);
function isTreeChildrenPropertyAst(val) {
    return val.metadataKey === exports.TreeChildrenMetadataKey;
}
exports.isTreeChildrenPropertyAst = isTreeChildrenPropertyAst;
class TreeChildrenPropertyAst extends ims_decorator_1.PropertyContext {
}
exports.TreeChildrenPropertyAst = TreeChildrenPropertyAst;

Object.defineProperty(exports, "__esModule", { value: true });
const ims_decorator_1 = require("ims-decorator");
exports.TreeLevelColumnMetadataKey = 'TreeLevelColumnMetadataKey';
exports.TreeLevelColumn = () => ims_decorator_1.makeDecorator(exports.TreeLevelColumnMetadataKey)();
function isTreeLevelColumnPropertyAst(val) {
    return val.metadataKey === exports.TreeLevelColumnMetadataKey;
}
exports.isTreeLevelColumnPropertyAst = isTreeLevelColumnPropertyAst;
class TreeLevelColumnPropertyAst extends ims_decorator_1.PropertyContext {
}
exports.TreeLevelColumnPropertyAst = TreeLevelColumnPropertyAst;

Object.defineProperty(exports, "__esModule", { value: true });
const ims_decorator_1 = require("ims-decorator");
exports.TreeParentMetadataKey = 'TreeParentMetadataKey';
exports.TreeParent = () => ims_decorator_1.makeDecorator(exports.TreeParentMetadataKey)();
function isTreeParentPropertyAst(val) {
    return val.metadataKey === exports.TreeParentMetadataKey;
}
exports.isTreeParentPropertyAst = isTreeParentPropertyAst;
class TreeParentPropertyAst extends ims_decorator_1.PropertyContext {
}
exports.TreeParentPropertyAst = TreeParentPropertyAst;

Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
tslib_1.__exportStar(require("./Tree"), exports);
tslib_1.__exportStar(require("./TreeChildren"), exports);
tslib_1.__exportStar(require("./TreeLevelColumn"), exports);
tslib_1.__exportStar(require("./TreeParent"), exports);
