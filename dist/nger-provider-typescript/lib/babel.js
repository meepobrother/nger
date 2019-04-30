Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const traverse_1 = tslib_1.__importDefault(require("@babel/traverse"));
const generator_1 = tslib_1.__importDefault(require("@babel/generator"));
const parser_1 = require("@babel/parser");
class NgerBabel {
    compile(code) {
        const ast = parser_1.parse(code, {});
        traverse_1.default(ast, {
            StringLiteral(path) {
                const node = path.node;
                if (node.value === 'tslib') {
                    node.value = ``;
                }
            }
        });
        return generator_1.default(ast);
    }
}
exports.NgerBabel = NgerBabel;
