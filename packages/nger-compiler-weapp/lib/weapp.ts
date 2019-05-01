import { NgModuleBootstrap, NgModuleRef, PLATFORM_ID, NgerConfig } from 'nger-core';
// 需要将模板转换成weapp
import { NgerCompilerWeappHtml } from './html'
import { NgerCompilerWeappStyle } from './style'
import { NgerCompilerWeappAssets } from './assets'
import { NgerCompilerWeappTypescript } from './typescript'
import * as core from 'nger-core';
import { NgerCompilerNgMetadata } from 'nger-compiler'
import { NgModuleConfig } from './types'
// 提供统一的外观
export class NgerCompilerWeapp extends NgModuleBootstrap {
    constructor(
        public html: NgerCompilerWeappHtml,
        public style: NgerCompilerWeappStyle,
        public assets: NgerCompilerWeappAssets,
        public ts: NgerCompilerWeappTypescript,
        public metadata: NgerCompilerNgMetadata,
        public config: NgerConfig
    ) {
        super();
    }
    async run(ref: NgModuleRef<any>) {
        // 拿到ngModule的文件名
        const platform = ref.injector.get(PLATFORM_ID);
        const fileName = this.config[platform];
        console.log(`NgerCompilerPreact ${platform} ${fileName}`)
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
