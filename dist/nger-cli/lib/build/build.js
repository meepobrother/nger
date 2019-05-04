"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const nger_core_1 = require("nger-core");
const gulp_1 = tslib_1.__importDefault(require("gulp"));
const chalk_1 = tslib_1.__importDefault(require("chalk"));
const rimraf = require("rimraf");
const path_1 = require("path");
const ts = require("gulp-typescript");
const fs_extra_1 = tslib_1.__importDefault(require("fs-extra"));
const root = process.cwd();
let NgerCliBuild = class NgerCliBuild {
    async dev(name) {
        const output = 'dist';
        await _rimraf(path_1.join(root, output, name));
        await packProject(name, output, 'packages');
    }
    async prod(name) {
        const output = 'node_modules';
        await packProject(name, output, 'packages');
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
async function packProject(name, output = 'dist', srcRoot = 'packages') {
    const destPath = path_1.join(root, output, name);
    const srcPath = path_1.join(root, srcRoot, name);
    const tsProject = ts.createProject(path_1.join(root, 'tsconfig.json'));
    const libPath = path_1.join(srcPath, 'lib');
    fs_extra_1.default.ensureDirSync(libPath);
    const taskTsc = done => {
        const task = gulp_1.default.src(`${srcPath}/**/*.{ts,tsx}`)
            .pipe(tsProject()).pipe(gulp_1.default.dest(destPath));
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
    return new Promise((resolve, reject) => {
        taskTsc((err) => {
            if (err)
                return reject(err);
            taskCopy((err) => {
                if (err)
                    return reject(err);
                resolve();
            });
        });
    });
}
exports.packProject = packProject;
