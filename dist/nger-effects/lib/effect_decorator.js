Object.defineProperty(exports, "__esModule", { value: true });
const nger_store_1 = require("nger-store");
const utils_1 = require("./utils");
const METADATA_KEY = '__@ngrx/effects__';
function Effect(dispatch = true) {
    return function (target, propertyName) {
        const metadata = { propertyName, dispatch };
        setEffectMetadataEntries(target, [metadata]);
    };
}
exports.Effect = Effect;
function getEffectDecoratorMetadata(instance) {
    const effectsDecorators = nger_store_1.compose(getEffectMetadataEntries, utils_1.getSourceForInstance)(instance);
    return effectsDecorators;
}
exports.getEffectDecoratorMetadata = getEffectDecoratorMetadata;
function setEffectMetadataEntries(sourceProto, entries) {
    const constructor = sourceProto.constructor;
    const meta = constructor.hasOwnProperty(METADATA_KEY)
        ? constructor[METADATA_KEY]
        : Object.defineProperty(constructor, METADATA_KEY, { value: [] })[METADATA_KEY];
    Array.prototype.push.apply(meta, entries);
}
function getEffectMetadataEntries(sourceProto) {
    return sourceProto.constructor.hasOwnProperty(METADATA_KEY)
        ? sourceProto.constructor[METADATA_KEY]
        : [];
}
