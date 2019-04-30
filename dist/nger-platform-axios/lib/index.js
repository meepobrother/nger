Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const nger_util_1 = require("nger-util");
const nger_core_1 = require("nger-core");
const axios_1 = tslib_1.__importDefault(require("axios"));
class NgerPlatformAxios extends nger_core_1.NgModuleBootstrap {
    constructor(util) {
        super();
        this.util = util;
    }
    async run(ref) {
        ref.injector.setStatic([{
                provide: nger_core_1.Http,
                useValue: axios_1.default
            }]);
        const ngModule = ref.context.getClass(nger_core_1.NgModuleMetadataKey);
        ngModule.declarations.map(declaration => {
            const componentFactory = ref.componentFactoryResolver.resolveComponentFactory(declaration.target);
            const controller = declaration.getClass(nger_core_1.ControllerMetadataKey);
            const handler = async (declaration, instance, controller) => {
                const _axios = await this.util.loadPkg('axios');
                const gets = declaration.getProperty(nger_core_1.GetMetadataKey);
                const posts = declaration.getProperty(nger_core_1.PostMetadataKey);
                gets.map(get => {
                    const def = get.ast.metadataDef;
                    def.path = def.path || `${get.ast.propertyKey}`;
                    if (def.path.startsWith('http')) {
                        instance[get.ast.propertyKey] = (...args) => {
                            let params = {};
                            args.map(arg => {
                                if (typeof arg === 'object') {
                                    params = { ...params, ...arg };
                                }
                            });
                            if (def.path)
                                return _axios.get(def.path, {
                                    params: params
                                }).then(data => data.data);
                        };
                    }
                    else {
                        instance[get.ast.propertyKey] = (...args) => {
                            let params = {};
                            args.map(arg => {
                                if (typeof arg === 'object') {
                                    params = { ...params, ...arg };
                                }
                            });
                            return _axios.get(`${controller.path}/${def.path}`, { params }).then(data => data.data);
                        };
                    }
                });
                posts.map(post => {
                    const def = post.ast.metadataDef;
                    def.path = def.path || `${post.ast.propertyKey}`;
                    if (def.path.startsWith('http')) {
                        instance[post.ast.propertyKey] = (...args) => {
                            let body = {};
                            args.map(arg => {
                                if (typeof arg === 'object') {
                                    body = { ...body, ...arg };
                                }
                            });
                            return _axios.post(`${def.path}`, body).then(data => data.data);
                        };
                    }
                    else {
                        instance[post.ast.propertyKey] = (...args) => {
                            let body = {};
                            args.map(arg => {
                                if (typeof arg === 'object') {
                                    body = { ...body, ...arg };
                                }
                            });
                            return _axios.post(`${controller.path}/${def.path}`, body).then(data => data.data);
                        };
                    }
                });
            };
            handler(declaration, componentFactory.create(ref.injector).instance, controller);
        });
    }
}
exports.NgerPlatformAxios = NgerPlatformAxios;
exports.default = nger_core_1.createPlatformFactory(nger_core_1.platformCore, 'axios', [{
        provide: nger_core_1.Http,
        useValue: axios_1.default
    }, {
        provide: nger_core_1.NgModuleBootstrap,
        useClass: NgerPlatformAxios,
        deps: [nger_util_1.NgerUtil],
        multi: true
    }]);
