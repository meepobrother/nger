import traverse, { Visitor } from '@babel/traverse';
import generator from '@babel/generator';
import { parse } from '@babel/parser';
import { Resolver } from 'nger-core'
import fs from 'fs-extra';
import { Injectable } from 'nger-core';
import { NgerCompilerController } from './controller';
import { mergeVisitors } from './util'
@Injectable()
export class NgerCompilerBabelController {
    visitor: Visitor;
    constructor(
        public ts: NgerCompilerController,
        public visitors: Visitor[],
        public resolver: Resolver
    ) {
        this.visitor = mergeVisitors(this.visitors, this)
    }
    getFileContent(path: string) {
        // 如果文件或目录存在
        let code = fs.readFileSync(path).toString('utf8')
        if (path.endsWith('.ts') || path.endsWith('tsx')) {
            code = this.ts.compile(code)
        }
        return code;
    }
    compile(from: string) {
        // 如果已经处理过了则忽略
        // 拿到文件内容
        let code = this.getFileContent(from);
        // 解析
        const ast = parse(code, {});
        // 替换处理
        traverse(ast, this.visitor || {});
        code = generator(ast).code;
        return code;
    }
}
