"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nger_core_1 = require("nger-core");
class NgerH5Router extends nger_core_1.Router {
    // 跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面
    switchTab(url) {
        return new Promise(() => { });
    }
    // 关闭所有页面，打开到应用内的某个页面
    reLaunch(url) {
        return new Promise(() => { });
    }
    // 关闭当前页面，跳转到应用内的某个页面。但是不允许跳转到 tabbar 页面。
    redirectTo(url) {
        return new Promise(() => { });
    }
    // 保留当前页面，跳转到应用内的某个页面。但是不能跳到 tabbar 页面
    async navigateTo(url) {
        return new Promise(() => { });
    }
    // 关闭当前页面，返回上一页面或多级页面
    navigateBack(delta) {
        return new Promise(() => { });
    }
}
exports.NgerH5Router = NgerH5Router;
