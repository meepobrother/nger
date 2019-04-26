import { Injectable } from 'nger-core'
import sass, { Options, SassError, Result } from 'node-sass';


@Injectable()
export class NgerCompilerSass {
    compile(content: string, config: Options): Promise<Buffer> {
        return new Promise((resolve, reject) => {
            config.data = content;
            sass.render(config, (err: SassError, res: Result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(res.css);
                }
            });
        });
    }
}