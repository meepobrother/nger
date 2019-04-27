import { Command, visitor, Option, Inject, Compiler } from 'nger-core'
import { Logger } from 'nger-logger';
import { join } from 'path';
const root = process.cwd();
import { NgerCliStart } from './start/start';
import { Injector } from 'nger-di';

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

    constructor(@Inject() public injector: Injector) { }

    run() {
        this.injector.debug;
        this.logger && this.logger.warn(`start ${this.type}`);
        const source = join(root, 'src/server')
        const serverSource = require(source).default;
        const compiler = new Compiler();
        const ref = compiler.bootstrap(serverSource)
        if (ref) {
            ref.context.set('port', this.port);
            switch (this.type) {
                case 'express':
                    this.start.express(ref);
                    break;
                case 'koa':
                    this.start.koa(ref);
                    break;
                case 'hapi':
                    this.start.hapi(ref);
                    break;
                default:
                    break;
            }
        }
    }
}