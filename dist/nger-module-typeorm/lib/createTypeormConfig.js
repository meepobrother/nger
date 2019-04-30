Object.defineProperty(exports, "__esModule", { value: true });
const nger_core_1 = require("nger-core");
const parseTypeorm_1 = require("./parseTypeorm");
function createTypeormConfig(typeorms) {
    let entities = [];
    let subscribers = [];
    let migrations = [];
    typeorms.map(target => {
        const context = nger_core_1.visitor.visitType(target);
        const typeorm = parseTypeorm_1.parseTypeorm(context);
        entities = entities.concat(typeorm.entities);
        subscribers = subscribers.concat(typeorm.subscribers);
        migrations = migrations.concat(typeorm.migrations);
    });
    return {
        entities,
        subscribers,
        migrations
    };
}
exports.createTypeormConfig = createTypeormConfig;
