"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nger_core_1 = require("nger-core");
const application_1 = require("tns-core-modules/application");
const profiling_1 = require("tns-core-modules/profiling");
const nger_di_1 = require("nger-di");
const app_host_view_1 = require("./app-host-view");
const nger_platform_native_1 = require("nger-platform-native");
exports.NATIVE_CONFIG = new nger_di_1.InjectionToken(`NATIVE_CONFIG`);
class NgerPlatformNativeBootstrap extends nger_core_1.NgModuleBootstrap {
    async run(ref) {
        this.injector = ref.injector;
        application_1.on('launch', (args) => {
            console.log(`launch`);
        });
        application_1.on('exitEvent', (args) => {
            console.log(`exitEvent`);
        });
        const config = ref.injector.get(exports.NATIVE_CONFIG);
        // ref.componentFactoryResolver.resolveComponentFactory()
        const ngModule = ref.context.getClass(nger_core_1.NgModuleMetadataKey);
        const bootstrap = ngModule.ast.metadataDef.bootstrap;
        const root = document.getElementById('app');
        const application = ref.injector.get(nger_core_1.ApplicationRef);
        let rootContent;
        let tempAppHostView;
        tempAppHostView = new app_host_view_1.AppHostView();
        nger_platform_native_1.setRootPage(tempAppHostView);
        if (bootstrap) {
            bootstrap.map(boot => {
                const factory = ref.componentFactoryResolver.resolveComponentFactory(boot);
                const component = factory.create(ref.injector);
            });
        }
        const launchCallback = profiling_1.profile("nativescript-angular/platform-common.launchCallback", (args) => {
            console.log(`launchCallback`);
        });
        const exitCallback = profiling_1.profile("nativescript-angular/platform-common.exitCallback", (args) => {
            const androidActivity = args.android;
            if (androidActivity && !androidActivity.isFinishing()) {
                return;
            }
            console.log(`exitCallback`);
        });
        application_1.on(application_1.launchEvent, launchCallback);
        application_1.on(application_1.exitEvent, exitCallback);
        application_1.run();
    }
}
exports.NgerPlatformNativeBootstrap = NgerPlatformNativeBootstrap;
