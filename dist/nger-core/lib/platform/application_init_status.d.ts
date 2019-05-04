import { InjectionToken } from 'nger-di';
export declare const APP_INITIALIZER: InjectionToken<(() => void)[]>;
export declare class ApplicationInitStatus {
    private appInits;
    private resolve;
    private reject;
    private initialized;
    readonly donePromise: Promise<any>;
    readonly done = false;
    constructor(appInits: (() => any)[]);
    /** @internal */
    runInitializers(): void;
}
