"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
function stateSerializationCheckMetaReducer(reducer) {
    return function (state, action) {
        const nextState = reducer(state, action);
        const unserializable = utils_1.getUnserializable(nextState);
        utils_1.throwIfUnserializable(unserializable, 'state');
        return nextState;
    };
}
exports.stateSerializationCheckMetaReducer = stateSerializationCheckMetaReducer;
