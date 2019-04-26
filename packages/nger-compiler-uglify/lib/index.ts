import { NgModule } from 'nger-core'
import { NgerCompilerUglify } from './uglify';

@NgModule({
    providers: [
        NgerCompilerUglify
    ]
})
export class NgerCompilerUglifyModule { }
