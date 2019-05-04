import { Injector, InjectionToken } from 'nger-di';
import { PlatformRef } from './platform_ref';
export declare function getPlatform(): PlatformRef | null;
export declare const ALLOW_MULTIPLE_PLATFORMS: InjectionToken<boolean>;
export declare function createPlatform(injector: Injector): PlatformRef;
