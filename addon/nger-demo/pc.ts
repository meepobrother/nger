import { NgModule } from 'nger-core';
import pages, { NgerDemoPcWelcomePage } from './template/pc';
import incs from './inc';
import ngerPlatformBrowser from 'nger-platform-browser'

@NgModule({
    declarations: [
        ...pages,
    ],
    providers: [
        ...incs
    ],
    bootstrap: [
        NgerDemoPcWelcomePage
    ],
    imports: []
})
export default class NgerDemoPcModule { }
ngerPlatformBrowser().bootstrapModule(NgerDemoPcModule)
