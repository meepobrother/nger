"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const effect_creator_1 = require("./effect_creator");
const effect_decorator_1 = require("./effect_decorator");
function getEffectsMetadata(instance) {
    const metadata = {};
    for (const { propertyName, dispatch } of getSourceMetadata(instance)) {
        metadata[propertyName] = { dispatch };
    }
    return metadata;
}
exports.getEffectsMetadata = getEffectsMetadata;
function getSourceMetadata(instance) {
    const effects = [
        effect_decorator_1.getEffectDecoratorMetadata,
        effect_creator_1.getCreateEffectMetadata,
    ];
    return effects.reduce((sources, source) => sources.concat(source(instance)), []);
}
exports.getSourceMetadata = getSourceMetadata;
