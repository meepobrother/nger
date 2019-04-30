Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const nger_core_1 = require("nger-core");
const less_1 = require("./less");
const sass_1 = require("./sass");
const csso_1 = require("./csso");
const postcss_1 = require("./postcss");
const stylus_1 = require("./stylus");
let NgerPlatformStyle = class NgerPlatformStyle {
    constructor(less, sass, csso, postcss, stylus) {
        this.less = less;
        this.sass = sass;
        this.csso = csso;
        this.postcss = postcss;
        this.stylus = stylus;
    }
    async compile(code, type) {
        switch (type) {
            case 'less':
                code = await this.less.compile(code, {});
                break;
            case 'sass':
            case 'scss':
                code = await this.sass.compile(code, {});
                break;
            case 'stylus':
                code = await this.stylus.compile(code, {});
                break;
            default:
                break;
        }
        code = await this.postcss.compile(code, {});
        code = await this.csso.compile(code, {});
        return code;
    }
};
NgerPlatformStyle = tslib_1.__decorate([
    nger_core_1.Injectable(),
    tslib_1.__metadata("design:paramtypes", [less_1.NgerCompilerLess,
        sass_1.NgerCompilerSass,
        csso_1.NgerCompilerCsso,
        postcss_1.NgerCompilerPostcss,
        stylus_1.NgerCompilerStylus])
], NgerPlatformStyle);
exports.NgerPlatformStyle = NgerPlatformStyle;
