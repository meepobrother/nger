import { makeDecorator, ClassContext, ClassAst } from 'ims-decorator';
export const InjectableMetadataKey = 'InjectableMetadataKey';
import { Type, ValueSansProvider, ExistingSansProvider, StaticClassSansProvider, ConstructorSansProvider, FactorySansProvider, ClassSansProvider } from 'nger-di'
export type InjectableProvider = ValueSansProvider | ExistingSansProvider | StaticClassSansProvider | ConstructorSansProvider | FactorySansProvider | ClassSansProvider;
export type InjectableOptions = {
    providedIn?: Type<any> | 'root' | null;
} & InjectableProvider;

export const Injectable = makeDecorator<InjectableOptions>(InjectableMetadataKey);
export class InjectableClassAst extends ClassContext<InjectableOptions> { }
export function isInjectableClassAst(ast: ClassAst): ast is ClassAst<InjectableOptions> {
    return ast.metadataKey === InjectableMetadataKey;
}
