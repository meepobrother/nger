<p align="center"><img width="120" src="./docs/logo.png" alt="Vue logo"></p>

## Nger
> nger, 用ng的人！I am a nger! 

## 简介
每个nger人心中都有用ng编制世界的梦想!

Nger是一套以依赖注入、装饰器为核心的 <b>多端开发</b>, <b>前后台统一构架</b> 解决方案。

使用 Nger，我们可以只书写一套代码，再通过 Nger 的编译工具，将源代码分别编译出可以在不同端（微信/百度/支付宝/字节跳动小程序、H5、微信公众号、Native 等）运行的代码。

## 技术栈说明
Typeorm/Nestjs/Angular/Ngrx/JSX/Injector(依赖注入)/Decorator(装饰器)/Webpack/Less/Sass/Gulp...

## 依赖环境

1. [nodejs](https://nodejs.org/en/download/)
2. [docker](https://www.docker.com/products/docker-desktop) 如果已有nginx/mysql等服务的话可忽略
3. [docker-compose](https://docs.docker.com/compose/install/) 如果已有nginx/mysql等服务的话可忽略

## 功能描述

### 对于开发者

您可以把他看做一个工具，可以帮您快速开发部署您的项目

```ts
npm install -g nger-cli
// 初始化模块
nger init ims-demo
// 开发模块
nger start ims-demo --watch
// 运营启动模块
nger start ims-demo
// 发布赚外快
nger publish ims-demo
```

### 对于普通用户

对于普通用户，他是您的服务器管家

```ts
// 安装
npm install -g nger-cli
// 启动
nger start [-p 4200]
// 首次安装 会自动跳转到安装配置页面
// http://localhost:4200/install
// 按照提示填写表单，挑选合适的模块，开启运营吸金之旅
```

## 开发进度

- [x] nger init nger-demo 初始化模块
- [ ] nger start nger-demo --watch 开发环境启动模块
- [ ] nger start nger-demo 运营环境启动模块
- [ ] nger publish nger-demo 发布模块

## 资助
<p><img width="220" src="./docs/WechatIMG95.jpeg" alt="Vue logo"></p>
