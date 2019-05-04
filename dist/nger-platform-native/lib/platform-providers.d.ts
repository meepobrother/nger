import { Page } from "tns-core-modules/ui/page";
import { InjectionToken } from 'nger-di';
import { Device } from "tns-core-modules/platform";
export declare const DEVICE: InjectionToken<Device>;
export declare const PAGE_FACTORY: InjectionToken<PageFactory>;
export interface PageFactoryOptions {
    isBootstrap?: boolean;
    isLivesync?: boolean;
    isModal?: boolean;
    isNavigation?: boolean;
    componentType?: any;
}
export declare type PageFactory = (options: PageFactoryOptions) => Page;
export declare function setRootPage(page: Page): void;
export declare function getRootPage(): Page;
export declare const defaultPageFactory: PageFactory;
export declare function getDefaultDevice(): Device;
export declare const defaultPageFactoryProvider: {
    provide: InjectionToken<PageFactory>;
    useValue: PageFactory;
};
export declare const defaultDeviceProvider: {
    provide: InjectionToken<Device>;
    useFactory: typeof getDefaultDevice;
};
declare const _default: ({
    provide: InjectionToken<PageFactory>;
    useValue: PageFactory;
} | {
    provide: InjectionToken<Device>;
    useFactory: typeof getDefaultDevice;
})[];
export default _default;
