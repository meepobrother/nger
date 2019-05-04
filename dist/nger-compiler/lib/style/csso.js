"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const nger_core_1 = require("nger-core");
const csso_1 = tslib_1.__importDefault(require("csso"));
let NgerCompilerCsso = class NgerCompilerCsso {
    compile(content, options) {
        return new Promise((resolve, reject) => {
            const res = csso_1.default.minify(content || '', options);
            resolve(res.css);
        });
    }
};
NgerCompilerCsso = tslib_1.__decorate([
    nger_core_1.Injectable()
], NgerCompilerCsso);
exports.NgerCompilerCsso = NgerCompilerCsso;
