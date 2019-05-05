import { NgModule } from 'nger-core';
import pages, { ImsDemo2AppWelcomePage } from './template/app';
import incs from './inc';
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
