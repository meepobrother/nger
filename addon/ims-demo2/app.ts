import { NgModule, ChangeDetectorRef } from 'nger-core';
import pages, { ImsDemo2AppWelcomePage } from './template/app';
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
        ImsDemo2AppWelcomePage
    ],
    imports: []
})
export default class ImsDemo2AppModule { }
browser().bootstrapModule(ImsDemo2AppModule)
