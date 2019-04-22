## 用angular开发小程序

vue、react相继都有了小程序的开发框架，作为ng粉，也该为社区做点事情了!

## 开发计划及大体思路

### [nger-cli](./packages/nger-cli)
> 命令行工具
- [ ] 手机h5 `yarn cli build h5`
- [ ] pc网站 `yarn cli build pc`
- [ ] 微信公众号 `yarn cli build wechat`
- [ ] 微信小程序 `yarn cli build weapp`
- [ ] 支付宝小程序 `yarn cli build alipay`
- [ ] 百度智能小程序 `yarn cli build swap`
- [ ] 字节跳动小程序 `yarn cli build tt`
- [ ] ios客户端 `yarn cli build ios`
- [ ] android客户端 `yarn cli build android`
- [ ] 初始化 `yarn cli init demo`

### [nger-core](./packages/nger-core)
> 核心库
* angular装饰器
- [x] [Component](https://www.angular.cn/api/core/Component)
- [ ] [Directive 不支持](https://www.angular.cn/api/core/Pipe)
- [ ] [Pipe](https://www.angular.cn/api/core/Pipe)
- [x] [Injectable](https://www.angular.cn/api/core/NgModule)
- [x] [NgModule](https://www.angular.cn/api/core/NgModule)
- [x] [ContentChild](https://www.angular.cn/api/core/ContentChild)
- [x] [ContentChildren](https://www.angular.cn/api/core/ContentChildren)
- [x] [ViewChild](https://www.angular.cn/api/core/ViewChild)
- [x] [ViewChildren](https://www.angular.cn/api/core/ViewChildren)
- [x] [Input](https://www.angular.cn/api/core/Input)
- [x] [Output](https://www.angular.cn/api/core/Output)
- [x] [HostBinding](https://www.angular.cn/api/core/HostBinding)
- [x] [HostListener](https://www.angular.cn/api/core/HostListener)
- [x] [Host](https://www.angular.cn/api/core/Host)
- [x] [Inject](https://www.angular.cn/api/core/Inject)
- [x] [SkipSelf](https://www.angular.cn/api/core/SkipSelf)
- [x] [Self](https://www.angular.cn/api/core/Self)
- [x] [Optional](https://www.angular.cn/api/core/Optional)
- [x] [Attribute](https://www.angular.cn/api/core/Attribute)
* 新增装饰器
- [x] Page
- [x] Cli
- [x] Command
- [x] Option
* 生命周期
- [x] OnInit
- [x] DoCheck
- [x] OnDestroy
- [x] AfterContentInit
- [x] AfterContentChecked
- [x] AfterViewInit
- [x] AfterViewChecked

### [nger-logger](./packages/nger-logger)
> 带色打印工具
- [x] Logger 接口
- [x] ConsoleLogger Console实现

### @Page
// TODO
```ts
@Page({
    path: `pages/index/index`,
    template: `<view></view>`
})
export class ImsPage{}

// pages/index/index.js

// pages/index/index.json

// pages/index/index.wxss

// pages/index/index.wxml

```

### @Component

```ts
// **/ims-demo.ts
import {Component,Input,EventEmitter} from 'nger-core';

@Component({
    selector: 'ims-demo',
    template: `<view (onTap)="click"></view>`
})
export class ImsDemo {
    @Input()
    title: string;

    @Output()
    bindmyevent: EventEmitter;

    click(e){
        this.bindmyevent.emit(e);
    }
}

// to
// **/ims-demo.js
const instance = new ImsDemo();
Component({
    behaviors: [],
    data: {
        instance: instance
    },
    properties: {
        // Input
        title: instance.title
    },
    lifetimes: {
        created(){
            instance.ngOnInit()
        },
        attached() { 
            instance.onViewInit()
        },
        ready(){
            instance.onAfterViewInit()
        },
        moved() { 
            instance.onMoved()
        },
        detached() { 
            instance.onDestory()
        },
        error() { 
            instance.onError()
        },
    },
    pageLifetimes: {
        show(){
            instance.onShow()
        },
        hide(){
            instance.onHide()
        },
        resize(){
            instance.onResize()
        }
    },
    methods: {
        click: instance.click
    }
})
// **/ims-demo.json
{}
// **/ims-demo.wxss

// **/ims-demo.wxml
<view onTap="click"></view>
```

### ngIf


```html
<ng-template [ngIf]="condiction"></ng-template>
<!-- to -->
<ng-template wx:if="{{condiction}}"></ng-template>
```

```html
<ng-template [ngIf]="condiction" [ngIfELse]="elseBlock">condiction</ng-template>
<ng-template #elseBlock>elseBlock</ng-template>
<!-- to -->
<ng-template wx:if="{{condiction}}"></ng-template>
<ng-template wx:else>elseBlock</ng-template>
```

```html
<ng-template [ngIf]="condiction" [ngIfThen]="thenBlcok" [ngIfELse]="elseBlock"></ng-template>
<ng-template #thenBlcok>thenBlcok</ng-template>
<ng-template #elseBlock>elseBlock</ng-template>
<!-- to -->
<ng-template wx:if="{{condiction}}">thenBlcok</ng-template>
<ng-template wx:else>elseBlock</ng-template>
```

### ngFor

```html
<ng-template ngFor let-item="it" let-i="index" [ngForOf]="items"></ng-template>
<!-- to -->
<ng-template wx:for="items" wx:for-item="it" wx:for-index="i"></ng-template>
```

## 多平台SDK统一接口

```ts

```

