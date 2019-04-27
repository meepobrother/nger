import { Injectable } from 'nger-core';
import { Actions, Effect, ofType } from 'nger-effects';
import { EMPTY, Observable, of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { ActionTypes } from './counter.actions'
@Injectable()
export class CounterEffects {
    @Effect()
    loadMovies$ = this.actions$
        .pipe(
            ofType(ActionTypes.Increment),
            mergeMap(() => {
                console.log(`Increment`)
                return of({ type: ActionTypes.Reset });
            })
        );

    constructor(
        private actions$: Actions,
    ) {
        this.actions$.subscribe(res => {
            console.log(`action`, res)
        });
    }
}