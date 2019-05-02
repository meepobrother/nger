import { Injectable, Inject, Logger } from 'nger-core';
import webpack, { Configuration, Compiler } from 'webpack';
import { WebpackConfigToken } from './tokens';
import { WebpackMergeService } from './merge';
import chalk from 'chalk';
import ora from 'ora';
import { Injector } from 'nger-di';
@Injectable()
export class WebpackService {
    serveSpinner: ora.Ora = ora(`Starting development server, please wait~`);
    constructor(
        @Inject() public injector: Injector,
        @Inject() public merge: WebpackMergeService,
        @Inject() public logger: Logger
    ) { }

    configs: Configuration[];
    get compiler(): Compiler {
        const compiler = webpack(this.config)
        return compiler;
    }
    get config(): Configuration {
        this.configs = this.injector.get(WebpackConfigToken) as Configuration[];
        if (this.configs.length > 1) {
            return this.merge.merge(...this.configs)
        } else if (this.configs.length === 1) {
            return this.configs[0]
        }
        return {}
    }

    /** 运行 */
    startTime = new Date().getTime();
    build() {
        this.compiler.run((err) => {
            this.printBuildError(err);
        });
    }

    printBuildError(err: Error): void {
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
