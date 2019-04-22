import { makeDecorator, PropertyContext, PropertyAst } from 'ims-decorator';
export const HostBindingMetadataKey = 'HostBindingMetadataKey';

export interface HostBindingOptions {
    hostPropertyName?: string;
}

export const HostBinding = (hostPropertyName?: string) => {
    return makeDecorator<HostBindingOptions>(HostBindingMetadataKey)({
        hostPropertyName
    });
}
export class HostBindingPropertyAst extends PropertyContext<HostBindingOptions> { }
export function isHostBindingPropertyAst(ast: PropertyAst): ast is PropertyAst<HostBindingOptions> {
    return ast.metadataKey === HostBindingMetadataKey;
}
