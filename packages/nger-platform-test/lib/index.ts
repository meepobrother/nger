import { TypeContext } from 'ims-decorator';
import { expect } from 'chai';
import { NgModuleMetadataKey, NgModuleClassAst, ItMetadataKey, ItMethodAst, Platform } from 'nger-core';
export class NgerPlatformTest extends Platform {
    async bootstrap(context: TypeContext) {
        if (process) {
            process.on('uncaughtException', (err: Error) => {
                return this.catchError(err)
            });
        }
        try {
            before(async () => {
                await this.init(context);
            });
            await this.run(context);
        } catch (e) {
            this.catchError(e)
        }
    }
    run(context: TypeContext) {
        const ngModule = context.getClass(NgModuleMetadataKey) as NgModuleClassAst;
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