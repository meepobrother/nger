import { Injectable, Inject } from 'nger-core';
import webpack, { Configuration, Compiler } from 'webpack';
import { WebpackConfigToken } from './tokens';
import { WebpackMergeService } from './merge';
import chalk from 'chalk';
import ora from 'ora';
import { Injector } from 'nger-di';
import { Store } from 'nger-store'
@Injectable()
export class WebpackService {
    serveSpinner: ora.Ora = ora(`Starting development server, please wait~`);
    constructor(
        @Inject() public injector: Injector,
        @Inject() public merge: WebpackMergeService,
        private store: Store<{ count: number }>
    ) { }

    configs: Configuration[];
    get compiler(): Compiler {
        return webpack(this.config)
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
    build() {
        this.compiler.run((err) => {
            this.printBuildError(err);
        });
    }

    printBuildError(err: Error): void {
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
    }
}
