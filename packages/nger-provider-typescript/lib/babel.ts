import t from '@babel/types';
import template from '@babel/template';
import core from '@babel/core';
import traverse from '@babel/traverse';
import generator from '@babel/generator';
import parser from '@babel/parser';
import tpl from './babel_template';
export class NgerBabel{
    compile(code: string){
        parser(code);
    }
}