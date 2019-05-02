import { Cache } from 'nger-core'
export class NgerTtCache extends Cache {
    get<T>(key: string): Promise<T> { }
    put<T>(key: string, value: T): Promise<boolean> { }
    remove<T>(key: string): Promise<boolean> { }
    clear(): void { }
}