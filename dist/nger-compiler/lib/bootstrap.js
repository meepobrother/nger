"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const nger_core_1 = require("nger-core");
const chokidar_1 = tslib_1.__importDefault(require("chokidar"));
const path_1 = require("path");
const root = process.cwd();
const watch_task_1 = require("./tokens/watch_task");
const ng_metadata_1 = require("./helper/ng_metadata");
const ng_1 = require("./html/ng");
const path_2 = require("path");
exports.metadataCache = new Map();
exports.templateCache = new Map();
exports.hasHandlerFileCache = new Set();
class NgerCompilerBootstrap extends nger_core_1.NgModuleBootstrap {
    constructor(util) {
        super();
        this.util = util;
    }
    async run(ref) {
        await this.watchTsx(ref.injector);
    }
    async watchTsx(injector) {
        // 监听ts文件变更并生成metadata.json文件
        const addon = path_1.join(root, 'addon');
        await this.util.rimraf(path_1.join(root, '.temp'));
        chokidar_1.default.watch([addon])
            .on('add', (path) => {
            this.runTask(injector, path, 'unlinkDir');
        })
            .on('addDir', (path) => {
            this.runTask(injector, path, 'unlinkDir');
        })
            .on('change', (path) => {
            this.runTask(injector, path, 'change');
        })
            .on('unlink', (path) => {
            this.runTask(injector, path, 'unlink');
        })
            .on('unlinkDir', (path) => {
        })
            .on('error', () => { });
    }
    runTask(injector, path, opt) {
        try {
            const fs = injector.get(nger_core_1.FILE_SYSTEM);
            const stats = fs.statSync(path);
            const isTsFile = path.endsWith('.ts') || path.endsWith('.tsx');
            const relativePath = path_2.relative(root, path);
            const ext = path_2.extname(relativePath);
            const noExtPath = relativePath.replace(ext, '');
            if (stats.isFile() && isTsFile && stats.size > 0) {
                const ngMetadata = injector.get(ng_metadata_1.NgerCompilerNgMetadata);
                const metadata = ngMetadata.getMetadata(path);
                const metadataPath = path_1.join(root, '.temp', `${noExtPath}.metadata.json`);
                if (metadata) {
                    fs.writeFileSync(metadataPath, JSON.stringify(metadata, null, 2));
                    exports.metadataCache.set(path, metadata);
                }
            }
            const isHtmlFile = path.endsWith('.html');
            if (isHtmlFile) {
                const ngTpl = injector.get(ng_1.NgerCompilerNgTemplate);
                const code = fs.readFileSync(path).toString('utf8');
                const metadata = ngTpl.parse(code, path);
                const metadataPath = path_1.join(root, '.temp', `${noExtPath}.template.json`);
                if (metadata) {
                    try {
                        const res = clearHtmlTemplate(metadata);
                        fs.writeFileSync(metadataPath, JSON.stringify(res, null, 2));
                        exports.templateCache.set(path, metadata);
                    }
                    catch (e) {
                        console.log(`${e.message}\n${e.stack}`);
                    }
                }
            }
            const tasks = injector.get(watch_task_1.WATCH_TASK);
            tasks.map(task => task(path, opt, injector));
        }
        catch (e) { }
    }
}
exports.NgerCompilerBootstrap = NgerCompilerBootstrap;
function clearHtmlTemplate(json) {
    if (Array.isArray(json)) {
        return json.map(item => clearHtmlTemplate(item));
    }
    else if (!!json && typeof json === 'object') {
        const res = {};
        Object.keys(json).map(key => {
            if (key === 'sourceSpan') { }
            else if (key === 'span') { }
            else if (key === 'location') { }
            else if (key === 'startSourceSpan') { }
            else if (key === 'endSourceSpan') { }
            else {
                res[key] = clearHtmlTemplate(json[key]);
            }
        });
        return res;
    }
    else {
        return json;
    }
}
