Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const imagemin_1 = tslib_1.__importDefault(require("imagemin"));
const imagemin_mozjpeg_1 = tslib_1.__importDefault(require("imagemin-mozjpeg"));
const imagemin_pngquant_1 = tslib_1.__importDefault(require("imagemin-pngquant"));
const imagemin_svgo_1 = tslib_1.__importDefault(require("imagemin-svgo"));
const nger_core_1 = require("nger-core");
let NgerCompilerImg = class NgerCompilerImg {
    compile(content, config) {
        return new Promise((resolve, reject) => {
            imagemin_1.default([content], {
                plugins: [
                    imagemin_mozjpeg_1.default(config.jpg),
                    imagemin_pngquant_1.default(config.png),
                    imagemin_svgo_1.default(config.svg)
                ]
            }).then(files => {
                const code = files[0].data;
                resolve(code);
            }).catch(e => reject(e));
        });
    }
};
NgerCompilerImg = tslib_1.__decorate([
    nger_core_1.Injectable()
], NgerCompilerImg);
exports.NgerCompilerImg = NgerCompilerImg;
