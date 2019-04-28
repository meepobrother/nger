import { ConsoleLogger, LogLevel } from 'nger-logger';
import express from 'express';
import WebpackDevMiddleware from 'webpack-dev-middleware';
import { createServer } from 'http';
import { Logger, createPlatformFactory, Parser, platformCore, getPort } from 'nger-core';
import { NgerUtil } from 'nger-util';
import { Injector, InjectFlags } from 'nger-di';
import { WebpackService } from 'nger-module-webpack';
import ngerPlatformAxios from 'nger-platform-axios';
import { TypeContext } from 'ims-decorator'
export class GetParser extends Parser {
    // 这里新建instance
    parse<T>(context: TypeContext): T | undefined {
        return;
    }
}
export default createPlatformFactory(platformCore, 'express', [{
    provide: Parser,
    useFactory: async (util: NgerUtil) => {
        const exp = await util.loadPkg<typeof express>('express')
        const app = exp();
        const server = createServer(app)
        const port = getPort();
        server.listen(port, () => {
            console.info(`app start at http://localhost:${port}`)
        });
        return new GetParser();
    },
    deps: [NgerUtil]
}]);

function createWebpackMiddle(injector: Injector) {
    const webpack = injector.get(WebpackService, undefined, InjectFlags.Optional) as WebpackService;
    const config = webpack.config;
    let publicPath = '/';
    if (config) {
        if (config.output && config.output.publicPath) publicPath = config.output.publicPath
    }
    const middleWare = WebpackDevMiddleware(webpack.compiler, {
        publicPath,
    });
    return middleWare;
}