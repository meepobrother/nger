export function isPromise(obj: any): obj is Promise<any> {
    return !!obj && typeof obj.then === 'function';
}

export function remove<T>(list: T[], el: T): void {
    const index = list.indexOf(el);
    if (index > -1) {
        list.splice(index, 1);
    }
}

export function optionsReducer<T extends Object>(dst: any, objs: T | T[]): T {
    if (Array.isArray(objs)) {
        dst = objs.reduce(optionsReducer, dst);
    } else {
        dst = { ...dst, ...(objs as any) };
    }
    return dst;
}
