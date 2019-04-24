import { Type } from 'nger-core'
export function stringify(token: any): string {
  if (typeof token === 'string') {
    return token;
  }
  if (token && token.name) {
    return `${token.name}`;
  }
  return 'undefined';
}

export function getClosureSafeProperty<T>(objWithPropertyToExtract: T): string {
  for (let key in objWithPropertyToExtract) {
    if (objWithPropertyToExtract[key] === getClosureSafeProperty as any) {
      return key;
    }
  }
  throw Error('Could not find renamed property on target object.');
}

export function forwardRef(forwardRefFn: ForwardRefFn): Type<any> {
  (<any>forwardRefFn).__forward_ref__ = forwardRef;
  (<any>forwardRefFn).toString = function () { return stringify(this()); };
  return (<Type<any>><any>forwardRefFn);
}
export interface ForwardRefFn { (): any; }
const __forward_ref__ = getClosureSafeProperty({ __forward_ref__: getClosureSafeProperty });

export function resolveForwardRef<T>(type: T): T {
  const fn: any = type;
  if (typeof fn === 'function' && fn.hasOwnProperty(__forward_ref__) &&
    fn.__forward_ref__ === forwardRef) {
    return fn();
  } else {
    return type;
  }
}
