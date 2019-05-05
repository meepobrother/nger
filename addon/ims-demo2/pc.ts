import { NgModule } from 'nger-core';
import pages, { ImsDemo2PcWelcomePage } from './template/pc';
import incs from './inc';
import browser from 'nger-platform-browser'

@NgModule({
    declarations: [
        ...pages,
    ],
    providers: [
        ...incs
    ],
    bootstrap: [
        ImsDemo2PcWelcomePage
    ],
    imports: []
})
export default class ImsDemo2PcModule { }
browser().bootstrapModule(ImsDemo2PcModule)
