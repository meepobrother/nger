import { Command, Inject, Logger } from '@nger/core'
@Command({
    name: 'install <name>',
    description: '安装脚本',
    example: {
        command: 'nger install addon',
        description: '安装插件'
    }
})
export class InstallCommand {
    @Inject() logger: Logger;
    name: string = '';
    run() {
        this.logger.warn(`install ${this.name}`);
    }
}