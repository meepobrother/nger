Object.defineProperty(exports, "__esModule", { value: true });
const CREATE_EFFECT_METADATA_KEY = '__@ngrx/effects_create__';
function createEffect(source, { dispatch = true } = {}) {
    const effect = source();
    Object.defineProperty(effect, CREATE_EFFECT_METADATA_KEY, {
        value: {
            dispatch,
        },
    });
    return effect;
}
exports.createEffect = createEffect;
function getCreateEffectMetadata(instance) {
    const propertyNames = Object.getOwnPropertyNames(instance);
    const metadata = propertyNames
        .filter(propertyName => instance[propertyName] &&
        instance[propertyName].hasOwnProperty(CREATE_EFFECT_METADATA_KEY))
        .map(propertyName => {
        const metaData = instance[propertyName][CREATE_EFFECT_METADATA_KEY];
        return {
            propertyName,
            ...metaData,
        };
    });
    return metadata;
}
exports.getCreateEffectMetadata = getCreateEffectMetadata;
