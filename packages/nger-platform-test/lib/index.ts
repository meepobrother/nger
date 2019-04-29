import { expect } from 'chai';
import { NgModuleMetadataKey, createPlatformFactory, NgModuleRef, NgModuleClassAst, ItMetadataKey, ItMethodAst, NgModuleBootstrap } from 'nger-core';
import platformNode from 'nger-platform-node'
export class NgerPlatformTest extends NgModuleBootstrap {
    async run(ref: NgModuleRef<any>) {
        const ngModule = ref.context.getClass(NgModuleMetadataKey) as NgModuleClassAst;
        ngModule.declarations.map(provider => {
            describe(`${provider.target.name}`, () => {
                const itMethods = provider.getMethod(ItMetadataKey) as ItMethodAst[];
                itMethods.map(mt => {
                    const def = mt.ast.metadataDef;
                    it(def.topic, async () => {
                        await def.handler(expect, provider.instance)
                    });
                })
            })
        });
    }
}

export default createPlatformFactory(platformNode, 'test', [{
    provide: NgModuleBootstrap,
    useClass: NgerPlatformTest,
    multi: true,
    deps: []
}])
