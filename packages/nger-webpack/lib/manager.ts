import webpack, { Configuration,Stats } from 'webpack'
import { Logger } from '@nger/core'
import chalk from 'chalk';
export class NgerWebpackManager {
    options: Configuration[] = [];
    constructor(public logger: Logger) { }
    get compiler(): webpack.MultiCompiler {
        return webpack(this.options)
    }
    build() {
        this.compiler.run((err,stats) => this.printBuildError(err,stats));
    }
    watch() {
        this.compiler.watch({}, (err,stats) => {
            this.printBuildError(err,stats)
        })
    }
    startTime: number = new Date().getTime();
    printBuildError(err: Error,stats: Stats): void {
        if (err) {
            const message = err.message
            const stack = err.stack
            if (stack && message.indexOf('from UglifyJs') !== -1) {
                try {
                    const matched = /(.+)\[(.+):(.+),(.+)\]\[.+\]/.exec(stack)
                    if (!matched) {
                        throw new Error('Using errors for control flow is bad.')
                    }
                    const problemPath = matched[2]
                    const line = matched[3]
                    const column = matched[4]
                    console.log('Failed to minify the code from this file: \n\n', chalk.yellow(`\t${problemPath}:${line}${column !== '0' ? ':' + column : ''}`), '\n')
                } catch (ignored) {
                    console.log('Failed to minify the bundle.', err)
                }
            } else {
                console.log((message || err) + '\n')
            }
        } else {
            this.logger.info(`系统构建成功${new Date().getTime() - this.startTime}ms`);
        }
    }
}