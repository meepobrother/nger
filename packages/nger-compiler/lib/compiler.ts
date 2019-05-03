import { NgModuleBootstrap, NgModuleRef, FileSystem,Logger } from 'nger-core';
import chokidar from 'chokidar';
import { join, relative, extname } from 'path'
import { Stats } from 'fs-extra'
import { NgerCompilerNgMetadata } from './helper/ng_metadata'
const root = process.cwd();
import { NgerUtil } from 'nger-util'
import { NgerCompilerBabel } from './ts/babel'
export class NgerCompilerBootstrap extends NgModuleBootstrap {
    constructor(
        public metadata: NgerCompilerNgMetadata,
        public fs: FileSystem,
        public util: NgerUtil,
        public babel: NgerCompilerBabel,
        public logger: Logger
    ) {
        super();
    }
    async run(ref: NgModuleRef<any>) {
        await this.watchTsx();
    }
    async watchTsx() {
        // 监听ts文件变更并生成metadata.json文件
        const framework = join(root, 'framework');
        const addon = join(root, 'addon');
        await this.util.rimraf(join(root, '.temp'));
        chokidar.watch([`${addon}/**/*.(ts|tsx)`, `${framework}/**/*.(ts|tsx)`])
            .on('add', (file, stats) => this.handlerTsxFile('add', file, stats))
            .on('change', (file, stats) => this.handlerTsxFile('change', file, stats))
            .on('error', () => { });
    }
    metadataCache: Map<string, string> = new Map();
    ngModuleMetadataCache: Map<string, any> = new Map();
    handlerTsxFile(opt: 'add' | 'change', file: string, stats: Stats) {
        const metadata = this.metadata.getMetadata(file);
        const relativePath = relative(root, file)
        const ext = extname(relativePath);
        const noExtPath = relativePath.replace(ext, '')
        const metadataPath = join(root, '.temp', `${noExtPath}.metadata.json`);
        this.fs.writeFileSync(metadataPath, JSON.stringify(metadata, null, 2))
        this.metadataCache.set(file, metadataPath)
        // 解析Controller成浏览器端接口
        if (metadata) {
            this.logger.info(`compiler controller`)
            const config = this.metadata.getControllerConfig(metadata);
            if (config) {
                // 是controller
                const code = this.babel.compile(file);
                const controllerPath = join(root, '.temp', `${noExtPath}.js`);
                this.fs.writeFileSync(controllerPath, code)
            }
        }
    }
}