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
