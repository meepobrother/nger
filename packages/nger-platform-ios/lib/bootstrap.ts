import { NgModuleBootstrap, NgModuleRef } from 'nger-core'
import {
    run as applicationRun
} from "tns-core-modules/application";
import { Injector } from 'nger-di'
export class NgerPlatformIosBootstrap extends NgModuleBootstrap {
    injector: Injector;
    async run(ref: NgModuleRef<any>) {
        this.injector = ref.injector;
        applicationRun();
    }
}
