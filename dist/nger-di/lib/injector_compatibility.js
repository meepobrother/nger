"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const type_1 = require("./type");
const util_1 = require("./util");
const def_1 = require("./def");
let _currentInjector = undefined;
function setCurrentInjector(injector) {
    const former = _currentInjector;
    _currentInjector = injector;
    return former;
}
exports.setCurrentInjector = setCurrentInjector;
let _injectImplementation;
function setInjectImplementation(impl) {
    const previous = _injectImplementation;
    _injectImplementation = impl;
    return previous;
}
exports.setInjectImplementation = setInjectImplementation;
function injectInjectorOnly(token, flags = type_1.InjectFlags.Default) {
    if (_currentInjector === undefined) {
        throw new Error(`inject() must be called from an injection context`);
    }
    else if (_currentInjector === null) {
        return injectRootLimpMode(token, undefined, flags);
    }
    else {
        return _currentInjector.get(token, flags & type_1.InjectFlags.Optional ? null : undefined, flags);
    }
}
exports.injectInjectorOnly = injectInjectorOnly;
function ɵɵinject(token, flags = type_1.InjectFlags.Default) {
    return (_injectImplementation || injectInjectorOnly)(token, flags);
}
exports.ɵɵinject = ɵɵinject;
/**
 * @deprecated in v8, delete after v10. This API should be used only be generated code, and that
 * code should now use ɵɵinject instead.
 * @publicApi
 */
exports.inject = ɵɵinject;
/**
 * Injects `root` tokens in limp mode.
 *
 * If no injector exists, we can still inject tree-shakable providers which have `providedIn` set to
 * `"root"`. This is known as the limp mode injection. In such case the value is stored in the
 * `InjectableDef`.
 */
function injectRootLimpMode(token, notFoundValue, flags) {
    const injectableDef = def_1.getInjectableDef(token);
    if (injectableDef && injectableDef.providedIn == 'root') {
        return injectableDef.value === undefined ? injectableDef.value = injectableDef.factory() :
            injectableDef.value;
    }
    if (flags & type_1.InjectFlags.Optional)
        return null;
    if (notFoundValue !== undefined)
        return notFoundValue;
    throw new Error(`Injector: NOT_FOUND [${util_1.stringify(token)}]`);
}
exports.injectRootLimpMode = injectRootLimpMode;
function injectArgs(types) {
    const args = [];
    for (let i = 0; i < types.length; i++) {
        const arg = types[i];
        if (Array.isArray(arg)) {
            if (arg.length === 0) {
                throw new Error('Arguments array must have arguments.');
            }
            let type = undefined;
            let flags = type_1.InjectFlags.Default;
            for (let j = 0; j < arg.length; j++) {
                const meta = arg[j];
                if (meta === type_1.InjectFlags.Optional) {
                    flags |= type_1.InjectFlags.Optional;
                }
                else if (meta === type_1.InjectFlags.SkipSelf) {
                    flags |= type_1.InjectFlags.SkipSelf;
                }
                else if (meta === type_1.InjectFlags.Self) {
                    flags |= type_1.InjectFlags.Self;
                }
                else {
                    type = meta;
                }
            }
            args.push(ɵɵinject(type, flags));
        }
        else {
            args.push(ɵɵinject(arg));
        }
    }
    return args;
}
exports.injectArgs = injectArgs;
