# `nger-module-gulp`
> gulp打包功能模块

- [x] NgerGulpService gulp服务
  - [x] tasks 依赖注入的所有任务
  - [x] src gulp.src
  - [x] dest gulp.dest
  - [x] watch gulp.watch
  - [x] registry gulp.registry
  - [x] task gulp.task
  - [x] series gulp.series
  - [x] parallel gulp.parallel
  - [x] tree gulp.tree
  - [x] lastRun gulp.lastRun
- [x] GulpTasksToken 需要注入的任务

## use
```ts
import {NgerModuleGulp,NgerGulpService} from 'nger-module-gulp'
// 引入
@NgModule({
    imports: [NgerModuleGulp],
    ...
})
export NgerDemo{}

// 使用
@Controller()
export class NgerGulpController implements OnReady{
    @Inject() gulp: NgerGulpService;
    // 这时所有的依赖注入及属性都已正确赋值
    ngOnReady(){
        this.gulp.series(...this.gulp.tasks.map(task=>task.task))
    }
}

```