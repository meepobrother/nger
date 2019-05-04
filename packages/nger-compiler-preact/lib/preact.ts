import { NgModuleBootstrap, NgModuleRef, Logger, NgerConfig } from 'nger-core';
// 将ng模板编译成preact可以执行的文件
import { NgerCompilerNgMetadata } from 'nger-compiler'
// 提供统一的外观
export class NgerCompilerPreact extends NgModuleBootstrap {
    constructor(
        public metadata: NgerCompilerNgMetadata,
        public config: NgerConfig,
        public logger: Logger
    ) {
        super();
    }
    // 这里需要记录一下
    cache: Map<any, any> = new Map();
    // 任务是去除无用代码
    async run(ref: NgModuleRef<any>) { }
}
