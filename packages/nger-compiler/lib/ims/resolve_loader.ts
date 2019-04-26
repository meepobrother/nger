export abstract class ResourceLoader {
    canPreload: boolean;
    abstract resolve(file: string, basePath: string): string;
    abstract preload(resolvedUrl: string): Promise<void> | undefined;
    abstract load(resolvedUrl: string): string;
}
import { dirname, resolve } from 'path'
import { readFileSync } from 'fs'
export class NgerResourceLoader extends ResourceLoader {
    canPreload = false;
    preload(): undefined | Promise<void> { throw new Error('Not implemented.'); }
    load(url: string): string { return readFileSync(url, 'utf8'); }
    resolve(url: string, containingFile: string): string {
        return resolve(dirname(containingFile), url);
    }
}