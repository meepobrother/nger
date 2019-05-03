import { Sdk, ISdk as t } from 'nger-core'

declare const wx:any;

function callAsync(api,option:any,component?:any):Promise<any>{
    return new Promise((resolve,reject)=>{
        try{
            if(component){
                wx[api]({
                    ...option,
                    success(res){
                        resolve(res);
                    },
                    fail(error){
                        reject(error);
                    }
                },component);
            }else{
                wx[api]({
                    ...option,
                    success(res){
                        resolve(res);
                    },
                    fail(error){
                        reject(error);
                    }
                });
            }
            
        }catch(error){
            reject(error);
        }
    })
}

function callSync(api,...option:any):any{
    try{
        if(option){
            return wx[api](...option);
        }
       return  wx[api]();
    }catch(e){
        return false;
    }
}

function callback(api){
    return new Promise((resolve,reject)=>{
        try{
            wx[api](()=>resolve());
        }catch(e){
            reject();
        }
    })
}

export class WeSdk extends Sdk{
    getAccountInfoSync(): t.AccountInfo {
        return callSync('getAccountInfoSync');
    }    
    getBatteryInfoSync(): t.GetBatteryInfoSyncResult {
        return callSync('getBatteryInfoSync');
    }
    getExtConfigSync(): t.ExtInfo {
        return callSync('getExtConfigSync');
    }
    getLaunchOptionsSync(): t.LaunchOptionsApp {
        return callSync('getLaunchOptionsSync');
    }
    getMenuButtonBoundingClientRect(): t.Rect {
        return callSync('getMenuButtonBoundingClientRect');
    }
    getStorageInfoSync(): t.GetStorageInfoSyncOption {
        return callSync('getStorageInfoSync');
    }
    getSystemInfoSync(): t.GetSystemInfoSyncResult {
        return callSync('getSystemInfoSync');
    }
    createAnimation(option: t.CreateAnimationOption): t.Animation {
        return callSync('createAnimation',option);
    }
    createAudioContext(id: string, component?: any): t.AudioContext {
        return callSync('createAudioContext',id,component);
    }
    getBackgroundAudioManager(): t.BackgroundAudioManager {
        return callSync('getBackgroundAudioManager');
    }
    createCameraContext(): t.CameraContext {
        return callSync('createCameraContext');
    }
    createCanvasContext(canvasId: string, component?: any): t.CanvasContext {
        return callSync('createCanvasContext',canvasId,component);
    }
    downloadFile(option: t.DownloadFileOption): t.DownloadTask {
        return callSync('downloadFile',option);
    }
    getFileSystemManager(): t.FileSystemManager {
        return callSync('getFileSystemManager');
    }
    createInnerAudioContext(): t.InnerAudioContext {
        return callSync('createInnerAudioContext');
    }
    createIntersectionObserver(component: any, options: t.CreateIntersectionObserverOption): t.IntersectionObserver;
    createIntersectionObserver(options: t.CreateIntersectionObserverOption): IntersectionObserver;
    createIntersectionObserver(component: any, options?: any) {
        return callSync('createIntersectionObserver',component,options);
    }
    createLivePlayerContext(id: string, component?: any): t.LivePlayerContext {
        return callSync('createLivePlayerContext',id,component);
    }
    createLivePusherContext(): t.LivePusherContext {
        return callSync('createLivePusherContext');
    }
    getLogManager(option: t.GetLogManagerOption): t.LogManager {
        return callSync('getLogManager',option);
    }
    createMapContext(mapId: string, component?: any): t.MapContext {
        return callSync('createMapContext',mapId,component);
    }
    getRecorderManager(): t.RecorderManager {
        return callSync('getRecorderManager');
    }
    // request(option: t.RequestOption): t.RequestTask {
    //     return callSync('request',option);
    // }
    createSelectorQuery(): t.SelectorQuery {
        return callSync('createSelectorQuery');
    }
    connectSocket(option: t.ConnectSocketOption): Promise<t.SocketTask> {
        return callAsync('connectSocket',option);
    }
    getUpdateManager(): t.UpdateManager {
        return callSync('getUpdateManager');
    }
    uploadFile(option: t.UploadFileOption): t.UploadTask {
        return callAsync('uploadFile',option);
    }
    createVideoContext(id: string, component: any): t.VideoContext {
        return callSync('createVideoContext',id,component);
    }
    createWorker(scriptPath: string): Worker {
        return callSync('createVideoContext',scriptPath);
    }
    getStorageSync(key: string) {
        return callSync('createVideoContext',key);
    }
    canIUse(schema: string): boolean {
        return callSync('canIUse',schema);
    }
    addCard(option: t.AddCardOption): Promise<any> {
        return callAsync('addCard',option);
    }
    addPhoneContact(option: t.AddPhoneContactOption): Promise<any> {
        return callAsync('addPhoneContact',option);
    }
    authorize(option: t.AuthorizeOption): Promise<any> {
        return callAsync('authorize',option);
    }
    canvasGetImageData(option: t.CanvasGetImageDataOption, component?: any): Promise<any> {
        return callAsync('canvasGetImageData',option,component);
    }
    canvasPutImageData(option: t.CanvasPutImageDataOption, component?: any): Promise<any> {
        return callAsync('canvasPutImageData',option,component);
    }
    canvasToTempFilePath(option: t.CanvasToTempFilePathOption, component?: any): Promise<any> {
        return callAsync('canvasToTempFilePath',option,component);
    }
    checkIsSoterEnrolledInDevice(option: t.CheckIsSoterEnrolledInDeviceOption): Promise<any> {
        return callAsync('checkIsSoterEnrolledInDevice',option);
    }
    checkIsSupportSoterAuthentication(option?: t.CheckIsSupportSoterAuthenticationOption | undefined): Promise<any> {
        return callAsync('checkIsSupportSoterAuthentication',option);
    }
    clearStorage(option?: t.ClearStorageOption | undefined): Promise<any> {
        return callAsync('clearStorage',option);
    }
    checkSession(option?: t.CheckSessionOption | undefined):  Promise<any> {
        return callAsync('checkSession',option);
    }
    chooseAddress(option?: t.ChooseAddressOption | undefined): Promise<any> {
        return callAsync('chooseAddress',option);
    }
    chooseImage(option: t.ChooseImageOption): Promise<any> {
        return callAsync('chooseImage',option);
    }
    chooseInvoice(option?: t.ChooseInvoiceOption | undefined): Promise<any> {
        return callAsync('chooseInvoice',option);
    }
    chooseInvoiceTitle(option?: t.ChooseInvoiceTitleOption | undefined): Promise<any> {
        return callAsync('chooseInvoiceTitle',option);
    }
    chooseLocation(option?: t.ChooseLocationOption | undefined):  Promise<any> {
        return callAsync('chooseLocation',option);
    }
    chooseMessageFile(option: t.ChooseMessageFileOption): Promise<any> {
        return callAsync('chooseMessageFile',option);
    }
    chooseVideo(option: t.ChooseVideoOption):Promise<any> {
        return callAsync('chooseVideo',option);
    }
    clearStorageSync(): void {
        return callSync('clearStorageSync');
    }
    closeBLEConnection(option: t.CloseBLEConnectionOption): Promise<any> {
        return callAsync('closeBLEConnection',option);
    }
    closeBluetoothAdapter(option?: t.CloseBluetoothAdapterOption | undefined): Promise<any> {
        return callAsync('closeBluetoothAdapter',option);
    }
    closeSocket(option: t.CloseSocketOption): Promise<any> {
        return callAsync('closeSocket',option);
    }
    compressImage(option: t.CompressImageOption): Promise<any> {
        return callAsync('compressImage',option);
    }
    connectWifi(option: t.ConnectWifiOption): Promise<any> {
        return callAsync('connectWifi',option);
    }
    createBLEConnection(option: t.CreateBLEConnectionOption): Promise<any> {
        return callAsync('createBLEConnection',option);
    }
    getAvailableAudioSources(option?: t.GetAvailableAudioSourcesOption | undefined): Promise<any> {
        return callAsync('getAvailableAudioSources',option);
    }
    getBLEDeviceCharacteristics(option: t.GetBLEDeviceCharacteristicsOption): Promise<any> {
        return callAsync('getBLEDeviceCharacteristics',option);
    }
    getBLEDeviceServices(option: t.GetBLEDeviceServicesOption): Promise<any> {
        return callAsync('getBLEDeviceServices',option);
    }
    getBackgroundAudioPlayerState(option?: t.GetBackgroundAudioPlayerStateOption | undefined): Promise<any> {
        return callAsync('getBackgroundAudioPlayerState',option);
    }
    getBatteryInfo(option?: t.GetBatteryInfoOption | undefined):Promise<any> {
        return callAsync('getBatteryInfo',option);
    }
    getBeacons(option?: t.GetBeaconsOption | undefined): Promise<any> {
        return callAsync('getBeacons',option);
    }
    getBluetoothAdapterState(option?: t.GetBluetoothAdapterStateOption | undefined): Promise<any> {
        return callAsync('getBluetoothAdapterState',option);
    }
    getBluetoothDevices(option?: t.GetBluetoothDevicesOption | undefined): Promise<any> {
        return callAsync('getBluetoothDevices',option);
    }
    getClipboardData(option?: t.GetClipboardDataOption | undefined): Promise<any> {
        return callAsync('getClipboardData',option);
    }
    getConnectedBluetoothDevices(option: t.GetConnectedBluetoothDevicesOption): Promise<any> {
        return callAsync('getConnectedBluetoothDevices',option);
    }
    getConnectedWifi(option?: t.GetConnectedWifiOption | undefined):Promise<any> {
        return callAsync('getConnectedWifi',option);
    }
    getExtConfig(option?: t.GetExtConfigOption | undefined): Promise<any> {
        return callAsync('getExtConfig',option);
    }
    getFileInfo(option: t.WxGetFileInfoOption): Promise<any> {
        return callAsync('getFileInfo',option);
    }
    getHCEState(option?: t.GetHCEStateOption | undefined): Promise<any> {
        return callAsync('getHCEState',option);
    }
    getImageInfo(option: t.GetImageInfoOption): Promise<any> {
        return callAsync('getImageInfo',option);
    }
    getLocation(option: t.GetLocationOption): Promise<any> {
        return callAsync('getLocation',option);
    }
    getNetworkType(option?: t.GetNetworkTypeOption | undefined): Promise<any> {
        return callAsync('getNetworkType',option);
    }
    getSavedFileInfo(option: t.GetSavedFileInfoOption): Promise<any> {
        return callAsync('getSavedFileInfo',option);
    }
    getSavedFileList(option?: t.WxGetSavedFileListOption | undefined): Promise<any> {
        return callAsync('getSavedFileList',option);
    }
    getScreenBrightness(option?: t.GetScreenBrightnessOption | undefined): Promise<any> {
        return callAsync('getScreenBrightness',option);
    }
    getSetting(option?: t.GetSettingOption | undefined): Promise<any> {
        return callAsync('getSetting',option);
    }
    getShareInfo(option: t.GetShareInfoOption): Promise<any> {
        return callAsync('getShareInfo',option);
    }
    getStorage(option: t.GetStorageOption): Promise<any> {
        return callAsync('getStorage',option);
    }
    getStorageInfo(option?: t.GetStorageInfoOption | undefined): Promise<any> {
        return callAsync('getStorageInfo',option);
    }
    getSystemInfo(option?: t.GetSystemInfoOption | undefined): Promise<any> {
        return callAsync('getSystemInfo',option);
    }
    getUserInfo(option: t.GetUserInfoOption): Promise<any> {
        return callAsync('getUserInfo',option);
    }
    getWeRunData(option?: t.GetWeRunDataOption | undefined): Promise<any> {
        return callAsync('getWeRunData',option);
    }
    getWifiList(option?: t.GetWifiListOption | undefined): Promise<any> {
        return callAsync('getWifiList',option);
    }
    hideLoading(option?: t.HideLoadingOption | undefined): Promise<any> {
        return callAsync('hideLoading',option);
    }
    hideNavigationBarLoading(option?: t.HideNavigationBarLoadingOption | undefined): Promise<any> {
        return callAsync('hideNavigationBarLoading',option);
    }
    hideShareMenu(option?: t.HideShareMenuOption | undefined): Promise<any> {
        return callAsync('hideShareMenu',option);
    }
    hideTabBar(option: t.HideTabBarOption): Promise<any> {
        return callAsync('hideTabBar',option);
    }
    hideTabBarRedDot(option: t.HideTabBarRedDotOption): Promise<any> {
        return callAsync('hideTabBarRedDot',option);
    }
    hideToast(option?: t.HideToastOption | undefined): Promise<any> {
        return callAsync('hideToast',option);
    }
    loadFontFace(option: t.LoadFontFaceOption): Promise<any> {
        return callAsync('loadFontFace',option);
    }
    login(option: t.LoginOption): Promise<any> {
        return callAsync('login',option);
    }
    makePhoneCall(option: t.MakePhoneCallOption): Promise<any> {
        return callAsync('makePhoneCall',option);
    }
    navigateBack(option: t.NavigateBackOption):Promise<any> {
        return callAsync('navigateBack',option);
    }
    navigateBackMiniProgram(option: t.NavigateBackMiniProgramOption):Promise<any> {
        return callAsync('navigateBackMiniProgram',option);
    }
    navigateTo(option: t.NavigateToOption): Promise<any> {
        return callAsync('navigateTo',option);
    }
    navigateToMiniProgram(option: t.NavigateToMiniProgramOption): Promise<any> {
        return callAsync('navigateToMiniProgram',option);
    }
    nextTick(): Promise<any> {
        return callback('nextTick');
    }
    notifyBLECharacteristicValueChange(option: t.NotifyBLECharacteristicValueChangeOption): Promise<any> {
        return callAsync('navigateToMiniProgram',option);
    }
    offAppHide(): Promise<any> {
        return callback('offAppHide');
    }
    offAppShow(): Promise<any> {
        return callback('offAppShow');
    }
    offAudioInterruptionBegin(): Promise<any> {
        return callback('offAudioInterruptionBegin');
    }
    offAudioInterruptionEnd(): Promise<any> {
        return callback('offAudioInterruptionEnd');
    }
    offError(): Promise<any> {
        return callback('offError');
    }
    offLocalServiceDiscoveryStop():Promise<any> {
        return callback('offLocalServiceDiscoveryStop');
    }
    offLocalServiceFound(): Promise<any> {
        return callback('offLocalServiceFound');
    }
    offLocalServiceLost(): Promise<any> {
        return callback('offLocalServiceLost');
    }
    offLocalServiceResolveFail(): Promise<any> {
        return callback('offLocalServiceResolveFail');
    }
    offPageNotFound(): Promise<any> {
        return callback('offPageNotFound');
    }
    offWindowResize(): Promise<any> {
        return callback('offWindowResize');
    }
    onAccelerometerChange(): Promise<any> {
        return callback('onAccelerometerChange');
    }
    onAppHide(): Promise<any> {
        return callback('onAppHide');
    }
    onAppShow(): Promise<any> {
        return callback('onAppShow');
    }
    onAudioInterruptionBegin(): Promise<any> {
        return callback('onAudioInterruptionBegin');
    }
    onAudioInterruptionEnd(): Promise<any> {
        return callback('onAudioInterruptionEnd');
    }
    onBLECharacteristicValueChange(): Promise<any> {
        return callback('onBLECharacteristicValueChange');
    }
    onBLEConnectionStateChange(): Promise<any> {
        return callback('onBLEConnectionStateChange');
    }
    onBackgroundAudioPause():Promise<any> {
        return callback('onBackgroundAudioPause');
    }
    onBackgroundAudioPlay():Promise<any> {
        return callback('onBackgroundAudioPlay');
    }
    onBackgroundAudioStop(): Promise<any> {
        return callback('onBackgroundAudioStop');
    }
    onBeaconServiceChange(): Promise<any> {
        return callback('onBeaconServiceChange');
    }
    onBeaconUpdate():Promise<any> {
        return callback('onBeaconUpdate');
    }
    onBluetoothAdapterStateChange(): Promise<any> {
        return callback('onBluetoothAdapterStateChange');
    }
    onBluetoothDeviceFound(): Promise<any> {
        return callback('onBluetoothDeviceFound');
    }
    onCompassChange(): Promise<any> {
        return callback('onCompassChange');
    }
    onDeviceMotionChange(): Promise<any> {
        return callback('onDeviceMotionChange');
    }
    onError(): Promise<any> {
        return callback('onError');
    }
    onGetWifiList(): Promise<any> {
        return callback('onGetWifiList');
    }
    onGyroscopeChange(): Promise<any> {
        return callback('onGyroscopeChange');
    }
    onHCEMessage(): Promise<any> {
        return callback('onHCEMessage');
    }
    onLocalServiceDiscoveryStop(): Promise<any> {
        return callback('onLocalServiceDiscoveryStop');
    }
    onLocalServiceFound(): Promise<any> {
        return callback('onLocalServiceFound');
    }
    onLocalServiceLost(): Promise<any> {
        return callback('onLocalServiceLost');
    }
    onLocalServiceResolveFail(): Promise<any> {
        return callback('onLocalServiceResolveFail');
    }
    onMemoryWarning(): Promise<any> {
        return callback('onMemoryWarning');
    }
    onNetworkStatusChange():Promise<any> {
        return callback('onNetworkStatusChange');
    }
    onPageNotFound():Promise<any> {
        return callback('onPageNotFound');
    }
    onSocketClose(): Promise<any> {
        return callback('onSocketClose');
    }
    onSocketError(): Promise<any> {
        return callback('onSocketError');
    }
    onSocketMessage(): Promise<any> {
        return callback('onSocketMessage');
    }
    onSocketOpen(): Promise<any> {
        return callback('onSocketOpen');
    }
    onUserCaptureScreen(): Promise<any> {
        return callback('onUserCaptureScreen');
    }
    onWifiConnected():Promise<any> {
        return callback('onWifiConnected');
    }
    onWindowResize(): Promise<any> {
        return callback('onWindowResize');
    }
    openBluetoothAdapter(option?: t.OpenBluetoothAdapterOption | undefined):Promise<any> {
        return callAsync('openBluetoothAdapter',option);
    }
    openCard(option: t.OpenCardOption): Promise<any> {
        return callAsync('openCard',option);
    }
    openDocument(option: t.OpenDocumentOption): Promise<any> {
        return callAsync('openDocument',option);
    }
    openLocation(option: t.OpenLocationOption): Promise<any> {
        return callAsync('openLocation',option);
    }
    openSetting(option?: t.OpenSettingOption | undefined): Promise<any> {
        return callAsync('openSetting',option);
    }
    pageScrollTo(option: t.PageScrollToOption): Promise<any> {
        return callAsync('pageScrollTo',option);
    }
    pauseBackgroundAudio(option?: t.PauseBackgroundAudioOption | undefined): Promise<any> {
        return callAsync('pauseBackgroundAudio',option);
    }
    pauseVoice(option?: t.PauseVoiceOption | undefined): Promise<any> {
        return callAsync('pauseVoice',option);
    }
    playBackgroundAudio(option: t.PlayBackgroundAudioOption):Promise<any> {
        return callAsync('playBackgroundAudio',option);
    }
    playVoice(option: t.PlayVoiceOption): Promise<any> {
        return callAsync('playVoice',option);
    }
    previewImage(option: t.PreviewImageOption):Promise<any> {
        return callAsync('previewImage',option);
    }
    reLaunch(option: t.ReLaunchOption): Promise<any> {
        return callAsync('reLaunch',option);
    }
    readBLECharacteristicValue(option: t.ReadBLECharacteristicValueOption):Promise<any> {
        return callAsync('readBLECharacteristicValue',option);
    }
    redirectTo(option: t.RedirectToOption):Promise<any> {
        return callAsync('redirectTo',option);
    }
    removeSavedFile(option: t.WxRemoveSavedFileOption): Promise<any> {
        return callAsync('removeSavedFile',option);
    }
    removeStorage(option: t.RemoveStorageOption): Promise<any> {
        return callAsync('removeStorage',option);
    }
    removeStorageSync(key: string): Promise<any> {
        return callSync('removeStorageSync',key);
    }
    removeTabBarBadge(option: t.RemoveTabBarBadgeOption): Promise<any> {
        return callAsync('removeTabBarBadge',option);
    }
    reportAnalytics(eventName: string, data: t.Data): void {
        wx.reportAnalytics(eventName,data);
    }
    reportMonitor(name: string, value: number): void {
        wx.reportMonitor(name,value);
    }
    requestPayment(option: t.RequestPaymentOption): Promise<any> {
        return callAsync('requestPayment',option);
    }
    saveFile(option: t.WxSaveFileOption): Promise<any> {
        return callAsync('saveFile',option);
    }
    saveImageToPhotosAlbum(option: t.SaveImageToPhotosAlbumOption): Promise<any> {
        return callAsync('saveImageToPhotosAlbum',option);
    }
    saveVideoToPhotosAlbum(option: t.SaveVideoToPhotosAlbumOption): Promise<any> {
        return callAsync('saveVideoToPhotosAlbum',option);
    }
    scanCode(option: t.ScanCodeOption): Promise<any> {
        return callAsync('scanCode',option);
    }
    seekBackgroundAudio(option: t.SeekBackgroundAudioOption): Promise<any> {
        return callAsync('seekBackgroundAudio',option);
    }
    sendHCEMessage(option: t.SendHCEMessageOption): Promise<any> {
        return callAsync('sendHCEMessage',option);
    }
    sendSocketMessage(option: t.SendSocketMessageOption): Promise<any> {
        return callAsync('sendSocketMessage',option);
    }
    setBackgroundColor(option: t.SetBackgroundColorOption): Promise<any> {
        return callAsync('setBackgroundColor',option);
    }
    setBackgroundTextStyle(option: t.SetBackgroundTextStyleOption):Promise<any> {
        return callAsync('setBackgroundTextStyle',option);
    }
    setClipboardData(option: t.SetClipboardDataOption):Promise<any> {
        return callAsync('setClipboardData',option);
    }
    setEnableDebug(option: t.SetEnableDebugOption): Promise<any> {
        return callAsync('setEnableDebug',option);
    }
    setInnerAudioOption(option: t.SetInnerAudioOption): Promise<any> {
        return callAsync('setInnerAudioOption',option);
    }
    setKeepScreenOn(option: t.SetKeepScreenOnOption):  Promise<any> {
        return callAsync('setKeepScreenOn',option);
    }
    setNavigationBarColor(option: t.SetNavigationBarColorOption): Promise<any> {
        return callAsync('setNavigationBarColor',option);
    }
    setNavigationBarTitle(option: t.SetNavigationBarTitleOption):  Promise<any> {
        return callAsync('setNavigationBarTitle',option);
    }
    setScreenBrightness(option: t.SetScreenBrightnessOption):  Promise<any> {
        return callAsync('setScreenBrightness',option);
    }
    setStorage(option: t.SetStorageOption):  Promise<any> {
        return callAsync('setStorage',option);
    }
    setStorageSync(key: string, data: any):  Promise<any> {
        return callSync('setStorageSync',key,data);
    }
    setTabBarBadge(option: t.SetTabBarBadgeOption):  Promise<any> {
        return callAsync('setTabBarBadge',option);
    }
    setTabBarItem(option: t.SetTabBarItemOption):  Promise<any> {
        return callAsync('setTabBarItem',option);
    }
    setTabBarStyle(option: t.SetTabBarStyleOption):  Promise<any> {
        return callAsync('setTabBarStyle',option);
    }
    setTopBarText(option: t.SetTopBarTextOption): Promise<any> {
        return callAsync('setTopBarText',option);
    }
    setWifiList(option: t.SetWifiListOption):  Promise<any> {
        return callAsync('setWifiList',option);
    }
    showActionSheet(option: t.ShowActionSheetOption):  Promise<any> {
        return callAsync('showActionSheet',option);
    }
    showLoading(option: t.ShowLoadingOption):  Promise<any> {
        return callAsync('showLoading',option);
    }
    showModal(option: t.ShowModalOption):  Promise<any> {
        return callAsync('showModal',option);
    }
    showNavigationBarLoading(option?: t.ShowNavigationBarLoadingOption | undefined):  Promise<any> {
        return callAsync('showNavigationBarLoading',option);
    }
    showShareMenu(option: t.ShowShareMenuOption):  Promise<any> {
        return callAsync('showShareMenu',option);
    }
    showTabBar(option: t.ShowTabBarOption): Promise<any> {
        return callAsync('showTabBar',option);
    }
    showTabBarRedDot(option: t.ShowTabBarRedDotOption):  Promise<any> {
        return callAsync('showTabBarRedDot',option);
    }
    showToast(option: t.ShowToastOption):  Promise<any> {
        return callAsync('showToast',option);
    }
    startAccelerometer(option: t.StartAccelerometerOption):  Promise<any> {
        return callAsync('startAccelerometer',option);
    }
    startBeaconDiscovery(option: t.StartBeaconDiscoveryOption): Promise<any> {
        return callAsync('startBeaconDiscovery',option);
    }
    startBluetoothDevicesDiscovery(option: t.StartBluetoothDevicesDiscoveryOption):  Promise<any> {
        return callAsync('startBluetoothDevicesDiscovery',option);
    }
    startCompass(option?: t.StartCompassOption | undefined): Promise<any> {
        return callAsync('startCompass',option);
    }
    startDeviceMotionListening(option: t.StartDeviceMotionListeningOption):  Promise<any> {
        return callAsync('startDeviceMotionListening',option);
    }
    startGyroscope(option: t.StartGyroscopeOption):  Promise<any> {
        return callAsync('startGyroscope',option);
    }
    startHCE(option: t.StartHCEOption):  Promise<any> {
        return callAsync('startHCE',option);
    }
    startLocalServiceDiscovery(option: t.StartLocalServiceDiscoveryOption): Promise<any> {
        return callAsync('startLocalServiceDiscovery',option);
    }
    startPullDownRefresh(option?: t.StartPullDownRefreshOption | undefined):  Promise<any> {
        return callAsync('startPullDownRefresh',option);
    }
    startRecord(option: t.WxStartRecordOption): Promise<any> {
        return callAsync('startRecord',option);
    }
    startSoterAuthentication(option: t.StartSoterAuthenticationOption):  Promise<any> {
        return callAsync('startSoterAuthentication',option);
    }
    startWifi(option?: t.StartWifiOption | undefined):  Promise<any> {
        return callAsync('startWifi',option);
    }
    stopAccelerometer(option?: t.StopAccelerometerOption | undefined): Promise<any> {
        return callAsync('stopAccelerometer',option);
    }
    stopBackgroundAudio(option?: t.StopBackgroundAudioOption | undefined):  Promise<any> {
        return callAsync('stopBackgroundAudio',option);
    }
    stopBeaconDiscovery(option?: t.StopBeaconDiscoveryOption | undefined): Promise<any> {
        return callAsync('stopBeaconDiscovery',option);
    }
    stopBluetoothDevicesDiscovery(option?: t.StopBluetoothDevicesDiscoveryOption | undefined):  Promise<any> {
        return callAsync('stopBluetoothDevicesDiscovery',option);
    }
    stopCompass(option?: t.StopCompassOption | undefined):  Promise<any> {
        return callAsync('stopCompass',option);
    }
    stopDeviceMotionListening(option?: t.StopDeviceMotionListeningOption | undefined):  Promise<any> {
        return callAsync('stopDeviceMotionListening',option);
    }
    stopGyroscope(option?: t.StopGyroscopeOption | undefined):  Promise<any> {
        return callAsync('stopGyroscope',option);
    }
    stopHCE(option?: t.StopHCEOption | undefined): Promise<any> {
        return callAsync('stopHCE',option);
    }
    stopLocalServiceDiscovery(option?: t.StopLocalServiceDiscoveryOption | undefined):  Promise<any> {
        return callAsync('stopLocalServiceDiscovery',option);
    }
    stopPullDownRefresh(option?: t.StopPullDownRefreshOption | undefined):  Promise<any> {
        return callAsync('stopPullDownRefresh',option);
    }
    stopRecord(): Promise<any> {
        return callAsync('stopRecord',{});
    }
    stopVoice(option?: t.StopVoiceOption | undefined):  Promise<any> {
        return callAsync('stopVoice',option);
    }
    stopWifi(option?: t.StopWifiOption | undefined):  Promise<any> {
        return callAsync('stopWifi',option);
    }
    switchTab(option: t.SwitchTabOption):  Promise<any> {
        return callAsync('switchTab',option);
    }
    updateShareMenu(option: t.UpdateShareMenuOption): Promise<any> {
        return callAsync('updateShareMenu',option);
    }
    vibrateLong(option?: t.VibrateLongOption | undefined):  Promise<any> {
        return callAsync('vibrateLong',option);
    }
    vibrateShort(option?: t.VibrateShortOption | undefined):  Promise<any> {
        return callAsync('vibrateShort',option);
    }
    writeBLECharacteristicValue(option: t.WriteBLECharacteristicValueOption):  Promise<any> {
        return callAsync('writeBLECharacteristicValue',option);
    }
    // clearInterval(intervalID: number):  Promise<any> {
    //     return callAsync('removeStorage',option);
    // }
    // clearTimeout(timeoutID: number):  Promise<any> {
    //     return callAsync('removeStorage',option);
    // }
    // setInterval(callback: Function, delay?: number | undefined, rest?: any): number {
    //     throw new Error("Method not implemented.");
    // }
    // setTimeout(callback: Function, delay?: number | undefined, rest?: any): number {
    //     throw new Error("Method not implemented.");
    // }

    
}