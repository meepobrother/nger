import { TypeContext } from 'ims-decorator';
import { Injectable } from 'nger-core';
@Injectable()
export class NgerCliBuild {
    /** 构建h5应用 */
    h5(context: TypeContext) { }
    /** 微信公众号 */
    wechat(context: TypeContext) { }
    /** 微信小程序 */
    weapp(context: TypeContext) { }
    /** 支付宝小程序 */
    alipay(context: TypeContext) { }
    /** 百度智能 */
    swap(context: TypeContext) { }
    /** 字节跳动 */
    tt(context: TypeContext) { }
    /** 安卓 */
    android(context: TypeContext) { }
    /** ios */
    ios(context: TypeContext) { }
    /** 后台 */
    admin(context: TypeContext) { }
}
