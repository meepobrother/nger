import { NgModule } from 'nger-core'
import pages from './template'
import { NgerWelcomeController } from './inc'
@NgModule({
    declarations: [
        ...pages,
        NgerWelcomeController
    ]
})
export class NgerWelcomeModule { }