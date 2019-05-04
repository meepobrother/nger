"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Logger {
}
exports.Logger = Logger;
const RESET = '\x1b[0m';
const RED = '\x1b[31m';
const YELLOW = '\x1b[33m';
const BLUE = '\x1b[36m';
const ZI = '\x1B[35m';
const DEBUG = `${BLUE}Debug:${RESET}`;
const WARN = `${YELLOW}Warning:${RESET}`;
const ERROR = `${RED}Error:${RESET}`;
const INFO = `${ZI}Info:${RESET}`;
const nger_config_1 = require("./nger-config");
class ConsoleLogger extends Logger {
    constructor(loggerLevel) {
        super();
        this.loggerLevel = loggerLevel;
    }
    debug(...args) {
        if (this.loggerLevel <= nger_config_1.LoggerLevel.debug)
            console.debug(DEBUG, ...args);
    }
    info(...args) {
        if (this.loggerLevel <= nger_config_1.LoggerLevel.info)
            console.info(INFO, ...args);
    }
    warn(...args) {
        if (this.loggerLevel <= nger_config_1.LoggerLevel.warn)
            console.warn(WARN, ...args);
    }
    error(...args) {
        if (this.loggerLevel <= nger_config_1.LoggerLevel.error)
            console.error(ERROR, ...args);
    }
}
exports.ConsoleLogger = ConsoleLogger;
