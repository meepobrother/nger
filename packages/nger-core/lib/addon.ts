import { makeDecorator, ClassContext, ClassAst } from 'ims-decorator';
import { Type } from './decorators/types'
export const AddonMetadataKey = 'AddonMetadataKey';
export interface AddonOptions {
    app: Type<any>;
    admin: Type<any>;
    server: Type<any>;
};
export const Addon = makeDecorator<AddonOptions>(AddonMetadataKey);
export class AddonClassAst extends ClassContext<AddonOptions> { }
export function isAddonClassAst(ast: ClassAst): ast is ClassAst<AddonOptions> {
    return ast.metadataKey === AddonMetadataKey;
}
