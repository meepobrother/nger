import { Visitor, NodePath } from '@babel/traverse';
import t from '@babel/types';

export const controllerVisitor: Visitor = {
    // 转义Controller里面的Get/Post等，删除Injector
    ClassMethod(path: NodePath<t.ClassMethod>) { }
}

