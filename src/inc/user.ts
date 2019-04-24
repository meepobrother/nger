import { Controller, Inject, Get, Self,Optional } from 'nger-core';
import { HomeController } from './home'
import { Logger } from 'nger-logger';
@Controller('/user')
export class UserController {
    constructor(
        @Inject() public home: HomeController,
        @Inject() @Optional() @Self() public logger: Logger
    ) { }

    @Get()
    info() {
        console.log(this.logger)
        return this.home.userInfo();
    }
}