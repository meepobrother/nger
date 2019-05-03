// 将ng模板编译成preact可以执行的文件
import { NgerComponentConfig } from './types'
import { NgerCompilerImage } from 'nger-compiler'
export class NgerCompilerPreactAssets {
    constructor(public image: NgerCompilerImage) { }
    async run(config: NgerComponentConfig) {
        
    }
}
