"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nger_core_1 = require("nger-core");
// 提供统一的外观
class NgerCompilerWeapp extends nger_core_1.NgModuleBootstrap {
    constructor(html, style, assets, ts, metadata, config) {
        super();
        this.html = html;
        this.style = style;
        this.assets = assets;
        this.ts = ts;
        this.metadata = metadata;
        this.config = config;
    }
    async run(ref) {
        // 拿到ngModule的文件名
        // const platform = ref.injector.get(PLATFORM_ID);
        // const fileName = this.config[platform];
        // console.log(`NgerCompilerPreact ${platform} ${fileName}`)
        // if (fileName) {
        //     // 拿到ngModuleMetadata
        //     const metadata = this.metadata.getMetadata(fileName);
        //     const config: NgModuleConfig = this.metadata.getNgModuleConfig(metadata as any);
        //     // 拿到ngModule的配置值
        //     return Promise.all([
        //         this.html.run(config),
        //         this.style.run(config),
        //         this.assets.run(config),
        //         this.ts.run(config),
        //     ]);
        // }
    }
}
exports.NgerCompilerWeapp = NgerCompilerWeapp;
