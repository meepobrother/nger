import { WebpackService } from 'nger-module-webpack'
import webpackDevMiddleware from 'webpack-dev-middleware';

export class NgerWebpackDevServer {
    middleware: any;
    constructor(public service: WebpackService) {
        this.middleware = webpackDevMiddleware(
            this.service.compiler
        );
    }
}
