import { OnDestroy } from 'nger-core';
import { Subject } from 'rxjs';
import { Provider } from 'nger-di';
import { Action } from './models';
export declare class ScannedActionsSubject extends Subject<Action> implements OnDestroy {
    ngOnDestroy(): void;
}
export declare const SCANNED_ACTIONS_SUBJECT_PROVIDERS: Provider[];
