import traverse, { Visitor } from '@babel/traverse';
import generator from '@babel/generator';
import { parse } from '@babel/parser';
import { Resolver } from 'nger-core'
import fs from 'fs-extra';
import { Injectable } from 'nger-core';
import { NgerCompilerTypescript } from 'nger-compiler';
import { mergeVisitors } from './util'
import ts from 'typescript';
@Injectable()
export class NgerCompilerBabel {
    visitor: Visitor;
    constructor(
        public ts: NgerCompilerTypescript,
        public visitors: Visitor[],
        public resolver: Resolver
    ) {
        this.visitor = mergeVisitors(this.visitors, this)
    }
    getFileContent(path: string, config: ts.TranspileOptions = {}) {
        // 如果文件或目录存在
        let code = fs.readFileSync(path).toString('utf8')
        if (path.endsWith('.ts') || path.endsWith('tsx')) {
            code = this.ts.compile(code, config)
        }
        return code;
    }
    compile(from: string, config: ts.TranspileOptions = {}) {
        // 如果已经处理过了则忽略
        // 拿到文件内容
        let code = this.getFileContent(from, config);
        // 解析
        const ast = parse(code, {
            sourceType: 'module',
            plugins:['estree']
        });
        // 替换处理
        traverse(ast, this.visitor || {});
        code = generator(ast).code;
        return code;
    }
}
