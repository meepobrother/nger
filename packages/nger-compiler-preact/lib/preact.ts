import { NgModuleBootstrap, NgModuleRef, PLATFORM_ID, NgerConfig } from 'nger-core';
// 将ng模板编译成preact可以执行的文件
import { NgerCompilerPreactHtml } from './html'
import { NgerCompilerPreactStyle } from './style'
import { NgerCompilerPreactAssets } from './assets'
import { NgerCompilerPreactTypescript } from './typescript'

import * as core from 'nger-core';
import { NgerCompilerNgMetadata } from 'nger-compiler'
import { NgModuleConfig } from './types'
// 提供统一的外观
export class NgerCompilerPreact extends NgModuleBootstrap {
    constructor(
        public html: NgerCompilerPreactHtml,
        public style: NgerCompilerPreactStyle,
        public assets: NgerCompilerPreactAssets,
        public ts: NgerCompilerPreactTypescript,
        public metadata: NgerCompilerNgMetadata,
        public config: NgerConfig
    ) {
        super();
    }
    async run(ref: NgModuleRef<any>) {
        const ngModule = ref.context.getClass(core.NgModuleMetadataKey) as core.NgModuleClassAst;
        // 拿到ngModule的文件名
        const platform = ref.injector.get(PLATFORM_ID);
        const fileName = this.config[platform];
        if (fileName) {
            // 拿到ngModuleMetadata
            const metadata = this.metadata.getMetadata(fileName);
            const config: NgModuleConfig = this.metadata.getNgModuleConfig(metadata as any);
            // 拿到ngModule的配置值
            return Promise.all([
                this.html.run(config),
                this.style.run(config),
                this.assets.run(config),
                this.ts.run(config),
            ]);
        }
    }
}
