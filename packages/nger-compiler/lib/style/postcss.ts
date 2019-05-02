import { Injectable } from 'nger-core'
import postcss, { ProcessOptions, Result } from 'postcss';
import autoprefixer from 'autoprefixer';
@Injectable()
export class NgerCompilerPostcss {
    compileWeapp(content: string, config: ProcessOptions): Promise<string> {
        config.from = ``;
        return new Promise((resolve, reject) => {
            postcss([
                require('wx-px2rpx')()
            ]).process(content || '', config)
                .then((result: Result) => {
                    resolve(result.toString())
                }, (err) => {
                    reject(err);
                })
                .catch((e) => reject(e));
        });
    }
    compile(content: string, config: ProcessOptions): Promise<string> {
        config.from = ``;
        return new Promise((resolve, reject) => {
            postcss([
                autoprefixer({
                    browsers: [
                        'Android >= 4',
                        'iOS >= 6'
                    ],
                    flexbox: 'no-2009'
                })
            ]).process(content || '', config)
                .then((result: Result) => {
                    resolve(result.toString())
                }, (err) => {
                    reject(err);
                })
                .catch((e) => reject(e));
        });
    }
}