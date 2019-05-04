"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const inject_1 = require("../decorators/inject");
const index_1 = require("../orm/index");
const tokens_1 = require("../tokens");
const http_1 = require("../sdk/http");
const get_1 = require("../http/get");
const post_1 = require("../http/post");
const controller_1 = require("../controller");
/** 解析器 */
class Parser {
}
exports.Parser = Parser;
class DefaultParser extends Parser {
    constructor(injector) {
        super();
        this.injector = injector;
    }
    parse(instance, context) {
        const controller = context.getClass(controller_1.ControllerMetadataKey);
        const injects = context.getProperty(inject_1.InjectMetadataKey);
        injects.map(inject => {
            const { metadataDef, propertyKey, propertyType } = inject.ast;
            instance[propertyKey] = context.injector.get(metadataDef.token || propertyType);
        });
        // entity
        const entities = context.getProperty(index_1.EntityRepositoryMetadataKey);
        entities.map(entity => {
            const { metadataDef, propertyKey } = entity.ast;
            setTimeout(() => {
                const connection = context.injector.get(tokens_1.ConnectionToken);
                instance[propertyKey] = connection.getRepository(metadataDef.entity);
            }, 0);
        });
        // 这里处理http请求
        const http = this.injector.get(http_1.Http);
        const gets = context.getProperty(get_1.GetMetadataKey);
        const posts = context.getProperty(post_1.PostMetadataKey);
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
                        return http.get(def.path, {
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
                    if (controller) {
                        return http.get(`${controller.path}/${def.path}`, { params }).then(data => data.data);
                    }
                    else {
                        return http.get(`/${def.path}`, { params }).then(data => data.data);
                    }
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
                    return http.post(`${def.path}`, body).then(data => data.data);
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
                    if (controller) {
                        return http.post(`${controller.path}/${def.path}`, body).then(data => data.data);
                    }
                    else {
                        return http.post(`/${def.path}`, body).then(data => data.data);
                    }
                };
            }
        });
        return instance;
    }
}
exports.DefaultParser = DefaultParser;
/** 外观模式 提供统一接口 */
let ParserVisitor = class ParserVisitor extends Parser {
    constructor(allParser) {
        super();
        this.allParser = allParser;
    }
    parse(instance, context) {
        for (let item of this.allParser) {
            item.parse(instance, context);
        }
        return instance;
    }
};
ParserVisitor = tslib_1.__decorate([
    tslib_1.__param(0, inject_1.Inject(Parser)),
    tslib_1.__metadata("design:paramtypes", [Array])
], ParserVisitor);
exports.ParserVisitor = ParserVisitor;
