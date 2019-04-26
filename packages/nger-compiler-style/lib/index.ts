import { NgModule } from 'nger-core';
import { NgerCompilerSass } from './sass'
import { NgerCompilerLess } from './less'
import { NgerCompilerStylus } from './stylus'
import { NgerCompilerPostcss } from './postcss'

import { NgerUtil } from 'nger-util';
import { NgerCompilerCsso } from './csso';
@NgModule({
    providers: [
        NgerUtil,
        NgerCompilerSass,
        NgerCompilerLess,
        NgerCompilerStylus,
        NgerCompilerPostcss,
        NgerCompilerCsso
    ]
})
export class NgerCompilerSassModule { }

export {
    NgerCompilerSass,
    NgerCompilerLess,
    NgerCompilerStylus,
    NgerCompilerPostcss,
    NgerCompilerCsso
}
