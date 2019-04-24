import { Logger } from "./logger";
const RESET = '\x1b[0m';
const RED = '\x1b[31m';
const YELLOW = '\x1b[33m';
const BLUE = '\x1b[36m';
const ZI = '\x1B[35m';
export const DEBUG = `${BLUE}Debug:${RESET}`;
export const WARN = `${YELLOW}Warning:${RESET}`;
export const ERROR = `${RED}Error:${RESET}`;
export const INFO = `${ZI}Info:${RESET}`
export enum LogLevel {
    debug,
    info,
    warn,
    error,
}

export class ConsoleLogger extends Logger {
    constructor(private logLevel: LogLevel) {
        super();
    }
    debug(...args: string[]) {
        if (this.logLevel <= LogLevel.debug) console.debug(DEBUG, ...args);
    }
    info(...args: string[]) {
        if (this.logLevel <= LogLevel.info) console.info(INFO, ...args);
    }
    warn(...args: string[]) {
        if (this.logLevel <= LogLevel.warn) console.warn(WARN, ...args);
    }
    error(...args: string[]) {
        if (this.logLevel <= LogLevel.error) console.error(ERROR, ...args);
    }
}
