Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const nger_core_1 = require("nger-core");
const uglify_1 = require("./uglify");
let NgerCompilerUglifyModule = class NgerCompilerUglifyModule {
};
NgerCompilerUglifyModule = tslib_1.__decorate([
    nger_core_1.NgModule({
        providers: [
            uglify_1.NgerCompilerUglify
        ]
    })
], NgerCompilerUglifyModule);
exports.NgerCompilerUglifyModule = NgerCompilerUglifyModule;
