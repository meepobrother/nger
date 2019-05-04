import { NgModuleBootstrap, NgModuleRef, FileSystem } from 'nger-core';
import chokidar from 'chokidar';
import { join } from 'path'
const root = process.cwd();
import { Injector } from 'nger-di'
import { NgerUtil } from 'nger-util'
import { WATCH_TASK } from './tokens/watch_task'
import { NgerCompilerNgMetadata } from './helper/ng_metadata'
import { relative, extname } from 'path';
import { ModuleMetadata } from '@angular/compiler-cli'
export let metadataCache: Map<string, ModuleMetadata> = new Map();
export let hasHandlerFileCache: Set<string> = new Set();
export class NgerCompilerBootstrap extends NgModuleBootstrap {
    constructor(
        public util: NgerUtil,
    ) {
        super();
    }
    async run(ref: NgModuleRef<any>) {
        await this.watchTsx(ref.injector);
    }
    async watchTsx(injector: Injector) {
        // 监听ts文件变更并生成metadata.json文件
        const addon = join(root, 'addon');
        await this.util.rimraf(join(root, '.temp'));
        chokidar.watch([addon])
            .on('add', (path) => {
                this.runTask(injector, path, 'unlinkDir')
            })
            .on('addDir', (path) => {
                this.runTask(injector, path, 'unlinkDir')
            })
            .on('change', (path) => {
                this.runTask(injector, path, 'change')
            })
            .on('unlink', (path) => {
                this.runTask(injector, path, 'unlink')
            })
            .on('unlinkDir', (path) => {
            })
            .on('error', () => { });
    }

    runTask(injector: Injector, path: string, opt: string) {
        const fs = injector.get(FileSystem)
        const stats = fs.statSync(path)
        const isTsFile = path.endsWith('.ts') || path.endsWith('.tsx')
        if (stats.isFile() && isTsFile && stats.size > 0) {
            const ngMetadata = injector.get(NgerCompilerNgMetadata)
            const metadata = ngMetadata.getMetadata(path);
            const relativePath = relative(root, path)
            const ext = extname(relativePath);
            const noExtPath = relativePath.replace(ext, '')
            const metadataPath = join(root, '.temp', `${noExtPath}.metadata.json`);
            if (metadata) {
                fs.writeFileSync(metadataPath, JSON.stringify(metadata, null, 2))
                metadataCache.set(path, metadata);
            }
        }
        const tasks = injector.get(WATCH_TASK);
        tasks.map(task => task(path, opt, injector));
    }
}