export abstract class Logger {
    abstract debug(...args: string[]): void;
    abstract info(...args: string[]): void;
    abstract warn(...args: string[]): void;
    abstract error(...args: string[]): void;
}

