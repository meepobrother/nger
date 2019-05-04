import { ErrorHandler } from 'nger-core';
import { Action } from 'nger-store';
import { Notification, Observable } from 'rxjs';
export interface EffectNotification {
    effect: Observable<any> | (() => Observable<any>);
    propertyName: string;
    sourceName: string;
    sourceInstance: any;
    notification: Notification<Action | null | undefined>;
}
export declare function verifyOutput(output: EffectNotification, reporter: ErrorHandler): void;
