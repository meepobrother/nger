import { Injector } from 'nger-di';
import { ComponentRef, NgerRender } from 'nger-core';
export declare class BrowserRender extends NgerRender {
    instance: any;
    constructor(instance?: any);
    create(ref: ComponentRef<any>): any;
}
export declare function render(injector: Injector): (tag: any, props: any, ...children: any[]) => void;
