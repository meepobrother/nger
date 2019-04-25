import { ConsoleLogger, LogLevel } from 'nger-logger';
import { TypeContext } from 'ims-decorator';
import express from 'express';
import { createServer } from 'http';
import { NgModuleMetadataKey, NgModuleClassAst, ControllerMetadataKey, ControllerClassAst, GetMetadataKey, GetMethodAst, PostMetadataKey, PostMethodAst, Platform } from 'nger-core';
import { NgerUtil } from 'nger-util';
export class NgerPlatformExpress extends Platform {
    logger: ConsoleLogger;
    util: NgerUtil;
    constructor() {
        super();
        this.logger = new ConsoleLogger(LogLevel.debug)
        this.util = new NgerUtil(this.logger);
    }
    async run(context: TypeContext) {
        const exp = await this.util.loadPkg<typeof express>('express')
        const app = exp();
        const server = createServer(app)
        // 获取端口号
        const port = context.get(`port`);
        const ngModule = context.getClass(NgModuleMetadataKey) as NgModuleClassAst;
        ngModule.declarations.map(declaration => {
            const controller = declaration.getClass(ControllerMetadataKey) as ControllerClassAst;
            const gets = declaration.getMethod(GetMetadataKey) as GetMethodAst[];
            const posts = declaration.getMethod(PostMetadataKey) as PostMethodAst[];
            gets.map(get => {
                this.logger.debug(`get ${controller.path}/${get.path}`)
                app.get(`${controller.path}/${get.path}`, async (req, res, next) => {
                    if (declaration.instance) {
                        const data = await declaration.instance[get.ast.propertyKey]();
                        if (typeof data === 'object') {
                            res.json(data)
                        } else {
                            res.end(data)
                        }
                    }
                });
            });

            posts.map(post => {
                this.logger.debug(`post ${controller.path}/${post.path}`)
                app.post(`${controller.path}/${post.path}`, async (req, res, next) => {
                    if (declaration.instance) {
                        const data = await declaration.instance[post.ast.propertyKey]();
                        if (typeof data === 'object') {
                            res.json(data)
                        } else {
                            res.end(data)
                        }
                    }
                })
            });
        });
        server.listen(port, () => {
            this.logger.info(`app start at http://localhost:${port}`)
        });
    }
}