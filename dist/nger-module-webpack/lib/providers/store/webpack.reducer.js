"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const webpack_actions_1 = require("./webpack.actions");
exports.initialState = 0;
function counterReducer(state = exports.initialState, action) {
    switch (action.type) {
        case webpack_actions_1.WebpackActionTypes.Decrement:
            return state - 1;
        case webpack_actions_1.WebpackActionTypes.Reset:
            return 0;
        default:
            return state;
    }
}
exports.counterReducer = counterReducer;
