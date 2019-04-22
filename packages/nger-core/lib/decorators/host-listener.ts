import { makeDecorator, PropertyContext, PropertyAst } from 'ims-decorator';
export const HostListenerMetadataKey = 'HostListenerMetadataKey';

export interface HostListenerOptions {
    eventName?: string;
    args?: string[];
}

export const HostListener = (
    eventName?: string,
    args?: string[]
) => {
    return makeDecorator<HostListenerOptions>(HostListenerMetadataKey)({
        eventName,
        args
    });
}
export class HostListenerPropertyAst extends PropertyContext<HostListenerOptions> { }
export function isHostListenerPropertyAst(ast: PropertyAst): ast is PropertyAst<HostListenerOptions> {
    return ast.metadataKey === HostListenerMetadataKey;
}
