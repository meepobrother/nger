import { TypeContext } from 'ims-decorator';
import { expect } from 'chai';
import { NgModuleMetadataKey, NgModuleClassAst, ItMetadataKey, ItMethodAst } from 'nger-core';
export class NgerPlatformCli {
    constructor(public context: TypeContext) { }
    run() {
        const context = this.context;
        const ngModule = context.getClass(NgModuleMetadataKey) as NgModuleClassAst;
        ngModule._providers.map(provider => {
            describe(`${provider.target.name}`, () => {
                const itMethods = provider.getMethod(ItMetadataKey) as ItMethodAst[];
                itMethods.map(mt => {
                    const def = mt.ast.metadataDef;
                    it(def.topic, () => {
                        def.handler(expect, provider.instance)
                    });
                })
            })
        });
    }
}