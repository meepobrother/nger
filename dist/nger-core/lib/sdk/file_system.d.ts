import { InjectionToken } from 'nger-di';
import fs from 'fs-extra';
export declare type FileSystem = typeof fs;
export declare const FILE_SYSTEM: InjectionToken<typeof fs>;
