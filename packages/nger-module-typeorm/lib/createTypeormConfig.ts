import { visitor } from 'nger-core';
import { parseTypeorm } from './parseTypeorm'
import { Type } from 'ims-decorator'
export function createTypeormConfig(typeorms: Type<any>[]) {
    let entities: Type<any>[] = [];
    let subscribers: Type<any>[] = [];
    let migrations: Type<any>[] = [];
    typeorms.map(target => {
        const context = visitor.visitType(target);
        const typeorm = parseTypeorm(context);
        entities = entities.concat(typeorm.entities);
        subscribers = subscribers.concat(typeorm.subscribers);
        migrations = migrations.concat(typeorm.migrations);
    });
    return {
        entities,
        subscribers,
        migrations
    }
}
