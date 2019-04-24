import { Controller, Inject, Get, Self, Optional } from 'nger-core';
import { HomeController } from './home'
import { Logger } from 'nger-logger';
import { NgerPm2Service } from 'nger-module-pm2';

@Controller('/user')
export class UserController {
    constructor(
        @Inject() public home: HomeController,
        @Inject() @Optional() @Self() public logger: Logger,
        @Inject() @Optional() public pm2: NgerPm2Service
    ) { }

    @Get()
    info() {
        console.log(this.logger)
        return this.home.userInfo();
    }
}