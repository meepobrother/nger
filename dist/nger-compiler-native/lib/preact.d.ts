import { NgModuleBootstrap, NgModuleRef, NgerConfig } from 'nger-core';
import { NgerCompilerPreactHtml } from './html';
import { NgerCompilerPreactStyle } from './style';
import { NgerCompilerPreactAssets } from './assets';
import { NgerCompilerPreactTypescript } from './typescript';
import { NgerCompilerNgMetadata } from 'nger-compiler';
import { NgerCompilerPreactController } from './controller';
export declare class NgerCompilerPreact extends NgModuleBootstrap {
    html: NgerCompilerPreactHtml;
    style: NgerCompilerPreactStyle;
    assets: NgerCompilerPreactAssets;
    ts: NgerCompilerPreactTypescript;
    metadata: NgerCompilerNgMetadata;
    controller: NgerCompilerPreactController;
    config: NgerConfig;
    constructor(html: NgerCompilerPreactHtml, style: NgerCompilerPreactStyle, assets: NgerCompilerPreactAssets, ts: NgerCompilerPreactTypescript, metadata: NgerCompilerNgMetadata, controller: NgerCompilerPreactController, config: NgerConfig);
    run(ref: NgModuleRef<any>): Promise<void>;
}
