import { makeDecorator, ClassContext, ClassAst, TypeContext } from 'ims-decorator';
export const NgModuleMetadataKey = 'NgModuleMetadataKey';
import { Provider, Type, ModuleWithProviders, SchemaMetadata } from './types'
export interface NgModuleOptions {
    providers?: Provider[];
    declarations?: Array<Type<any> | any[]>;
    imports?: Array<Type<any> | ModuleWithProviders<{}> | any[]>;
    exports?: Array<Type<any> | any[]>;
    entryComponents?: Array<Type<any> | any[]>;
    bootstrap?: Array<Type<any> | any[]>;
    schemas?: Array<SchemaMetadata | any[]>;
    id?: string;
    jit?: true;
}
export const NgModule = makeDecorator<NgModuleOptions>(NgModuleMetadataKey);
export class NgModuleClassAst extends ClassContext<NgModuleOptions> {
    declarations: TypeContext[] = [];
    exports: TypeContext[] = [];
    entryComponents: TypeContext[] = [];
    bootstrap: TypeContext[] = [];
    _imports: TypeContext[] = [];
    _providers: TypeContext[] = [];
    constructor(ast: any, context: any) {
        super(ast, context);
        const def = this.ast.metadataDef;
        if (def.declarations) this.declarations = this.forEachObjectToTypeContent(def.declarations);
        if (def.exports) this.exports = this.forEachObjectToTypeContent(def.exports);
        if (def.entryComponents) this.entryComponents = this.forEachObjectToTypeContent(def.entryComponents);
        if (def.bootstrap) this.bootstrap = this.forEachObjectToTypeContent(def.bootstrap);
        if (def.imports) this._imports = this.forEachObjectToTypeContent(def.imports);
        if (def.providers) this._providers = this.forEachObjectToTypeContent(def.providers);
    }
}
export function isNgModuleClassAst(ast: ClassAst): ast is ClassAst<NgModuleOptions> {
    return ast.metadataKey === NgModuleMetadataKey;
}
