import { Controller, Inject, Get, Optional, Post, PostProperty, EntityRepository } from 'nger-core';
import { HomeController } from './home'
import { Logger } from 'nger-logger';
import { NgerPm2Service } from 'nger-module-pm2';

@Controller('/sms')
export class SmsController {

    @Inject() public logger: Logger

    constructor(
        @Inject() public home: HomeController,
        @Inject() @Optional() public pm2: NgerPm2Service
    ) { }

    @Post('阿里云网址')
    sendAliSms: PostProperty<any>;
    // @EntityRepository(NgerSmsEntity)
    // smsRepository: EntityRepository<NgerSmsEntity>;
    @Post()
    async sendSms(type: 'aliyun', uid: number, PhoneNumbers: string) {
        const code = `1234`;
        // const setting = await this.smsRepository.findOne({
        //     uid: uid
        // })
        let setting: any;
        if (type === 'aliyun') {
            return this.sendAliSms({
                PhoneNumbers: PhoneNumbers,
                SignName: setting.SignName,
                TemplateCode: setting.TemplateCode,
                AccessKeyId: setting.AccessKeyId,
                Action: 'SendSms',
                OutId: setting.OutId,
                TemplateParam: {
                    code: code
                }
            })
        }
    }
}