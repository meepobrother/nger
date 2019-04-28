export abstract class Cache {
    abstract get(key: string): Promise<string>;
    abstract put(key: string, value: string): Promise<boolean>;
    abstract createKey(domain: string, ...args: any[]): string;
    abstract commit(): Promise<void>;
    abstract clear(): void;
    abstract clearDiskCache(): Promise<void>;
    abstract getMemoryStats(): string;
    abstract initCacheDir(): Promise<void>;
}
