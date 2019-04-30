Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const nger_core_1 = require("nger-core");
const typescript_1 = tslib_1.__importDefault(require("typescript"));
const compiler_cli_1 = require("@angular/compiler-cli");
let NgerCompilerTypescript = class NgerCompilerTypescript {
    constructor() { }
    compile(content, config) {
        const output = typescript_1.default.transpileModule(content, config);
        return output.outputText;
    }
    getMetadata(file, compilerOptions) {
        const collector = new compiler_cli_1.MetadataCollector();
        const compilerHost = typescript_1.default.createCompilerHost(compilerOptions);
        const sourceFile = compilerHost.getSourceFile(file, typescript_1.default.ScriptTarget.ESNext);
        if (sourceFile) {
            return collector.getMetadata(sourceFile);
        }
    }
};
NgerCompilerTypescript = tslib_1.__decorate([
    nger_core_1.Injectable(),
    tslib_1.__metadata("design:paramtypes", [])
], NgerCompilerTypescript);
exports.NgerCompilerTypescript = NgerCompilerTypescript;
