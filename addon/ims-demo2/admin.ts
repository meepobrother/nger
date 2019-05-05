import { NgModule } from 'nger-core';
import pages, { ImsDemo2AdminWelcomePage } from './template/admin';
import incs from './inc';
@NgModule({
    declarations: [
        ...pages,
    ],
    providers: [
        ...incs
    ],
    bootstrap: [
        ImsDemo2AdminWelcomePage
    ],
    imports: []
})
export default class ImsDemo2AdminModule { }
