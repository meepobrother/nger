import { NgModule } from 'nger-core';
import pages, { NgerDemoAppWelcomePage } from './template/app';
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
        NgerDemoAppWelcomePage
    ],
    imports: []
})
export default class NgerDemoAppModule { }
ngerPlatformBrowser().bootstrapModule(NgerDemoAppModule)
