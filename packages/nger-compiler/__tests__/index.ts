import { createPlatformFactory, NgModule } from 'nger-core'
import ngerPlatformNode from 'nger-platform-node'
import providers from '../lib'
@NgModule()
export class NgerCompilerTestModule { }
createPlatformFactory(ngerPlatformNode, 'test', providers)([]).bootstrapModule(NgerCompilerTestModule)

