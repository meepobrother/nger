import { NgModuleBootstrap, NgModuleRef, Logger, PLATFORM_ID, NgerConfig } from 'nger-core';
// 将ng模板编译成preact可以执行的文件
import { NgerCompilerPreactHtml } from './html'
import { NgerCompilerPreactStyle } from './style'
import { NgerCompilerPreactAssets } from './assets'
import { NgerCompilerPreactTypescript } from './typescript'
import { NgerCompilerNgMetadata } from 'nger-compiler'
import { NgerComponentConfig, NgerControllerConfig } from './types'
import { NgerCompilerPreactController } from './controller'
import chokidar from 'chokidar';
import { Stats } from 'fs-extra'
import { join } from 'path';
const root = process.cwd();
// 提供统一的外观
export class NgerCompilerPreact extends NgModuleBootstrap {
    constructor(
        public html: NgerCompilerPreactHtml,
        public style: NgerCompilerPreactStyle,
        public assets: NgerCompilerPreactAssets,
        public ts: NgerCompilerPreactTypescript,
        public metadata: NgerCompilerNgMetadata,
        public controller: NgerCompilerPreactController,
        public config: NgerConfig,
        public logger: Logger
    ) {
        super();
    }
    // 这里需要记录一下
    cache: Map<any,any> = new Map();
    // 任务是去除无用代码
    async run(ref: NgModuleRef<any>) {
        try {
            // 拿到ngModule的文件名
            const framework = join(root, 'framework');
            const addon = join(root, 'addon');
            const handlerFile = async (opt: string, fileName: string, stats: Stats) => {
                this.logger.info(`${opt}: ${fileName} @${stats && stats.atime}`)
                const isFile = stats && stats.isFile()
                if (fileName && !!isFile && (opt === 'add' || opt === 'change')) {
                    // 拿到ngModuleMetadata
                    const metadata = this.metadata.getMetadata(fileName);
                    if (metadata) {
                        // 不用处理component
                        // const component: NgerComponentConfig = this.metadata.getComponentConfig(metadata)
                        // if (component) {
                        //     component.sourceRoot = fileName;
                        //     await Promise.all([
                        //         this.html.run(component),
                        //         this.style.run(component),
                        //         this.assets.run(component),
                        //         this.ts.run(component),
                        //     ]);
                        // }
                        // 处理Controller
                        const controller: NgerControllerConfig = this.metadata.getControllerConfig(metadata);
                        if (controller) {
                            // console.log(controller);
                            controller.sourceRoot = fileName;
                            this.controller.run(controller)
                        }
                    }
                }
            }
            chokidar.watch([addon, framework])
                .on('add', (file, stats) => handlerFile('add', file, stats))
                .on('change', (file, stats) => handlerFile('change', file, stats))
                .on('error', () => { });
        } catch (e) { }
    }
}
