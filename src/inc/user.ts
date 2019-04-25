import { Controller, Inject, Get, Optional } from 'nger-core';
import { HomeController } from './home'
import { Logger } from 'nger-logger';
import { NgerPm2Service } from 'nger-module-pm2';

@Controller('/user')
export class UserController {

    @Inject() public logger: Logger

    constructor(
        @Inject() public home: HomeController,
        @Inject() @Optional() public pm2: NgerPm2Service
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