```ts
{
    provide: APP_INITIALIZER,
    useFactory: (ref: NgModuleRef<any>, util: NgerUtil, logger: Logger) => {
        return async () => {
            const injector = ref.injector;
            const exp = await util.loadPkg<typeof express>('express')
            const app = exp();
            const server = createServer(app)
            // 获取端口号
            const port = getPort();
            const ngModule = ref.context.getClass(NgModuleMetadataKey) as NgModuleClassAst;
            ngModule.declarations.map(declaration => {
                const controllerRef = ref.createControllerRef(declaration.target)
                const controller = declaration.getClass(ControllerMetadataKey) as ControllerClassAst;
                const gets = declaration.getMethod(GetMetadataKey) as GetMethodAst[];
                const posts = declaration.getMethod(PostMetadataKey) as PostMethodAst[];
                if (controllerRef) {
                    gets.map(get => {
                        logger.debug(`get ${controller.path}/${get.path}`)
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
                        logger.debug(`post ${controller.path}/${post.path}`)
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
                }

            });
            app.use(createWebpackMiddle(injector));
            server.listen(port, () => {
                logger.info(`app start at http://localhost:${port}`)
            });
        }
    },
    deps: [NgModuleRef, NgerUtil, Logger]
}
```