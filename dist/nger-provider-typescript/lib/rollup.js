Object.defineProperty(exports, "__esModule", { value: true });
const rollup_1 = require("rollup");
class NgerRollup {
    async build(buildOptions) {
        const result = await rollup_1.rollup(buildOptions);
        const outputOptions = {};
        const output = await result.write(outputOptions);
        return output.output;
    }
}
exports.NgerRollup = NgerRollup;
