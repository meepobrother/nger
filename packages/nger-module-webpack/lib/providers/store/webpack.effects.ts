import { Injectable } from 'nger-core';
import { Actions } from 'nger-effects';
@Injectable()
export class WebpackEffects {
    constructor(
        private actions$: Actions,
    ) {
        this.actions$.subscribe(res => {
        });
    }
}