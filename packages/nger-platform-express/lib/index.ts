import { ConsoleLogger, LogLevel } from 'nger-logger';
import { TypeContext } from 'ims-decorator';
import express from 'express';
import { createServer } from 'http';
import { NgModuleMetadataKey, NgModuleClassAst, ControllerMetadataKey, ControllerClassAst, GetMetadataKey, GetMethodAst, PostMetadataKey, PostMethodAst } from 'nger-core';
export class NgerPlatformExpress {
    logger: ConsoleLogger = new ConsoleLogger(LogLevel.debug);
    run(context: TypeContext) {
        const app = express();
        const server = createServer(app)
        const port = context.get(`port`);
        const ngModule = context.getClass(NgModuleMetadataKey) as NgModuleClassAst;
        ngModule.declarations.map(declaration => {
            const controller = declaration.getClass(ControllerMetadataKey) as ControllerClassAst;
            const gets = declaration.getMethod(GetMetadataKey) as GetMethodAst[];
            const posts = declaration.getMethod(PostMetadataKey) as PostMethodAst[];
            gets.map(get => {
                this.logger.debug(`get ${controller.path}/${get.path}`)
                app.get(`${controller.path}/${get.path}`, async (req, res, next) => {
                    const data = await declaration.instance[get.ast.propertyKey]();
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
                    const data = await declaration.instance[post.ast.propertyKey]();
                    if (typeof data === 'object') {
                        res.json(data)
                    } else {
                        res.end(data)
                    }
                })
            });
        })
        server.listen(port, () => {
            this.logger.info(`app start at http://localhost:${port}`)
        });
    }
}