import { InjectionToken, Type } from 'nger-di';
import { ConnectionOptions, ConnectionManager, Connection } from 'typeorm';
export declare const TypeormToken: InjectionToken<Type<any>>;
export declare const TypeormOptionsToken: InjectionToken<ConnectionOptions>;
export declare const ConnectionToken: InjectionToken<Connection>;
export declare const ConnectionManagerToken: InjectionToken<ConnectionManager>;
export declare type PlatformId = 'lib' | 'h5' | 'prod' | 'wechat' | 'weapp' | 'alipay' | 'swap' | 'tt' | 'android' | 'ios' | 'admin';
export declare const PLATFORM_ID: InjectionToken<PlatformId>;
export declare const APP_ROOT: InjectionToken<string>;
