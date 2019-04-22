import { TypeContext } from 'ims-decorator';
import { NgModuleMetadataKey, NgModuleClassAst, PageClassAst, ComponentClassAst, InjectableClassAst, PipeClassAst } from 'nger-core';

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
}