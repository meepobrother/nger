import { TypeContext } from 'ims-decorator';
import { createServer } from 'http';
import { Injector, InjectFlags } from 'nger-di'
import Koa from 'koa';
import { ConsoleLogger, LogLevel } from 'nger-logger';
import { DevModelToken } from 'nger-core';

import { NgerUtil } from 'nger-util';
import Router from 'koa-router';
import Static from 'koa-static';
import { NgModuleMetadataKey, NgModuleClassAst, ControllerMetadataKey, ControllerClassAst, GetMethodAst, PostMethodAst, GetMetadataKey, PostMetadataKey, Platform, GetPropertyAst } from 'nger-core';
import { join } from 'path';
import { NgerPlatformAxios } from 'nger-platform-axios'
import webpackKoa2Middleware from 'webpack-koa2-middleware'
import { WebpackService } from 'nger-module-webpack';
export class NgerPlatformKoa extends Platform {
    logger: ConsoleLogger;
    util: NgerUtil;
    axios: NgerPlatformAxios = new NgerPlatformAxios();
    app: Koa;
    injector: Injector;
    constructor() {
        super();
        this.logger = new ConsoleLogger(LogLevel.debug);
        this.util = new NgerUtil(this.logger)
    }
    async run(context: TypeContext) {
        await this.axios.run(context);
        const KoaPkg = await this.util.loadPkg<typeof Koa>('koa');
        const KoaRouter = await this.util.loadPkg<typeof Router>('koa-router')
        const KoaStatic = await this.util.loadPkg<typeof Static>('koa-static')
        this.injector = context.injector;
        this.app = new KoaPkg();
        const router = new KoaRouter();
        const server = createServer(this.app.callback())
        const port = context.get(`port`);
        this.app.use(KoaStatic(join(this.util.root, 'template')))
        this.app.use(KoaStatic(join(this.util.root, 'attachment')))
        this.app.use(async (ctx, next) => {
            await next();
            const rt = ctx.response.get('X-Response-Time');
            this.logger.info(`${ctx.method} ${ctx.url} - ${rt}`);
        });
        this.app.use(async (ctx, next) => {
            const start = Date.now();
            await next();
            const ms = Date.now() - start;
            ctx.set('X-Response-Time', `${ms}ms`);
        });
        const ngModule = context.getClass(NgModuleMetadataKey) as NgModuleClassAst;
        ngModule.declarations.map(declaration => {
            const controller = declaration.getClass(ControllerMetadataKey) as ControllerClassAst;
            const gets = declaration.getMethod(GetMetadataKey) as GetMethodAst[];
            const posts = declaration.getMethod(PostMetadataKey) as PostMethodAst[];
            gets.map(get => {
                this.logger.debug(`get ${controller.path}/${get.path}`)
                router.get(`${controller.path}/${get.path}`, async (ctx) => {
                    try {
                        // get.parameters.map(par=>{
                        //     if(par instanceof ReqParameterAst){
                        //         params[par.ast.parameterIndex] = ctx.request
                        //     }
                        // })
                        const data = await declaration.instance[get.ast.propertyKey]();
                        ctx.body = data;
                    } catch (e) {
                        this.catchError(e)
                    }
                });
            });
            posts.map(post => {
                this.logger.debug(`post ${controller.path}/${post.path}`)
                router.post(`${controller.path}/${post.path}`, async (ctx) => {
                    if (declaration.instance) {
                        try {
                            const data = await declaration.instance[post.ast.propertyKey]();
                            ctx.body = data;
                        } catch (e) {
                            this.catchError(e)
                        }
                    }
                })
            });
        });
        this.app.use(router.routes()).use(router.allowedMethods())
        this.attachWebpackCompiler();
        server.listen(port, () => {
            this.logger.info(`app start at http://localhost:${port}`)
        });
    }

    attachWebpackCompiler() {
        const compiler = this.injector.get(WebpackService, undefined, InjectFlags.Optional) as WebpackService;
        const dev = this.injector.get(DevModelToken, false);
        if (dev && !!compiler) {
            this.app.use(webpackKoa2Middleware(compiler.compiler));
        }
    }
}