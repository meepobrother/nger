import { TypeContext } from 'ims-decorator';
import { NgerUtil } from 'nger-util';
import { createPlatformFactory, NgModuleBootstrap, platformCore, NgModuleMetadataKey, NgModuleClassAst, Http, ControllerMetadataKey, ControllerClassAst, GetMethodAst, NgModuleRef, GetMetadataKey, PostMetadataKey, GetPropertyAst, PostPropertyAst } from 'nger-core';
import axios from 'axios'
import ngerPlatformNode from 'nger-platform-node'

export class NgerPlatformAxios extends NgModuleBootstrap {
    constructor(public util: NgerUtil) {
        super();
    }
    async run(ref: NgModuleRef<any>) {
        ref.injector.setStatic([{
            provide: Http,
            useValue: axios
        }]);
        const ngModule = ref.context.getClass(NgModuleMetadataKey) as NgModuleClassAst;
        ngModule.declarations.map(declaration => {
            const componentFactory = ref.componentFactoryResolver.resolveComponentFactory(declaration.target)
            const controller = declaration.getClass(ControllerMetadataKey) as ControllerClassAst;
            const handler = async (declaration: TypeContext, instance: any, controller: any) => {
                const _axios = await this.util.loadPkg<typeof axios>('axios');
                const gets = declaration.getProperty(GetMetadataKey) as GetPropertyAst[];
                const posts = declaration.getProperty(PostMetadataKey) as PostPropertyAst[];
                gets.map(get => {
                    const def = get.ast.metadataDef;
                    def.path = def.path || `${get.ast.propertyKey as string}`;
                    if (def.path.startsWith('http')) {
                        instance[get.ast.propertyKey] = (...args: any[]) => {
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
                        instance[get.ast.propertyKey] = (...args: any[]) => {
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
                        instance[post.ast.propertyKey] = (...args: any[]) => {
                            let body: any = {}
                            args.map(arg => {
                                if (typeof arg === 'object') {
                                    body = { ...body, ...arg }
                                }
                            });
                            return _axios.post(`${def.path}`, body).then(data => data.data)
                        }
                    } else {
                        instance[post.ast.propertyKey] = (...args: any[]) => {
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
            }
            handler(declaration, componentFactory.create(ref.injector).instance, controller)
        });
    }
}

export default createPlatformFactory(platformCore, 'axios', [{
    provide: Http,
    useValue: axios
}, {
    provide: NgModuleBootstrap,
    useClass: NgerPlatformAxios,
    deps: [NgerUtil],
    multi: true
}]);
