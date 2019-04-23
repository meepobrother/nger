import { TypeContext } from 'ims-decorator';
import { createServer } from 'http';
import Koa from 'koa';
import { ConsoleLogger, LogLevel } from 'nger-logger';
export class NgerPlatformKoa {
    logger: ConsoleLogger = new ConsoleLogger(LogLevel.debug);
    run(context: TypeContext) {
        const app = new Koa();
        const server = createServer(app.callback())
        const port = context.get(`port`);
        server.listen(port, () => {
            this.logger.info(`app start at http://localhost:${port}`)
        });
    }
}