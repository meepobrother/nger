/// <reference types="node" />
import { Options } from 'imagemin-pngquant';
import imageminSvgo from 'imagemin-svgo';
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
export declare class NgerCompilerImage {
    compile(content: string, config: NgerCompilerImgOptions): Promise<{}>;
}
