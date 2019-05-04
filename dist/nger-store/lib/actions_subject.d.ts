import { OnDestroy } from 'nger-core';
import { BehaviorSubject } from 'rxjs';
import { Provider } from 'nger-di';
import { Action } from './models';
export declare const INIT: "@ngrx/store/init";
export declare class ActionsSubject extends BehaviorSubject<Action> implements OnDestroy {
    constructor();
    next(action: Action): void;
    complete(): void;
    ngOnDestroy(): void;
}
export declare const ACTIONS_SUBJECT_PROVIDERS: Provider[];
