import { NgModuleBootstrap, NgModuleRef, FILE_SYSTEM } from 'nger-core';
import chokidar from 'chokidar';
import { join } from 'path'
const root = process.cwd();
import { Injector } from 'nger-di'
import { NgerUtil } from 'nger-util'
import { WATCH_TASK } from './tokens/watch_task'
import { NgerCompilerNgMetadata } from './helper/ng_metadata'
import { NgerCompilerNgTemplate, Node } from './html/ng'
import { relative, extname } from 'path';
import { ModuleMetadata } from '@angular/compiler-cli'
export let metadataCache: Map<string, ModuleMetadata> = new Map();
export let templateCache: Map<string, Node[]> = new Map();
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
        try {
            const fs = injector.get(FILE_SYSTEM)
            const stats = fs.statSync(path)
            const isTsFile = path.endsWith('.ts') || path.endsWith('.tsx')
            const relativePath = relative(root, path)
            const ext = extname(relativePath);
            const noExtPath = relativePath.replace(ext, '')
            if (stats.isFile() && isTsFile && stats.size > 0) {
                const ngMetadata = injector.get(NgerCompilerNgMetadata)
                const metadata = ngMetadata.getMetadata(path);
                const metadataPath = join(root, '.temp', `${noExtPath}.metadata.json`);
                if (metadata) {
                    fs.writeFileSync(metadataPath, JSON.stringify(metadata, null, 2))
                    metadataCache.set(path, metadata);
                }
            }
            const isHtmlFile = path.endsWith('.html');
            if (isHtmlFile) {
                const ngTpl = injector.get(NgerCompilerNgTemplate);
                const code = fs.readFileSync(path).toString('utf8')
                const metadata = ngTpl.parse(code, path);
                const metadataPath = join(root, '.temp', `${noExtPath}.template.json`);
                if (metadata) {
                    try {
                        const res = clearHtmlTemplate(metadata);
                        fs.writeFileSync(metadataPath, JSON.stringify(res, null, 2))
                        templateCache.set(path, metadata);
                    } catch (e) {
                        console.log(`${e.message}\n${e.stack}`)
                    }
                }
            }
            const tasks = injector.get(WATCH_TASK);
            tasks.map(task => task(path, opt, injector));
        } catch (e) { }
    }
}

function clearHtmlTemplate(json: any) {
    if (Array.isArray(json)) {
        return json.map(item => clearHtmlTemplate(item))
    } else if (!!json && typeof json === 'object') {
        const res: any = {};
        Object.keys(json).map(key => {
            if (key === 'sourceSpan') { }
            else if (key === 'span') { }
            else if (key === 'location') { }
            else if (key === 'startSourceSpan') { }
            else if (key === 'endSourceSpan') { }
            else {
                res[key] = clearHtmlTemplate(json[key])
            }
        })
        return res;
    } else {
        return json;
    }
}