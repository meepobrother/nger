// 将ng模板编译成preact可以执行的文件
import { NgerComponentConfig } from './types'
import { NgerPlatformStyle } from 'nger-compiler'
import { join, dirname, extname } from 'path'
import fs from 'fs-extra'

export class NgerCompilerPreactStyle {
    constructor(public style: NgerPlatformStyle) { }
    async run(config: NgerComponentConfig) {
        try {
            let styleStr = ``;
            let { styleUrls, styles, sourceRoot } = config;
            let type: any = 'scss'
            if (styleUrls) {
                styleUrls.map(res => {
                    styleStr += fs.readFileSync(join(dirname(sourceRoot), res)).toString('utf8')
                    type = extname(res).replace('.', '')
                })
            }
            if (styles) {
                styles.map(res => styleStr += res)
            }
            if (styleStr.length > 0) {
                const code = await this.style.compile(styleStr, type);
                const root = dirname(sourceRoot);
                fs.ensureDirSync(`${root}/h5`)
                fs.writeFileSync(`${root}/h5/index.css`, code)
            }
        } catch (e) { }
    }
}
