import { makeDecorator, ParserAstContext, ClassAst, ClassContext } from 'ims-decorator';
export const MigrationMetadataKey = 'MigrationMetadataKey';
export interface MigrationOptions { }
export const Migration = makeDecorator<MigrationOptions>(MigrationMetadataKey);
export function isMigrationClassAst(val: ClassAst): val is ClassAst<MigrationOptions> {
    return val.metadataKey === MigrationMetadataKey;
}
export class MigrationClassAst extends ClassContext<MigrationOptions> {
    constructor(ast: ClassAst, context: ParserAstContext) {
        super(ast, context);
    }
}
import { MigrationInterface } from "typeorm";
export type Migration = MigrationInterface;