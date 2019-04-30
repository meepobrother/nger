Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const nger_core_1 = require("nger-core");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const actions_subject_1 = require("./actions_subject");
const reducer_manager_1 = require("./reducer_manager");
const scanned_actions_subject_1 = require("./scanned_actions_subject");
const tokens_1 = require("./tokens");
class StateObservable extends rxjs_1.Observable {
}
exports.StateObservable = StateObservable;
let State = class State extends rxjs_1.BehaviorSubject {
    constructor(actions$, reducer$, scannedActions, initialState) {
        super(initialState);
        const actionsOnQueue$ = actions$.pipe(operators_1.observeOn(rxjs_1.queueScheduler));
        const withLatestReducer$ = actionsOnQueue$.pipe(operators_1.withLatestFrom(reducer$));
        const seed = { state: initialState };
        const stateAndAction$ = withLatestReducer$.pipe(operators_1.scan(reduceState, seed));
        this.stateSubscription = stateAndAction$.subscribe({
            next: ({ state, action }) => {
                this.next(state);
                scannedActions.next(action);
            },
            error: err => this.error(err),
        });
    }
    ngOnDestroy() {
        this.stateSubscription.unsubscribe();
        this.complete();
    }
};
State.INIT = actions_subject_1.INIT;
State = tslib_1.__decorate([
    nger_core_1.Injectable(),
    tslib_1.__param(3, nger_core_1.Inject(tokens_1.INITIAL_STATE)),
    tslib_1.__metadata("design:paramtypes", [actions_subject_1.ActionsSubject,
        reducer_manager_1.ReducerObservable,
        scanned_actions_subject_1.ScannedActionsSubject, Object])
], State);
exports.State = State;
function reduceState(stateActionPair = { state: undefined }, [action, reducer]) {
    const { state } = stateActionPair;
    return { state: reducer(state, action), action };
}
exports.reduceState = reduceState;
exports.STATE_PROVIDERS = [
    State,
    { provide: StateObservable, useExisting: State },
];
