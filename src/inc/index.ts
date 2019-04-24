import { Controller, Get, Post, Inject } from 'nger-core'
import { Logger } from 'nger-logger'
@Controller({
    path: '/'
})
export class IndexController {

    info: any = {
        username: 'nger',
        age: 28
    }

    constructor(
        @Inject(Logger) public logger: Logger
    ) { }

    @Get()
    userInfo() {
        this.logger.debug(`i am a injector logger!`)
        return this.info;
    }

    @Post()
    setUserInfo(username: string, age: number) {
        this.info = {
            username,
            age
        }
    }
}