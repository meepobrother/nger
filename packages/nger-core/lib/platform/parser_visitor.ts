import { TypeContext } from 'ims-decorator'
import { Inject, InjectMetadataKey, InjectPropertyAst } from '../decorators/inject'
import { EntityRepositoryMetadataKey, EntityRepositoryPropertyAst } from '../orm/index';
import { ConnectionToken } from '../tokens';
import { Connection } from 'typeorm'
import { Injector } from 'nger-di'
import { Http } from '../sdk/http';
import { GetMetadataKey, GetPropertyAst } from '../http/get'
import { PostMetadataKey, PostPropertyAst } from '../http/post'
import { ControllerMetadataKey, ControllerClassAst } from '../controller';

/** 解析器 */
export abstract class Parser {
    abstract parse<T>(instance: T, context: TypeContext): T;
}
export class DefaultParser extends Parser {
    constructor(public injector: Injector) {
        super();
    }
    parse<T>(instance: T, context: TypeContext): T {
        const controller = context.getClass(ControllerMetadataKey) as ControllerClassAst;
        const injects = context.getProperty(InjectMetadataKey) as InjectPropertyAst[];
        injects.map(inject => {
            const { metadataDef, propertyKey, propertyType } = inject.ast;
            instance[propertyKey] = context.injector.get(metadataDef.token || propertyType)
        });
        // entity
        const entities = context.getProperty(EntityRepositoryMetadataKey) as EntityRepositoryPropertyAst[];
        entities.map(entity => {
            const { metadataDef, propertyKey } = entity.ast;
            setTimeout(() => {
                const connection = context.injector.get(ConnectionToken) as Connection;
                instance[propertyKey] = connection.getRepository(metadataDef.entity);
            }, 0);
        });
        // 这里处理http请求
        const http = this.injector.get(Http)
        const gets = context.getProperty(GetMetadataKey) as GetPropertyAst[];
        const posts = context.getProperty(PostMetadataKey) as PostPropertyAst[];
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
                    if (def.path) return http.get(def.path, {
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
                    if (controller) {
                        return http.get(`${controller.path}/${def.path}`, { params }).then(data => data.data)
                    } else {
                        return http.get(`/${def.path}`, { params }).then(data => data.data)
                    }
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
                    return http.post(`${def.path}`, body).then(data => data.data)
                }
            } else {
                instance[post.ast.propertyKey] = (...args: any[]) => {
                    let body: any = {}
                    args.map(arg => {
                        if (typeof arg === 'object') {
                            body = { ...body, ...arg }
                        }
                    });
                    if (controller) {
                        return http.post(`${controller.path}/${def.path}`, body).then(data => data.data)
                    } else {
                        return http.post(`/${def.path}`, body).then(data => data.data)
                    }
                }
            }
        });
        return instance;
    }
}
/** 外观模式 提供统一接口 */
export class ParserVisitor extends Parser {
    constructor(@Inject(Parser) public allParser: Parser[]) {
        super()
    }
    parse<T>(instance: T, context: TypeContext): T {
        for (let item of this.allParser) {
            item.parse<T>(instance, context);
        }
        return instance
    }
}
