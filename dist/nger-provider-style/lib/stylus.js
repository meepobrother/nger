Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const nger_core_1 = require("nger-core");
const stylus_1 = tslib_1.__importDefault(require("stylus"));
class Evaluator {
}
exports.Evaluator = Evaluator;
let NgerCompilerStylus = class NgerCompilerStylus {
    compile(content, config) {
        return new Promise((resolve, reject) => {
            stylus_1.default.render(content || '', config, (err, css, js) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(css);
                }
            });
        });
    }
};
NgerCompilerStylus = tslib_1.__decorate([
    nger_core_1.Injectable()
], NgerCompilerStylus);
exports.NgerCompilerStylus = NgerCompilerStylus;
