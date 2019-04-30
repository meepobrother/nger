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
