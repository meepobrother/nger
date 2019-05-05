import { NgModule } from 'nger-core';
import pages, { ImsDemo2PcWelcomePage } from './template/pc';
import incs from './inc';
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
