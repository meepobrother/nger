Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const nger_core_1 = require("nger-core");
const csso_1 = tslib_1.__importDefault(require("csso"));
let NgerCompilerCsso = class NgerCompilerCsso {
    compile(content, options) {
        return new Promise((resolve, reject) => {
            const res = csso_1.default.minify(content || '', options);
            resolve(res.css);
        });
    }
};
NgerCompilerCsso = tslib_1.__decorate([
    nger_core_1.Injectable()
], NgerCompilerCsso);
exports.NgerCompilerCsso = NgerCompilerCsso;

Object.defineProperty(exports, "__esModule", { value: true });
const sass_1 = require("./sass");
const less_1 = require("./less");
const stylus_1 = require("./stylus");
const postcss_1 = require("./postcss");
const csso_1 = require("./csso");
const nger_platform_style_1 = require("./nger-platform-style");
exports.NgerPlatformStyle = nger_platform_style_1.NgerPlatformStyle;
const staticProviders = [{
        provide: nger_platform_style_1.NgerPlatformStyle,
        useClass: nger_platform_style_1.NgerPlatformStyle,
        deps: [
            less_1.NgerCompilerLess,
            sass_1.NgerCompilerSass,
            csso_1.NgerCompilerCsso,
            postcss_1.NgerCompilerPostcss,
            stylus_1.NgerCompilerStylus
        ]
    }, {
        provide: sass_1.NgerCompilerSass,
        useClass: sass_1.NgerCompilerSass,
        deps: []
    }, {
        provide: less_1.NgerCompilerLess,
        useClass: less_1.NgerCompilerLess,
        deps: []
    }, {
        provide: stylus_1.NgerCompilerStylus,
        useClass: stylus_1.NgerCompilerStylus,
        deps: []
    }, {
        provide: postcss_1.NgerCompilerPostcss,
        useClass: postcss_1.NgerCompilerPostcss,
        deps: []
    }, {
        provide: csso_1.NgerCompilerCsso,
        useClass: csso_1.NgerCompilerCsso,
        deps: []
    }];
exports.default = staticProviders;

Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const nger_core_1 = require("nger-core");
const less_1 = tslib_1.__importDefault(require("less"));
const fs_extra_1 = tslib_1.__importDefault(require("fs-extra"));
let NgerCompilerLess = class NgerCompilerLess {
    compile(content, config) {
        return new Promise((resolve, reject) => {
            less_1.default.render(content || '', config, async (error, output) => {
                const promises = [];
                let result = ``;
                output.imports.map(imp => {
                    const code = fs_extra_1.default.readFileSync(imp).toString('utf8');
                    promises.push(this.compile(code, config).then(buf => result += buf));
                });
                await Promise.all(promises);
                result += output.css;
                if (error) {
                    reject(error);
                }
                else {
                    resolve(result);
                }
            });
        });
    }
};
NgerCompilerLess = tslib_1.__decorate([
    nger_core_1.Injectable()
], NgerCompilerLess);
exports.NgerCompilerLess = NgerCompilerLess;

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

Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const nger_core_1 = require("nger-core");
const node_sass_1 = tslib_1.__importDefault(require("node-sass"));
/** 代码合并 */
const scss_bundle_1 = require("scss-bundle");
let NgerCompilerSass = class NgerCompilerSass {
    compile(content, config) {
        return new Promise(async (resolve, reject) => {
            let bundledContent = '';
            const { resource, projectDirectory } = config;
            if (resource && projectDirectory) {
                const getBundleContent = async (url) => {
                    const bundler = new scss_bundle_1.Bundler(undefined, projectDirectory);
                    const res = await bundler.Bundle(url);
                    bundledContent += res.bundledContent;
                };
                try {
                    if (typeof resource === 'string') {
                        await getBundleContent(resource);
                    }
                    else if (Array.isArray(resource)) {
                        for (let url of resource) {
                            await getBundleContent(url);
                        }
                    }
                }
                catch (e) {
                    reject(e);
                }
            }
            const opts = {
                ...config,
                data: bundledContent ? bundledContent + content : content
            };
            node_sass_1.default.render(opts, (err, res) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(res.css.toString('utf8'));
                }
            });
        });
    }
};
NgerCompilerSass = tslib_1.__decorate([
    nger_core_1.Injectable()
], NgerCompilerSass);
exports.NgerCompilerSass = NgerCompilerSass;

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

// Type definitions for LESS 3.x
// Project: http://lesscss.org/
// Definitions by: Tom Hasner <https://github.com/thasner>
//                 Pranay Prakash <https://github.com/pranaygp>
//                 Daniel Waxweiler <https://github.com/dwaxweiler>
//                 Richard Lea <https://github.com/chigix>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
