"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const nger_core_1 = require("nger-core");
const typescript_1 = tslib_1.__importDefault(require("typescript"));
const path_1 = require("path");
const root = process.cwd();
const options = require(path_1.join(root, 'tsconfig.json')).compilerOptions;
let NgerCompilerTypescript = class NgerCompilerTypescript {
    constructor() {
        this.options = options;
    }
    compile(content, config = {}) {
        config = {
            compilerOptions: this.options,
            ...config,
        };
        const output = typescript_1.default.transpileModule(content, config);
        return output.outputText;
    }
};
NgerCompilerTypescript = tslib_1.__decorate([
    nger_core_1.Injectable(),
    tslib_1.__metadata("design:paramtypes", [])
], NgerCompilerTypescript);
exports.NgerCompilerTypescript = NgerCompilerTypescript;
