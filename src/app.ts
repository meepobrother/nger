import { NgModule } from 'nger-core';
import { HomePage } from './template/mobile/home/home';
import { NgerUserInjectable } from './template/services/index'
// 小程序/h5等移动端
@NgModule({
    declarations: [
        HomePage
    ],
    providers: [
        NgerUserInjectable
    ],
    fileName: __filename
})
export default class NgerApp { }
