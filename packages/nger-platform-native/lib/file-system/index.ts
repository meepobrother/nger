import { Injectable } from "nger-core";
import { knownFolders, Folder, File } from "tns-core-modules/file-system";

@Injectable()
export class NsFileSystem {
    public currentApp(): Folder {
        return knownFolders.currentApp();
    }

    public fileFromPath(path: string): File {
        return File.fromPath(path);
    }

    public fileExists(path: string): boolean {
        return File.exists(path);
    }
}