Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
function actionSerializationCheckMetaReducer(reducer) {
    return function (state, action) {
        const unserializable = utils_1.getUnserializable(action);
        utils_1.throwIfUnserializable(unserializable, 'action');
        return reducer(state, action);
    };
}
exports.actionSerializationCheckMetaReducer = actionSerializationCheckMetaReducer;
