import imagemin from 'imagemin';
import imageminMozjpeg from 'imagemin-mozjpeg';
import imageminPngquant, { Options } from 'imagemin-pngquant';
import imageminSvgo from 'imagemin-svgo';
import { Injectable } from 'nger-core';

export interface NgerCompilerImgOptions {
    jpg?: {
        quality?: number;
        progressive?: boolean;
        targa?: boolean;
        revert?: boolean;
        fastCrush?: boolean;
        dcScanOpt?: boolean;
        trellis?: boolean;
        trellisDC?: boolean;
        tune?: string;
        overshoot?: boolean;
        arithmetic?: boolean;
        dct?: number;
        quantBaseline?: boolean;
        quantTable?: number;
        smooth?: number;
        maxMemory?: number;
        sample?: string[];
        buffer?: Buffer;
    };
    png?: Options;
    svg?: imageminSvgo.Options;
}

@Injectable()
export class NgerCompilerImg {
    compile(content: string, config: NgerCompilerImgOptions) {
        return new Promise((resolve, reject) => {
            imagemin([content], {
                plugins: [
                    imageminMozjpeg(config.jpg),
                    imageminPngquant(config.png),
                    imageminSvgo(config.svg)
                ]
            }).then(files => {
                const code = files[0].data;
                resolve(code)
            }).catch(e => reject(e))
        })
    }
}