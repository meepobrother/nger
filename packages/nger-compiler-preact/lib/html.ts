import { NgModuleBootstrap, NgModuleRef } from 'nger-core';
import { parseTemplate } from '@angular/compiler';
import { NgerPlatformStyle } from 'nger-provider-style'

// 将ng模板编译成preact可以执行的文件
export class NgerCompilerPreactHtml extends NgModuleBootstrap {
    async run(ref: NgModuleRef<any>) { 
        
    }
}
