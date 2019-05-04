import { Logger } from '../sdk/logger';
export declare abstract class ErrorHandler {
    abstract handleError(error: any): void;
}
export declare class DefaultErrorHandler extends ErrorHandler {
    log: Logger;
    constructor(log: Logger);
    handleError(error: any): void;
}
