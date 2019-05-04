"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const effects_metadata_1 = require("./effects_metadata");
const utils_1 = require("./utils");
function mergeEffects(sourceInstance) {
    const sourceName = utils_1.getSourceForInstance(sourceInstance).constructor.name;
    const observables = effects_metadata_1.getSourceMetadata(sourceInstance).map(({ propertyName, dispatch }) => {
        const observable = typeof sourceInstance[propertyName] === 'function'
            ? sourceInstance[propertyName]()
            : sourceInstance[propertyName];
        if (dispatch === false) {
            return observable.pipe(operators_1.ignoreElements());
        }
        const materialized$ = observable.pipe(operators_1.materialize());
        return materialized$.pipe(operators_1.map((notification) => ({
            effect: sourceInstance[propertyName],
            notification,
            propertyName,
            sourceName,
            sourceInstance,
        })));
    });
    return rxjs_1.merge(...observables);
}
exports.mergeEffects = mergeEffects;
