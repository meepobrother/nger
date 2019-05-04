import { Injectable } from 'nger-core';
import gulp from 'gulp';
import chalk from 'chalk';
import rimraf = require('rimraf');
import { join } from 'path';
import ts = require('gulp-typescript');
import fs from 'fs-extra';
const root = process.cwd();
@Injectable()
export class NgerCliBuild {
    async dev(name: string) {
        const output = 'dist'
        await _rimraf(join(root, output, name));
        await packProject(name, output, 'packages');
    }
    async prod(name: string) {
        const output = 'node_modules'
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
    return new Promise((resolve, reject) => {
        taskTsc((err) => {
            if (err) return reject(err)
            taskCopy((err) => {
                if (err) return reject(err)
                resolve()
            })
        });
    })
}
