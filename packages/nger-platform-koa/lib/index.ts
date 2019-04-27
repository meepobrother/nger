import { createServer } from 'http';
import { Injector, InjectFlags } from 'nger-di'
import Koa from 'koa';
import { ConsoleLogger, LogLevel } from 'nger-logger';
import { DevModelToken, NgModuleRef, ControllerRef } from 'nger-core';
import { NgerUtil } from 'nger-util';
import Router from 'koa-router';
import Static from 'koa-static';
import { NgModuleMetadataKey, NgModuleClassAst, ControllerMetadataKey, ControllerClassAst, GetMethodAst, PostMethodAst, GetMetadataKey, PostMetadataKey, Platform, GetPropertyAst } from 'nger-core';
import { join, resolve } from 'path';
import { NgerPlatformAxios } from 'nger-platform-axios'
const compress = require('koa-compress');
// import webpackKoa2Middleware from 'webpack-koa2-middleware'
import koaWebpack from 'koa-webpack';
import { WebpackService } from 'nger-module-webpack';
import { TypeContext } from 'ims-decorator';
import dev from 'webpack-dev-server';

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
        const KoaPkg = await this.util.loadPkg<typeof Koa>('koa');
        const KoaRouter = await this.util.loadPkg<typeof Router>('koa-router')
        const KoaStatic = await this.util.loadPkg<typeof Static>('koa-static')
        this.injector = ref.injector;
        this.app = new KoaPkg();
        const router = new KoaRouter();
        const server = createServer(this.app.callback())
        const port = ref.context.get(`port`);
        // this.app.use(KoaStatic(join(this.util.root, 'template')))
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
            this.handler(declaration, router, controller, controllerRef);
            this.axios.handler(declaration, controllerRef.instance, controller)
        });
        this.attachWebpackCompiler(router);
        this.app.use(compress({
            filter: function (content_type) {
                return /text/i.test(content_type)
            },
            threshold: 2048,
            flush: require('zlib').Z_SYNC_FLUSH
        }))
        this.app.use(router.routes()).use(router.allowedMethods())
        server.listen(port, () => {
            this.logger.info(`app start at http://localhost:${port}`)
        });
    }

    handler(declaration: TypeContext, router: any, controller: any, controllerRef: any) {
        const gets = declaration.getMethod(GetMetadataKey) as GetMethodAst[];
        gets.map(get => {
            this.logger.debug(`get ${controller.path}/${get.path}`)
            router.get(`${controller.path}/${get.path}`, async (ctx) => {
                try {
                    const data = await controllerRef.instance[get.ast.propertyKey]();
                    ctx.body = data;
                } catch (e) {
                    this.catchError(e)
                }
            });
        });
        const posts = declaration.getMethod(PostMetadataKey) as PostMethodAst[];
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
    }

    async attachWebpackCompiler(router: Router) {
        const webpack = this.injector.get(WebpackService, undefined, InjectFlags.Optional) as WebpackService;
        const config = webpack.config;
        const isDevModel = this.injector.get(DevModelToken, false);
        if (isDevModel) {
            let publicPath = '/';
            if (config) {
                if (config.output && config.output.publicPath) publicPath = config.output.publicPath
            }
            new dev(webpack.compiler, {
                historyApiFallback: true,
                hot: true,
                open: true,
                inline: true,
                publicPath
            }).listen(3001);
            // const middleware = await koaWebpack({
            //     config,
            //     devMiddleware: {
            //         logLevel: 'silent',
            //         inline: true,
            //         heartbeat: 2000,
            //         index: 'index.html'
            //     },
            //     hotClient: {
            //         logLevel: 'silent',
            //         autoConfigure: false,
            //     }
            // });
            // this.app.use(middleware);
        }
    }
}

function streamToString(stream) {
    return new Promise((resolve, reject) => {
        let data = ``
        stream.on('data', (chunk) => {
            data += chunk.toString('utf8');
        })
        stream.on('end', () => {
            return resolve(`${data}`)
        })
    })
}