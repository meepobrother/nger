import { Folder, File } from "tns-core-modules/file-system";
export declare class NsFileSystem {
    currentApp(): Folder;
    fileFromPath(path: string): File;
    fileExists(path: string): boolean;
}
