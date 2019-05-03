// 将ng模板编译成preact可以执行的文件
import { NgerControllerConfig } from './types'
export class NgerCompilerPreactController {
    async run(config: NgerControllerConfig) {
        // 服务端转客户端
        const sourceRoot = config.sourceRoot;

        console.log(config)
    }
}
