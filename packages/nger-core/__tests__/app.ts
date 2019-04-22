import { NgModule } from '../lib'
import { IndexPage } from './pages/index/index';
import { ImsHeader } from './components/header/index'
@NgModule({
    declarations: [
        ImsHeader,
        IndexPage
    ]
})
export class App { }
