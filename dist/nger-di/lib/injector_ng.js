"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const type_1 = require("./type");
const util_1 = require("./util");
const injection_token_1 = require("./injection_token");
const injector_compatibility_1 = require("./injector_compatibility");
const def_1 = require("./def");
// import { Inject, Optional, Self, SkipSelf } from './metadata';
exports.SOURCE = '__source';
const _THROW_IF_NOT_FOUND = Symbol.for(`_THROW_IF_NOT_FOUND`);
exports.THROW_IF_NOT_FOUND = _THROW_IF_NOT_FOUND;
exports.INJECTOR = new injection_token_1.InjectionToken('INJECTOR', -1 // `-1` is used by Ivy DI system as special value to recognize it as `Injector`.
);
class NullInjector {
    get(token, notFoundValue = _THROW_IF_NOT_FOUND) {
        if (notFoundValue === _THROW_IF_NOT_FOUND) {
            const error = new Error(`NullInjectorError: No provider for ${util_1.stringify(token)}!`);
            error.name = 'NullInjectorError';
            throw error;
        }
        return notFoundValue;
    }
    clearCache(token) { }
    create(records, source) {
        return new NullInjector();
    }
    setStatic(records) { }
}
exports.NullInjector = NullInjector;
/**
 * Concrete injectors implement this interface.
 *
 * For more details, see the ["Dependency Injection Guide"](guide/dependency-injection).
 *
 * @usageNotes
 * ### Example
 *
 * {@example core/di/ts/injector_spec.ts region='Injector'}
 *
 * `Injector` returns itself when given `Injector` as a token:
 *
 * {@example core/di/ts/injector_spec.ts region='injectInjector'}
 *
 * @publicApi
 */
class Injector {
    static create(options, parent) {
        if (Array.isArray(options)) {
            return new StaticInjector(options, parent);
        }
        else {
            return new StaticInjector(options.providers, options.parent, options.name || null);
        }
    }
}
Injector.THROW_IF_NOT_FOUND = _THROW_IF_NOT_FOUND;
Injector.NULL = new NullInjector();
/** @nocollapse */
Injector.ngInjectableDef = def_1.ɵɵdefineInjectable({
    providedIn: 'any',
    factory: () => injector_compatibility_1.ɵɵinject(exports.INJECTOR),
});
/**
 * @internal
 * @nocollapse
 */
Injector.__NG_ELEMENT_ID__ = -1;
exports.Injector = Injector;
const IDENT = function (value) {
    return value;
};
const EMPTY = [];
const CIRCULAR = IDENT;
const MULTI_PROVIDER_FN = function () {
    return Array.prototype.slice.call(arguments);
};
exports.USE_VALUE = util_1.getClosureSafeProperty({ provide: String, useValue: util_1.getClosureSafeProperty });
const NG_TOKEN_PATH = 'ngTokenPath';
exports.NG_TEMP_TOKEN_PATH = 'ngTempTokenPath';
const NULL_INJECTOR = Injector.NULL;
const NEW_LINE = /\n/gm;
const NO_NEW_LINE = 'ɵ';
class StaticInjector {
    constructor(providers, parent = NULL_INJECTOR, source = null) {
        this.parent = parent;
        this.source = source;
        const records = this._records = new Map();
        records.set(Injector, { token: Injector, fn: IDENT, deps: EMPTY, value: this, useNew: false });
        records.set(exports.INJECTOR, { token: exports.INJECTOR, fn: IDENT, deps: EMPTY, value: this, useNew: false });
        recursivelyProcessProviders(records, providers);
    }
    clearCache(token) {
        const record = this._records.get(token);
        if (record)
            record.value = null;
    }
    debug() {
        this._records.forEach((item, key) => {
            if (Array.isArray(item)) {
                console.debug(`injector:multi:${this.source} ${key.name} registed ${item.length}`);
            }
            else {
                console.debug(`injector:${this.source} ${(key && key.name) || ''} registed, Dependeny: ${util_1.stringify(item.deps.map(dep => dep.token))}`);
            }
        });
    }
    get(token, notFoundValue, flags = type_1.InjectFlags.Default) {
        const record = this._records.get(token);
        try {
            return tryResolveToken(token, record, this._records, this.parent, notFoundValue, flags);
        }
        catch (e) {
            return catchInjectorError(e, token, 'StaticInjectorError', this.source);
        }
    }
    create(records, source = null) {
        return new StaticInjector(records, this, source);
    }
    setStatic(records) {
        recursivelyProcessProviders(this._records, records);
    }
    toString() {
        const tokens = [], records = this._records;
        records.forEach((v, token) => tokens.push(util_1.stringify(token)));
        return `StaticInjector[${tokens.join(', ')}]`;
    }
}
exports.StaticInjector = StaticInjector;
function resolveProvider(provider) {
    const deps = computeDeps(provider);
    let fn = IDENT;
    let value = EMPTY;
    let useNew = false;
    let provide = util_1.resolveForwardRef(provider.provide);
    if (exports.USE_VALUE in provider) {
        // We need to use USE_VALUE in provider since provider.useValue could be defined as undefined.
        value = provider.useValue;
    }
    else if (provider.useFactory) {
        fn = provider.useFactory;
    }
    else if (provider.useExisting) {
        // Just use IDENT
    }
    else if (provider.useClass) {
        useNew = true;
        fn = util_1.resolveForwardRef(provider.useClass);
    }
    else if (typeof provide == 'function') {
        useNew = true;
        fn = provide;
    }
    else {
        throw staticError('StaticProvider does not have [useValue|useFactory|useExisting|useClass] or [provide] is not newable', provider);
    }
    return { deps, fn, useNew, value };
}
function multiProviderMixError(token) {
    return staticError('Cannot mix multi providers and regular providers', token);
}
function recursivelyProcessProviders(records, provider) {
    if (provider) {
        provider = util_1.resolveForwardRef(provider);
        if (provider instanceof Array) {
            // if we have an array recurse into the array
            for (let i = 0; i < provider.length; i++) {
                recursivelyProcessProviders(records, provider[i]);
            }
        }
        else if (typeof provider === 'function') {
            // Functions were supported in ReflectiveInjector, but are not here. For safety give useful
            // error messages
            throw staticError('Function/Class not supported', provider);
        }
        else if (provider && typeof provider === 'object' && provider.provide) {
            // At this point we have what looks like a provider: {provide: ?, ....}
            let token = util_1.resolveForwardRef(provider.provide);
            const resolvedProvider = resolveProvider(provider);
            if (provider.multi === true) {
                // This is a multi provider.
                let multiProvider = records.get(token);
                if (multiProvider) {
                    if (multiProvider.fn !== MULTI_PROVIDER_FN) {
                        throw multiProviderMixError(token);
                    }
                }
                else {
                    // Create a placeholder factory which will look up the constituents of the multi provider.
                    records.set(token, multiProvider = {
                        token: provider.provide,
                        deps: [],
                        useNew: false,
                        fn: MULTI_PROVIDER_FN,
                        value: EMPTY
                    });
                }
                // Treat the provider as the token.
                token = provider;
                multiProvider.deps.push({ token, options: type_1.OptionFlags.Default });
            }
            const record = records.get(token);
            if (record && record.fn == MULTI_PROVIDER_FN) {
                throw multiProviderMixError(token);
            }
            records.set(token, resolvedProvider);
        }
        else {
            throw staticError('Unexpected provider', provider);
        }
    }
}
function tryResolveToken(token, record, records, parent, notFoundValue, flags) {
    try {
        return resolveToken(token, record, records, parent, notFoundValue, flags);
    }
    catch (e) {
        // ensure that 'e' is of type Error.
        if (!(e instanceof Error)) {
            e = new Error(e);
        }
        const path = e[exports.NG_TEMP_TOKEN_PATH] = e[exports.NG_TEMP_TOKEN_PATH] || [];
        path.unshift(token);
        if (record && record.value == CIRCULAR) {
            // Reset the Circular flag.
            record.value = EMPTY;
        }
        throw e;
    }
}
function resolveToken(token, record, records, parent, notFoundValue, flags) {
    let value;
    if (record && !(flags & type_1.InjectFlags.SkipSelf)) {
        // If we don't have a record, this implies that we don't own the provider hence don't know how
        // to resolve it.
        value = record.value;
        if (value == CIRCULAR) {
            throw Error(NO_NEW_LINE + 'Circular dependency');
        }
        else if (value === EMPTY) {
            record.value = CIRCULAR;
            let obj = undefined;
            let useNew = record.useNew;
            let fn = record.fn;
            let depRecords = record.deps;
            let deps = EMPTY;
            if (depRecords.length) {
                deps = [];
                for (let i = 0; i < depRecords.length; i++) {
                    const depRecord = depRecords[i];
                    const options = depRecord.options;
                    const childRecord = options & type_1.OptionFlags.CheckSelf ? records.get(depRecord.token) : undefined;
                    deps.push(tryResolveToken(
                    // Current Token to resolve
                    depRecord.token, 
                    // A record which describes how to resolve the token.
                    // If undefined, this means we don't have such a record
                    childRecord, 
                    // Other records we know about.
                    records, 
                    // If we don't know how to resolve dependency and we should not check parent for it,
                    // than pass in Null injector.
                    !childRecord && !(options & type_1.OptionFlags.CheckParent) ? NULL_INJECTOR : parent, options & type_1.OptionFlags.Optional ? null : Injector.THROW_IF_NOT_FOUND, type_1.InjectFlags.Default));
                }
            }
            record.value = value = useNew ? new fn(...deps) : fn.apply(obj, deps);
        }
    }
    else if (!(flags & type_1.InjectFlags.Self)) {
        value = parent.get(token, notFoundValue, type_1.InjectFlags.Default);
    }
    return value;
}
function computeDeps(provider) {
    let deps = EMPTY;
    const providerDeps = provider.deps;
    if (providerDeps && providerDeps.length) {
        deps = [];
        for (let i = 0; i < providerDeps.length; i++) {
            let options = type_1.OptionFlags.Default;
            let token = util_1.resolveForwardRef(providerDeps[i]);
            if (token instanceof Array) {
                for (let j = 0, annotations = token; j < annotations.length; j++) {
                    const annotation = annotations[j];
                    if (annotation === type_1.InjectFlags.Optional) {
                        options = options | type_1.OptionFlags.Optional;
                    }
                    else if (annotation === type_1.InjectFlags.SkipSelf) {
                        options = options & ~type_1.OptionFlags.CheckSelf;
                    }
                    else if (annotation === type_1.InjectFlags.Self) {
                        options = options & ~type_1.OptionFlags.CheckParent;
                    }
                    else {
                        token = util_1.resolveForwardRef(annotation);
                    }
                }
            }
            deps.push({ token, options });
        }
    }
    else if (provider.useExisting) {
        const token = util_1.resolveForwardRef(provider.useExisting);
        deps = [{ token, options: type_1.OptionFlags.Default }];
    }
    else if (!providerDeps && !(exports.USE_VALUE in provider)) {
        // useValue & useExisting are the only ones which are exempt from deps all others need it.
        throw staticError('\'deps\' required', provider);
    }
    return deps;
}
function catchInjectorError(e, token, injectorErrorName, source) {
    const tokenPath = e[exports.NG_TEMP_TOKEN_PATH];
    if (token[exports.SOURCE]) {
        tokenPath.unshift(token[exports.SOURCE]);
    }
    e.message = formatError('\n' + e.message, tokenPath, injectorErrorName, source);
    e[NG_TOKEN_PATH] = tokenPath;
    e[exports.NG_TEMP_TOKEN_PATH] = null;
    throw e;
}
exports.catchInjectorError = catchInjectorError;
function formatError(text, obj, injectorErrorName, source = null) {
    text = text && text.charAt(0) === '\n' && text.charAt(1) == NO_NEW_LINE ? text.substr(2) : text;
    let context = util_1.stringify(obj);
    if (obj instanceof Array) {
        context = obj.map(util_1.stringify).join(' -> ');
    }
    else if (typeof obj === 'object') {
        let parts = [];
        for (let key in obj) {
            if (obj.hasOwnProperty(key)) {
                let value = obj[key];
                parts.push(key + ':' + (typeof value === 'string' ? JSON.stringify(value) : util_1.stringify(value)));
            }
        }
        context = `{${parts.join(', ')}}`;
    }
    return `${injectorErrorName}${source ? '(' + source + ')' : ''}[${context}]: ${text.replace(NEW_LINE, '\n  ')}`;
}
function staticError(text, obj) {
    return new Error(formatError(text, obj, 'StaticInjectorError'));
}
