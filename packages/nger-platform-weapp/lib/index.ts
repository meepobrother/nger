import { TypeContext } from 'ims-decorator';
import { NgModuleMetadataKey, NgModuleClassAst, PageClassAst, ComponentClassAst, InjectableClassAst, PipeClassAst, PageMetadataKey, InputMetadataKey, InputPropertyAst, OnInit } from 'nger-core';
import { PageConstructor, GetCurrentPages, PageInstance } from './weapp/page'
declare const Page: PageConstructor
declare const getCurrentPages: GetCurrentPages
export class NgerPlatformWeapp {
    run(context: TypeContext) {
        const ngModule = context.getClass(NgModuleMetadataKey) as NgModuleClassAst;
        ngModule.declarations.map(de => {
            // 页面
            if (de instanceof PageClassAst) { }
            // 组件
            if (de instanceof ComponentClassAst) { }
            // pipe
            if (de instanceof PipeClassAst) { }
        });
        ngModule.imports.map(de => {
            // ng module
            if (de instanceof NgModuleClassAst) { }
        });
        ngModule._providers.map(de => {
            // injectable
            if (de instanceof InjectableClassAst) { }
        });
    }

    createPage(context: TypeContext, ): PageInstance {
        const page = context.getClass(PageMetadataKey) as PageClassAst;
        const inputs = context.getProperty(InputMetadataKey) as InputPropertyAst[];
        const instance = context.instance;
        let pageInstance: PageInstance = {
            data: {}
        };
        inputs.map(input => {
            const def = input.ast.metadataDef;
            const name = def.bindingPropertyName || input.ast.propertyKey;
            pageInstance.data[name] = context.instance[input.ast.propertyKey];
        });
        if ((instance as OnInit).ngOnInit) {
            pageInstance.onLoad = instance.ngOnInit;
        }
        return pageInstance
    }

    createComponent(context: TypeContext) { }
}