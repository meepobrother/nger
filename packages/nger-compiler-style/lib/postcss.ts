import { Injectable } from 'nger-core'
import postcss, { ProcessOptions, Result } from 'postcss';
import autoprefixer from 'autoprefixer';
@Injectable()
export class NgerCompilerPostcss {
    compile(content: string, config: ProcessOptions): Promise<Buffer> {
        return new Promise((resolve, reject) => {
            postcss([
                autoprefixer({
                    browsers: ['Android >= 2.3', 'Chrome > 20', 'iOS >= 6']
                })
            ]).process(content || '', config)
                .then((result: Result) => {
                    resolve(Buffer.from(result.toString()))
                }, (err) => {
                    reject(err);
                })
                .catch((e) => reject(e));
        });
    }
}