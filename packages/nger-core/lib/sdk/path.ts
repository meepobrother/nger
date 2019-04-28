export abstract class Path {
    abstract basename(p: string, ext?: string): string;
    abstract dirname(p: string): string;
    abstract extname(p: string): string;
    abstract isAbsolute(p: string): boolean;
    abstract join(...paths: string[]): string;
    abstract parse(pathString: string): { root: string; dir: string; base: string; ext: string; name: string; };
    abstract relative(from: string, to: string): string;
    abstract resolve(...pathSegments: any[]): string;
    sep: string;
}