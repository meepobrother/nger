import { Action } from 'nger-store';
import { WebpackActionTypes } from './webpack.actions';

export const initialState = 0;

export function counterReducer(state = initialState, action: Action) {
    switch (action.type) {
        case WebpackActionTypes.Increment:
            return state + 1;

        case WebpackActionTypes.Decrement:
            return state - 1;

        case WebpackActionTypes.Reset:
            return 0;

        default:
            return state;
    }
}