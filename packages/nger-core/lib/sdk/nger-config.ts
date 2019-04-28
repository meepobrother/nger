// 所有的配置都在放在这里
export enum LoggerLevel {
    debug,
    info,
    warn,
    error,
}
import { ConnectionOptions } from 'typeorm';
export class NgerConfig {
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
}
