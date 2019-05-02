import { Page } from 'nger-core';
import { Table } from 'nger-ui'
import { NgerTodoAdminHome } from './index.controller'
@Page({
    path: 'task/list',
    type: 'admin',
    title: '任务',
    styleUrls: ['./index.scss']
})
export class NgerTodoTaskListPage {
    constructor(public controller: NgerTodoAdminHome) { }
    render() {
        return <Table onEditor={this.controller.onEditor} source={this.controller.getTasks()} />
    }
}
