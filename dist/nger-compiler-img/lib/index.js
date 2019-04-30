Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const nger_core_1 = require("nger-core");
const img_1 = require("./img");
let NgerCompilerImgModule = class NgerCompilerImgModule {
};
NgerCompilerImgModule = tslib_1.__decorate([
    nger_core_1.NgModule({
        providers: [
            img_1.NgerCompilerImg
        ]
    })
], NgerCompilerImgModule);
exports.NgerCompilerImgModule = NgerCompilerImgModule;
