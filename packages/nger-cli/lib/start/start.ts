import { TypeContext } from 'ims-decorator';
import { ConsoleLogger, LogLevel } from 'nger-logger';
import { NgerPlatformExpress } from 'nger-platform-express'
import { NgerPlatformKoa } from 'nger-platform-koa'

export class NgerStart {
    logger: ConsoleLogger = new ConsoleLogger(LogLevel.debug);
    /** express */
    express(context: TypeContext) {
        new NgerPlatformExpress().bootstrap(context);
    }
    /** koa */
    koa(context: TypeContext) {
        new NgerPlatformKoa().bootstrap(context);
    }
    /** hapi */
    async hapi(context: TypeContext) {
        
    }
}