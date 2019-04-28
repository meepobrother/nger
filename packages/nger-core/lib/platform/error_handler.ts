import { Logger } from '../sdk/logger';

export abstract class ErrorHandler {
    abstract handleError(error: any): void;
}
export class DefaultErrorHandler extends ErrorHandler {
    constructor(public log: Logger) {
        super();
    }
    handleError(error: any): void {
        this.log.error(`${error.message}`)
    }
}