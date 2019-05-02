import { Controller, Inject, Get, Optional, Logger } from 'nger-core';
import { HomeController } from './home'

@Controller('/user')
export class UserController {

    @Inject() public logger: Logger

    constructor(
        @Inject() public home: HomeController,
    ) { }

    @Get()
    info() {
        console.info(this.logger)
        return this.home.userInfo();
    }

    @Get()
    error() {
        throw new Error(`nger:error get error`)
    }
}