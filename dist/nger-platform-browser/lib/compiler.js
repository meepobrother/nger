"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nger_core_1 = require("nger-core");
// 编译模板文件和样式文件还有ts文件处理
class NgerPlatformBrowserPreact extends nger_core_1.NgModuleBootstrap {
    async run(ref) {
        await Promise.all(ref.componentFactoryResolver.getComponents().map(context => { }));
    }
}
exports.NgerPlatformBrowserPreact = NgerPlatformBrowserPreact;
