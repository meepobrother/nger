import { Page } from "tns-core-modules/ui/page";
import { InjectionToken } from 'nger-di'
import { device, Device } from "tns-core-modules/platform";
export const DEVICE = new InjectionToken<Device>("platform device");
export const PAGE_FACTORY = new InjectionToken<PageFactory>("page factory");
export interface PageFactoryOptions {
    isBootstrap?: boolean;
    isLivesync?: boolean;
    isModal?: boolean;
    isNavigation?: boolean;
    componentType?: any;
}
export type PageFactory = (options: PageFactoryOptions) => Page;

let _rootPageRef: WeakRef<Page>;
export function setRootPage(page: Page): void {
    _rootPageRef = new WeakRef(page);
}

export function getRootPage(): Page {
    return _rootPageRef && _rootPageRef.get();
}

export const defaultPageFactory: PageFactory = function (_opts: PageFactoryOptions) {
    return new Page();
};
export function getDefaultDevice(): Device {
    return device;
}
export const defaultPageFactoryProvider = { provide: PAGE_FACTORY, useValue: defaultPageFactory };
export const defaultDeviceProvider = { provide: DEVICE, useFactory: getDefaultDevice };
export default [defaultPageFactoryProvider, defaultDeviceProvider];