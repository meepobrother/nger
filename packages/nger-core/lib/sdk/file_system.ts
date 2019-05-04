import { InjectionToken } from 'nger-di';
import fs from 'fs-extra';
export type FileSystem = typeof fs;
export const FILE_SYSTEM = new InjectionToken<FileSystem>(`FILE_SYSTEM`);