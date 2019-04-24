import { Injectable, Inject } from 'nger-core';
import pm2, { StartOptions, Proc, ProcessDescription } from 'pm2';
import { NgerUtil } from 'nger-util'
import { Logger } from 'nger-logger';

@Injectable()
export class NgerPm2Service {
    get pm2() {
        return this.util.loadPkg<typeof pm2>('pm2')
    }
    constructor(
        @Inject() public logger: Logger,
        @Inject() public util: NgerUtil
    ) { }

    /** 启动 */
    start(options: StartOptions): Promise<Proc> {
        return new Promise(async (resolve, reject) => {
            const pm2 = await this.pm2;
            pm2.start(options, (err: Error, proc: Proc) => {
                if (err) return reject(err)
                resolve(proc)
            })
        })
    }
    /** 停止 */
    stop(process: string | number): Promise<Proc> {
        return new Promise(async (resolve, reject) => {
            const pm2 = await this.pm2;
            pm2.stop(process, (err: Error, proc: Proc) => {
                if (err) return reject(err)
                resolve(proc)
            })
        })
    }
    /** 重启 */
    restart(process: string | number): Promise<Proc> {
        return new Promise(async (resolve, reject) => {
            const pm2 = await this.pm2;
            pm2.restart(process, (err: Error, proc: Proc) => {
                if (err) return reject(err)
                resolve(proc)
            })
        })
    }
    /** 列表 */
    list(): Promise<ProcessDescription[]> {
        return new Promise(async (resolve, reject) => {
            const pm2 = await this.pm2;
            pm2.list((err: Error, processDescriptionList: ProcessDescription[]) => {
                if (err) return reject(err)
                resolve(processDescriptionList)
            })
        })
    }
}
