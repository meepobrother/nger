import { makeDecorator, ClassContext, ClassAst, TypeContext } from 'ims-decorator';
export const NgModuleMetadataKey = 'NgModuleMetadataKey';
import {
    Provider, Type, ModuleWithProviders, SchemaMetadata,
    InjectionToken
} from 'nger-di';
export interface NgModuleOptions {
    providers?: Provider[];
    declarations?: Array<Type<any>>;
    imports?: Array<Type<any> | ModuleWithProviders<any>>;
    exports?: Array<Type<any>>;
    entryComponents?: Array<Type<any>>;
    // 这里是启动组件 也就是首页 前端有用
    bootstrap?: Array<Type<any>>;
    schemas?: Array<SchemaMetadata>;
    id?: string;
    jit?: true;
}
export const NgModule = makeDecorator<NgModuleOptions>(NgModuleMetadataKey);
export const APP_ALLREADY = new InjectionToken<(() => void)[]>(`APP_ALLREADY`);
export class NgModuleClassAst extends ClassContext<NgModuleOptions> {
    declarations: TypeContext[] = [];
    constructor(ast: any, context: any) {
        super(ast, context);
    }
}
export function isNgModuleClassAst(ast: ClassAst): ast is ClassAst<NgModuleOptions> {
    return ast.metadataKey === NgModuleMetadataKey;
}
