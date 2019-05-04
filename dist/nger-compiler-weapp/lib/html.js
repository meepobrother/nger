"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// 需要将模板转换成weapp
class NgerCompilerWeappHtml {
    constructor(injector) {
        this.injector = injector;
    }
    async run(config) {
        const { declarations } = config;
        declarations.map(comp => {
            console.log(comp);
        });
    }
}
exports.NgerCompilerWeappHtml = NgerCompilerWeappHtml;
