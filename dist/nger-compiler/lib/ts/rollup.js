"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const rollup_1 = require("rollup");
const nger_core_1 = require("nger-core");
let NgerCompilerRollup = class NgerCompilerRollup {
    async build(buildOptions) {
        const result = await rollup_1.rollup(buildOptions);
        const outputOptions = {};
        const output = await result.write(outputOptions);
        return output.output;
    }
};
NgerCompilerRollup = tslib_1.__decorate([
    nger_core_1.Injectable()
], NgerCompilerRollup);
exports.NgerCompilerRollup = NgerCompilerRollup;
