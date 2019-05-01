import * as t from '@babel/types';
import template from '@babel/template';
import core from '@babel/core';
import traverse, { NodePath } from '@babel/traverse';
import generator from '@babel/generator';
import { parse } from '@babel/parser';
import tpl from './babel_template';
import { join, dirname, relative, extname } from 'path'
const root = process.cwd();
import fs from 'fs-extra';
import { Injectable } from 'nger-core';
import { NgerCompilerTypescript } from 'nger-compiler';
const CID = require('cids');
const multihashing = require('multihashing')
export function createCid(code: string) {
    const buf = Buffer.from(code)
    const hash = multihashing(buf, 'sha2-256')
    const cid = new CID(1, 'dag-pb', hash)
    return cid.toString()
}
function getExistFile(path: string) {
    const ext = ['ts', 'tsx', 'js', 'jsx'].find(ext => fs.existsSync(`${path}.${ext}`));
    if (ext) return `${path}.${ext}`
    throw new Error(`file not found ${path}`)
}

import _template from './babel_template'
type From = string;
type To = string;

@Injectable()
export class NgerBabel {
    tpl: typeof _template = _template;
    _cache: Map<From, To> = new Map();
    getCache(key: string) {
        const item = this._cache.get(key);
        if (item) return item;
        const ext = extname(key);
        if (ext) {
            let newKey = key.replace(ext, '')
            return this.getCache(newKey)
        }
    }
    app(platform: string, main: string) {
        // 拷贝用到的包
        const ast = this.tpl.app({
            PLATFORM: t.stringLiteral(platform),
            MAIN: t.stringLiteral(main)
        });
        if (Array.isArray(ast)) {
            return ast.map(a => generator(a).code).join('\n')
        } else {
            return generator(ast).code
        }
    }

    page(page: string, name: string) {
        const ast = this.tpl.page({
            PAGE: t.stringLiteral(page),
            NAME: t.identifier(name)
        });
        if (Array.isArray(ast)) {
            return ast.map(a => generator(a).code).join('\n')
        } else {
            return generator(ast).code
        }
    }
    component(arg: any) {
        return generator(this.tpl.component(arg) as any).code
    }
    constructor(public ts: NgerCompilerTypescript) { }
    // 拷贝单个文件到npm
    copySignal(config: { from: string, base: string }) {
        const id = createCid(config.from);
        const libConfig = { ...config, to: join(config.base, 'npm', `${id}.js`) };
        this.copy(libConfig)
        // 后面会用到
        return libConfig.to.replace(config.base, '');
    }
    // 拷贝某个类库到npm
    copyPkg(config: { from: string, base: string }) {
        config.from = require.resolve(config.from)
        const id = createCid(config.from);
        const libConfig = { ...config, to: join(config.base, 'npm', `${id}.js`) };
        this.copy(libConfig)
        // 后面会用到
        return libConfig.to.replace(config.base, '');
    }
    options: any = require(join(root, 'tsconfig.json')).compilerOptions
    resolveFile(path: string) {
        // 是否存在
        if (fs.existsSync(path)) {
            const stats = fs.statSync(path);
            if (stats.isFile()) {
                return path;
            }
            if (stats.isDirectory()) {
                return this.resolveFile(join(path, 'index'))
            }
        } else {
            path = getExistFile(path);
            return this.resolveFile(path)
        }
    }
    getFileContent(path: string) {
        // 如果文件或目录存在
        let code = fs.readFileSync(path).toString('utf8')
        if (path.endsWith('.ts') || path.endsWith('tsx')) {
            code = this.ts.compile(code, {
                compilerOptions: {
                    ...this.options,
                    allowjs: true
                }
            })
        }
        return code;
    }
    includeFiles: string[] = [];
    copy(config: { from: string, to: string, base: string }) {
        // 如果已经处理过了则忽略
        if (this._cache.has(config.from)) return;
        const from = this.resolveFile(config.from);
        // 拿到文件内容
        let code = this.getFileContent(from);
        // 解析
        const ast = parse(code, {});
        // 复制此文件到目标路径
        const that = this;
        // 替换
        traverse(ast, {
            CallExpression(path: NodePath<t.CallExpression>) {
                const calleePath = path.get('callee')
                const args = path.get('arguments') || [];
                if (calleePath.isIdentifier()) {
                    if (calleePath.node.name === 'require') {
                        // 复制 require('tslib')
                        args.map(arg => {
                            if (arg.isStringLiteral()) {
                                // 找到目标名
                                const packName = arg.node.value;
                                // 目标文件的真实地址
                                // 复制到目标目录/npm目录下面
                                // 如果是require('tslib')
                                let libConfig = {
                                    from: '',
                                    to: '',
                                    base: config.base
                                }
                                // 如果是nger就忽略
                                // const __dir = resolveFrom(packName)
                                // console.log(`${packName}`, __dir)
                                if (packName.startsWith('.')) {
                                    // 相对路径
                                    libConfig.from = join(dirname(from), packName)
                                    const id = createCid(from);
                                    libConfig.to = join(config.base, 'npm', `${id}.js`);
                                    that.copy(libConfig)
                                    // 从哪里到哪里
                                    that._cache.set(from, libConfig.to)
                                    // 全部扔到npm里
                                    arg.replaceWith(t.stringLiteral(`./${id}.js`))
                                } else if (packName.startsWith('/')) {
                                    // 绝对路径 判断是否被base目录包含
                                    // throw new Error(`不支持绝对丼引用`)
                                    const id = createCid(packName);
                                    const libConfig = {
                                        from: packName,
                                        to: join(config.base, 'npm', `${id}.js`),
                                        base: config.base
                                    }
                                    that.copy(libConfig);
                                    arg.replaceWith(t.stringLiteral(`./${id}.js`))
                                } else {
                                    try {
                                        const path = require.resolve(packName);
                                        libConfig.from = path;
                                        // 第三方包 放在/npm目录下 这里为了防止文件重名 直接用cid代替
                                        const id = createCid(libConfig.from);
                                        libConfig.to = join(config.base, 'npm', `${id}.js`);
                                        that.copy(libConfig)
                                        // const relativePath = relative(dirname(config.to), libConfig.to);
                                        // 替换模板
                                        arg.replaceWith(t.stringLiteral(`./${id}.js`))
                                    } catch (e) {
                                        // 这里不报错 有可能是二次处理
                                        // 替换模板
                                        // arg.replaceWith(t.stringLiteral(`./${id}.js`))
                                        console.log(`${packName} ${e.message}\n\n${e.stack}\n${code}`)
                                    }
                                }
                            }
                        })
                    }
                }
            }
        });
        code = generator(ast).code;
        const dir = dirname(config.to);
        fs.ensureDirSync(dir)
        fs.writeFileSync(config.to, code)
        that._cache.set(from, config.to)
    }
}