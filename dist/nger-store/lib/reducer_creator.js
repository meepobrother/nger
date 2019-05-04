"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nger_core_1 = require("nger-core");
function on(...args) {
    const reducer = args.pop();
    const types = args.reduce((result, creator) => [...result, creator.type], []);
    return { reducer, types };
}
exports.on = on;
function createReducer(initialState, ...ons) {
    const map = new Map();
    const devMode = nger_core_1.isDevMode();
    for (let on of ons) {
        for (let type of on.types) {
            if (devMode && map.has(type)) {
                console.warn(`@ngrx/store: The provided action type '${type}' is already provided.`);
            }
            map.set(type, on.reducer);
        }
    }
    return function (state = initialState, action) {
        const reducer = map.get(action.type);
        return reducer ? reducer(state, action) : state;
    };
}
exports.createReducer = createReducer;
