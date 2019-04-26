import { NgModule } from 'nger-core';
import { ResourceLoader, NgerResourceLoader } from './resolve_loader'
@NgModule({
    providers: [{
        provide: ResourceLoader,
        useClass: NgerResourceLoader
    }],
    declarations: []
})
export class NgerCompiler { }