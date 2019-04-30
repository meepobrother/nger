export abstract class Cache {
    abstract get<T>(key: string): Promise<T>;
    abstract put<T>(key: string, value: T): Promise<boolean>;
    abstract createKey(domain: string, ...args: any[]): string;
    abstract commit(): Promise<void>;
    abstract clear(): void;
    abstract clearDiskCache(): Promise<void>;
    abstract getMemoryStats(): string;
    abstract initCacheDir(): Promise<void>;
}
