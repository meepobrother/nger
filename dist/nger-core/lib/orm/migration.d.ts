import { ParserAstContext, ClassAst, ClassContext } from 'ims-decorator';
export declare const MigrationMetadataKey = "MigrationMetadataKey";
export interface MigrationOptions {
}
export declare const Migration: {
    (opt?: MigrationOptions): any;
    (opt?: MigrationOptions): (target: any, propertyKey?: string | symbol, descriptor?: number | TypedPropertyDescriptor<any>) => any;
    new (opt?: MigrationOptions): any;
};
export declare function isMigrationClassAst(val: ClassAst): val is ClassAst<MigrationOptions>;
export declare class MigrationClassAst extends ClassContext<MigrationOptions> {
    constructor(ast: ClassAst, context: ParserAstContext);
}
import { MigrationInterface } from "typeorm";
export declare type Migration = MigrationInterface;
