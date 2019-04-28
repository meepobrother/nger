import { InjectionToken } from 'nger-di';
import { ComponentRef } from './component_ref';
export const APP_ID = new InjectionToken<string>('AppId');
export function _appIdRandomProviderFactory() {
    return `${_randomChar()}${_randomChar()}${_randomChar()}`;
}
export const APP_ID_RANDOM_PROVIDER = {
    provide: APP_ID,
    useFactory: _appIdRandomProviderFactory,
    deps: <any[]>[],
};
export function _randomChar(): string {
    return String.fromCharCode(97 + Math.floor(Math.random() * 25));
}
export const PLATFORM_INITIALIZER = new InjectionToken<Array<() => void>>('Platform Initializer');
export const PLATFORM_ID = new InjectionToken<Object>('Platform ID');
export const APP_BOOTSTRAP_LISTENER =
    new InjectionToken<Array<(compRef: ComponentRef<any>) => void>>('appBootstrapListener');
export const PACKAGE_ROOT_URL = new InjectionToken<string>('Application Packages Root URL');
