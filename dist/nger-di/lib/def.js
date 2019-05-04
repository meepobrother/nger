"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("./util");
function ɵɵdefineInjectable(opts) {
    return {
        providedIn: opts.providedIn || null, factory: opts.factory, value: undefined,
    };
}
exports.ɵɵdefineInjectable = ɵɵdefineInjectable;
exports.defineInjectable = ɵɵdefineInjectable;
function ɵɵdefineInjector(options) {
    return {
        factory: options.factory, providers: options.providers || [], imports: options.imports || [],
    };
}
exports.ɵɵdefineInjector = ɵɵdefineInjector;
function getInjectableDef(type) {
    return type && type.hasOwnProperty(exports.NG_INJECTABLE_DEF) ? type[exports.NG_INJECTABLE_DEF] : null;
}
exports.getInjectableDef = getInjectableDef;
function getInjectorDef(type) {
    return type && type.hasOwnProperty(exports.NG_INJECTOR_DEF) ? type[exports.NG_INJECTOR_DEF] : null;
}
exports.getInjectorDef = getInjectorDef;
exports.NG_INJECTABLE_DEF = util_1.getClosureSafeProperty({ ngInjectableDef: util_1.getClosureSafeProperty });
exports.NG_INJECTOR_DEF = util_1.getClosureSafeProperty({ ngInjectorDef: util_1.getClosureSafeProperty });
