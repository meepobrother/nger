import { NgModule } from 'nger-core'
import { HomePage } from './template/admin/home/home';
import { StoreModule } from 'nger-store'
import { EffectsModule } from 'nger-effects'

/** Pc端 */
@NgModule({
    declarations: [
        HomePage
    ],
    bootstrap: [
        HomePage
    ],
    imports: [
        StoreModule.forRoot({}),
        EffectsModule.forRoot([])
    ]
})
export default class NgerAdmin { }
if ((module as any).hot) {
    (module as any).hot.accept()
}
