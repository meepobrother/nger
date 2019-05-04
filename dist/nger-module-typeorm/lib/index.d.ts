import { TypeormToken, TypeormOptionsToken } from 'nger-core';
import { Type, ModuleWithProviders } from 'nger-di';
import { getConnectionManager, ConnectionOptions } from 'typeorm';
export declare class NgerModuleTypeorm {
    static forRoot(orm: Type<any>): ModuleWithProviders;
    static forChild(orm: Type<any>): ModuleWithProviders;
}
export { TypeormToken, TypeormOptionsToken, ConnectionOptions, getConnectionManager };
