export declare abstract class Router {
    abstract switchTab(url: string): Promise<boolean>;
    abstract reLaunch(url: string): Promise<boolean>;
    abstract redirectTo(url: string): Promise<boolean>;
    abstract navigateTo(url: string): Promise<boolean>;
    abstract navigateBack(delta: number): Promise<boolean>;
}
