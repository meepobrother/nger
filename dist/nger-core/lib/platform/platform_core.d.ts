import { PlatformRef } from './platform_ref';
import { Subject } from 'rxjs';
export declare const topSubject: Subject<{}>;
export declare const platformCore: (extraProviders?: import("../../../nger-di/lib").StaticProvider[]) => PlatformRef;
