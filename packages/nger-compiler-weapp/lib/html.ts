// 将ng模板编译成微信小程序可以执行的文件
import { NgModuleConfig } from './types'
import { Injector } from 'nger-di';
import { ComponentFactoryResolver } from 'nger-core';

// 需要将模板转换成weapp
export class NgerCompilerWeappHtml {
    constructor(public injector: Injector) { }
    async run(config: NgModuleConfig) {
        const { declarations } = config;
        declarations.map(comp => {
            console.log(comp)
        });
    }
}
