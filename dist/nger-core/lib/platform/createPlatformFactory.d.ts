import { StaticProvider } from 'nger-di';
import { PlatformRef } from './platform_ref';
export declare function createPlatformFactory(parentPlatformFactory: ((extraProviders?: StaticProvider[]) => PlatformRef) | null, name: string, providers?: StaticProvider[]): (extraProviders?: StaticProvider[]) => PlatformRef;
export declare function assertPlatform(requiredToken: any): PlatformRef;
