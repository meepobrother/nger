<p align="center"><img width="120" src="./docs/logo.png" alt="Vue logo"></p>

<h2 align="center">用ng编制世界</h2>

> 项目名称意义，用ng的人！I am a nger! 

## 每个nger人心中都有用ng编制世界的梦想!

<font color="green">Warning!</font> <font color="green">Warning!</font> <font color="green">Warning!</font> 这不仅仅是一个前端项目。

vue、react相继都有了小程序的开发框架，作为一个nger，也该为社区做点事情了!
很遗憾，由于ng和小程序的差异性，我们暂时没打算直接把ng项目转换成小程序，而是用ng的一套思想（`依赖注入`、`装饰器`等）来规范开发小程序!以达到一套代码多平台运行。

技术栈说明：Typeorm/Nestjs/Angular/Ngrx/JSX/Injector(依赖注入)/Decorator(装饰器)/Webpack/Less/Sass/Gulp...

<h2 align="center">依赖环境(如果自己有nginx/mysql/cache服务器的话可忽略2,3)</h2>

1. [nodejs](https://nodejs.org/en/download/)
2. [docker](https://www.docker.com/products/docker-desktop)
3. [docker-compose](https://docs.docker.com/compose/install/)

<h2 align="center">功能描述</h2>

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

<h2 align="center">目录规范</h2>

#### 源码
- [x] `addon`
  - [x] `ims-demo`
    - [x] `inc` 控制器，服务端
    - [x] `template` 模板
    - [x] `typeorm` 数据库
    - [x] `index.ts` 导出模块
    - [x] `server.ts` 服务端
    - [x] `pc.ts` pc端
    - [x] `app.ts` app端
    - [x] `admin` 管理端
    - [x] `package.json` 模块详情
      - [x] `name`: 模块名,
      - [x] `description`: 模块描述
      - [x] `version`: 模块版本号,
      - [x] `author` 模块作者
        - [x] `email`: 作者邮箱,
        - [x] `name`: 作者名称
      - [x] nger: 入口信息
        - [x] `server`: 制定服务端入口,
        - [x] `admin`: 制定管理端入口,
        - [x] `app`: 制定移动端入口,
        - [x] `pc`: 制定pc端入口
      - [x] icon: 模块图标

#### 编译后
- [x] `addon`
  - [x] `ims-demo`
    - [x] `pc` pc网站
      - [x] index.html
      - [x] **.js
      - [x] assets
    - [x] `admin` 管理
      - [x] index.html
      - [x] **.js
      - [x] assets
    - [x] `ttapp` 字节跳动
      - [x] assets
      - [x] pages
      - [x] nger
      - [x] app.js
      - [x] app.json
    - [x] `aliapp` 支付宝
      - [x] assets
      - [x] pages
      - [x] nger
      - [x] app.js
      - [x] app.json
    - [x] `weapp` 微信小程序
      - [x] assets
      - [x] pages
      - [x] nger
      - [x] app.js
      - [x] app.json
    - [x] `wechat` 微信浏览器
      - [x] index.html
      - [x] **.js
      - [x] assets
    - [x] `h5` 手机网站
      - [x] index.html
      - [x] **.js
      - [x] assets
    - [x] `ios` ios端
    - [x] `android` 安卓端
    - [x] `index.js` // 入口
    - [x] `server.js` // 可独立运行，nger start addon/ims-install/server.js -p 4200
    - [x] `package.json` // 插件描述

<h2 align="center">资助</h2>

<p><img width="220" src="./docs/WechatIMG95.jpeg" alt="Vue logo"></p>
