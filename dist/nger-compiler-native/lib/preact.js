"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nger_core_1 = require("nger-core");
const root = process.cwd();
// 提供统一的外观
class NgerCompilerPreact extends nger_core_1.NgModuleBootstrap {
    constructor(html, style, assets, ts, metadata, controller, config) {
        super();
        this.html = html;
        this.style = style;
        this.assets = assets;
        this.ts = ts;
        this.metadata = metadata;
        this.controller = controller;
        this.config = config;
    }
    async run(ref) {
        // 拿到ngModule的文件名
        // const dir = join(root, 'src');
        // watcher(dir, async (opt, fileName) => {
        //     if (fileName && (opt === 'add' || opt === 'change')) {
        //         // 拿到ngModuleMetadata
        //         const metadata = this.metadata.getMetadata(fileName);
        //         if (metadata) {
        //             // 处理component
        //             const component: NgerComponentConfig = this.metadata.getComponentConfig(metadata)
        //             if (component) {
        //                 component.sourceRoot = fileName;
        //                 await Promise.all([
        //                     this.html.run(component),
        //                     this.style.run(component),
        //                     this.assets.run(component),
        //                     this.ts.run(component),
        //                 ]);
        //             }
        //             // 处理Controller
        //             const controller: NgerControllerConfig = this.metadata.getControllerConfig(metadata);
        //             if (controller) {
        //                 // console.log(controller);
        //                 controller.sourceRoot = fileName;
        //                 this.controller.run(controller)
        //             }
        //         }
        //     }
        // })
    }
}
exports.NgerCompilerPreact = NgerCompilerPreact;
