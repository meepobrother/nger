import { NgerCompilerLess } from './less';
import { NgerCompilerSass } from './sass';
import { NgerCompilerCsso } from './csso';
import { NgerCompilerPostcss } from './postcss';
import { NgerCompilerStylus } from './stylus';
export declare class NgerPlatformStyle {
    less: NgerCompilerLess;
    sass: NgerCompilerSass;
    csso: NgerCompilerCsso;
    postcss: NgerCompilerPostcss;
    stylus: NgerCompilerStylus;
    constructor(less: NgerCompilerLess, sass: NgerCompilerSass, csso: NgerCompilerCsso, postcss: NgerCompilerPostcss, stylus: NgerCompilerStylus);
    compileWeapp(code: string): Promise<string>;
    compile(code: string, type: 'less' | 'sass' | 'scss' | 'stylus' | 'css'): Promise<string>;
    compileStyle(code: string, type: 'less' | 'sass' | 'scss' | 'stylus' | 'css'): Promise<string>;
}
