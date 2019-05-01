import IResolver from 'enhanced-resolve/lib/Resolver';
import { InjectionToken } from 'nger-di';
export interface Resolver extends IResolver { }
export const Resolver = new InjectionToken<IResolver>(`nger core Resolver`);