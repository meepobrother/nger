Object.defineProperty(exports, "__esModule", { value: true });
function getUnserializable(target, path = []) {
    // Guard against undefined and null, e.g. a reducer that returns undefined
    if ((isUndefined(target) || isNull(target)) && path.length === 0) {
        return {
            path: ['root'],
            value: target,
        };
    }
    const keys = Object.keys(target);
    return keys.reduce((result, key) => {
        if (result) {
            return result;
        }
        const value = target[key];
        if (isUndefined(value) ||
            isNull(value) ||
            isNumber(value) ||
            isBoolean(value) ||
            isString(value) ||
            isArray(value)) {
            return false;
        }
        if (isPlainObject(value)) {
            return getUnserializable(value, [...path, key]);
        }
        return {
            path: [...path, key],
            value,
        };
    }, false);
}
exports.getUnserializable = getUnserializable;
function throwIfUnserializable(unserializable, context) {
    if (unserializable === false) {
        return;
    }
    const unserializablePath = unserializable.path.join('.');
    const error = new Error(`Detected unserializable ${context} at "${unserializablePath}"`);
    error.value = unserializable.value;
    error.unserializablePath = unserializablePath;
    throw error;
}
exports.throwIfUnserializable = throwIfUnserializable;
/**
 * Object Utilities
 */
function isUndefined(target) {
    return target === undefined;
}
exports.isUndefined = isUndefined;
function isNull(target) {
    return target === null;
}
exports.isNull = isNull;
function isArray(target) {
    return Array.isArray(target);
}
exports.isArray = isArray;
function isString(target) {
    return typeof target === 'string';
}
exports.isString = isString;
function isBoolean(target) {
    return typeof target === 'boolean';
}
exports.isBoolean = isBoolean;
function isNumber(target) {
    return typeof target === 'number';
}
exports.isNumber = isNumber;
function isObjectLike(target) {
    return typeof target === 'object' && target !== null;
}
exports.isObjectLike = isObjectLike;
function isObject(target) {
    return isObjectLike(target) && !isArray(target);
}
exports.isObject = isObject;
function isPlainObject(target) {
    if (!isObject(target)) {
        return false;
    }
    const targetPrototype = Object.getPrototypeOf(target);
    return targetPrototype === Object.prototype || targetPrototype === null;
}
exports.isPlainObject = isPlainObject;
function isFunction(target) {
    return typeof target === 'function';
}
exports.isFunction = isFunction;
function hasOwnProperty(target, propertyName) {
    return Object.prototype.hasOwnProperty.call(target, propertyName);
}
exports.hasOwnProperty = hasOwnProperty;
