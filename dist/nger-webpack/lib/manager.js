"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const webpack_1 = tslib_1.__importDefault(require("webpack"));
const chalk_1 = tslib_1.__importDefault(require("chalk"));
class NgerWebpackManager {
    constructor(logger) {
        this.logger = logger;
        this.options = [];
        this.startTime = new Date().getTime();
    }
    get compiler() {
        return webpack_1.default(this.options);
    }
    build() {
        this.compiler.run((err) => this.printBuildError(err));
    }
    watch() {
        this.compiler.watch({}, (err) => {
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
}
exports.NgerWebpackManager = NgerWebpackManager;
