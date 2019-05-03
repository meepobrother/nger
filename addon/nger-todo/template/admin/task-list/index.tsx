import { Page } from 'nger-core';
import { NgerTodoAdminHome } from './index.controller'
@Page({
    path: 'task/list',
    type: ['admin'],
    title: '任务',
    styleUrls: ['./index.scss']
})
export class NgerTodoTaskListPage {
    constructor(public controller: NgerTodoAdminHome) { }
    render() {}
}
