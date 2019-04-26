import { TypeContext } from 'ims-decorator';
import { ConsoleLogger, LogLevel } from 'nger-logger';
import { NgerUtil } from 'nger-util';
import { NgModuleMetadataKey, NgModuleClassAst, ControllerMetadataKey, ControllerClassAst, GetMethodAst, PostMethodAst, GetMetadataKey, PostMetadataKey, Platform, GetPropertyAst, PostPropertyAst } from 'nger-core';
import axios from 'axios'
export class NgerPlatformAxios extends Platform {
    logger: ConsoleLogger
    util: NgerUtil;
    constructor() {
        super();
        this.logger = new ConsoleLogger(LogLevel.debug);
        this.util = new NgerUtil(this.logger)
    }
    async run(context: TypeContext) {
        const _axios = await this.util.loadPkg<typeof axios>('axios');
        const ngModule = context.getClass(NgModuleMetadataKey) as NgModuleClassAst;
        ngModule.declarations.map(declaration => {
            const controller = declaration.getClass(ControllerMetadataKey) as ControllerClassAst;
            const gets = declaration.getProperty(GetMetadataKey) as GetPropertyAst[];
            const posts = declaration.getProperty(PostMetadataKey) as PostPropertyAst[];
            gets.map(get => {
                const def = get.ast.metadataDef;
                def.path = def.path || `${get.ast.propertyKey as string}`;
                if (def.path.startsWith('http')) {
                    declaration.instance[get.ast.propertyKey] = (...args: any[]) => {
                        let params: any = {}
                        args.map(arg => {
                            if (typeof arg === 'object') {
                                params = { ...params, ...arg }
                            }
                        });
                        if (def.path) return _axios.get(def.path, {
                            params: params
                        }).then(data => data.data)
                    }
                } else {
                    declaration.instance[get.ast.propertyKey] = (...args: any[]) => {
                        let params: any = {}
                        args.map(arg => {
                            if (typeof arg === 'object') {
                                params = { ...params, ...arg }
                            }
                        });
                        return _axios.get(`${controller.path}/${def.path}`, { params }).then(data => data.data)
                    }
                }
            });
            posts.map(post => {
                const def = post.ast.metadataDef;
                def.path = def.path || `${post.ast.propertyKey as string}`;
                if (def.path.startsWith('http')) {
                    declaration.instance[post.ast.propertyKey] = (...args: any[]) => {
                        let body: any = {}
                        args.map(arg => {
                            if (typeof arg === 'object') {
                                body = { ...body, ...arg }
                            }
                        });
                        return _axios.post(`${def.path}`, body).then(data => data.data)
                    }
                } else {
                    declaration.instance[post.ast.propertyKey] = (...args: any[]) => {
                        let body: any = {}
                        args.map(arg => {
                            if (typeof arg === 'object') {
                                body = { ...body, ...arg }
                            }
                        });
                        return _axios.post(`${controller.path}/${def.path}`, body).then(data => data.data)
                    }
                }
            });
        });
    }
}