import { PropertyContext, PropertyAst } from 'ims-decorator';
export declare const ContentChildrenMetadataKey = "ContentChildrenMetadataKey";
import { Type } from './types';
export interface ContentChildrenOptions {
    selector: Type<any> | Function | string;
    opts?: {
        descendants?: boolean;
        read?: any;
    };
}
export declare const ContentChildren: (selector: string | Function | Type<any>, opts?: {
    descendants?: boolean;
    read?: any;
}) => any;
export declare class ContentChildrenPropertyAst extends PropertyContext<ContentChildrenOptions> {
}
export declare function isContentChildrenPropertyAst(ast: PropertyAst): ast is PropertyAst<ContentChildrenOptions>;
