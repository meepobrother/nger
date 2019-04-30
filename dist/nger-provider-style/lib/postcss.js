Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const nger_core_1 = require("nger-core");
const postcss_1 = tslib_1.__importDefault(require("postcss"));
const autoprefixer_1 = tslib_1.__importDefault(require("autoprefixer"));
let NgerCompilerPostcss = class NgerCompilerPostcss {
    compile(content, config) {
        config.from = ``;
        return new Promise((resolve, reject) => {
            postcss_1.default([
                autoprefixer_1.default({
                    browsers: [
                        'Android >= 4',
                        'iOS >= 6'
                    ],
                    flexbox: 'no-2009'
                })
            ]).process(content || '', config)
                .then((result) => {
                resolve(result.toString());
            }, (err) => {
                reject(err);
            })
                .catch((e) => reject(e));
        });
    }
};
NgerCompilerPostcss = tslib_1.__decorate([
    nger_core_1.Injectable()
], NgerCompilerPostcss);
exports.NgerCompilerPostcss = NgerCompilerPostcss;
