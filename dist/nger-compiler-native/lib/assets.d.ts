import { NgerComponentConfig } from './types';
import { NgerCompilerImage } from 'nger-compiler';
export declare class NgerCompilerPreactAssets {
    image: NgerCompilerImage;
    constructor(image: NgerCompilerImage);
    run(config: NgerComponentConfig): Promise<void>;
}
