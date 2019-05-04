"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const t = tslib_1.__importStar(require("@babel/types"));
const traverse_1 = tslib_1.__importDefault(require("@babel/traverse"));
const generator_1 = tslib_1.__importDefault(require("@babel/generator"));
const parser_1 = require("@babel/parser");
const path_1 = require("path");
const root = process.cwd();
const fs_extra_1 = tslib_1.__importDefault(require("fs-extra"));
const nger_core_1 = require("nger-core");
const nger_compiler_1 = require("nger-compiler");
const CID = require('cids');
const multihashing = require('multihashing');
function createCid(code) {
    const buf = Buffer.from(code);
    const hash = multihashing(buf, 'sha2-256');
    const cid = new CID(1, 'dag-pb', hash);
    return cid.toString();
}
exports.createCid = createCid;
function getExistFile(path) {
    const ext = ['ts', 'tsx', 'js', 'jsx'].find(ext => fs_extra_1.default.existsSync(`${path}.${ext}`));
    if (ext)
        return `${path}.${ext}`;
    throw new Error(`file not found ${path}`);
}
const babel_template_1 = tslib_1.__importDefault(require("./babel_template"));
let NgerBabel = class NgerBabel {
    constructor(ts) {
        this.ts = ts;
        this.tpl = babel_template_1.default;
        this._cache = new Map();
        this.options = require(path_1.join(root, 'tsconfig.json')).compilerOptions;
        this.includeFiles = [];
    }
    getCache(key) {
        const item = this._cache.get(key);
        if (item)
            return item;
        const ext = path_1.extname(key);
        if (ext) {
            let newKey = key.replace(ext, '');
            return this.getCache(newKey);
        }
    }
    app(platform, main) {
        // 拷贝用到的包
        const ast = this.tpl.app({
            PLATFORM: t.stringLiteral(platform),
            MAIN: t.stringLiteral(main)
        });
        if (Array.isArray(ast)) {
            return ast.map(a => generator_1.default(a).code).join('\n');
        }
        else {
            return generator_1.default(ast).code;
        }
    }
    page(page, name) {
        const ast = this.tpl.page({
            PAGE: t.stringLiteral(page),
            NAME: t.identifier(name)
        });
        if (Array.isArray(ast)) {
            return ast.map(a => generator_1.default(a).code).join('\n');
        }
        else {
            return generator_1.default(ast).code;
        }
    }
    component(arg) {
        return generator_1.default(this.tpl.component(arg)).code;
    }
    // 拷贝单个文件到npm
    copySignal(config) {
        const id = createCid(config.from);
        const libConfig = { ...config, to: path_1.join(config.base, 'npm', `${id}.js`) };
        this.copy(libConfig);
        // 后面会用到
        return libConfig.to.replace(config.base, '');
    }
    // 拷贝某个类库到npm
    copyPkg(config) {
        config.from = require.resolve(config.from);
        const id = createCid(config.from);
        const libConfig = { ...config, to: path_1.join(config.base, 'npm', `${id}.js`) };
        this.copy(libConfig);
        // 后面会用到
        return libConfig.to.replace(config.base, '');
    }
    resolveFile(path) {
        // 是否存在
        if (fs_extra_1.default.existsSync(path)) {
            const stats = fs_extra_1.default.statSync(path);
            if (stats.isFile()) {
                return path;
            }
            if (stats.isDirectory()) {
                return this.resolveFile(path_1.join(path, 'index'));
            }
        }
        else {
            path = getExistFile(path);
            return this.resolveFile(path);
        }
    }
    getFileContent(path) {
        // 如果文件或目录存在
        let code = fs_extra_1.default.readFileSync(path).toString('utf8');
        if (path.endsWith('.ts') || path.endsWith('tsx')) {
            code = this.ts.compile(code, {
                compilerOptions: {
                    ...this.options,
                    allowjs: true
                }
            });
        }
        return code;
    }
    copy(config) {
        // 如果已经处理过了则忽略
        if (this._cache.has(config.from))
            return;
        const from = this.resolveFile(config.from);
        // 拿到文件内容
        let code = this.getFileContent(from);
        // 解析
        const ast = parser_1.parse(code, {});
        // 复制此文件到目标路径
        const that = this;
        // 替换
        traverse_1.default(ast, {
            CallExpression(path) {
                const calleePath = path.get('callee');
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
                                };
                                // 如果是nger就忽略
                                // const __dir = resolveFrom(packName)
                                // console.log(`${packName}`, __dir)
                                if (packName.startsWith('.')) {
                                    // 相对路径
                                    libConfig.from = path_1.join(path_1.dirname(from), packName);
                                    const id = createCid(from);
                                    libConfig.to = path_1.join(config.base, 'npm', `${id}.js`);
                                    that.copy(libConfig);
                                    // 从哪里到哪里
                                    that._cache.set(from, libConfig.to);
                                    // 全部扔到npm里
                                    arg.replaceWith(t.stringLiteral(`./${id}.js`));
                                }
                                else if (packName.startsWith('/')) {
                                    // 绝对路径 判断是否被base目录包含
                                    // throw new Error(`不支持绝对丼引用`)
                                    const id = createCid(packName);
                                    const libConfig = {
                                        from: packName,
                                        to: path_1.join(config.base, 'npm', `${id}.js`),
                                        base: config.base
                                    };
                                    that.copy(libConfig);
                                    arg.replaceWith(t.stringLiteral(`./${id}.js`));
                                }
                                else {
                                    try {
                                        const path = require.resolve(packName);
                                        libConfig.from = path;
                                        // 第三方包 放在/npm目录下 这里为了防止文件重名 直接用cid代替
                                        const id = createCid(libConfig.from);
                                        libConfig.to = path_1.join(config.base, 'npm', `${id}.js`);
                                        that.copy(libConfig);
                                        // const relativePath = relative(dirname(config.to), libConfig.to);
                                        // 替换模板
                                        arg.replaceWith(t.stringLiteral(`./${id}.js`));
                                    }
                                    catch (e) {
                                        // 这里不报错 有可能是二次处理
                                        // 替换模板
                                        // arg.replaceWith(t.stringLiteral(`./${id}.js`))
                                        console.log(`${packName} ${e.message}\n\n${e.stack}\n${code}`);
                                    }
                                }
                            }
                        });
                    }
                }
            }
        });
        code = generator_1.default(ast).code;
        const dir = path_1.dirname(config.to);
        fs_extra_1.default.ensureDirSync(dir);
        fs_extra_1.default.writeFileSync(config.to, code);
        that._cache.set(from, config.to);
    }
};
NgerBabel = tslib_1.__decorate([
    nger_core_1.Injectable(),
    tslib_1.__metadata("design:paramtypes", [nger_compiler_1.NgerCompilerTypescript])
], NgerBabel);
exports.NgerBabel = NgerBabel;
