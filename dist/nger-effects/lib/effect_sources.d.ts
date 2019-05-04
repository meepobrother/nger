import { ErrorHandler } from 'nger-core';
import { Action, Store } from 'nger-store';
import { Observable, Subject } from 'rxjs';
export declare class EffectSources extends Subject<any> {
    private errorHandler;
    private store;
    constructor(errorHandler: ErrorHandler, store: Store<any>);
    addEffects(effectSourceInstance: any): void;
    /**
     * @internal
     */
    toActions(): Observable<Action>;
}
