// 所有的配置都在放在这里
export enum LoggerLevel {
    debug,
    info,
    warn,
    error,
}
import { ConnectionOptions } from 'typeorm';
export interface INgerConfig {
    // 是否监控文件变化
    watch: boolean;
    // 打印日志等级
    loggerLevel: LoggerLevel;
    // 包管理工具
    npm: 'yarn' | 'npm' | 'cnpm';
    // api借口
    api: {
        ip: string;
        port: number;
    };
    // db
    db: ConnectionOptions;
    admin: string;
    h5: string;
    pc: string;
    weapp: string;
    alipay: string;
}
import { InjectionToken } from 'nger-di';
import { Inject } from '../decorators/inject';
type INgerConfigKey = keyof INgerConfig;
export const NGER_CONFIG = new InjectionToken<INgerConfig>(`NGER_CONFIG`)
export class NgerConfig {
    config: any = {}
    constructor(@Inject(NGER_CONFIG) configs: INgerConfig[]) {
        if (Array.isArray(configs)) {
            configs.map(cfg => {
                this.config = {
                    ...this.config,
                    ...cfg
                }
            })
        } else {
        }
    }
    
    get(name: INgerConfigKey): INgerConfig[INgerConfigKey] {
        const config: any = this.config[name];
        if (config) {
            return config
        } else {
            return config;
        }
    }

    set(name: INgerConfigKey, value: INgerConfig[INgerConfigKey]) {
        this.config[name] = value;
    }
}
