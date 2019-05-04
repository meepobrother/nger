import { ClassContext, ClassAst } from 'ims-decorator';
export interface ChildEntity {
    discriminatorValue?: any;
}
export declare const ChildEntityMetadataKey = "ChildEntityMetadataKey";
export declare const ChildEntity: (discriminatorValue?: any) => any;
export declare function isChildEntityClassAst(val: ClassAst): val is ClassAst<ChildEntity>;
export declare class ChildEntityClassAst extends ClassContext<ChildEntity> {
}
