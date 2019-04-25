import { Command, Inject } from 'nger-core'
import { Logger } from 'nger-logger';

@Command({
    name: 'pack [name]',
    description: '打包packages目录下的ts文件',
    example: {
        command: 'nger publish',
        description: '打包packages'
    }
})
export class PackCommand {
    @Inject() logger: Logger;

    name: string;

    run() {
        this.logger.info(`PackCommand is running! name is : ${this.name || ''}`);
        if (this.name) {
            // 打包单个项目
        } else {
            // 全部打包
        }
    }
}