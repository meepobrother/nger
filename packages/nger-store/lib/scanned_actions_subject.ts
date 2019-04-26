import { Injectable, OnDestroy,  } from 'nger-core';
import { Subject } from 'rxjs';
import {Provider} from 'nger-di';
import { Action } from './models';

@Injectable()
export class ScannedActionsSubject extends Subject<Action>
    implements OnDestroy {
    ngOnDestroy() {
        this.complete();
    }
}

export const SCANNED_ACTIONS_SUBJECT_PROVIDERS: Provider[] = [
    ScannedActionsSubject,
];
