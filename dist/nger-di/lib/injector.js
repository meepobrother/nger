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
