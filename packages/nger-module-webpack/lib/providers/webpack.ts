import { Injectable, Inject } from 'nger-core';
import webpack, { Configuration, Compiler } from 'webpack';
import { WebpackConfigToken } from './tokens';
import { WebpackMergeService } from './merge';
import chalk from 'chalk';
import ora from 'ora';

@Injectable()
export class WebpackService {
    @Inject(WebpackConfigToken) configs: Configuration[] = [];

    @Inject() merge: WebpackMergeService;

    serveSpinner: ora.Ora = ora(`Starting development server, please wait~`);

    get compiler(): Compiler {
        console.log(this.configs)
        if (this.configs.length > 1) {
            const config = this.merge.merge(...this.configs)
            return webpack(config)
        } else if (this.configs.length === 1) {
            return webpack(this.configs[0])
        }
        return webpack({})
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
