import { createServer } from 'http';
import { Injector } from 'nger-di'
import Koa from 'koa';
import {  NgModuleRef, getPort } from 'nger-core';
import { NgerUtil } from 'nger-util';
import Router from 'koa-router';
import Static from 'koa-static';
import { Logger, createPlatformFactory, NgModuleBootstrap, NgModuleMetadataKey, NgModuleClassAst, ControllerMetadataKey, ControllerClassAst, GetMethodAst, PostMethodAst, GetMetadataKey, PostMetadataKey } from 'nger-core';
import { join } from 'path';
import NgerPlatformNode from 'nger-platform-node'
const compress = require('koa-compress');
import { TypeContext } from 'ims-decorator';
import { InjectionToken } from 'nger-di';
export const AdminTemplateEntry = new InjectionToken<string>(`AdminTemplateEntry`)
export class NgerPlatformKoa extends NgModuleBootstrap {
    public injector: Injector
    public app: Koa;
    constructor(
        public logger: Logger,
        public util: NgerUtil,
    ) {
        super();
    }
    async run<T>(ref: NgModuleRef<T>) {
        const KoaPkg = await this.util.loadPkg<typeof Koa>('koa');
        const KoaRouter = await this.util.loadPkg<typeof Router>('koa-router')
        const KoaStatic = await this.util.loadPkg<typeof Static>('koa-static')
        this.injector = ref.injector;
        this.app = new KoaPkg();
        const router = new KoaRouter();
        const server = createServer(this.app.callback())
        const port = getPort();
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
            // (declaration.target)
            const controllerFactory = ref.componentFactoryResolver.resolveComponentFactory(declaration.target)
            if (controllerFactory) {
                const controller = declaration.getClass(ControllerMetadataKey) as ControllerClassAst;
                this.handler(declaration, router, controller, controllerFactory.create(this.injector).instance);
            }
        });
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
    handler(declaration: TypeContext, router: any, controller: any, instance: any) {
        const gets = declaration.getMethod(GetMetadataKey) as GetMethodAst[];
        gets.map(get => {
            this.logger.debug(`get ${controller.path}/${get.path}`)
            router.get(`${controller.path}/${get.path}`, async (ctx) => {
                try {
                    const data = await instance[get.ast.propertyKey]();
                    ctx.body = data;
                } catch (e) {
                    // this.catchError(e)
                }
            });
        });
        const posts = declaration.getMethod(PostMetadataKey) as PostMethodAst[];
        posts.map(post => {
            this.logger.debug(`post ${controller.path}/${post.path}`)
            router.post(`${controller.path}/${post.path}`, async (ctx) => {
                try {
                    const data = await instance[post.ast.propertyKey]();
                    ctx.body = data;
                } catch (e) {
                    // this.catchError(e)
                }
            })
        });
    }
}

export default createPlatformFactory(NgerPlatformNode, 'koa', [{
    provide: NgModuleBootstrap,
    useClass: NgerPlatformKoa,
    deps: [Logger, NgerUtil],
    multi: true
}])