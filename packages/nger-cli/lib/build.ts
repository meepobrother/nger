import { Command, Option } from 'nger-core'
import { ConsoleLogger, LogLevel } from 'nger-logger';
@Command({
    name: 'build <type>',
    description: 'build h5|wechat|weapp|alipay|swap|tt',
    example: {
        command: '',
        description: ''
    }
})
export class BuildCommand {
    type: 'h5' | 'wechat' | 'weapp' | 'alipay' | 'swap' | 'tt' = 'h5';

    logger: ConsoleLogger = new ConsoleLogger(LogLevel.debug);

    @Option({
        alias: 'w'
    })
    watch: boolean = false;

    run() {
        this.logger.warn(`building ${this.type}`);
        this.logger.warn(`watching: ${!!this.watch}`);
    }
}