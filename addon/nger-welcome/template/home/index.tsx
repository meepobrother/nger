import { Page } from 'nger-core';

@Page({
    path: '/',
    type: ['admin'],
    title: '首页'
})
export class NgerWelcomeHomePage {

    getLang() {
        // 把这个当成规范
        return {
            [`客户1`]: {
                'install_title': '模块安装'
            },
            [`客户2`]: {
                'install_title': 'Nger模块安装'
            }
        }
    }

    render() {
        return <div role="member">
            <li>bbs</li>
            <li>商城</li>
            <li>官网</li>
            <li>博客</li>
            <button id="install">模块安装</button>
        </div>
    }
}

