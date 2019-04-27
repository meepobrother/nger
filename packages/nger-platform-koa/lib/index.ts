import { createServer } from 'http';
import { Injector, InjectFlags } from 'nger-di'
import Koa from 'koa';
import { ConsoleLogger, LogLevel } from 'nger-logger';
import { DevModelToken, NgModuleRef } from 'nger-core';
import { NgerUtil } from 'nger-util';
import Router from 'koa-router';
import Static from 'koa-static';
import { NgModuleMetadataKey, NgModuleClassAst, ControllerMetadataKey, ControllerClassAst, GetMethodAst, PostMethodAst, GetMetadataKey, PostMetadataKey, Platform, GetPropertyAst } from 'nger-core';
import { join, resolve } from 'path';
import { NgerPlatformAxios } from 'nger-platform-axios'

// import webpackKoa2Middleware from 'webpack-koa2-middleware'
import koaWebpack from 'koa-webpack';
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
    async run<T>(ref: NgModuleRef<T>) {
        await this.axios.run(ref);
        const KoaPkg = await this.util.loadPkg<typeof Koa>('koa');
        const KoaRouter = await this.util.loadPkg<typeof Router>('koa-router')
        const KoaStatic = await this.util.loadPkg<typeof Static>('koa-static')
        this.injector = ref.injector;
        this.app = new KoaPkg();
        const router = new KoaRouter();
        const server = createServer(this.app.callback())
        const port = ref.context.get(`port`);
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
        const ngModule = ref.context.getClass(NgModuleMetadataKey) as NgModuleClassAst;
        ngModule.declarations.map(declaration => {
            const controllerRef = ref.createControllerRef(declaration.target)
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
                        const data = await controllerRef.instance[get.ast.propertyKey]();
                        ctx.body = data;
                    } catch (e) {
                        this.catchError(e)
                    }
                });
            });
            posts.map(post => {
                this.logger.debug(`post ${controller.path}/${post.path}`)
                router.post(`${controller.path}/${post.path}`, async (ctx) => {
                    try {
                        const data = await controllerRef.instance[post.ast.propertyKey]();
                        ctx.body = data;
                    } catch (e) {
                        this.catchError(e)
                    }
                })
            });
        });
        this.attachWebpackCompiler(router);
        this.app.use(router.routes()).use(router.allowedMethods())
        server.listen(port, () => {
            this.logger.info(`app start at http://localhost:${port}`)
        });
    }

    async attachWebpackCompiler(router: any) {
        const webpack = this.injector.get(WebpackService, undefined, InjectFlags.Optional) as WebpackService;
        const config = webpack.config;
        const dev = this.injector.get(DevModelToken, false);
        if (dev && !!webpack) {
            const middleware = await koaWebpack({
                config,
                devMiddleware: {
                    publicPath: config.output && config.output.publicPath || '/',
                    logLevel: 'silent',
                    watchOptions: { aggregateTimeout: 200 }
                },
                hotClient: {
                    logLevel: 'silent'
                },
                compiler: webpack.compiler
            });
            this.app.use(middleware);
            this.app.use(async (ctx, next) => {
                if (config.output) {
                    const filename = resolve(config.output.path || '', 'index.html')
                    ctx.response.type = 'html'
                    ctx.response.body = middleware.devMiddleware.fileSystem.createReadStream(filename)
                } else {
                    next();
                }
            });
        }
    }
}