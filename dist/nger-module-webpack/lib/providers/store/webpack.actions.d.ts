import { Action } from 'nger-store';
export declare enum WebpackActionTypes {
    Build = "[Webpack Build] Build",
    Decrement = "[Counter Component] Decrement",
    Reset = "[Counter Component] Reset"
}
export declare class Build implements Action {
    readonly type = WebpackActionTypes.Build;
}
