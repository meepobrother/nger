import { Command, Option, Inject, setPort, setDevMode, Logger } from 'nger-core'
import { join } from 'path';
const root = process.cwd();
import { NgerCliStart } from './start/start';
import { Injector } from 'nger-di';

@Command({
    name: 'start [type]',
    description: '启动',
    example: {
        command: 'nger start koi [-p 3000 --dev]',
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

    @Option()
    dev: boolean = false;

    constructor(@Inject() public injector: Injector) { }

    run() {
        setDevMode(!!this.dev);
        setPort(this.port || 3000)
        this.logger && this.logger.warn(`start ${this.type}`);
        const source = join(root, 'src/server')
        const serverSource = require(source).default;
        if (serverSource) {
            switch (this.type) {
                case 'express':
                    this.start.express(serverSource);
                    break;
                case 'koa':
                    this.start.koa(serverSource);
                    break;
                case 'hapi':
                    this.start.hapi(serverSource);
                    break;
                default:
                    break;
            }
        }
    }
}