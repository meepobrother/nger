"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ErrorHandler {
}
exports.ErrorHandler = ErrorHandler;
class DefaultErrorHandler extends ErrorHandler {
    constructor(log) {
        super();
        this.log = log;
    }
    handleError(error) {
        this.log.error(`${error.message}`);
    }
}
exports.DefaultErrorHandler = DefaultErrorHandler;
