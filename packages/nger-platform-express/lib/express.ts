import { ConsoleLogger, LogLevel } from 'nger-logger';
import express from 'express';
import WebpackDevMiddleware from 'webpack-dev-middleware';
import { createServer } from 'http';
import { NgModuleMetadataKey, NgModuleClassAst, ControllerMetadataKey, ControllerClassAst, GetMetadataKey, GetMethodAst, PostMetadataKey, PostMethodAst, Platform, NgModuleRef } from 'nger-core';
import { NgerUtil } from 'nger-util';
import { Injector, InjectFlags } from 'nger-di';
import { WebpackService } from 'nger-module-webpack';
import { NgerPlatformAxios } from 'nger-platform-axios';
export class NgerPlatformExpress extends Platform {
    logger: ConsoleLogger;
    util: NgerUtil;
    injector: Injector;
    app: any;
    axios: NgerPlatformAxios = new NgerPlatformAxios();
    constructor() {
        super();
        this.logger = new ConsoleLogger(LogLevel.debug)
        this.util = new NgerUtil(this.logger);
    }
    async run<T>(ref: NgModuleRef<T>) {
        await this.axios.run(ref);
        this.injector = ref.injector;
        const exp = await this.util.loadPkg<typeof express>('express')
        const app = exp();
        this.app = app;
        const server = createServer(app)
        // 获取端口号
        const port = ref.context.get(`port`);
        const ngModule = ref.context.getClass(NgModuleMetadataKey) as NgModuleClassAst;
        ngModule.declarations.map(declaration => {
            const controllerRef = ref.createControllerRef(declaration.target)
            const controller = declaration.getClass(ControllerMetadataKey) as ControllerClassAst;
            const gets = declaration.getMethod(GetMetadataKey) as GetMethodAst[];
            const posts = declaration.getMethod(PostMetadataKey) as PostMethodAst[];
            gets.map(get => {
                this.logger.debug(`get ${controller.path}/${get.path}`)
                app.get(`${controller.path}/${get.path}`, async (req, res, next) => {
                    const data = await controllerRef.instance[get.ast.propertyKey]();
                    if (typeof data === 'object') {
                        res.json(data)
                    } else {
                        res.end(data)
                    }
                });
            });
            posts.map(post => {
                this.logger.debug(`post ${controller.path}/${post.path}`)
                app.post(`${controller.path}/${post.path}`, async (req, res, next) => {
                    const data = await controllerRef.instance[post.ast.propertyKey]();
                    if (typeof data === 'object') {
                        res.json(data)
                    } else {
                        res.end(data)
                    }
                })
            });
            // 属性
        });
        this.attachWebpackCompiler();
        server.listen(port, () => {
            this.logger.info(`app start at http://localhost:${port}`)
        });
    }

    async attachWebpackCompiler() {
        const webpack = this.injector.get(WebpackService, undefined, InjectFlags.Optional) as WebpackService;
        const config = webpack.config;
        let publicPath = '/';
        if (config) {
            if (config.output && config.output.publicPath) publicPath = config.output.publicPath
        }
        const middleWare = WebpackDevMiddleware(webpack.compiler, {
            publicPath,
        })
        this.app.use(middleWare);
    }
}