import { TypeContext, Type } from 'ims-decorator';
import { Injectable, PLATFORM_ID, IS_DEV } from 'nger-core';
import ngerPlatformNode from 'nger-platform-node'
import gulp from 'gulp';
import chalk from 'chalk';
import rimraf = require('rimraf');
import { join } from 'path';
import ts = require('gulp-typescript');
import fs from 'fs-extra';
import platformBuildAdmin from './builder/admin';
import { NgerCliBuildAminBuilder } from './builder/admin';
import ngerPlatformPreact from 'nger-compiler-preact';
const root = process.cwd();
@Injectable()
export class NgerCliBuild {
    /** 构建h5应用 */
    h5(context: TypeContext) { }
    /** 微信公众号 */
    wechat(context: Type<any>) {
        ngerPlatformNode().bootstrapModule(context)
    }
    /** 微信小程序 */
    weapp(context: Type<any>) {
        ngerPlatformNode().bootstrapModule(context).then(ref => { })
    }
    /** 支付宝小程序 */
    alipay(context: TypeContext) { }
    /** 百度智能 */
    swap(context: TypeContext) { }
    /** 字节跳动 */
    tt(context: TypeContext) { }
    /** 安卓 */
    android(context: TypeContext) { }
    /** ios */
    ios(context: TypeContext) { }
    /** 后台 */
    async admin(isDev: boolean) {
        await _rimraf(join(root, 'template/admin'));
        const compilers = isDev ? ngerPlatformPreact : [];
        platformBuildAdmin([{
            provide: PLATFORM_ID,
            useValue: 'admin'
        }, {
            provide: IS_DEV,
            useValue: isDev
        }, ...compilers]).bootstrapModule(NgerCliBuildAminBuilder).then(ref => { })
    }

    async dev(name: string) {
        const output = 'dist'
        await _rimraf(join(root, output, name));
        await packProject(name, output, 'packages');
    }

    async prod(name: string) {
        const output = 'node_modules'
        // await _rimraf(join(root, output, name));
        await packProject(name, output, 'packages');
    }
}

function _rimraf(dir: string) {
    return new Promise((resolve, reject) => {
        rimraf(dir, () => resolve())
    });
}
export async function packProject(
    name: string,
    output: string = 'dist',
    srcRoot: string = 'packages',
) {
    const destPath = join(root, output, name);
    const srcPath = join(root, srcRoot, name);
    const tsProject = ts.createProject(join(root, 'tsconfig.json'));
    const libPath = join(srcPath, 'lib');
    fs.ensureDirSync(libPath)
    const taskTsc = done => {
        const task = gulp.src(`${srcPath}/**/*.{ts,tsx}`)
            .pipe(tsProject()).pipe(gulp.dest(destPath));
        // 创建 template inc
        // 创建完毕
        task.on('end', () => {
            console.log(chalk.yellow(`${name}:tsc finish ${new Date().getTime()}`))
            done()
        })
    }
    const taskCopy = done => {
        const otherTask = gulp.src([
            `${srcPath}/**/*.{md,json,html,css,less,scss,sass,jpg,jpeg,svg,png,js,jsx,yml}`,
        ]).pipe(gulp.dest(destPath))
        otherTask.on('end', () => {
            console.log(chalk.yellow(`${name}:copy finish ${new Date().getTime()}`))
            done()
        });
    }
    const taskFn = gulp.series(taskTsc, taskCopy);
    return new Promise((resolve) => {
        gulp.series(taskFn)(() => resolve())
    })
}
