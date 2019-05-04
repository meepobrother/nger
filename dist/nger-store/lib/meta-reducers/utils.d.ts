export declare function getUnserializable(target?: any, path?: string[]): false | {
    path: string[];
    value: any;
};
export declare function throwIfUnserializable(unserializable: false | {
    path: string[];
    value: any;
}, context: 'state' | 'action'): void;
/**
 * Object Utilities
 */
export declare function isUndefined(target: any): target is undefined;
export declare function isNull(target: any): target is null;
export declare function isArray(target: any): target is Array<any>;
export declare function isString(target: any): target is string;
export declare function isBoolean(target: any): target is boolean;
export declare function isNumber(target: any): target is number;
export declare function isObjectLike(target: any): target is object;
export declare function isObject(target: any): target is object;
export declare function isPlainObject(target: any): target is object;
export declare function isFunction(target: any): target is Function;
export declare function hasOwnProperty(target: object, propertyName: string): boolean;
