import { Injectable, Inject } from 'nger-core';
import gulp from 'gulp'
import Undertaker from "undertaker";
import { NgerUtil } from 'nger-util';
import { GulpTask, GulpTasksToken } from './token'
@Injectable()
export class NgerGulpService {

    @Inject() util: NgerUtil;

    // 所有gulp注册的任务
    @Inject(GulpTasksToken) tasks: GulpTask[];

    get src(): typeof gulp.src {
        return gulp.src;
    };

    get dest(): typeof gulp.dest {
        return gulp.dest;
    };

    get watch(): typeof gulp.watch {
        return gulp.watch;
    }

    registry() {
        return gulp.registry
    }

    task(taskName: string, fn: Undertaker.TaskFunction) {
        gulp.task(taskName, fn)
    }

    series(...tasks: Undertaker.Task[]): Undertaker.TaskFunction {
        return gulp.series(...tasks)
    }

    parallel(...tasks: Undertaker.Task[]): Undertaker.TaskFunction {
        return gulp.parallel(...tasks)
    }

    tree(options?: Undertaker.TreeOptions): Undertaker.TreeResult {
        return gulp.tree(options);
    }

    lastRun(task: Undertaker.Task, timeResolution?: number): number {
        return gulp.lastRun(task, timeResolution)
    }
}
