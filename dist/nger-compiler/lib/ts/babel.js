"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const traverse_1 = tslib_1.__importDefault(require("@babel/traverse"));
const generator_1 = tslib_1.__importDefault(require("@babel/generator"));
const parser_1 = require("@babel/parser");
const nger_core_1 = require("nger-core");
const fs_extra_1 = tslib_1.__importDefault(require("fs-extra"));
const nger_core_2 = require("nger-core");
const nger_compiler_1 = require("nger-compiler");
const util_1 = require("./util");
let NgerCompilerBabel = class NgerCompilerBabel {
    constructor(ts, visitors, resolver) {
        this.ts = ts;
        this.visitors = visitors;
        this.resolver = resolver;
        this.visitor = util_1.mergeVisitors(this.visitors, this);
    }
    getFileContent(path, config = {}) {
        // 如果文件或目录存在
        let code = fs_extra_1.default.readFileSync(path).toString('utf8');
        if (path.endsWith('.ts') || path.endsWith('tsx')) {
            code = this.ts.compile(code, config);
        }
        return code;
    }
    compile(from, config = {}) {
        // 如果已经处理过了则忽略
        // 拿到文件内容
        let code = this.getFileContent(from, config);
        // 解析
        const ast = parser_1.parse(code, {});
        // 替换处理
        traverse_1.default(ast, this.visitor || {});
        code = generator_1.default(ast).code;
        return code;
    }
};
NgerCompilerBabel = tslib_1.__decorate([
    nger_core_2.Injectable(),
    tslib_1.__metadata("design:paramtypes", [nger_compiler_1.NgerCompilerTypescript, Array, Object])
], NgerCompilerBabel);
exports.NgerCompilerBabel = NgerCompilerBabel;
