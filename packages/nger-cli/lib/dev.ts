import { Command, Inject, Logger, createPlatformFactory, NgModule } from 'nger-core'
import ngerCompilerPreact from 'nger-compiler-preact'
import nodePlatform from 'nger-platform-node'

@NgModule()
export class NgerDevModule { }
const devPlatform = createPlatformFactory(nodePlatform, 'dev', ngerCompilerPreact);

@Command({
    name: 'dev',
    description: '开发辅助',
    example: {
        command: 'nger dev',
        description: '开启辅助'
    }
})
export class DevCommand {
    @Inject() logger: Logger;
    run() {
        devPlatform().bootstrapModule(NgerDevModule)
    }
}