import { TypeContext } from 'ims-decorator';
import { createServer } from 'http';
import { ConsoleLogger, LogLevel } from 'nger-logger';
import Koa from 'koa';
import hapi from 'hapi';
import { NgerPlatformExpress } from 'nger-platform-express'
export class NgerStart {
    logger: ConsoleLogger = new ConsoleLogger(LogLevel.debug);
    /** express */
    express(context: TypeContext) {
        new NgerPlatformExpress().run(context)
    }
    /** koa */
    koa(context: TypeContext) {
        const app = new Koa();
        const server = createServer(app.callback())
        const port = context.get(`port`);
        server.listen(port, () => {
            this.logger.info(`app start at http://localhost:${port}`)
        });
    }
    /** hapi */
    async hapi(context: TypeContext) {
        const hapiServer = new hapi.Server({
            port: 3000,
            host: 'localhost'
        });
        const server = hapiServer.listener;
        const port = context.get(`port`);
        server.listen(port, () => {
            this.logger.info(`app start at http://localhost:${port}`)
        });
    }
}