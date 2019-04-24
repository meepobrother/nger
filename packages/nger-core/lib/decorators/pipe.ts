import { makeDecorator, ClassContext, ClassAst } from 'ims-decorator';
export const PipeMetadataKey = 'PipeMetadataKey';

export interface PipeOptions {
    name: string;
    pure?: boolean;
}
export const Pipe = makeDecorator<PipeOptions>(PipeMetadataKey);
export class PipeClassAst extends ClassContext<PipeOptions> { }
export function isPipeClassAst(ast: ClassAst): ast is ClassAst<PipeOptions> {
    return ast.metadataKey === PipeMetadataKey;
}
