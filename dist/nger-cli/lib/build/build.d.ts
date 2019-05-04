export declare class NgerCliBuild {
    dev(name: string): Promise<void>;
    prod(name: string): Promise<void>;
}
export declare function packProject(name: string, output?: string, srcRoot?: string): Promise<{}>;
