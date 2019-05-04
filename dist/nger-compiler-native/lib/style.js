"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const path_1 = require("path");
const fs_extra_1 = tslib_1.__importDefault(require("fs-extra"));
class NgerCompilerPreactStyle {
    constructor(style) {
        this.style = style;
    }
    async run(config) {
        try {
            let styleStr = ``;
            let { styleUrls, styles, sourceRoot } = config;
            let type = 'scss';
            if (styleUrls) {
                styleUrls.map(res => {
                    styleStr += fs_extra_1.default.readFileSync(path_1.join(path_1.dirname(sourceRoot), res)).toString('utf8');
                    type = path_1.extname(res).replace('.', '');
                });
            }
            if (styles) {
                styles.map(res => styleStr += res);
            }
            if (styleStr.length > 0) {
                const code = await this.style.compile(styleStr, type);
                const wxCode = await this.style.compileWeapp(code);
                const root = path_1.dirname(sourceRoot);
                fs_extra_1.default.ensureDirSync(`${root}/h5`);
                fs_extra_1.default.ensureDirSync(`${root}/weapp`);
                fs_extra_1.default.ensureDirSync(`${root}/android`);
                fs_extra_1.default.ensureDirSync(`${root}/ios`);
                fs_extra_1.default.ensureDirSync(`${root}/alipay`);
                fs_extra_1.default.ensureDirSync(`${root}/swan`);
                fs_extra_1.default.ensureDirSync(`${root}/tt`);
                // h5
                fs_extra_1.default.writeFileSync(`${root}/h5/index.css`, code);
                fs_extra_1.default.writeFileSync(`${root}/android/index.css`, code);
                fs_extra_1.default.writeFileSync(`${root}/ios/index.css`, code);
                // 小程序
                fs_extra_1.default.writeFileSync(`${root}/weapp/index.wxss`, wxCode);
                fs_extra_1.default.writeFileSync(`${root}/alipay/index.acss`, wxCode);
                fs_extra_1.default.writeFileSync(`${root}/swan/index.css`, wxCode);
                fs_extra_1.default.writeFileSync(`${root}/tt/index.css`, wxCode);
            }
        }
        catch (e) { }
    }
}
exports.NgerCompilerPreactStyle = NgerCompilerPreactStyle;
