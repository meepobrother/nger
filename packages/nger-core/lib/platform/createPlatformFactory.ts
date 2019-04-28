import { StaticProvider, InjectionToken, Injector } from 'nger-di'
import { PlatformRef } from './platform_ref'
import { getPlatform, ALLOW_MULTIPLE_PLATFORMS, createPlatform } from './createPlatform'

export function createPlatformFactory(
    parentPlatformFactory: ((extraProviders?: StaticProvider[]) => PlatformRef) | null,
    name: string,
    providers: StaticProvider[] = []
): (extraProviders?: StaticProvider[]) =>
        PlatformRef {
    const desc = `Platform: ${name}`;
    const marker = new InjectionToken(desc);
    return (extraProviders: StaticProvider[] = []) => {
        let platform = getPlatform();
        if (!platform || platform.injector.get(ALLOW_MULTIPLE_PLATFORMS, false)) {
            if (parentPlatformFactory) {
                parentPlatformFactory(
                    providers.concat(extraProviders)
                        .concat({ provide: marker, useValue: true })
                );
            } else {
                const injectedProviders: StaticProvider[] =
                    providers.concat(extraProviders).concat({ provide: marker, useValue: true });
                createPlatform(Injector.create({ providers: injectedProviders, name: desc }));
            }
        }
        return assertPlatform(marker);
    };
}
export function assertPlatform(requiredToken: any): PlatformRef {
    const platform = getPlatform();
    if (!platform) {
        throw new Error('No platform exists!');
    }
    if (!platform.injector.get(requiredToken, null)) {
        throw new Error(
            'A platform with a different configuration has been created. Please destroy it first.');
    }
    return platform;
}
