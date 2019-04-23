import { Command, visitor, Option } from 'nger-core'
import { ConsoleLogger, LogLevel } from 'nger-logger';
import { join } from 'path';
const root = process.cwd();
import { NgerStart } from './start/public_api'
@Command({
    name: 'start [type]',
    description: '启动',
    example: {
        command: 'nger start express|koi',
        description: '启动'
    }
})
export class StartCommand {
    logger: ConsoleLogger = new ConsoleLogger(LogLevel.debug);
    type: 'express' | 'koa' | 'hapi' = 'express';

    @Option({
        alias: 'p'
    })
    port: number = 3000;

    run() {
        this.logger.warn(`start ${this.type}`);
        const start = new NgerStart();
        const source = join(root, 'src/server')
        const serverSource = require(source).default;
        const app = visitor.visitType(serverSource);
        app.set('port', this.port);
        switch (this.type) {
            case 'express':
                start.express(app);
                break;
            case 'koa':
                start.koa(app);
                break;
            case 'hapi':
                start.hapi(app);
                break;
            default:
                break;
        }
    }
}