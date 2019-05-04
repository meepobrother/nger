import { Command, Option, Inject, setPort, setDevMode, Logger, setCurrentDev } from 'nger-core'
import { join } from 'path';
const root = process.cwd();
import { NgerCliStart } from './start/start';
import { Injector } from 'nger-di';

@Command({
    name: 'start [name]',
    description: '启动',
    example: {
        command: 'nger start koi [-p 3000 --dev]',
        description: '启动'
    }
})
export class StartCommand {
    @Inject() logger: Logger;
    name: string;

    @Inject() start: NgerCliStart;

    @Option({
        alias: 'p'
    })
    port: number = 3000;

    @Option({
        alias: 'w'
    })
    watch: boolean = false;

    constructor(@Inject() public injector: Injector) { }

    run() {
        setDevMode(!!this.watch);
        setPort(this.port || 3000);
        this.logger.warn(`starting ${this.name || 'nger'}`);
        this.logger.warn(`watch: ${!!this.watch}`);
        this.logger.warn(`port: ${this.port || 3000}`);
        if (this.name) {
            setCurrentDev(this.name)
            const source = join(root, `addon/${this.name}/server`)
            const serverSource = require(source).default;
            this.start.koa(serverSource);
        }
    }
}