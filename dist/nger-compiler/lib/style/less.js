"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const nger_core_1 = require("nger-core");
const less_1 = tslib_1.__importDefault(require("less"));
const fs_extra_1 = tslib_1.__importDefault(require("fs-extra"));
let NgerCompilerLess = class NgerCompilerLess {
    compile(content, config) {
        return new Promise((resolve, reject) => {
            less_1.default.render(content || '', config, async (error, output) => {
                const promises = [];
                let result = ``;
                output.imports.map(imp => {
                    const code = fs_extra_1.default.readFileSync(imp).toString('utf8');
                    promises.push(this.compile(code, config).then(buf => result += buf));
                });
                await Promise.all(promises);
                result += output.css;
                if (error) {
                    reject(error);
                }
                else {
                    resolve(result);
                }
            });
        });
    }
};
NgerCompilerLess = tslib_1.__decorate([
    nger_core_1.Injectable()
], NgerCompilerLess);
exports.NgerCompilerLess = NgerCompilerLess;
