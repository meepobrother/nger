import { NgModuleBootstrap, NgModuleRef } from 'nger-core';

// 编译模板文件和样式文件还有ts文件处理

export class NgerPlatformBrowserPreact extends NgModuleBootstrap {
    async run(ref: NgModuleRef<any>) {
        await Promise.all(ref.componentFactoryResolver.getComponents().map(context => { }))
    }
}
