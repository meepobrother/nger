import { Page } from 'nger-core';

@Page({
    path: '/install',
    title: 'nger系统安装',
    styleUrls: [
        "./index.scss"
    ],
    type: ['pc']
})
export class NgerInstallPage {
    title: string;
    render() {
        return <div>
            <h2 className="title">{this.title || '欢迎使用Nger平台'}</h2>
            <div className="step1">
                <h4 className="title">管理员</h4>
                <input type="text" placeholder="站长用户名" />
                <input type="text" placeholder="站长密码" />
            </div>
            <div className="step2">
                <h4 className="title">数据库配置</h4>
                <input type="text" placeholder="数据库地址" />
                <input type="text" placeholder="数据库端口" />
                <input type="text" placeholder="数据库用户名" />
                <input type="text" placeholder="数据库密码" />
            </div>
            <div className="step3">
                <h4 className="title">挑选模块</h4>
                <ul>
                    <li>商城</li>
                    <li>社区</li>
                    <li>bbs</li>
                    <li>官网</li>
                </ul>
            </div>
        </div>
    }
}
