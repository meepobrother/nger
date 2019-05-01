import { NgModuleBootstrap, NgModuleRef } from 'nger-core';
// 将ng模板编译成preact可以执行的文件
import { NgerCompilerPreactHtml } from './html'
import { NgerCompilerPreactStyle } from './style'
import { NgerCompilerPreactAssets } from './assets'
import { NgerCompilerPreactTypescript } from './typescript'
// 提供统一的外观
export class NgerCompilerPreact extends NgModuleBootstrap {
    constructor(
        public html: NgerCompilerPreactHtml,
        public style: NgerCompilerPreactStyle,
        public assets: NgerCompilerPreactAssets,
        public ts: NgerCompilerPreactTypescript
    ) {
        super();
    }
    async run(ref: NgModuleRef<any>) {
        return Promise.all([
            this.html.run(ref),
            this.style.run(ref),
            this.assets.run(ref),
            this.ts.run(ref),
        ])
    }
}
