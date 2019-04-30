Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
describe('test', () => {
    it('it test', () => {
        chai_1.expect(1).to.equal(1);
    });
});

#!/usr/bin/env node
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const nger_core_1 = require("nger-core");
const index_1 = require("./index");
const nger_platform_cli_1 = tslib_1.__importDefault(require("nger-platform-cli"));
const context = nger_core_1.visitor.visitType(index_1.NgerCli);
if (context) {
    nger_platform_cli_1.default([]).bootstrapModule(index_1.NgerCli, {}).then(ref => { });
}

Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const nger_core_1 = require("nger-core");
const path_1 = require("path");
const root = process.cwd();
const public_api_1 = require("./build/public_api");
const fs_extra_1 = tslib_1.__importDefault(require("fs-extra"));
let BuildCommand = class BuildCommand {
    constructor() {
        this.type = 'h5';
        this.watch = false;
    }
    getTypeContext() {
        if (this.type === 'admin') {
            return require(path_1.join(root, 'src/admin')).default;
        }
        else {
            return require(path_1.join(root, 'src/app')).default;
        }
    }
    async run() {
        this.logger.warn(`building ${this.type}`);
        this.logger.warn(`watching: ${!!this.watch}`);
        const app = this.getTypeContext();
        if (app) {
            switch (this.type) {
                case 'h5':
                    this.build.h5(app);
                    break;
                case 'wechat':
                    this.build.wechat(app);
                    break;
                case 'weapp':
                    this.build.weapp(app);
                    break;
                case 'alipay':
                    this.build.alipay(app);
                    break;
                case 'swap':
                    this.build.swap(app);
                    break;
                case 'tt':
                    this.build.tt(app);
                    break;
                case 'android':
                    this.build.android(app);
                    break;
                case 'ios':
                    this.build.ios(app);
                    break;
                case 'admin':
                    this.build.admin(app);
                    break;
                default:
                    const allPkgs = fs_extra_1.default.readdirSync(path_1.join(root, 'packages'));
                    for (let pkg of allPkgs) {
                        if (pkg.startsWith('.')) { }
                        else {
                            this.logger.warn(`build.lib: ${pkg}`);
                            await this.build.lib(pkg);
                        }
                    }
                    break;
            }
        }
    }
};
tslib_1.__decorate([
    nger_core_1.Inject(),
    tslib_1.__metadata("design:type", nger_core_1.Logger)
], BuildCommand.prototype, "logger", void 0);
tslib_1.__decorate([
    nger_core_1.Inject(),
    tslib_1.__metadata("design:type", public_api_1.NgerCliBuild)
], BuildCommand.prototype, "build", void 0);
tslib_1.__decorate([
    nger_core_1.Option({
        alias: 'w'
    }),
    tslib_1.__metadata("design:type", Boolean)
], BuildCommand.prototype, "watch", void 0);
BuildCommand = tslib_1.__decorate([
    nger_core_1.Command({
        name: 'build [type]',
        description: 'build h5|wechat|weapp|alipay|swap|tt|lib',
        example: {
            command: 'nger build weapp --watch',
            description: '构建微信小程序'
        }
    })
], BuildCommand);
exports.BuildCommand = BuildCommand;

Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
tslib_1.__exportStar(require("./build"), exports);
tslib_1.__exportStar(require("./init"), exports);
const build_1 = require("./build");
const init_1 = require("./init");
const test_1 = require("./test");
const start_1 = require("./start");
const publish_1 = require("./publish");
const nger_core_1 = require("nger-core");
const nger_module_pm2_1 = require("nger-module-pm2");
const build_2 = require("./build/build");
const start_2 = require("./start/start");
const pack_1 = require("./pack");
let NgerCli = class NgerCli {
};
NgerCli = tslib_1.__decorate([
    nger_core_1.NgModule({
        imports: [
            nger_module_pm2_1.NgerModulePm2
        ],
        declarations: [
            build_1.BuildCommand,
            init_1.InitCommand,
            test_1.TestCommand,
            start_1.StartCommand,
            publish_1.PublishCommand,
            pack_1.PackCommand // 打包命令
        ],
        providers: [
            start_2.NgerCliStart,
            build_2.NgerCliBuild
        ]
    })
], NgerCli);
exports.NgerCli = NgerCli;

Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const nger_core_1 = require("nger-core");
const path_1 = require("path");
const root = process.cwd();
let InitCommand = class InitCommand {
    constructor() {
        this.name = '';
    }
    run() {
        this.logger.warn(`init ${this.name}`);
        this.logger.warn(`output path: ${path_1.join(root, this.name)}`);
    }
};
tslib_1.__decorate([
    nger_core_1.Inject(),
    tslib_1.__metadata("design:type", nger_core_1.Logger)
], InitCommand.prototype, "logger", void 0);
InitCommand = tslib_1.__decorate([
    nger_core_1.Command({
        name: 'init <name>',
        description: '初始化',
        example: {
            command: 'nger init demo',
            description: '初始化dmeo'
        }
    })
], InitCommand);
exports.InitCommand = InitCommand;

Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const nger_core_1 = require("nger-core");
let PackCommand = class PackCommand {
    run() {
        this.logger.info(`PackCommand is running! name is : ${this.name || ''}`);
        if (this.name) {
            // 打包单个项目
        }
        else {
            // 全部打包
        }
    }
};
tslib_1.__decorate([
    nger_core_1.Inject(),
    tslib_1.__metadata("design:type", nger_core_1.Logger)
], PackCommand.prototype, "logger", void 0);
PackCommand = tslib_1.__decorate([
    nger_core_1.Command({
        name: 'pack [name]',
        description: '打包packages目录下的ts文件',
        example: {
            command: 'nger publish',
            description: '打包packages'
        }
    })
], PackCommand);
exports.PackCommand = PackCommand;

Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const nger_core_1 = require("nger-core");
let PublishCommand = class PublishCommand {
    run() {
        this.logger.warn(`testing`);
    }
};
tslib_1.__decorate([
    nger_core_1.Inject(),
    tslib_1.__metadata("design:type", nger_core_1.Logger)
], PublishCommand.prototype, "logger", void 0);
PublishCommand = tslib_1.__decorate([
    nger_core_1.Command({
        name: 'publish',
        description: '发布src目录下的应用',
        example: {
            command: 'nger publish',
            description: '发布应用'
        }
    })
], PublishCommand);
exports.PublishCommand = PublishCommand;

Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const nger_core_1 = require("nger-core");
const path_1 = require("path");
const root = process.cwd();
const start_1 = require("./start/start");
const nger_di_1 = require("nger-di");
let StartCommand = class StartCommand {
    constructor(injector) {
        this.injector = injector;
        this.type = 'koa';
        this.port = 3000;
        this.dev = false;
    }
    run() {
        nger_core_1.setDevMode(!!this.dev);
        nger_core_1.setPort(this.port || 3000);
        this.logger && this.logger.warn(`start ${this.type}`);
        const source = path_1.join(root, 'src/server');
        const serverSource = require(source).default;
        if (serverSource) {
            switch (this.type) {
                case 'express':
                    this.start.express(serverSource);
                    break;
                case 'koa':
                    this.start.koa(serverSource);
                    break;
                case 'hapi':
                    this.start.hapi(serverSource);
                    break;
                default:
                    break;
            }
        }
    }
};
tslib_1.__decorate([
    nger_core_1.Inject(),
    tslib_1.__metadata("design:type", nger_core_1.Logger)
], StartCommand.prototype, "logger", void 0);
tslib_1.__decorate([
    nger_core_1.Inject(),
    tslib_1.__metadata("design:type", start_1.NgerCliStart)
], StartCommand.prototype, "start", void 0);
tslib_1.__decorate([
    nger_core_1.Option({
        alias: 'p'
    }),
    tslib_1.__metadata("design:type", Number)
], StartCommand.prototype, "port", void 0);
tslib_1.__decorate([
    nger_core_1.Option(),
    tslib_1.__metadata("design:type", Boolean)
], StartCommand.prototype, "dev", void 0);
StartCommand = tslib_1.__decorate([
    nger_core_1.Command({
        name: 'start [type]',
        description: '启动',
        example: {
            command: 'nger start koi [-p 3000 --dev]',
            description: '启动'
        }
    }),
    tslib_1.__param(0, nger_core_1.Inject()),
    tslib_1.__metadata("design:paramtypes", [nger_di_1.Injector])
], StartCommand);
exports.StartCommand = StartCommand;

Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const nger_core_1 = require("nger-core");
const path_1 = require("path");
const mocha_1 = tslib_1.__importDefault(require("mocha"));
const options = {};
const _mocha = new mocha_1.default(options);
let TestCommand = class TestCommand {
    constructor() {
        this.type = 'server';
    }
    run() {
        this.logger.warn(`testing`);
        _mocha.addFile(path_1.join(__dirname, `test/${this.type}.ts`));
        _mocha.run((failures) => { });
    }
};
tslib_1.__decorate([
    nger_core_1.Inject(),
    tslib_1.__metadata("design:type", nger_core_1.Logger)
], TestCommand.prototype, "logger", void 0);
TestCommand = tslib_1.__decorate([
    nger_core_1.Command({
        name: 'test [type]',
        description: '单元测试',
        example: {
            command: 'nger test',
            description: '单元测试'
        }
    })
], TestCommand);
exports.TestCommand = TestCommand;

Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const nger_core_1 = require("nger-core");
const nger_platform_node_1 = tslib_1.__importDefault(require("nger-platform-node"));
const gulp_1 = tslib_1.__importDefault(require("gulp"));
const chalk_1 = tslib_1.__importDefault(require("chalk"));
const rimraf = require("rimraf");
const path_1 = require("path");
const ts = require("gulp-typescript");
const fs_extra_1 = tslib_1.__importDefault(require("fs-extra"));
const root = process.cwd();
let NgerCliBuild = class NgerCliBuild {
    /** 构建h5应用 */
    h5(context) { }
    /** 微信公众号 */
    wechat(context) {
        nger_platform_node_1.default().bootstrapModule(context);
    }
    /** 微信小程序 */
    weapp(context) {
        nger_platform_node_1.default().bootstrapModule(context).then(ref => {
            class ImsDemo {
            }
            const page = ref.componentFactoryResolver.resolveComponentFactory(ImsDemo);
            const pageRef = page.create(ref.injector);
        });
    }
    /** 支付宝小程序 */
    alipay(context) { }
    /** 百度智能 */
    swap(context) { }
    /** 字节跳动 */
    tt(context) { }
    /** 安卓 */
    android(context) { }
    /** ios */
    ios(context) { }
    /** 后台 */
    admin(context) { }
    async lib(name) {
        const output = 'dist';
        await _rimraf(path_1.join(root, output, name));
        await packProject(name, output);
    }
};
NgerCliBuild = tslib_1.__decorate([
    nger_core_1.Injectable()
], NgerCliBuild);
exports.NgerCliBuild = NgerCliBuild;
function _rimraf(dir) {
    return new Promise((resolve, reject) => {
        rimraf(dir, () => resolve());
    });
}
const concat = require('gulp-concat');
async function packProject(name, output = 'dist', srcRoot = 'packages') {
    const destPath = path_1.join(root, output, name);
    const srcPath = path_1.join(root, srcRoot, name);
    const tsProject = ts.createProject(path_1.join(root, 'tsconfig.json'));
    const libPath = path_1.join(srcPath, 'lib');
    fs_extra_1.default.ensureDirSync(libPath);
    const taskTsc = done => {
        const task = gulp_1.default.src(`${srcPath}/**/*.{ts,tsx}`)
            .pipe(tsProject()).pipe(concat('dist/index.js')).pipe(gulp_1.default.dest(destPath));
        // 创建 template inc
        // 创建完毕
        task.on('end', () => {
            console.log(chalk_1.default.yellow(`${name}:tsc finish ${new Date().getTime()}`));
            done();
        });
    };
    const taskCopy = done => {
        const otherTask = gulp_1.default.src([
            `${srcPath}/**/*.{md,json,html,css,less,scss,sass,jpg,jpeg,svg,png,js,jsx,yml}`,
        ]).pipe(gulp_1.default.dest(destPath));
        otherTask.on('end', () => {
            console.log(chalk_1.default.yellow(`${name}:copy finish ${new Date().getTime()}`));
            done();
        });
    };
    const taskFn = gulp_1.default.series(taskTsc, taskCopy);
    return new Promise((resolve) => {
        gulp_1.default.series(taskFn)(() => resolve());
    });
}
exports.packProject = packProject;

Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
tslib_1.__exportStar(require("./build"), exports);

Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
tslib_1.__exportStar(require("./start"), exports);

Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const nger_platform_express_1 = tslib_1.__importDefault(require("nger-platform-express"));
const nger_platform_koa_1 = tslib_1.__importDefault(require("nger-platform-koa"));
const nger_core_1 = require("nger-core");
let NgerCliStart = class NgerCliStart {
    /** express */
    express(type) {
        nger_platform_express_1.default().bootstrapModule(type, {});
    }
    /** koa */
    koa(type) {
        this.logger && this.logger.info(`koa is running`);
        nger_platform_koa_1.default().bootstrapModule(type, {});
    }
    /** hapi */
    async hapi(type) {
    }
};
tslib_1.__decorate([
    nger_core_1.Inject(),
    tslib_1.__metadata("design:type", nger_core_1.Logger)
], NgerCliStart.prototype, "logger", void 0);
NgerCliStart = tslib_1.__decorate([
    nger_core_1.Injectable()
], NgerCliStart);
exports.NgerCliStart = NgerCliStart;

Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const nger_platform_test_1 = tslib_1.__importDefault(require("nger-platform-test"));
const util_1 = require("./util");
const app = util_1.getTypeContext('src/admin');
nger_platform_test_1.default().bootstrapModule(app);

Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const nger_platform_test_1 = tslib_1.__importDefault(require("nger-platform-test"));
const util_1 = require("./util");
const app = util_1.getTypeContext('src/app');
nger_platform_test_1.default().bootstrapModule(app);

Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const nger_platform_test_1 = tslib_1.__importDefault(require("nger-platform-test"));
const util_1 = require("./util");
const app = util_1.getTypeContext('src/server');
nger_platform_test_1.default().bootstrapModule(app);

Object.defineProperty(exports, "__esModule", { value: true });
const root = process.cwd();
const path_1 = require("path");
function getTypeContext(path) {
    const source = path_1.join(root, path);
    return require(source).default;
}
exports.getTypeContext = getTypeContext;
