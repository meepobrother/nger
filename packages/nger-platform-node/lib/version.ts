export class Version {
    toNumbers(value: string): number[] {
        return value.split('.').map(Number);
    }
    compareNumbers(a: number[], b: number[]): -1 | 0 | 1 {
        const max = Math.max(a.length, b.length);
        const min = Math.min(a.length, b.length);
        for (let i = 0; i < min; i++) {
            if (a[i] > b[i]) return 1;
            if (a[i] < b[i]) return -1;
        }
        if (min !== max) {
            const longestArray = a.length === max ? a : b;
            const comparisonResult = a.length === max ? 1 : -1;
            for (let i = min; i < max; i++) {
                if (longestArray[i] > 0) {
                    return comparisonResult;
                }
            }
        }
        return 0;
    }
    isVersionBetween(version: string, low: string, high?: string): boolean {
        const tsNumbers = this.toNumbers(version);
        if (high !== undefined) {
            return this.compareNumbers(this.toNumbers(low), tsNumbers) <= 0 &&
                this.compareNumbers(this.toNumbers(high), tsNumbers) >= 0;
        }
        return this.compareNumbers(this.toNumbers(low), tsNumbers) <= 0;
    }
    compareVersions(v1: string, v2: string): -1 | 0 | 1 {
        return this.compareNumbers(this.toNumbers(v1), this.toNumbers(v2));
    }
}
