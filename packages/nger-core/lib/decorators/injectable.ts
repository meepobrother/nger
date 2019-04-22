import { makeDecorator, ClassContext, ClassAst } from 'ims-decorator';
export const InjectableMetadataKey = 'InjectableMetadataKey';
import { Type } from './types'

export interface InjectableOptions {
    providedIn?: Type<any> | 'root' | null;
}
export const Injectable = makeDecorator<InjectableOptions>(InjectableMetadataKey);
export class InjectableClassAst extends ClassContext<InjectableOptions> { }
export function isInjectableClassAst(ast: ClassAst): ast is ClassAst<InjectableOptions> {
    return ast.metadataKey === InjectableMetadataKey;
}
