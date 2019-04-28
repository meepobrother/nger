import { Command, Inject, Logger } from 'nger-core'
import { join } from 'path';

import mocha, { MochaOptions } from 'mocha';
const options: MochaOptions = {};
const _mocha = new mocha(options);

@Command({
    name: 'test <type>',
    description: '单元测试',
    example: {
        command: 'nger test',
        description: '单元测试'
    }
})
export class TestCommand {
    @Inject() logger: Logger;
    type: 'server' | 'app' | 'admin' = 'server'
    run() {
        this.logger.warn(`testing`);
        _mocha.addFile(join(__dirname, `test/${this.type}.ts`))
        _mocha.run((failures: number) => {
            console.log(`TestCommand`, failures)
        });
    }
}
