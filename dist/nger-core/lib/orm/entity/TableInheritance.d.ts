import { ClassAst, ClassContext } from 'ims-decorator';
import { ColumnOptions } from 'typeorm';
export interface TableInheritance {
    pattern?: "STI";
    column?: string | ColumnOptions;
}
export declare const TableInheritanceMetadataKey = "TableInheritanceMetadataKey";
export declare const TableInheritance: {
    (opt?: TableInheritance): any;
    (opt?: TableInheritance): (target: any, propertyKey?: string | symbol, descriptor?: number | TypedPropertyDescriptor<any>) => any;
    new (opt?: TableInheritance): any;
};
export declare function isTableInheritanceClassAst(val: ClassAst): val is ClassAst<TableInheritance>;
export declare class TableInheritanceClassAst extends ClassContext<TableInheritance> {
}
