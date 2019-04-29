import { Injectable } from 'nger-core'
import { NgerCompilerLess } from './less';
import { NgerCompilerSass } from './sass';
import { NgerCompilerCsso } from './csso';
import { NgerCompilerPostcss } from './postcss';
import { NgerCompilerStylus } from './stylus';


@Injectable()
export class NgerPlatformStyle {
    constructor(
        public less: NgerCompilerLess,
        public sass: NgerCompilerSass,
        public csso: NgerCompilerCsso,
        public postcss: NgerCompilerPostcss,
        public stylus: NgerCompilerStylus
    ) { }

    async compile(code: string, type: 'less' | 'sass' | 'scss' | 'stylus' | 'css') {
        switch (type) {
            case 'less':
                code = await this.less.compile(code, {});
                break;
            case 'sass':
            case 'scss':
                code = await this.sass.compile(code, {});
                break;
            case 'stylus':
                code = await this.stylus.compile(code, {});
                break;
            default:
                break;
        }
        code = await this.postcss.compile(code, {});
        code = await this.csso.compile(code, {});
        return code;
    }
}