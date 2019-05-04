import { PropertyContext, PropertyAst } from 'ims-decorator';
export declare const ViewChildrenMetadataKey = "ViewChildrenMetadataKey";
import { Type } from './types';
export interface ViewChildrenOptions {
    selector: Type<any> | Function | string;
    opts?: {
        read?: any;
    };
}
export declare const ViewChildren: (selector: string | Function | Type<any>, opts?: {
    read?: any;
}) => any;
export declare class ViewChildrenPropertyAst extends PropertyContext<ViewChildrenOptions> {
}
export declare function isViewChildrenPropertyAst(ast: PropertyAst): ast is PropertyAst<ViewChildrenOptions>;
