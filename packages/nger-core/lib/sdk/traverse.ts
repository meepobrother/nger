import { Visitor } from '@babel/traverse';
import { InjectionToken } from 'nger-di';
export const TraverVisitor = new InjectionToken<Visitor[]>(`TraverVisitor`)