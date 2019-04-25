import { Injectable, Inject } from 'nger-core';
import webpack, { Configuration, Compiler } from 'webpack';
import { WebpackConfigToken } from './tokens';
import { WebpackMergeService } from './merge';
@Injectable()
export class WebpackService {
    @Inject(WebpackConfigToken) configs: Configuration[];

    @Inject() merge: WebpackMergeService;

    get compiler(): Compiler {
        const config = this.merge.merge(...this.configs)
        return webpack(config)
    }

    /** 运行 */
    run() {
        this.compiler.run(() => { });
    }

    /** watch */
    watch() {
        this.compiler.watch({}, () => { })
    }
}
