export declare class NgerCliBuild {
    dev(name: string, isDev: any): Promise<void>;
    prod(name: string, isDev: any): Promise<void>;
}
export declare function packProject(name: string, output?: string, srcRoot?: string, isDev?: boolean): Promise<{}>;
