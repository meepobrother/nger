"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nger_di_1 = require("nger-di");
// @Typeorm装饰的类 Multi:true
exports.TypeormToken = new nger_di_1.InjectionToken(`TypeormToken`);
// Typeorm配置
exports.TypeormOptionsToken = new nger_di_1.InjectionToken(`TypeormOptionsToken`);
// Typeorm Connection
exports.ConnectionToken = new nger_di_1.InjectionToken(`ConnectionToken`);
// ConnectionManagerToken
exports.ConnectionManagerToken = new nger_di_1.InjectionToken(`ConnectionManagerToken`);
exports.PLATFORM_ID = new nger_di_1.InjectionToken(`PLATFORM_ID`);
// webapck打包
exports.APP_ROOT = new nger_di_1.InjectionToken(`APP_ROOT`);
