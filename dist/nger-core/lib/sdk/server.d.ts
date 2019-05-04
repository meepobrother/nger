/// <reference types="node" />
import { Server, IncomingMessage, ServerResponse } from 'http';
import { InjectionToken, Injector, Type } from 'nger-di';
export declare const HttpServer: InjectionToken<Server>;
export declare abstract class NgerServer {
    injector: Injector;
    request: NgerServerRequest;
    response: NgerServerReponse;
    context: NgerServerContext;
    middlewares: NgerServerMiddleware[];
    constructor(injector: Injector, request: NgerServerRequest, response: NgerServerReponse, context: NgerServerContext, middlewares: NgerServerMiddleware[]);
    createContext(req: any, res: any): void;
}
export declare abstract class NgerServerRequest {
    server: Server;
    constructor(server: Server);
}
export declare abstract class NgerServerReponse {
}
export declare abstract class NgerServerContext {
    readonly req: IncomingMessage;
    readonly res: ServerResponse;
}
/**
 * 创建上下文工厂
 **/
export declare abstract class NgerServerContextFactory {
    /**
     * 创建上下文
     * @param request 服务器请求
     * @param response 服务器响应
     */
    abstract create<Req extends IncomingMessage, Res extends ServerResponse>(request: Req, response: Res): NgerServerContext;
}
export declare abstract class NgerServerContextFactoryResolver {
    /**
     * @param type Controller控制器
     */
    abstract resolveServerContextFactory(type: Type<any>): NgerServerContextFactory;
}
export declare abstract class NgerServerMiddleware {
}
