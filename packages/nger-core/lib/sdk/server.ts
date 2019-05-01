// 这里定义一下Server接口,为了更好的契合依赖注入系统
// 暂时未起作用，仅仅尝试
// 这里应该怎么设计，才能契合
import { Server, IncomingMessage, ServerResponse } from 'http'
import { InjectionToken, Injector, Type } from 'nger-di';
import { Inject } from '../decorators/inject';
export const HttpServer = new InjectionToken<Server>(`Http Server`);
// 服务器
export abstract class NgerServer {
    constructor(
        public injector: Injector,
        public request: NgerServerRequest,
        public response: NgerServerReponse,
        public context: NgerServerContext,
        // 所有中间件
        @Inject(NgerServerMiddleware) public middlewares: NgerServerMiddleware[]
    ) { }

    createContext(req, res) {

    }
}
// 服务器请求
export abstract class NgerServerRequest {
    constructor(@Inject(HttpServer) public server: Server) { }
}
// 服务器响应
export abstract class NgerServerReponse { }
// 服务器上下文,如果是客户端同理
export abstract class NgerServerContext {
    readonly req: IncomingMessage;
    readonly res: ServerResponse;
}
/**
 * 创建上下文工厂
 **/
export abstract class NgerServerContextFactory {
    /**
     * 创建上下文
     * @param request 服务器请求
     * @param response 服务器响应
     */
    abstract create<Req extends IncomingMessage, Res extends ServerResponse>(
        request: Req, response: Res
    ): NgerServerContext;
}
// 上下文工厂提供者,这里可以自定义,不同的平台可以有不同的实现
// 每个Controller的每次请求都会有一个上下文
export abstract class NgerServerContextFactoryResolver {
    /**
     * @param type Controller控制器
     */
    abstract resolveServerContextFactory(type: Type<any>): NgerServerContextFactory;
}
// 服务器中间件
export abstract class NgerServerMiddleware { }
