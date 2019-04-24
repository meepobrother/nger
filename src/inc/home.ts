import { Controller, Get, Post, Inject } from 'nger-core'
import { Logger } from 'nger-logger'
import { APP_INITIALIZER } from '@angular/core'
@Controller({
    path: '/'
})
export class HomeController {

    @Inject() public logger: Logger

    info: any = {
        username: 'nger',
        age: 28
    }

    constructor() { }

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