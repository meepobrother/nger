import { PropertyContext, PropertyAst } from 'ims-decorator';
export declare const ContentChildMetadataKey = "ContentChildMetadataKey";
import { Type } from './types';
export interface ContentChildOptions {
    selector: Type<any> | Function | string;
    opts?: {
        read?: any;
    };
}
export declare const ContentChild: (selector: string | Function | Type<any>, opts?: {
    read?: any;
}) => any;
export declare class ContentChildPropertyAst extends PropertyContext<ContentChildOptions> {
}
export declare function isContentChildPropertyAst(ast: PropertyAst): ast is PropertyAst<ContentChildOptions>;
