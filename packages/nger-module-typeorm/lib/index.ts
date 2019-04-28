import { NgModule, APP_INITIALIZER, TypeormToken, TypeormOptionsToken, ConnectionToken, ConnectionManagerToken } from 'nger-core'
import { NgerUtil } from 'nger-util';
import { Injector, Type, setRecord, Record, ModuleWithProviders } from 'nger-di';
import { createTypeormConfig } from './createTypeormConfig';
import { getConnectionManager, ConnectionOptions, getConnection } from 'typeorm';
import { Logger } from 'nger-logger'
import { join } from 'path';
@NgModule({
    providers: [
        NgerUtil,
        {
            provide: ConnectionManagerToken,
            useFactory: () => getConnectionManager(),
            deps: []
        },
        {
            provide: ConnectionToken,
            useFactory: (injector: Injector) => {
                const options = injector.get(TypeormOptionsToken) as ConnectionOptions;
                const connectionManager = getConnectionManager();
                return connectionManager.get(options.name)
            },
            deps: [
                Injector
            ]
        },
        {
            provide: APP_INITIALIZER,
            useFactory: (injector: Injector) => {
                return async () => {
                    // typeorm 配置
                    const logger = injector.get(Logger) as Logger;
                    setRecord(ConnectionManagerToken, new Record(() => {
                        return getConnectionManager();
                    }, [], undefined));
                    try {
                        const options = await injector.get(TypeormOptionsToken) as ConnectionOptions;
                        const typeorms = injector.get<Type<any>[]>(TypeormToken);
                        const { entities, subscribers, migrations } = createTypeormConfig(typeorms);
                        const connectionManager = getConnectionManager();
                        if (options.name) {
                            // 防止重复打开
                            if (connectionManager.has(options.name)) {
                                // 关闭老的连接
                                await connectionManager.get(options.name).close();
                            }
                        }
                        const connection = connectionManager.create({
                            ...options,
                            entities,
                            subscribers,
                            migrations
                        });
                        await connection.connect();
                        setRecord(ConnectionToken, new Record(() => {
                            return connection
                        }, [], undefined));
                    } catch (e) {
                        setRecord(ConnectionToken, new Record(() => {
                            return getConnection()
                        }, [], undefined));
                        logger.error(e.message);
                    }
                }
            },
            deps: [Injector],
            multi: true
        }]
})
export class NgerModuleTypeorm {
    // 启动
    static forRoot(orm: Type<any>): ModuleWithProviders {
        const root = process.cwd();
        const config = require(join(root, 'config/config.json')).db;
        return {
            ngModule: NgerModuleTypeorm,
            providers: [{
                provide: TypeormOptionsToken,
                useValue: config
            }, {
                provide: TypeormToken,
                useValue: orm,
                multi: true
            }]
        }
    }
    // 加载多个typeorm类
    static forChild(orm: Type<any>): ModuleWithProviders {
        return {
            ngModule: NgerModuleTypeorm,
            providers: [
                {
                    provide: TypeormToken,
                    useValue: orm,
                    multi: true
                }
            ]
        }
    }
}
export { TypeormToken, TypeormOptionsToken, ConnectionOptions, getConnectionManager }
