import { Input, Component, OnChanges, ChangeDetectorRef, Injectable } from 'nger-core'
import { Injector } from 'nger-di';
// 这里我把nger-store/nger-effect引入过来是不是会好一点呢
// nger-store 负责数据变更
// nger-effects 负责数据拦截
import { NgerTask } from './task'

import { h } from 'preact'

@Injectable()
export class TaskList {
    tasks: NgerTask[] = [];

    addTask(task: NgerTask) {
        this.tasks.push(task)
    }

    removeTask(id: number) {
        const index = this.tasks.findIndex(task => task.id === id)
        this.tasks.splice(index, 1)
    }
}


@Component({
    selector: `add-task`
})
export class AddTask {
    task: NgerTask = new NgerTask();
    constructor(
        public taskList: TaskList
    ) { }
    setTaskTitle(title: string) {
        this.task.title = title;
    }
    setTaskDesc(desc: string) {
        this.task.desc = desc;
    }
    render() {
        <div>
            <input type="text" onChange={(e) => this.setTaskTitle(e.target.value)} />
            <textarea cols={30} rows={30} onChange={e => this.setTaskDesc(e.target.value)}></textarea>
            <button onSubmit={e => this.taskList.addTask(this.task)}>提交</button>
        </div>
    }
}
@Component({
    selector: `app-root`,
    templateUrl: `./home.html`,
    styleUrls: ['./home.scss']
})
export class HomePage implements OnChanges {
    tasks: NgerTask[] = [];
    constructor(public change: ChangeDetectorRef, public injector: Injector) {
        let i = 0;
        setInterval(() => {
            i = i + 1;
            this.showTitle = !this.showTitle;
            this.title = `${this.title} ${i}`
            this.change.detach();
        }, 2000)
    }
    setTaskTitle(e: string) {
        this.title = e;
    }
    setTaskDesc(e: string) { }
    addTask() { }
    @Input()
    title: string = 'home page';

    @Input()
    showTitle: boolean = true;

    ngOnInit() { }
    ngOnChanges(changes) { }

    render(that: HomePage) {
        return <div>
            <h2 className="title">{that.title}</h2>
            {this.tasks.map(task => {
                return <li>
                    <div className="title">
                        {task.title}
                    </div>
                    <p>{task.desc}</p>
                </li>
            })}
            <button>添加任务</button>
        </div>
    }
}
