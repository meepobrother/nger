import { NgModuleBootstrap, NgModuleRef, ApplicationRef, NgModuleMetadataKey, NgModuleClassAst } from 'nger-core'
import {
    run as applicationRun,
    on,
    launchEvent,
    LaunchEventData,
    exitEvent,
    ApplicationEventData,
} from "tns-core-modules/application";
import { profile, uptime } from "tns-core-modules/profiling";
import { View } from "tns-core-modules/ui/core/view/view";
import { Injector, InjectionToken } from 'nger-di'
import { AppHostView } from './app-host-view'
import { setRootPage } from 'nger-platform-native'
export const NATIVE_CONFIG = new InjectionToken(`NATIVE_CONFIG`)
export class NgerPlatformNativeBootstrap extends NgModuleBootstrap {
    injector: Injector;
    async run(ref: NgModuleRef<any>) {
        this.injector = ref.injector;
        on('launch', (args) => {
            console.log(`launch`)
        })
        on('exitEvent', (args) => {
            console.log(`exitEvent`)
        });
        const config = ref.injector.get(NATIVE_CONFIG)
        // ref.componentFactoryResolver.resolveComponentFactory()
        const ngModule = ref.context.getClass(NgModuleMetadataKey) as NgModuleClassAst;
        const bootstrap = ngModule.ast.metadataDef.bootstrap;
        const root = document.getElementById('app') as HTMLDivElement;
        const application = ref.injector.get(ApplicationRef)
        let rootContent: View;
        let tempAppHostView: AppHostView;
        tempAppHostView = new AppHostView();
        setRootPage(<any>tempAppHostView);
        if (bootstrap) {
            bootstrap.map(boot => {
                const factory = ref.componentFactoryResolver.resolveComponentFactory(boot)
                const component = factory.create(ref.injector);
            })
        }
        const launchCallback = profile(
            "nativescript-angular/platform-common.launchCallback",
            (args: LaunchEventData) => {
                console.log(`launchCallback`)
            })
        const exitCallback = profile(
            "nativescript-angular/platform-common.exitCallback", (args: ApplicationEventData) => {
                const androidActivity = args.android;
                if (androidActivity && !androidActivity.isFinishing()) {
                    return;
                }
                console.log(`exitCallback`)
            })
        on(launchEvent, launchCallback);
        on(exitEvent, exitCallback);
        applicationRun();
    }
}
