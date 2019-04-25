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

export interface NgerConfig {
    // 包管理工具
    npm: 'yarn' | 'npm' | 'cnpm';
    // api接口地址
    api: {
        ip: string;
        port: number;
    },
    db: ConnectionOptions;
}
