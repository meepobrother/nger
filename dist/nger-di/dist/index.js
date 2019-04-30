Object.defineProperty(exports, "__esModule", { value: true });
const lib_1 = require("../lib");
// CheckParent = 0;Optional = 0;
function isCheckSelf(options) {
    return options & lib_1.OptionFlags.CheckSelf;
}
exports.isCheckSelf = isCheckSelf;
// CheckSelf = 0; Optional = 0;
function isCheckParent(options) {
    return options & lib_1.OptionFlags.CheckParent;
}
exports.isCheckParent = isCheckParent;
// Optional = 0;
function isDefault(options) {
    return options & lib_1.OptionFlags.Default;
}
exports.isDefault = isDefault;
// CheckParent =0;CheckSelf=0;Default=0;
function isOptional(options) {
    return options & lib_1.OptionFlags.Optional;
}
exports.isOptional = isOptional;
const chai_1 = require("chai");
describe(`flags`, () => {
    it(`CheckSelf 当CheckParent和Optional为0，其余不为0`, () => {
        // 当CheckParent和Optional 为0
        chai_1.expect(lib_1.OptionFlags.Optional & lib_1.OptionFlags.CheckSelf).to.eq(0);
        chai_1.expect(lib_1.OptionFlags.CheckParent & lib_1.OptionFlags.CheckSelf).to.eq(0);
        chai_1.expect(lib_1.OptionFlags.CheckSelf & lib_1.OptionFlags.CheckSelf).to.not.eq(0);
        chai_1.expect(lib_1.OptionFlags.Default & lib_1.OptionFlags.CheckSelf).to.not.eq(0);
    });
    it(`CheckParent 当CheckSelf和Optional为0，其余不为0`, () => {
        chai_1.expect(lib_1.OptionFlags.CheckSelf & lib_1.OptionFlags.CheckParent).to.eq(0);
        chai_1.expect(lib_1.OptionFlags.Optional & lib_1.OptionFlags.CheckParent).to.eq(0);
        chai_1.expect(lib_1.OptionFlags.CheckParent & lib_1.OptionFlags.CheckParent).to.not.eq(0);
        chai_1.expect(lib_1.OptionFlags.Default & lib_1.OptionFlags.CheckParent).to.not.eq(0);
    });
    it(`Default 当Optional为0，其余不为0`, () => {
        chai_1.expect(lib_1.OptionFlags.Optional & lib_1.OptionFlags.Default).to.eq(0);
        chai_1.expect(lib_1.OptionFlags.CheckSelf & lib_1.OptionFlags.Default).to.not.eq(0);
        chai_1.expect(lib_1.OptionFlags.CheckParent & lib_1.OptionFlags.Default).to.not.eq(0);
        chai_1.expect(lib_1.OptionFlags.Default & lib_1.OptionFlags.Default).to.not.eq(0);
    });
    it(`Optional 当Optional不为0其余为0`, () => {
        chai_1.expect(lib_1.OptionFlags.Optional & lib_1.OptionFlags.Optional).to.not.eq(0);
        chai_1.expect(lib_1.OptionFlags.CheckSelf & lib_1.OptionFlags.Optional).to.eq(0);
        chai_1.expect(lib_1.OptionFlags.CheckParent & lib_1.OptionFlags.Optional).to.eq(0);
        chai_1.expect(lib_1.OptionFlags.Default & lib_1.OptionFlags.Optional).to.eq(0);
    });
});

Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../lib/index");
const chai_1 = require("chai");
describe(`ims di`, () => {
    it(`ConstructorProvider`, () => {
        class User1 {
        }
        class User2 {
            constructor(user1) {
                this.user1 = user1;
            }
        }
        const injector = index_1.Injector.create([{
                provide: User1
            }, {
                provide: User2,
                deps: [User1]
            }]);
        const res = injector.get(User2);
        chai_1.expect(res).to.instanceOf(User2);
        if (res instanceof User2) {
            chai_1.expect(res.user1).to.instanceOf(User1);
        }
    });
    it(`ExistingProvider`, () => {
        class User1 {
        }
        class User2 {
        }
        const injector = index_1.Injector.create([{
                provide: User1
            }, {
                provide: User2,
                useExisting: User1
            }]);
        chai_1.expect(injector.get(User2)).to.instanceOf(User1);
    });
    it(`ValueProvider`, () => {
        class User1 {
        }
        const injector = index_1.Injector.create([{
                provide: User1,
                useValue: `test`
            }]);
        chai_1.expect(injector.get(User1)).to.equal(`test`);
    });
    it(`FactoryProviderRecord`, () => {
        class User1 {
            constructor(id) {
                this.id = id;
            }
        }
        const idToken = `idToken`;
        const injector = index_1.Injector.create([{
                provide: idToken,
                useValue: 1
            }, {
                provide: User1,
                useFactory: (id) => new User1(id),
                deps: [idToken]
            }]);
        const res = injector.get(User1);
        chai_1.expect(res).to.instanceof(User1);
        if (res instanceof User1) {
            chai_1.expect(res.id).to.equal(1);
        }
    });
    it(`StaticClassProvider`, () => {
        class User1 {
            constructor(id) {
                this.id = id;
            }
        }
        class User2 {
        }
        const idToken = `idToken`;
        const injector = index_1.Injector.create([{
                provide: idToken,
                useValue: 1
            }, {
                provide: User2,
                useClass: User1,
                deps: [idToken]
            }]);
        const res = injector.get(User2, index_1.InjectFlags.Default);
        chai_1.expect(res).to.instanceof(User1);
        if (res instanceof User1) {
            chai_1.expect(res.id).to.equal(1);
        }
        const skip = injector.get(User2, index_1.InjectFlags.SkipSelf);
        chai_1.expect(skip).to.equal(undefined);
    });
});

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

Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
// export * from './injector';
tslib_1.__exportStar(require("./util"), exports);
tslib_1.__exportStar(require("./injection_token"), exports);
tslib_1.__exportStar(require("./type"), exports);
var injector_ng_1 = require("./injector_ng");
exports.Injector = injector_ng_1.Injector;
exports.StaticInjector = injector_ng_1.StaticInjector;

Object.defineProperty(exports, "__esModule", { value: true });
class InjectionToken {
    constructor(_desc, options) {
        this._desc = _desc;
        this.options = options;
        this.ngMetadataName = 'InjectionToken';
        this.name = this._desc;
        if (typeof options == 'number') {
            this.__NG_ELEMENT_ID__ = options;
        }
        else if (options !== undefined) { }
    }
    toString() { return `InjectionToken ${this._desc}`; }
}
exports.InjectionToken = InjectionToken;

Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("./util");
const type_1 = require("./type");
exports.NG_TEMP_TOKEN_PATH = 'ngTempTokenPath';
exports.SOURCE = '__source';
const NG_TOKEN_PATH = 'ngTokenPath';
const NEW_LINE = /\n/gm;
const _THROW_IF_NOT_FOUND = new Object();
exports.THROW_IF_NOT_FOUND = _THROW_IF_NOT_FOUND;
const NO_NEW_LINE = 'ɵ';
const IDENT = function (value) {
    return value;
};
const EMPTY = [];
const CIRCULAR = IDENT;
// record定义
class Record {
    constructor(fn, deps = [], value = EMPTY) {
        this.fn = fn;
        this.deps = deps;
        this.value = value;
    }
}
exports.Record = Record;
// 全局record记录map
exports.globalRecord = new Map();
// 设置全局record
function setRecord(token, record) {
    if (record)
        exports.globalRecord.set(token, record);
}
exports.setRecord = setRecord;
function setStaticProvider(provider) {
    createStaticRecrod(provider, exports.globalRecord);
}
exports.setStaticProvider = setStaticProvider;
// 从全局里获取
function inject(token, notFound, flags = type_1.InjectFlags.Default) {
    const record = exports.globalRecord.get(token);
    try {
        return tryResolveToken(token, record, exports.globalRecord, ERROR_INJECTOR, notFound, flags, undefined);
    }
    catch (e) {
        return catchInjectorError(e, token, 'StaticInjectorError', this.source);
    }
}
exports.inject = inject;
// 解析token,刨出错误
function tryResolveToken(token, record, records, parent, notFoundValue, flags, current) {
    try {
        return resolveToken(token, record, records, parent, notFoundValue, flags, current);
    }
    catch (e) {
        // ensure that 'e' is of type Error.
        if (!(e instanceof Error)) {
            e = new Error(e);
        }
        const path = e[exports.NG_TEMP_TOKEN_PATH] = e[exports.NG_TEMP_TOKEN_PATH] || [];
        path.unshift(token);
        if (Array.isArray(record)) {
            record = record.map(rec => {
                if (rec && rec.value == CIRCULAR) {
                    // Reset the Circular flag.
                    rec.value = EMPTY;
                }
                return rec;
            });
        }
        else {
            if (record && record.value == CIRCULAR) {
                // Reset the Circular flag.
                record.value = EMPTY;
            }
        }
        throw e;
    }
}
function createFactoryProviderRecord(val) {
    return new Record((...params) => val.useFactory(...params), createDependencyRecord(val.deps), undefined);
}
exports.createFactoryProviderRecord = createFactoryProviderRecord;
function createStaticClassProviderRecord(val) {
    return new Record((...params) => new val.useClass(...params), createDependencyRecord(val.deps), undefined);
}
exports.createStaticClassProviderRecord = createStaticClassProviderRecord;
function createValueProviderRecord(val) {
    return new Record(() => val.useValue, [], undefined);
}
exports.createValueProviderRecord = createValueProviderRecord;
function createExistingProviderRecord(val) {
    return new Record((injector) => {
        return injector.get(val.useExisting);
    }, createDeps([Injector]), undefined);
}
exports.createExistingProviderRecord = createExistingProviderRecord;
/**
 * deps: [
 *  [InjectFlags.Host,InjectFlags.Optional,ImsServices]
 * ImsServices,
 * [ImsServices]
 * ...
 * ]
 */
function createDeps(deps) {
    return deps.map((dep, index) => {
        // [InjectFlags.Host]
        if (Array.isArray(dep)) {
            let token, options = type_1.OptionFlags.Default;
            dep.map(opt => {
                if (typeof opt === 'number') {
                    if (opt === type_1.InjectFlags.Self) {
                        options = options & ~type_1.OptionFlags.CheckParent;
                    }
                    else if (opt === type_1.InjectFlags.Optional) {
                        options = options | type_1.OptionFlags.Optional;
                    }
                    else if (opt === type_1.InjectFlags.SkipSelf) {
                        options = options & ~type_1.OptionFlags.CheckSelf;
                    }
                }
                else {
                    token = opt;
                }
            });
            return {
                token,
                options
            };
        }
        else {
            return {
                token: dep,
                options: type_1.OptionFlags.Default
            };
        }
    });
}
exports.createDeps = createDeps;
/**
 * deps: [
 *  [InjectFlags.Host,InjectFlags.Optional,ImsServices]
 * ImsServices,
 * [ImsServices]
 * ...
 * ]
 */
function createDependencyRecord(deps) {
    if (deps && deps.length > 0) {
        return createDeps(deps);
    }
    return [];
}
exports.createDependencyRecord = createDependencyRecord;
function createConstructorProvider(val) {
    return new Record((...params) => {
        if (val.provide) {
            if (typeof val.provide === 'function') {
                return new val.provide(...params);
            }
            return val.provide;
        }
        return undefined;
    }, createDependencyRecord(val.deps), undefined);
}
exports.createConstructorProvider = createConstructorProvider;
function createMultiRecord(res, newRecord) {
    let records = [];
    if (Array.isArray(res)) {
        records = [...res, newRecord];
    }
    else if (res) {
        records = [res, newRecord];
    }
    else {
        records = [newRecord];
    }
    return records;
}
exports.createMultiRecord = createMultiRecord;
function createStaticRecrod(record, records) {
    if (type_1.isValueProvider(record)) {
        if (!!record.multi) {
            return createMultiRecord(records.get(record.provide), createValueProviderRecord(record));
        }
        else {
            return createValueProviderRecord(record);
        }
    }
    else if (type_1.isExistingProvider(record)) {
        if (!!record.multi) {
            return createMultiRecord(records.get(record.provide), createExistingProviderRecord(record));
        }
        else {
            return createExistingProviderRecord(record);
        }
    }
    else if (type_1.isStaticClassProvider(record)) {
        if (!!record.multi) {
            return createMultiRecord(records.get(record.provide), createStaticClassProviderRecord(record));
        }
        else {
            return createStaticClassProviderRecord(record);
        }
    }
    else if (type_1.isFactoryProvider(record)) {
        if (!!record.multi) {
            return createMultiRecord(records.get(record.provide), createFactoryProviderRecord(record));
        }
        else {
            return createFactoryProviderRecord(record);
        }
    }
    else {
        if (!!record.multi) {
            return createMultiRecord(records.get(record.provide), createConstructorProvider(record));
        }
        else {
            return createConstructorProvider(record);
        }
    }
}
exports.createStaticRecrod = createStaticRecrod;
exports.topInjector = {
    get: inject
};
class ErrorInjector {
    constructor() {
        this.source = `ErrorInjector`;
    }
    get(token, notFoundValue = _THROW_IF_NOT_FOUND, flags) {
        // 如果是Optional
        if (notFoundValue === _THROW_IF_NOT_FOUND) {
            const error = new Error(`NullInjectorError: No provider for ${util_1.stringify(token)}`);
            error.name = 'NullInjectorError';
            throw error;
        }
        return notFoundValue;
    }
}
exports.ErrorInjector = ErrorInjector;
// null
class NullInjector {
    constructor() {
        this.source = 'NullInjector';
    }
    get(token, notFoundValue = _THROW_IF_NOT_FOUND, flags) {
        // 如果是Optional
        const res = inject(token, notFoundValue, flags);
        if (res === _THROW_IF_NOT_FOUND) {
            const error = new Error(`NullInjectorError: No provider for ${util_1.stringify(token)}!`);
            error.name = 'NullInjectorError';
            throw error;
        }
        return res;
    }
}
exports.NullInjector = NullInjector;
const NULL_INJECTOR = new NullInjector();
const ERROR_INJECTOR = new ErrorInjector();
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
class Injector {
    constructor(records, parent = null, source = null) {
        this.source = source;
        this._records = new Map();
        this.exports = new Map();
        if (!parent) {
            parent = Injector.NULL;
        }
        this.parent = parent;
        this._records.set(Injector, new Record(() => this, [], undefined));
        setRecord(Injector, new Record(() => this, [], undefined));
        records.map(record => {
            // todo
            this._records.set(record.provide, createStaticRecrod(record, this._records));
        });
    }
    static create(options) {
        return new Injector(options.providers, options.parent, options.name);
    }
    clearCache(token) {
        const record = this._records.get(token);
        if (Array.isArray(record)) {
            record.map(rec => rec.value = undefined);
        }
        else if (record) {
            record.value = undefined;
        }
    }
    create(records, source = null) {
        return new Injector(records, this, source);
    }
    setStatic(records) {
        records.map(record => {
            const recs = createStaticRecrod(record, this._records);
            this._records.set(record.provide, recs);
        });
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
    set(token, record) {
        this._records.set(token, record);
    }
    // 这个是替换
    extend(injector) {
        injector._records.forEach((rec, key) => {
            let record = this._records.get(key);
            if (Array.isArray(record)) {
                if (Array.isArray(rec)) {
                    record = [...record, ...rec];
                    this._records.set(key, record);
                }
                else {
                    record = [...record, rec];
                    this._records.set(key, record);
                }
            }
            else if (record) {
                // 啥也不做 还是覆盖 
                // todo todo todo 
                // this._records.set(key, record)
            }
            else {
                this._records.set(key, rec);
            }
            this._records.set(key, rec);
        });
    }
    setParent(injector) {
        this.parent = injector;
    }
    get(token, notFound, flags = type_1.InjectFlags.Default) {
        const record = this._records.get(token);
        try {
            return resolveToken(token, record, this._records, this.parent, notFound, flags, this);
        }
        catch (e) {
            return catchInjectorError(e, token, `StaticInjectorError`, this.source);
        }
    }
}
Injector.THROW_IF_NOT_FOUND = exports.THROW_IF_NOT_FOUND;
Injector.NULL = NULL_INJECTOR;
exports.Injector = Injector;
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
// 解析token
function resolveToken(token, record, records, parent, notFoundValue, flags, current) {
    let value;
    if (record && !(flags & type_1.InjectFlags.SkipSelf)) {
        // If we don't have a record, this implies that we don't own the provider hence don't know how
        // to resolve it.
        function handler(record) {
            value = record.value;
            if (value == CIRCULAR) {
                throw Error(NO_NEW_LINE + 'Circular dependency');
            }
            else if (value === EMPTY) {
                record.value = CIRCULAR;
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
                        !childRecord && !(options & type_1.OptionFlags.CheckParent) ? ERROR_INJECTOR : parent, options & type_1.OptionFlags.Optional ? null : Injector.THROW_IF_NOT_FOUND, type_1.InjectFlags.Default, current));
                    }
                }
                value = fn(...deps);
                record.value = value;
                return value;
            }
            return value;
        }
        if (Array.isArray(record)) {
            value = record.map(rec => handler(rec));
        }
        else {
            value = handler(record);
        }
    }
    else if (!(flags & type_1.InjectFlags.Self)) {
        value = parent.get(token, notFoundValue, type_1.InjectFlags.Default);
    }
    return value;
}
exports.resolveToken = resolveToken;

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

Object.defineProperty(exports, "__esModule", { value: true });
function stringify(token) {
    if (typeof token === 'string') {
        return token;
    }
    if (token instanceof Array) {
        return '[' + token.map(stringify).join(', ') + ']';
    }
    if (token == null) {
        return '' + token;
    }
    if (token.overriddenName) {
        return `${token.overriddenName}`;
    }
    if (token.name) {
        return `${token.name}`;
    }
    const res = token.toString();
    if (res == null) {
        return '' + res;
    }
    const newLineIndex = res.indexOf('\n');
    return newLineIndex === -1 ? res : res.substring(0, newLineIndex);
}
exports.stringify = stringify;
function getClosureSafeProperty(objWithPropertyToExtract) {
    for (let key in objWithPropertyToExtract) {
        if (objWithPropertyToExtract[key] === getClosureSafeProperty) {
            return key;
        }
    }
    throw Error('Could not find renamed property on target object.');
}
exports.getClosureSafeProperty = getClosureSafeProperty;
function forwardRef(forwardRefFn) {
    forwardRefFn.__forward_ref__ = forwardRef;
    forwardRefFn.toString = function () { return stringify(this()); };
    return forwardRefFn;
}
exports.forwardRef = forwardRef;
const __forward_ref__ = getClosureSafeProperty({ __forward_ref__: getClosureSafeProperty });
function resolveForwardRef(type) {
    const fn = type;
    if (typeof fn === 'function' && fn.hasOwnProperty(__forward_ref__) &&
        fn.__forward_ref__ === forwardRef) {
        return fn();
    }
    else {
        return type;
    }
}
exports.resolveForwardRef = resolveForwardRef;
