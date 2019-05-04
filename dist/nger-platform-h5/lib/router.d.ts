import { Router } from 'nger-core';
export declare class NgerH5Router extends Router {
    switchTab(url: string): Promise<boolean>;
    reLaunch(url: string): Promise<boolean>;
    redirectTo(url: string): Promise<boolean>;
    navigateTo(url: string): Promise<boolean>;
    navigateBack(delta: number): Promise<boolean>;
}
