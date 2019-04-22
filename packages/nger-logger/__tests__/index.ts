import { expect } from 'chai'
import { ConsoleLogger, LogLevel } from '../lib'
describe('ConsoleLogger', () => {
    it('ConsoleLogger can new', () => {
        const logger = new ConsoleLogger(LogLevel.debug)
        expect(logger).to.instanceOf(ConsoleLogger)
    })
})
