import { Cache } from 'nger-core'
export class NgerAlipayCache extends Cache {
    async get<T>(key: string): Promise<T> { 
        return new Promise<T>((resolve,reject)=>{})
    }
    async put<T>(key: string, value: T): Promise<boolean> { 
        return new Promise<boolean>((resolve,reject)=>{})
    }
    async remove<T>(key: string): Promise<boolean> {
        return new Promise<boolean>((resolve,reject)=>{})
     }
    clear(): void { }
}