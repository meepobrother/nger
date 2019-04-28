import { Injector, InjectionToken } from 'nger-di'
import { PlatformRef } from './platform_ref'
import { PLATFORM_INITIALIZER } from './application_tokens'
let _platform: PlatformRef;

export function getPlatform(): PlatformRef | null {
    return _platform && !_platform.destroyed ? _platform : null;
}

export const ALLOW_MULTIPLE_PLATFORMS = new InjectionToken<boolean>('AllowMultipleToken');
export function createPlatform(injector: Injector): PlatformRef {
    if (_platform && !_platform.destroyed &&
        !_platform.injector.get(ALLOW_MULTIPLE_PLATFORMS, false)) {
        throw new Error(
            'There can be only one platform. Destroy the previous one to create a new one.');
    }
    _platform = injector.get(PlatformRef);
    const inits = injector.get(PLATFORM_INITIALIZER, null) || [];
    if (inits) inits.forEach((init: any) => init());
    return _platform;
}
