import { Cache } from 'nger-core'
export class NgerTtCache extends Cache {
    async get<T>(key: string): Promise<T> {
        return new Promise(() => { })
    }
    async put<T>(key: string, value: T): Promise<boolean> { 
        return new Promise(() => { })
    }
    async remove<T>(key: string): Promise<boolean> { 
        return new Promise(() => { })
    }
    clear(): void { }
}