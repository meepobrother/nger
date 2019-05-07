"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const nger_core_1 = require("nger-core");
const fs_extra_1 = tslib_1.__importDefault(require("fs-extra"));
const nger_core_2 = require("nger-core");
const nger_compiler_1 = require("nger-compiler");
const { transformSync } = require('@babel/core');
let NgerCompilerBabel = class NgerCompilerBabel {
    constructor(ts, resolver) {
        this.ts = ts;
        this.resolver = resolver;
    }
    getFileContent(path, config = {}) {
        try {
            // 如果文件或目录存在
            let code = fs_extra_1.default.readFileSync(path).toString('utf8');
            if (path.endsWith('.ts') || path.endsWith('tsx')) {
                code = this.ts.compile(code, config);
            }
            return code;
        }
        catch (e) { }
    }
    compile(from, config = {}) {
        // 如果已经处理过了则忽略
        // 拿到文件内容
        let code = this.getFileContent(from, config);
        if (!code) {
            code = ``;
        }
        code = transformSync(code, {}).code;
        return code;
        // 解析
    }
};
NgerCompilerBabel = tslib_1.__decorate([
    nger_core_2.Injectable(),
    tslib_1.__metadata("design:paramtypes", [nger_compiler_1.NgerCompilerTypescript, Object])
], NgerCompilerBabel);
exports.NgerCompilerBabel = NgerCompilerBabel;
