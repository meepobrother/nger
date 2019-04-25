import { InjectionToken, Type } from 'nger-di'
import { ConnectionOptions, ConnectionManager } from 'typeorm';
export const TypeormToken = new InjectionToken<Type<any>>(`TypeormToken`)
export const TypeormOptionsToken = new InjectionToken<ConnectionOptions>(`TypeormOptionsToken`)
export const ConnectionManagerToken = new InjectionToken<ConnectionManager>(`ConnectionManagerToken`)
