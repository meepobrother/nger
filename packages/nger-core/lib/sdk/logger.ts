export abstract class Logger {
    abstract debug(...msg: any[]): void;
    abstract info(...msg: any[]): void;
    abstract warn(...msg: any[]): void;
    abstract error(...msg: any[]): void;
}

const RESET = '\x1b[0m';
const RED = '\x1b[31m';
const YELLOW = '\x1b[33m';
const BLUE = '\x1b[36m';
const ZI = '\x1B[35m';
const DEBUG = `${BLUE}Debug:${RESET}`;
const WARN = `${YELLOW}Warning:${RESET}`;
const ERROR = `${RED}Error:${RESET}`;
const INFO = `${ZI}Info:${RESET}`
import { LoggerLevel } from './nger-config'
export class ConsoleLogger extends Logger {
    constructor(private loggerLevel: LoggerLevel) {
        super();
    }
    debug(...args: string[]) {
        if (this.loggerLevel <= LoggerLevel.debug) console.debug(DEBUG, ...args);
    }
    info(...args: string[]) {
        if (this.loggerLevel <= LoggerLevel.info) console.info(INFO, ...args);
    }
    warn(...args: string[]) {
        if (this.loggerLevel <= LoggerLevel.warn) console.warn(WARN, ...args);
    }
    error(...args: string[]) {
        if (this.loggerLevel <= LoggerLevel.error) console.error(ERROR, ...args);
    }
}
