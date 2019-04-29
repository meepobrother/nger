import { createPlatformFactory, platformCore, NgModuleBootstrap, NgModuleRef, NgModuleMetadataKey, NgModuleClassAst } from 'nger-core'
export class NgerPlatformBrowser extends NgModuleBootstrap {
    async run(ref: NgModuleRef<any>) {
        const ngModule = ref.context.getClass(NgModuleMetadataKey) as NgModuleClassAst;
        const bootstrap = ngModule.ast.metadataDef.bootstrap;
        const root = document.getElementById('root')
        if (bootstrap) {
            bootstrap.map(boot => {
                // 拿到component ref
                const compRef = ref.componentFactoryResolver.resolveComponentFactory(boot).create(ref.injector);
                console.log(compRef);
            });
        }
    }
}
export default createPlatformFactory(platformCore, 'browser', [])