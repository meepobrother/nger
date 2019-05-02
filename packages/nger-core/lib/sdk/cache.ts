export abstract class Cache {
    abstract get<T>(key: string): Promise<T>;
    abstract put<T>(key: string, value: T): Promise<boolean>;
    abstract remove<T>(key: string): Promise<boolean>;
    abstract clear(): void;
}
