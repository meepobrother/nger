import { Command } from 'nger-core'
import { ConsoleLogger, LogLevel } from 'nger-logger';

@Command({
    name: 'test',
    description: '单元测试',
    example: {
        command: 'nger test',
        description: '单元测试'
    }
})
export class TestCommand {
    logger: ConsoleLogger = new ConsoleLogger(LogLevel.debug);

    run() {
        this.logger.warn(`testing`);
    }
}