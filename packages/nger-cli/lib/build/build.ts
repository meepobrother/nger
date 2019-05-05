import { Injectable } from 'nger-core';
import gulp from 'gulp';
import chalk from 'chalk';
import rimraf = require('rimraf');
import { join } from 'path';
import ts = require('gulp-typescript');
import fs from 'fs-extra';
import chokidar from 'chokidar';

const root = process.cwd();
@Injectable()
export class NgerCliBuild {
    async dev(name: string, isDev) {
        const output = 'dist'
        await _rimraf(join(root, output, name));
        await packProject(name, output, 'packages', isDev);
    }
    async prod(name: string, isDev) {
        const output = 'node_modules'
        await packProject(name, output, 'packages', isDev);
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
    isDev: boolean = false
) {
    const destPath = join(root, output, name);
    const srcPath = join(root, srcRoot, name);
    const libPath = join(srcPath, 'lib');
    fs.ensureDirSync(libPath);

    const taskTsc = done => {
        const tsProject = ts.createProject(join(root, 'tsconfig.json'));
        let task = gulp.src(`${srcPath}/**/*.{ts,tsx}`)
            .pipe(tsProject()).pipe(gulp.dest(destPath));;
        // 创建 template inc
        // 创建完毕
        task.on('end', () => {
            console.log(chalk.yellow(`${name}:tsc finish ${new Date().getTime()}`))
            done && done()
        })
    }
    const taskWatch = done => {
        chokidar.watch(`${srcPath}/**/*.{ts,tsx}`).on('all', () => {
            taskTsc(()=>{
                console.log(`文件变更`)
            })
        });
    }
    const taskCopy = done => {
        const otherTask = gulp.src([
            `${srcPath}/**/*.{md,json,html,css,less,scss,sass,jpg,jpeg,svg,png,js,jsx,yml}`,
        ]).pipe(gulp.dest(destPath))
        otherTask.on('end', () => {
            console.log(chalk.yellow(`${name}:copy finish ${new Date().getTime()}`))
            done && done()
        });
    }
    return new Promise((resolve, reject) => {
        taskTsc((err) => {
            if (err) return reject(err)
            if (isDev) taskWatch(() => { })
            taskCopy((err) => {
                if (err) return reject(err)
                resolve()
            })
        });
    })
}
