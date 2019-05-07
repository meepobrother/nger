import { NgerRenderFactory } from 'nger-core';
import { BrowserRender } from './render'
export class NgerBrowserRenderFactory extends NgerRenderFactory {
    create(instance: any) {
        return new BrowserRender(instance)
    }
}
