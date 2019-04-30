import t from '@babel/types';
import template from '@babel/template';
import core from '@babel/core';
import traverse, { NodePath } from '@babel/traverse';
import generator from '@babel/generator';
import { parse } from '@babel/parser';
import tpl from './babel_template';
export class NgerBabel {
    compile(code: string) {
        const ast = parse(code, {});
        traverse(ast, {
            StringLiteral(path: NodePath<t.StringLiteral>) {
                const node = path.node;
                if (node.value === 'tslib') {
                    node.value = ``
                }
            }
        });
        return generator(ast)
    }
}