import { makeDecorator, ClassContext, ClassAst, TypeContext } from 'ims-decorator';
import { Type } from './decorators/types'
export const AddonMetadataKey = 'AddonMetadataKey';
export interface AddonOptions {
    app: Type<any>;
    admin: Type<any>;
    server: Type<any>;
};
export const Addon = makeDecorator<AddonOptions>(AddonMetadataKey);
export class AddonClassAst extends ClassContext<AddonOptions> {
    app: TypeContext | undefined;
    admin: TypeContext | undefined;
    server: TypeContext | undefined;
    constructor(ast: any, context: any) {
        super(ast, context);
        const def = this.ast.metadataDef;
        this.app = this.context.visitType(def.app)
        this.admin = this.context.visitType(def.admin)
        this.server = this.context.visitType(def.server)
    }
}
export function isAddonClassAst(ast: ClassAst): ast is ClassAst<AddonOptions> {
    return ast.metadataKey === AddonMetadataKey;
}
