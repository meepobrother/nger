import { PropertyContext, PropertyAst } from 'ims-decorator';
export declare const ViewChildMetadataKey = "ViewChildMetadataKey";
import { Type } from './types';
export interface ViewChildOptions {
    selector: Type<any> | Function | string;
    opts?: {
        read?: any;
    };
}
export declare const ViewChild: (selector: string | Function | Type<any>, opts?: {
    read?: any;
}) => any;
export declare class ViewChildPropertyAst extends PropertyContext<ViewChildOptions> {
}
export declare function isViewChildPropertyAst(ast: PropertyAst): ast is PropertyAst<ViewChildOptions>;
