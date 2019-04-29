import { InjectionToken } from 'nger-di';
import fs from 'fs-extra';
export type FileSystem = typeof fs;
export const FileSystem = new InjectionToken<FileSystem>(`FileSystem`);