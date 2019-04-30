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
            .pipe(tsProject()).pipe(gulp_1.default.dest(destPath));
        //.pipe(
        // concat('dist/index.js')
        // )
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
