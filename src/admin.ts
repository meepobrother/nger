import { NgModule } from 'nger-core'
import { HomePage } from './template/admin/home/home';
import { StoreModule } from 'nger-store'
import { EffectsModule } from 'nger-effects'
import ngerPlatformBrowser from 'nger-platform-browser'
import axios from 'nger-platform-axios'
/** Pc端 */
@NgModule({
    declarations: [
        HomePage
    ],
    bootstrap: [
        HomePage
    ],
    providers: [
        ...axios
    ],
    imports: [
        StoreModule.forRoot({}),
        EffectsModule.forRoot([])
    ]
})
export default class NgerAdmin { }

ngerPlatformBrowser().bootstrapModule(NgerAdmin)
if ((module as any).hot) {
    (module as any).hot.accept()
}
