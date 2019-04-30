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
import { NgerCompilerTypescript } from './typescript';
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

const _cache = new Set();
@Injectable()
export class NgerBabel {
    tpl: typeof _template = _template;

    app(platform: string) {
        const ast = this.tpl.app({
            PLATFORM: t.stringLiteral(platform)
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
    copy(config: { from: string, to: string, base: string }) {
        // 如果已经处理过了则忽略
        if (_cache.has(config.from)) return;
        // 检测文件后缀名
        let from = config.from;
        if (!fs.existsSync(from)) {
            from = getExistFile(config.from);
        }
        if (!fs.existsSync(from)) {
            throw new Error(`file not exist! ${from}`)
        }
        // 拿到文件内容
        let code = ``
        try {
            code = fs.readFileSync(from).toString('utf8')
        } catch (e) {
            // 这里还是不报错了吧
            console.error(from)
        }
        // 先判断文件类型，如果是ts/tsx在先转化为js
        if (from.endsWith('.ts') || from.endsWith('tsx')) {
            code = this.ts.compile(code, {
                compilerOptions: require(join(root, 'tsconfig.json'))
            })
        }
        // 解析
        const ast = parse(code, {});
        // 复制此文件到目标路径
        const that = this;
        // 替换
        traverse(ast, {
            CallExpression(path: NodePath<t.CallExpression>) {
                const calleePath = path.get('callee')
                const args = path.get('arguments')
                if (calleePath.isIdentifier()) {
                    if (calleePath.node.name === 'require') {
                        // 复制 require('tslib')
                        args && args.map(arg => {
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
                                if (packName.includes('__nger__')) {
                                    return;
                                } else if (packName.startsWith('.')) {
                                    // 相对路径
                                    libConfig.from = join(dirname(config.from), packName)
                                    const id = createCid(libConfig.from);
                                    libConfig.to = join(config.base, 'npm', `${id}.js`);
                                    that.copy(libConfig)
                                    _cache.add(libConfig.from)
                                    // const relativePath = relative(dirname(config.to), libConfig.to);
                                    // arg.replaceWith(t.stringLiteral(`npm/${id}.js`))
                                    if (libConfig.to.startsWith('npm/')) {
                                        arg.replaceWith(t.stringLiteral(`./${id}.js`))
                                    } else {
                                        arg.replaceWith(t.stringLiteral(`npm/${id}.js`))
                                    }
                                    // arg.replaceWith(t.stringLiteral(`./${id}.js`))
                                    // const ext = extname(packName) || 'js'
                                    // libConfig.to = join(dirname(config.to), `${packName}.${ext}`);
                                } else if (packName.startsWith('/')) {
                                    // 绝对路径 判断是否被base目录包含
                                    throw new Error(`不支持绝对丼引用`)
                                } else {
                                    try {
                                        const path = require.resolve(packName);
                                        libConfig.from = path;
                                        // 第三方包 放在/npm目录下 这里为了防止文件重名 直接用cid代替
                                        const id = createCid(libConfig.from);
                                        libConfig.to = join(config.base, 'npm', `${id}.js`);
                                        that.copy(libConfig)
                                        _cache.add(libConfig.from)
                                        // const relativePath = relative(dirname(config.to), libConfig.to);
                                        // 替换模板
                                        if (libConfig.to.startsWith('npm/')) {
                                            arg.replaceWith(t.stringLiteral(`./${id}.js`))
                                        } else {
                                            arg.replaceWith(t.stringLiteral(`npm/${id}.js`))
                                        }
                                    } catch (e) {
                                        // 这里不报错 有可能是二次处理
                                        // throw new Error(`${e.message}\n\n${e.stack}`)
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
    }
}