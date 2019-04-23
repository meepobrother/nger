export * from './compiler';

import { StyleCompiler, UrlResolver, CompileDirectiveMetadata } from '@angular/compiler'
import { join } from 'path';
import fs from 'fs-extra'
export class NgerUrlResolver implements UrlResolver {
    resolve(baseUrl: string, url: string): string {
        return fs.readFileSync(join(baseUrl, url)).toString('utf8')
    }
}

const compiler = new StyleCompiler(new NgerUrlResolver());
