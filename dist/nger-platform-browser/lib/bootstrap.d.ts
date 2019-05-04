import { NgModuleBootstrap, History, NgModuleRef } from 'nger-core';
export declare class NgerPlatformBrowser extends NgModuleBootstrap {
    history: History;
    customElements: CustomElementRegistry;
    elements: Map<any, any>;
    constructor(history: History, customElements: CustomElementRegistry);
    run(ref: NgModuleRef<any>): Promise<void>;
}
