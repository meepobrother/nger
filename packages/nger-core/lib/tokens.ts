import { InjectionToken, Type } from 'nger-di'
import { ConnectionOptions, ConnectionManager, Connection } from 'typeorm';

// @Typeorm装饰的类 Multi:true
export const TypeormToken = new InjectionToken<Type<any>>(`TypeormToken`);
// Typeorm配置
export const TypeormOptionsToken = new InjectionToken<ConnectionOptions>(`TypeormOptionsToken`);
// Typeorm Connection
export const ConnectionToken = new InjectionToken<Connection>(`ConnectionToken`)
// ConnectionManagerToken
export const ConnectionManagerToken = new InjectionToken<ConnectionManager>(`ConnectionManagerToken`)
// 开发者模式
export type DevModel = boolean;
export const IS_DEV = new InjectionToken<DevModel>(`IS_DEV`);
// 运行平台
export const PlatformToken = new InjectionToken<DevModel>(`PlatformToken`);
// 平台
export type PlatformId = 'lib' | 'h5' | 'prod' | 'wechat' | 'weapp' | 'alipay' | 'swap' | 'tt' | 'android' | 'ios' | 'admin'
export const PLATFORM_ID = new InjectionToken<PlatformId>(`PLATFORM_ID`)
// webapck打包
export const APP_ROOT = new InjectionToken<string>(`APP_ROOT`)