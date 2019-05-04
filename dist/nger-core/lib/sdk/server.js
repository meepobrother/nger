"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
// 这里定义一下Server接口,为了更好的契合依赖注入系统
// 暂时未起作用，仅仅尝试
// 这里应该怎么设计，才能契合
const http_1 = require("http");
const nger_di_1 = require("nger-di");
const inject_1 = require("../decorators/inject");
exports.HttpServer = new nger_di_1.InjectionToken(`Http Server`);
// 服务器
let NgerServer = class NgerServer {
    constructor(injector, request, response, context, 
    // 所有中间件
    middlewares) {
        this.injector = injector;
        this.request = request;
        this.response = response;
        this.context = context;
        this.middlewares = middlewares;
    }
    createContext(req, res) {
    }
};
NgerServer = tslib_1.__decorate([
    tslib_1.__param(4, inject_1.Inject(NgerServerMiddleware)),
    tslib_1.__metadata("design:paramtypes", [nger_di_1.Injector,
        NgerServerRequest,
        NgerServerReponse,
        NgerServerContext, Array])
], NgerServer);
exports.NgerServer = NgerServer;
// 服务器请求
let NgerServerRequest = class NgerServerRequest {
    constructor(server) {
        this.server = server;
    }
};
NgerServerRequest = tslib_1.__decorate([
    tslib_1.__param(0, inject_1.Inject(exports.HttpServer)),
    tslib_1.__metadata("design:paramtypes", [http_1.Server])
], NgerServerRequest);
exports.NgerServerRequest = NgerServerRequest;
// 服务器响应
class NgerServerReponse {
}
exports.NgerServerReponse = NgerServerReponse;
// 服务器上下文,如果是客户端同理
class NgerServerContext {
}
exports.NgerServerContext = NgerServerContext;
/**
 * 创建上下文工厂
 **/
class NgerServerContextFactory {
}
exports.NgerServerContextFactory = NgerServerContextFactory;
// 上下文工厂提供者,这里可以自定义,不同的平台可以有不同的实现
// 每个Controller的每次请求都会有一个上下文
class NgerServerContextFactoryResolver {
}
exports.NgerServerContextFactoryResolver = NgerServerContextFactoryResolver;
// 服务器中间件
class NgerServerMiddleware {
}
exports.NgerServerMiddleware = NgerServerMiddleware;
