import { NgModuleBootstrap, NgModuleRef, NgerConfig } from 'nger-core';
import { NgerCompilerWeappHtml } from './html';
import { NgerCompilerWeappStyle } from './style';
import { NgerCompilerWeappAssets } from './assets';
import { NgerCompilerWeappTypescript } from './typescript';
import { NgerCompilerNgMetadata } from 'nger-compiler';
export declare class NgerCompilerWeapp extends NgModuleBootstrap {
    html: NgerCompilerWeappHtml;
    style: NgerCompilerWeappStyle;
    assets: NgerCompilerWeappAssets;
    ts: NgerCompilerWeappTypescript;
    metadata: NgerCompilerNgMetadata;
    config: NgerConfig;
    constructor(html: NgerCompilerWeappHtml, style: NgerCompilerWeappStyle, assets: NgerCompilerWeappAssets, ts: NgerCompilerWeappTypescript, metadata: NgerCompilerNgMetadata, config: NgerConfig);
    run(ref: NgModuleRef<any>): Promise<void>;
}
