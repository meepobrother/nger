import { Injectable } from 'nger-core';
import { Actions, Effect, ofType } from 'nger-effects';
import { EMPTY, Observable, of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { WebpackActionTypes } from './webpack.actions'
@Injectable()
export class WebpackEffects {
    @Effect()
    loadMovies$ = this.actions$
        .pipe(
            ofType(WebpackActionTypes.Increment),
            mergeMap(() => {
                console.log(`Increment`)
                return of({ type: WebpackActionTypes.Reset });
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