Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
var Actions_1;
const nger_core_1 = require("nger-core");
const nger_store_1 = require("nger-store");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
let Actions = Actions_1 = class Actions extends rxjs_1.Observable {
    constructor(source) {
        super();
        if (source) {
            this.source = source;
        }
    }
    lift(operator) {
        const observable = new Actions_1();
        observable.source = this;
        observable.operator = operator;
        return observable;
    }
};
Actions = Actions_1 = tslib_1.__decorate([
    nger_core_1.Injectable(),
    tslib_1.__param(0, nger_core_1.Inject(nger_store_1.ScannedActionsSubject)),
    tslib_1.__metadata("design:paramtypes", [rxjs_1.Observable])
], Actions);
exports.Actions = Actions;
function ofType(...allowedTypes) {
    return operators_1.filter((action) => allowedTypes.some(typeOrActionCreator => {
        if (typeof typeOrActionCreator === 'string') {
            // Comparing the string to type
            return typeOrActionCreator === action.type;
        }
        // We are filtering by ActionCreator
        return typeOrActionCreator.type === action.type;
    }));
}
exports.ofType = ofType;
