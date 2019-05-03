import { Cache } from 'nger-core'
export class NgerSwapCache extends Cache {
    get<T>(key: string): Promise<T> {
        return new Promise(() => { })
    }
    put<T>(key: string, value: T): Promise<boolean> {
        return new Promise(() => { })
    }
    remove<T>(key: string): Promise<boolean> {
        return new Promise(() => { })
    }
    clear(): void { }
}