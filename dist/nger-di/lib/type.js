"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isType(val) {
    return typeof val === 'function';
}
exports.isType = isType;
// static 一共5个Provider 谢了4个is函数 剩余的哪一个是ConstructorProvider
function isValueProvider(val) {
    return !!val.useValue;
}
exports.isValueProvider = isValueProvider;
function isExistingProvider(val) {
    return !!val.useExisting;
}
exports.isExistingProvider = isExistingProvider;
function isStaticClassProvider(val) {
    return !!val.useClass;
}
exports.isStaticClassProvider = isStaticClassProvider;
function isFactoryProvider(val) {
    return !!val.useFactory;
}
exports.isFactoryProvider = isFactoryProvider;
// provider 一共6个
// TypeProvider 
function isTypeProvider(val) {
    return typeof val === 'function';
}
exports.isTypeProvider = isTypeProvider;
// ClassProvider 
function isClassProvider(val) {
    return !!val.useClass;
}
exports.isClassProvider = isClassProvider;
var InjectFlags;
(function (InjectFlags) {
    // TODO(alxhub): make this 'const' when ngc no longer writes exports of it into ngfactory files.
    /** Check self and check parent injector if needed */
    InjectFlags[InjectFlags["Default"] = 0] = "Default";
    /**
     * Specifies that an injector should retrieve a dependency from any injector until reaching the
     * host element of the current component. (Only used with Element Injector)
     */
    InjectFlags[InjectFlags["Host"] = 1] = "Host";
    /** Don't ascend to ancestors of the node requesting injection. */
    InjectFlags[InjectFlags["Self"] = 2] = "Self";
    /** Skip the node that is requesting injection. */
    InjectFlags[InjectFlags["SkipSelf"] = 4] = "SkipSelf";
    /** Inject `defaultValue` instead if token not found. */
    InjectFlags[InjectFlags["Optional"] = 8] = "Optional";
})(InjectFlags = exports.InjectFlags || (exports.InjectFlags = {}));
var OptionFlags;
(function (OptionFlags) {
    OptionFlags[OptionFlags["Optional"] = 1] = "Optional";
    OptionFlags[OptionFlags["CheckSelf"] = 2] = "CheckSelf";
    OptionFlags[OptionFlags["CheckParent"] = 4] = "CheckParent";
    OptionFlags[OptionFlags["Default"] = 6] = "Default";
})(OptionFlags = exports.OptionFlags || (exports.OptionFlags = {}));
