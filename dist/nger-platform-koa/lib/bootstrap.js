"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("http");
const nger_core_1 = require("nger-core");
const nger_core_2 = require("nger-core");
const path_1 = require("path");
const compress = require('koa-compress');
const nger_di_1 = require("nger-di");
exports.AdminTemplateEntry = new nger_di_1.InjectionToken(`AdminTemplateEntry`);
const nger_webpack_1 = require("nger-webpack");
class NgerPlatformKoa extends nger_core_2.NgModuleBootstrap {
    constructor(logger, util) {
        super();
        this.logger = logger;
        this.util = util;
    }
    async run(ref) {
        const webpack = ref.injector.get(nger_webpack_1.NgerWebpackManager);
        if (!nger_core_1.isDevMode()) {
            webpack.build();
        }
        else {
            webpack.watch();
        }
        const KoaPkg = await this.util.loadPkg('koa');
        const KoaRouter = await this.util.loadPkg('koa-router');
        const KoaStatic = await this.util.loadPkg('koa-static');
        this.injector = ref.injector;
        this.app = new KoaPkg();
        const router = new KoaRouter();
        const server = http_1.createServer(this.app.callback());
        const port = nger_core_1.getPort();
        this.app.use(KoaStatic(path_1.join(this.util.root, 'template')));
        this.app.use(KoaStatic(path_1.join(this.util.root, 'attachment')));
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
        const ngModule = ref.context.getClass(nger_core_2.NgModuleMetadataKey);
        ngModule.declarations.map(declaration => {
            // (declaration.target)
            const controllerFactory = ref.componentFactoryResolver.resolveComponentFactory(declaration.target);
            if (controllerFactory) {
                const controller = declaration.getClass(nger_core_2.ControllerMetadataKey);
                this.handler(declaration, router, controller, controllerFactory.create(this.injector).instance);
            }
        });
        this.app.use(compress({
            filter: function (content_type) {
                return /text/i.test(content_type);
            },
            threshold: 2048,
            flush: require('zlib').Z_SYNC_FLUSH
        }));
        this.app.use(router.routes()).use(router.allowedMethods());
        server.listen(port, () => {
            this.logger.info(`app start at http://localhost:${port}`);
        });
    }
    handler(declaration, router, controller, instance) {
        const gets = declaration.getMethod(nger_core_2.GetMetadataKey);
        gets.map(get => {
            this.logger.debug(`get ${controller.path}/${get.path}`);
            router.get(`${controller.path}/${get.path}`, async (ctx) => {
                try {
                    const data = await instance[get.ast.propertyKey]();
                    ctx.body = data;
                }
                catch (e) {
                    // this.catchError(e)
                }
            });
        });
        const posts = declaration.getMethod(nger_core_2.PostMetadataKey);
        posts.map(post => {
            this.logger.debug(`post ${controller.path}/${post.path}`);
            router.post(`${controller.path}/${post.path}`, async (ctx) => {
                try {
                    const data = await instance[post.ast.propertyKey]();
                    ctx.body = data;
                }
                catch (e) {
                    // this.catchError(e)
                }
            });
        });
    }
}
exports.NgerPlatformKoa = NgerPlatformKoa;
