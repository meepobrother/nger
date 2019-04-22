export type IAnyObject = Record<string, any>
export type KVInfer<T> = {
    [K in keyof T]: T[K]
}
export type Void<T> = T | undefined | null
export type PartialOptional<T, K extends keyof T> = Partial<Pick<T, K>> & Pick<T, Exclude<keyof T, K>>
export type Optional<T> = {
    [K in keyof T]+?: T[K]
}
