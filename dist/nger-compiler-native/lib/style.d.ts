import { NgerComponentConfig } from './types';
import { NgerPlatformStyle } from 'nger-compiler';
export declare class NgerCompilerPreactStyle {
    style: NgerPlatformStyle;
    constructor(style: NgerPlatformStyle);
    run(config: NgerComponentConfig): Promise<void>;
}
