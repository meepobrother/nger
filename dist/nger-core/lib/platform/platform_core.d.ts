import { PlatformRef } from './platform_ref';
import { BehaviorSubject } from 'rxjs';
export declare const topSubject: BehaviorSubject<{}>;
export declare const platformCore: (extraProviders?: import("../../../nger-di/lib").StaticProvider[]) => PlatformRef;
