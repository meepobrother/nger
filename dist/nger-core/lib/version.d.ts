export declare class Version {
    toNumbers(value: string): number[];
    compareNumbers(a: number[], b: number[]): -1 | 0 | 1;
    isVersionBetween(version: string, low: string, high?: string): boolean;
    compareVersions(v1: string, v2: string): -1 | 0 | 1;
}
