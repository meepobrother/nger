import { InjectionToken } from 'nger-di';
import { ComponentRef } from './component_ref';
export declare const APP_ID: InjectionToken<string>;
export declare function _appIdRandomProviderFactory(): string;
export declare const APP_ID_RANDOM_PROVIDER: {
    provide: InjectionToken<string>;
    useFactory: typeof _appIdRandomProviderFactory;
    deps: any[];
};
export declare function _randomChar(): string;
export declare const PLATFORM_INITIALIZER: InjectionToken<(() => void)[]>;
export declare const PLATFORM_ID: InjectionToken<Object>;
export declare const APP_BOOTSTRAP_LISTENER: InjectionToken<((compRef: ComponentRef<any>) => void)[]>;
export declare const PACKAGE_ROOT_URL: InjectionToken<string>;
