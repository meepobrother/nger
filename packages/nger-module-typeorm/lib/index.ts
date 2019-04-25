import { NgModule, APP_INITIALIZER, TypeormToken, TypeormOptionsToken, ConnectionToken } from 'nger-core'
import { NgerUtil } from 'nger-util';
import { Injector, Type, setRecord, Record } from 'nger-di';
import { createTypeormConfig } from './createTypeormConfig';
import { getConnectionManager, ConnectionOptions } from 'typeorm';
import { Logger } from 'nger-logger'
@NgModule({
    providers: [NgerUtil, {
        provide: APP_INITIALIZER,
        useFactory: (injector: Injector) => {
            return async () => {
                // typeorm 配置
                const logger = injector.get(Logger) as Logger;
                try {
                    const options = await injector.get(TypeormOptionsToken) as ConnectionOptions;
                    const typeorms = injector.get(TypeormToken) as Type<any>[];
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
                    logger.error(e.message);
                }
            }
        },
        deps: [Injector],
        multi: true
    }]
})
export class NgerModuleTypeorm { }
export { TypeormToken, TypeormOptionsToken, ConnectionOptions, getConnectionManager }
