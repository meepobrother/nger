"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const nger_core_1 = require("nger-core");
const webpack_1 = tslib_1.__importDefault(require("webpack"));
const tokens_1 = require("./tokens");
const merge_1 = require("./merge");
const chalk_1 = tslib_1.__importDefault(require("chalk"));
const ora_1 = tslib_1.__importDefault(require("ora"));
const nger_di_1 = require("nger-di");
let WebpackService = class WebpackService {
    constructor(injector, merge, logger) {
        this.injector = injector;
        this.merge = merge;
        this.logger = logger;
        this.serveSpinner = ora_1.default(`Starting development server, please wait~`);
        /** 运行 */
        this.startTime = new Date().getTime();
    }
    get compiler() {
        const compiler = webpack_1.default(this.config);
        return compiler;
    }
    get config() {
        this.configs = this.injector.get(tokens_1.WebpackConfigToken);
        if (this.configs.length > 1) {
            return this.merge.merge(...this.configs);
        }
        else if (this.configs.length === 1) {
            return this.configs[0];
        }
        return {};
    }
    build() {
        this.compiler.run((err) => {
            this.printBuildError(err);
        });
    }
    printBuildError(err) {
        if (err) {
            const message = err.message;
            const stack = err.stack;
            if (stack && message.indexOf('from UglifyJs') !== -1) {
                try {
                    const matched = /(.+)\[(.+):(.+),(.+)\]\[.+\]/.exec(stack);
                    if (!matched) {
                        throw new Error('Using errors for control flow is bad.');
                    }
                    const problemPath = matched[2];
                    const line = matched[3];
                    const column = matched[4];
                    console.log('Failed to minify the code from this file: \n\n', chalk_1.default.yellow(`\t${problemPath}:${line}${column !== '0' ? ':' + column : ''}`), '\n');
                }
                catch (ignored) {
                    console.log('Failed to minify the bundle.', err);
                }
            }
            else {
                console.log((message || err) + '\n');
            }
        }
        else {
            this.logger.info(`系统构建成功${new Date().getTime() - this.startTime}ms`);
        }
    }
};
WebpackService = tslib_1.__decorate([
    nger_core_1.Injectable(),
    tslib_1.__param(0, nger_core_1.Inject()),
    tslib_1.__param(1, nger_core_1.Inject()),
    tslib_1.__param(2, nger_core_1.Inject()),
    tslib_1.__metadata("design:paramtypes", [nger_di_1.Injector,
        merge_1.WebpackMergeService,
        nger_core_1.Logger])
], WebpackService);
exports.WebpackService = WebpackService;
