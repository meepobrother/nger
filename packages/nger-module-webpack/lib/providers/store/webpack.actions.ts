import { Action } from 'nger-store';

export enum WebpackActionTypes {
    // 打包命令
    Build = '[Webpack Build] Build',
    Decrement = '[Counter Component] Decrement',
    Reset = '[Counter Component] Reset',
}

// 打包
export class Build implements Action {
    readonly type = WebpackActionTypes.Build;
}
