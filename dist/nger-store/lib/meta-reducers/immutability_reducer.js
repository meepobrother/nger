Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
function immutabilityCheckMetaReducer(reducer) {
    return function (state, action) {
        const nextState = reducer(state, freeze(action));
        return freeze(nextState);
    };
}
exports.immutabilityCheckMetaReducer = immutabilityCheckMetaReducer;
function freeze(target) {
    Object.freeze(target);
    const targetIsFunction = utils_1.isFunction(target);
    Object.getOwnPropertyNames(target).forEach(prop => {
        const propValue = target[prop];
        if (utils_1.hasOwnProperty(target, prop) &&
            (targetIsFunction
                ? prop !== 'caller' && prop !== 'callee' && prop !== 'arguments'
                : true) &&
            (utils_1.isObjectLike(propValue) || utils_1.isFunction(propValue)) &&
            !Object.isFrozen(propValue)) {
            freeze(propValue);
        }
    });
    return target;
}
