## 系统安装配置

## 源码
- [x] `addon`
  - [x] `ims-install`
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

## 编译后
- [x] `addon`
  - [x] `ims-install`
    - [x] `pc` pc网站
    - [x] `admin` 管理
    - [x] `ttapp` 字节跳动
    - [x] `aliapp` 支付宝
    - [x] `weapp` 微信小程序
    - [x] `wechat` 微信浏览器
    - [x] `h5` 手机网站
    - [x] `ios` ios端
    - [x] `android` 安卓端
    - [x] `index.js` // 插件，可安装卸载更新
    - [x] `server.js` // 可独立运行，nger start addon/ims-install/server.js -p 4200
    - [x] `package.json` // 插件描述
