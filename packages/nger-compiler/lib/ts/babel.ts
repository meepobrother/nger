import { Resolver } from 'nger-core'
import fs from 'fs-extra';
import { Injectable } from 'nger-core';
import { NgerCompilerTypescript } from 'nger-compiler';
import ts from 'typescript';
const {transformSync} = require('@babel/core')
@Injectable()
export class NgerCompilerBabel {
    constructor(
        public ts: NgerCompilerTypescript,
        public resolver: Resolver
    ) {}
    getFileContent(path: string, config: ts.TranspileOptions = {}) {
        try{
            // 如果文件或目录存在
            let code = fs.readFileSync(path).toString('utf8')
            if (path.endsWith('.ts') || path.endsWith('tsx')) {
                code = this.ts.compile(code, config)
            }
            return code;
        }catch(e){}
    }
    compile(from: string, config: ts.TranspileOptions = {}) {
        // 如果已经处理过了则忽略
        // 拿到文件内容
        let code = this.getFileContent(from, config);
        if(!code){
            code = ``;
        }
        code = transformSync(code, {}).code
        return code;
        // 解析
    }
}
