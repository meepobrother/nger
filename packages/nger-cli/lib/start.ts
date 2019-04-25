import { Command, visitor, Option, Inject } from 'nger-core'
import { Logger } from 'nger-logger';
import { join } from 'path';
const root = process.cwd();
import { NgerCliStart } from './start/start';

@Command({
    name: 'start [type]',
    description: '启动',
    example: {
        command: 'nger start express|koi',
        description: '启动'
    }
})
export class StartCommand {
    @Inject() logger: Logger;
    type: 'express' | 'koa' | 'hapi' = 'koa';

    @Inject() start: NgerCliStart;

    @Option({
        alias: 'p'
    })
    port: number = 3000;

    run() {
        this.logger.warn(`start ${this.type}`);
        const source = join(root, 'src/server')
        const serverSource = require(source).default;
        const app = visitor.visitType(serverSource);
        if (app) {
            app.set('port', this.port);
            switch (this.type) {
                case 'express':
                    this.start.express(app);
                    break;
                case 'koa':
                    this.start.koa(app);
                    break;
                case 'hapi':
                    this.start.hapi(app);
                    break;
                default:
                    break;
            }
        }
    }
}