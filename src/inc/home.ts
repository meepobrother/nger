import { Controller, Get, Post, Inject, EntityRepository } from 'nger-core'
import { Logger } from 'nger-logger'
import { ImsDemoEntity } from '../typeorm'
@Controller({
    path: '/'
})
export class HomeController {

    @Inject() public logger: Logger

    @EntityRepository(ImsDemoEntity)
    demo: EntityRepository<ImsDemoEntity>;

    info: any = {
        username: 'nger',
        age: 28
    }

    constructor() { }

    @Get()
    userInfo() {
        this.logger.debug(`i am a injector logger!`)
        return this.demo.find();
    }

    @Post()
    setUserInfo(username: string, age: number) {
        this.info = {
            username,
            age
        }
    }
}