import { Command, Inject, Logger, FileSystem, FILE_SYSTEM } from '@nger/core'
import { join } from 'path';
const root = process.cwd();
import { build } from './init/create'
@Command({
    name: 'init <name>',
    description: '初始化',
    example: {
        command: 'nger init demo',
        description: '初始化dmeo'
    }
})
export class InitCommand {
    name: string = '';
    constructor(
        @Inject(FILE_SYSTEM) public fs: FileSystem,
        public logger: Logger
    ) { }
    run() {
        const addonPath = join(root, 'addon', this.name);
        this.logger.warn(`init ${this.name}`);
        this.logger.warn(`output path: ${addonPath}`);
        const dataPath = join(root, 'data', this.name);
        const configPath = join(root, 'config', this.name);
        const templatePath = join(root, 'template', this.name);
        this.fs.ensureDirSync(addonPath);
        this.fs.ensureDirSync(dataPath);
        this.fs.ensureDirSync(configPath);
        this.fs.ensureDirSync(templatePath);
        // 初始化项目
        build(this.name)
    }
}