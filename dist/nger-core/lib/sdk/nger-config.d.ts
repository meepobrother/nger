export declare enum LoggerLevel {
    debug = 0,
    info = 1,
    warn = 2,
    error = 3
}
import { ConnectionOptions } from 'typeorm';
export interface INgerConfig {
    watch: boolean;
    loggerLevel: LoggerLevel;
    npm: 'yarn' | 'npm' | 'cnpm';
    api: {
        ip: string;
        port: number;
    };
    db: ConnectionOptions;
    admin: string;
    h5: string;
    pc: string;
    weapp: string;
    alipay: string;
}
import { InjectionToken } from 'nger-di';
declare type INgerConfigKey = keyof INgerConfig;
export declare const NGER_CONFIG: InjectionToken<INgerConfig>;
export declare class NgerConfig {
    config: any;
    constructor(configs: INgerConfig[]);
    get(name: INgerConfigKey): INgerConfig[INgerConfigKey];
    set(name: INgerConfigKey, value: INgerConfig[INgerConfigKey]): void;
}
export {};
