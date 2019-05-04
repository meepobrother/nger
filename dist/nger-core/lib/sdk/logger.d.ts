export declare abstract class Logger {
    abstract debug(...msg: any[]): void;
    abstract info(...msg: any[]): void;
    abstract warn(...msg: any[]): void;
    abstract error(...msg: any[]): void;
}
import { LoggerLevel } from './nger-config';
export declare class ConsoleLogger extends Logger {
    private loggerLevel;
    constructor(loggerLevel: LoggerLevel);
    debug(...args: string[]): void;
    info(...args: string[]): void;
    warn(...args: string[]): void;
    error(...args: string[]): void;
}
