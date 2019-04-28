import { Controller, Get, Post, Inject, GetProperty, It, Http } from 'nger-core'
import { Logger } from 'nger-logger'
@Controller({
    path: '/'
})
export class HomeController {

    @Inject() public logger: Logger

    // @EntityRepository(ImsDemoEntity)
    // demo: EntityRepository<ImsDemoEntity>;

    info: any = {
        username: 'nger',
        age: 28
    }

    @Get('http://www.baidu.com')
    getBaidu: GetProperty<any>;

    @Get('baidu')
    baidu() {
        return this.getBaidu();
    }

    constructor(public http: Http) { }

    @Get()
    getHttp() {
        return this.http.get(`http://baidu.com`)
    }

    @It(`Get /userInfo`, async (expect, that) => {
        const res = await that.userInfo();
        expect(Array.isArray(res)).to.eq(true);
    })
    @Get()
    userInfo() {
        this.logger.debug(`i am a injector logger!`)
        // return this.demo.find();
    }

    @Post()
    login(username: string, password: number) {
        this.info = {
            username,
            password
        }
    }
}