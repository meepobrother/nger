import { Logger } from 'nger-core';
import pm2, { StartOptions, Proc, ProcessDescription } from 'pm2';
import { NgerUtil } from 'nger-util';
export declare class NgerPm2Service {
    logger: Logger;
    util: NgerUtil;
    readonly pm2: Promise<typeof pm2>;
    constructor(logger: Logger, util: NgerUtil);
    /** 启动 */
    start(options: StartOptions): Promise<Proc>;
    /** 停止 */
    stop(process: string | number): Promise<Proc>;
    /** 重启 */
    restart(process: string | number): Promise<Proc>;
    /** 列表 */
    list(): Promise<ProcessDescription[]>;
}
