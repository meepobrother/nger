export abstract class FileSystem {
    abstract copyFile(src: string, dest: string): Promise<void>;
    abstract createReadStream(filePath: string): any;
    abstract exists(filePath: string): Promise<boolean>;
    abstract existsSync(filePath: string): boolean;
    abstract mkdir(dirPath: string): Promise<void>;
    abstract mkdirSync(dirPath: string): void;
    abstract readdir(dirPath: string): Promise<string[]>;
    abstract readdirSync(dirPath: string): string[];
    abstract readFile(filePath: string): Promise<string>;
    abstract readFileSync(filePath: string): string;
    abstract rmdir(dirPath: string): Promise<void>;
    abstract stat(path: string): Promise<FsStats>;
    abstract statSync(path: string): FsStats;
    abstract unlink(filePath: string): Promise<void>;
    abstract writeFile(filePath: string, content: string, opts?: FsWriteOptions): Promise<void>;
    abstract writeFileSync(filePath: string, content: string, opts?: FsWriteOptions): void;
}

export interface FsStats {
    isFile(): boolean;
    isDirectory(): boolean;
    isBlockDevice(): boolean;
    isCharacterDevice(): boolean;
    isSymbolicLink(): boolean;
    isFIFO(): boolean;
    isSocket(): boolean;
    dev: number;
    ino: number;
    mode: number;
    nlink: number;
    uid: number;
    gid: number;
    rdev: number;
    size: number;
    blksize: number;
    blocks: number;
    atime: Date;
    mtime: Date;
    ctime: Date;
    birthtime: Date;
}


export interface FsReadOptions {
    useCache?: boolean;
    setHash?: boolean;
}


export interface FsReaddirOptions {
    inMemoryOnly?: boolean;
    recursive?: boolean;
}


export interface FsReaddirItem {
    absPath: string;
    relPath: string;
    isDirectory: boolean;
    isFile: boolean;
}


export interface FsWriteOptions {
    inMemoryOnly?: boolean;
    clearFileCache?: boolean;
    immediateWrite?: boolean;
    useCache?: boolean;
}

export interface FsWriteResults {
    changedContent?: boolean;
    queuedWrite?: boolean;
    ignored?: boolean;
}

export type FsItems = Map<string, FsItem>;

export interface FsItem {
    fileText?: string;
    isFile?: boolean;
    isDirectory?: boolean;
    size?: number;
    mtimeMs?: number;
    exists?: boolean;
    queueWriteToDisk?: boolean;
    queueDeleteFromDisk?: boolean;
    useCache?: boolean;
}
