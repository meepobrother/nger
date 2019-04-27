import { Command, Inject } from 'nger-core'
import { Logger } from 'nger-logger';
import { join } from 'path';
const root = process.cwd();
@Command({
    name: 'init <name>',
    description: '初始化',
    example: {
        command: 'nger init demo',
        description: '初始化dmeo'
    }
})
export class InitCommand {
    @Inject() logger: Logger;
    name: string = '';
    run() {
        this.logger.warn(`init ${this.name}`);
        this.logger.warn(`output path: ${join(root, this.name)}`)
    }
}