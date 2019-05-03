import { Sdk, ISdk as t } from 'nger-core'

export class AlipaySdk extends Sdk {
    getAccountInfoSync(): t.AccountInfo {
        return undefined;
    }
    getBatteryInfoSync(): t.GetBatteryInfoSyncResult {
        return undefined;
    }
    getExtConfigSync(): t.ExtInfo {
        return undefined;
    }
    getLaunchOptionsSync(): t.LaunchOptionsApp {
        return undefined;
    }
    getMenuButtonBoundingClientRect(): t.Rect {
        return undefined;
    }
    getStorageInfoSync(): t.GetStorageInfoSyncOption {
        return undefined;
    }
    getSystemInfoSync(): t.GetSystemInfoSyncResult {
        return undefined;
    }
    createAnimation(option: t.CreateAnimationOption): t.Animation {
        return undefined;
    }
    createAudioContext(
        /** `<audio/>` 组件的 id */
        id: string,
        /** 在自定义组件下，当前组件实例的this，以操作组件内 `<audio/>` 组件 */
        component?: any,
    ): t.AudioContext {
        return undefined;
    }
    getBackgroundAudioManager(): t.BackgroundAudioManager {
        return undefined;
    }
    createCameraContext(): t.CameraContext {
        return undefined;
    }
    createCanvasContext(
        /** 要获取上下文的 `<canvas>` 组件 canvas-id 属性 */
        canvasId: string,
        /** 在自定义组件下，当前组件实例的this，表示在这个自定义组件下查找拥有 canvas-id 的 `<canvas/>` ，如果省略则不在任何自定义组件内查找 */
        component?: any,
    ): t.CanvasContext {
        return undefined;
    }
    downloadFile(option: t.DownloadFileOption): t.DownloadTask {
        return undefined;
    }
    getFileSystemManager(): t.FileSystemManager {
        return undefined;
    }
    createInnerAudioContext(): t.InnerAudioContext {
        return undefined;
    }
    createIntersectionObserver(
        /** 自定义组件实例 */
        component: any,
        /** 选项 */
        options: t.CreateIntersectionObserverOption,
    ): t.IntersectionObserver;
    createIntersectionObserver(
        /** 选项 */
        options: t.CreateIntersectionObserverOption,
    ): IntersectionObserver;
    createIntersectionObserver(...args: any[]) {
        return undefined;
    }
    createLivePlayerContext(
        /** `<live-player/>` 组件的 id */
        id: string,
        /** 在自定义组件下，当前组件实例的this，以操作组件内 `<live-player/>` 组件 */
        component?: any,
    ): t.LivePlayerContext {
        return undefined;
    }
    createLivePusherContext(): t.LivePusherContext {
        return undefined;
    }
    getLogManager(option: t.GetLogManagerOption): t.LogManager {
        return undefined;
    }
    createMapContext(
        /** `<map/>` 组件的 id */
        mapId: string,
        /** 在自定义组件下，当前组件实例的this，以操作组件内 `<map/>` 组件 */
        component?: any,
    ): t.MapContext {
        return undefined;
    }
    getRecorderManager(): t.RecorderManager {
        return undefined;
    }
    request(option: t.RequestOption): t.RequestTask {
        return undefined;
    }
    createSelectorQuery(): t.SelectorQuery {
        return undefined;
    }
    connectSocket(option: t.ConnectSocketOption): t.SocketTask {
        return undefined;
    }
    getUpdateManager(): t.UpdateManager {
        return undefined;
    }
    uploadFile(option: t.UploadFileOption): t.UploadTask {
        return undefined;
    }
    createVideoContext(
        /** `<video/>` 组件的 id */
        id: string,
        /** 在自定义组件下，当前组件实例的this，以操作组件内 `<video/>` 组件 */
        component: any,
    ): t.VideoContext {
        return undefined;
    }
    createWorker(
        /** worker 入口文件的**绝对路径** */
        scriptPath: string,
    ): Worker {
        return undefined;
    }
    getStorageSync(
        /** 本地缓存中指定的 key */
        key: string,
    ): any {
        return undefined;
    }
    canIUse(
        /** 使用 `${API}.${method}.${param}.${options}` 或者 `${component}.${attribute}.${option}` 方式来调用 */
        schema: string,
    ): boolean {
        return undefined;
    }
    addCard(option: t.AddCardOption): void {
        return undefined;
    }
    addPhoneContact(option: t.AddPhoneContactOption): void {
        return undefined;
    }
    authorize(option: t.AuthorizeOption): void {
        return undefined;
    }
    canvasGetImageData(
        option: t.CanvasGetImageDataOption,
        /** 在自定义组件下，当前组件实例的this，以操作组件内 `<canvas/>` 组件 */
        component?: any,
    ): void {
        return undefined;
    }
    canvasPutImageData(
        option: t.CanvasPutImageDataOption,
        /** 在自定义组件下，当前组件实例的this，以操作组件内 `<canvas/>` 组件 */
        component?: any,
    ): void { }
    canvasToTempFilePath(
        option: t.CanvasToTempFilePathOption,
        /** 在自定义组件下，当前组件实例的this，以操作组件内 `<canvas/>` 组件 */
        component?: any,
    ): void { }
    checkIsSoterEnrolledInDevice(
        option: t.CheckIsSoterEnrolledInDeviceOption,
    ): void { }
    checkIsSupportSoterAuthentication(
        option?: t.CheckIsSupportSoterAuthenticationOption,
    ): void { }
    clearStorage(option?: t.ClearStorageOption): void { }
    checkSession(option?: t.CheckSessionOption): void { }
    chooseAddress(option?: t.ChooseAddressOption): void { }
    chooseImage(option: t.ChooseImageOption): void { }
    chooseInvoice(option?: t.ChooseInvoiceOption): void { }
    chooseInvoiceTitle(option?: t.ChooseInvoiceTitleOption): void { }
    chooseLocation(option?: t.ChooseLocationOption): void { }
    chooseMessageFile(option: t.ChooseMessageFileOption): void { }
    chooseVideo(option: t.ChooseVideoOption): void { }
    clearStorageSync(): void { }
    closeBLEConnection(option: t.CloseBLEConnectionOption): void { }
    closeBluetoothAdapter(option?: t.CloseBluetoothAdapterOption): void { }
    closeSocket(option: t.CloseSocketOption): void { }
    compressImage(option: t.CompressImageOption): void { }
    connectWifi(option: t.ConnectWifiOption): void { }
    createBLEConnection(option: t.CreateBLEConnectionOption): void { }
    getAvailableAudioSources(option?: t.GetAvailableAudioSourcesOption): void { }
    getBLEDeviceCharacteristics(
        option: t.GetBLEDeviceCharacteristicsOption,
    ): void { }
    getBLEDeviceServices(option: t.GetBLEDeviceServicesOption): void { }
    getBackgroundAudioPlayerState(
        option?: t.GetBackgroundAudioPlayerStateOption,
    ): void { }
    getBatteryInfo(option?: t.GetBatteryInfoOption): void { }
    getBeacons(option?: t.GetBeaconsOption): void { }
    getBluetoothAdapterState(option?: t.GetBluetoothAdapterStateOption): void { }
    getBluetoothDevices(option?: t.GetBluetoothDevicesOption): void { }
    getClipboardData(option?: t.GetClipboardDataOption): void { }
    getConnectedBluetoothDevices(
        option: t.GetConnectedBluetoothDevicesOption,
    ): void { }
    getConnectedWifi(option?: t.GetConnectedWifiOption): void { }
    getExtConfig(option?: t.GetExtConfigOption): void { }
    getFileInfo(option: t.WxGetFileInfoOption): void { }
    getHCEState(option?: t.GetHCEStateOption): void { }
    getImageInfo(option: t.GetImageInfoOption): void { }
    getLocation(option: t.GetLocationOption): void { }
    getNetworkType(option?: t.GetNetworkTypeOption): void { }
    getSavedFileInfo(option: t.GetSavedFileInfoOption): void { }
    getSavedFileList(option?: t.WxGetSavedFileListOption): void { }
    getScreenBrightness(option?: t.GetScreenBrightnessOption): void { }
    getSetting(option?: t.GetSettingOption): void { }
    getShareInfo(option: t.GetShareInfoOption): void { }
    getStorage(option: t.GetStorageOption): void { }
    getStorageInfo(option?: t.GetStorageInfoOption): void { }
    getSystemInfo(option?: t.GetSystemInfoOption): void { }
    getUserInfo(option: t.GetUserInfoOption): void { }
    getWeRunData(option?: t.GetWeRunDataOption): void { }
    getWifiList(option?: t.GetWifiListOption): void { }
    hideLoading(option?: t.HideLoadingOption): void { }
    hideNavigationBarLoading(option?: t.HideNavigationBarLoadingOption): void { }
    hideShareMenu(option?: t.HideShareMenuOption): void { }
    hideTabBar(option: t.HideTabBarOption): void { }
    hideTabBarRedDot(option: t.HideTabBarRedDotOption): void { }
    hideToast(option?: t.HideToastOption): void { }
    loadFontFace(option: t.LoadFontFaceOption): void { }
    login(option: t.LoginOption): void { }
    makePhoneCall(option: t.MakePhoneCallOption): void { }
    navigateBack(option: t.NavigateBackOption): void { }
    navigateBackMiniProgram(option: t.NavigateBackMiniProgramOption): void { }
    navigateTo(option: t.NavigateToOption): void { }
    navigateToMiniProgram(option: t.NavigateToMiniProgramOption): void { }
    nextTick(callback: Function): void { }
    notifyBLECharacteristicValueChange(
        option: t.NotifyBLECharacteristicValueChangeOption,
    ): void { }
    offAppHide(
        /** 小程序切后台事件的回调函数 */
        callback: t.OffAppHideCallback,
    ): void { }
    offAppShow(
        /** 小程序切前台事件的回调函数 */
        callback: t.OffAppShowCallback,
    ): void { }
    offAudioInterruptionBegin(
        /** 音频因为受到系统占用而被中断开始事件的回调函数 */
        callback: t.OffAudioInterruptionBeginCallback,
    ): void { }
    offAudioInterruptionEnd(
        /** 音频中断结束事件的回调函数 */
        callback: t.OffAudioInterruptionEndCallback,
    ): void { }
    offError(
        /** 小程序错误事件的回调函数 */
        callback: Function,
    ): void { }
    offLocalServiceDiscoveryStop(
        /** mDNS 服务停止搜索的事件的回调函数 */
        callback: t.OffLocalServiceDiscoveryStopCallback,
    ): void { }
    offLocalServiceFound(
        /** mDNS 服务发现的事件的回调函数 */
        callback: t.OffLocalServiceFoundCallback,
    ): void { }
    offLocalServiceLost(
        /** mDNS 服务离开的事件的回调函数 */
        callback: t.OffLocalServiceLostCallback,
    ): void { }
    offLocalServiceResolveFail(
        /** mDNS 服务解析失败的事件的回调函数 */
        callback: t.OffLocalServiceResolveFailCallback,
    ): void { }
    offPageNotFound(
        /** 小程序要打开的页面不存在事件的回调函数 */
        callback: t.OffPageNotFoundCallback,
    ): void { }
    offWindowResize(
        /** 窗口尺寸变化事件的回调函数 */
        callback: t.OffWindowResizeCallback,
    ): void { }
    onAccelerometerChange(
        /** 加速度数据事件的回调函数 */
        callback: t.OnAccelerometerChangeCallback,
    ): void { }
    onAppHide(
        /** 小程序切后台事件的回调函数 */
        callback: t.OnAppHideCallback,
    ): void { }
    onAppShow(
        /** 小程序切前台事件的回调函数 */
        callback: t.OnAppShowCallback,
    ): void { }
    onAudioInterruptionBegin(
        /** 音频因为受到系统占用而被中断开始事件的回调函数 */
        callback: t.OnAudioInterruptionBeginCallback,
    ): void { }
    onAudioInterruptionEnd(
        /** 音频中断结束事件的回调函数 */
        callback: t.OnAudioInterruptionEndCallback,
    ): void { }
    onBLECharacteristicValueChange(
        /** 低功耗蓝牙设备的特征值变化事件的回调函数 */
        callback: t.OnBLECharacteristicValueChangeCallback,
    ): void { }
    onBLEConnectionStateChange(
        /** 低功耗蓝牙连接状态的改变事件的回调函数 */
        callback: t.OnBLEConnectionStateChangeCallback,
    ): void { }
    onBackgroundAudioPause(
        /** 音乐暂停事件的回调函数 */
        callback: t.OnBackgroundAudioPauseCallback,
    ): void { }
    onBackgroundAudioPlay(
        /** 音乐播放事件的回调函数 */
        callback: t.OnBackgroundAudioPlayCallback,
    ): void { }
    onBackgroundAudioStop(
        /** 音乐停止事件的回调函数 */
        callback: t.OnBackgroundAudioStopCallback,
    ): void { }
    onBeaconServiceChange(
        /** iBeacon 服务状态变化事件的回调函数 */
        callback: t.OnBeaconServiceChangeCallback,
    ): void { }
    onBeaconUpdate(
        /** iBeacon 设备更新事件的回调函数 */
        callback: t.OnBeaconUpdateCallback,
    ): void { }
    onBluetoothAdapterStateChange(
        /** 蓝牙适配器状态变化事件的回调函数 */
        callback: t.OnBluetoothAdapterStateChangeCallback,
    ): void { }
    onBluetoothDeviceFound(
        /** 寻找到新设备的事件的回调函数 */
        callback: t.OnBluetoothDeviceFoundCallback,
    ): void { }
    onCompassChange(
        /** 罗盘数据变化事件的回调函数 */
        callback: t.OnCompassChangeCallback,
    ): void { }
    onDeviceMotionChange(
        /** 设备方向变化事件的回调函数 */
        callback: t.OnDeviceMotionChangeCallback,
    ): void { }
    onError(
        /** 小程序错误事件的回调函数 */
        callback: t.OnAppErrorCallback,
    ): void { }
    onGetWifiList(
        /** 获取到 Wi-Fi 列表数据事件的回调函数 */
        callback: t.OnGetWifiListCallback,
    ): void { }
    onGyroscopeChange(
        /** 陀螺仪数据变化事件的回调函数 */
        callback: t.OnGyroscopeChangeCallback,
    ): void { }
    onHCEMessage(
        /** 接收 NFC 设备消息事件的回调函数 */
        callback: t.OnHCEMessageCallback,
    ): void { }
    onLocalServiceDiscoveryStop(
        /** mDNS 服务停止搜索的事件的回调函数 */
        callback: t.OnLocalServiceDiscoveryStopCallback,
    ): void { }
    onLocalServiceFound(
        /** mDNS 服务发现的事件的回调函数 */
        callback: t.OnLocalServiceFoundCallback,
    ): void { }
    onLocalServiceLost(
        /** mDNS 服务离开的事件的回调函数 */
        callback: t.OnLocalServiceLostCallback,
    ): void { }
    onLocalServiceResolveFail(
        /** mDNS 服务解析失败的事件的回调函数 */
        callback: t.OnLocalServiceResolveFailCallback,
    ): void { }
    onMemoryWarning(
        /** 内存不足告警事件的回调函数 */
        callback: t.OnMemoryWarningCallback,
    ): void { }
    onNetworkStatusChange(
        /** 网络状态变化事件的回调函数 */
        callback: t.OnNetworkStatusChangeCallback,
    ): void { }
    onPageNotFound(
        /** 小程序要打开的页面不存在事件的回调函数 */
        callback: t.OnPageNotFoundCallback,
    ): void { }
    onSocketClose(
        /** WebSocket 连接关闭事件的回调函数 */
        callback: t.OnSocketCloseCallback,
    ): void { }
    onSocketError(
        /** WebSocket 错误事件的回调函数 */
        callback: t.OnSocketErrorCallback,
    ): void { }
    onSocketMessage(
        /** WebSocket 接受到服务器的消息事件的回调函数 */
        callback: t.OnSocketMessageCallback,
    ): void { }
    onSocketOpen(
        /** WebSocket 连接打开事件的回调函数 */
        callback: t.OnSocketOpenCallback,
    ): void { }
    onUserCaptureScreen(
        /** 用户主动截屏事件的回调函数 */
        callback: t.OnUserCaptureScreenCallback,
    ): void { }
    onWifiConnected(
        /** 连接上 Wi-Fi 的事件的回调函数 */
        callback: t.OnWifiConnectedCallback,
    ): void { }
    onWindowResize(
        /** 窗口尺寸变化事件的回调函数 */
        callback: t.OnWindowResizeCallback,
    ): void { }
    openBluetoothAdapter(option?: t.OpenBluetoothAdapterOption): void { }
    openCard(option: t.OpenCardOption): void { }
    openDocument(option: t.OpenDocumentOption): void { }
    openLocation(option: t.OpenLocationOption): void { }
    openSetting(option?: t.OpenSettingOption): void { }
    pageScrollTo(option: t.PageScrollToOption): void { }
    pauseBackgroundAudio(option?: t.PauseBackgroundAudioOption): void { }
    pauseVoice(option?: t.PauseVoiceOption): void { }
    playBackgroundAudio(option: t.PlayBackgroundAudioOption): void { }
    playVoice(option: t.PlayVoiceOption): void { }
    previewImage(option: t.PreviewImageOption): void { }
    reLaunch(option: t.ReLaunchOption): void { }
    readBLECharacteristicValue(option: t.ReadBLECharacteristicValueOption): void { }
    redirectTo(option: t.RedirectToOption): void { }
    removeSavedFile(option: t.WxRemoveSavedFileOption): void { }
    removeStorage(option: t.RemoveStorageOption): void { }
    removeStorageSync(
        /** 本地缓存中指定的 key */
        key: string,
    ): void { }
    removeTabBarBadge(option: t.RemoveTabBarBadgeOption): void { }
    reportAnalytics(
        /** 事件名 */
        eventName: string,
        /** 上报的自定义数据。 */
        data: t.Data,
    ): void { }
    reportMonitor(
        /** 监控ID，在「小程序管理后台」新建数据指标后获得 */
        name: string,
        /** 上报数值，经处理后会在「小程序管理后台」上展示每分钟的上报总量 */
        value: number,
    ): void { }
    requestPayment(option: t.RequestPaymentOption): void { }
    saveFile(option: t.WxSaveFileOption): void { }
    saveImageToPhotosAlbum(option: t.SaveImageToPhotosAlbumOption): void { }
    saveVideoToPhotosAlbum(option: t.SaveVideoToPhotosAlbumOption): void { }
    scanCode(option: t.ScanCodeOption): void { }
    seekBackgroundAudio(option: t.SeekBackgroundAudioOption): void { }
    sendHCEMessage(option: t.SendHCEMessageOption): void { }
    sendSocketMessage(option: t.SendSocketMessageOption): void { }
    setBackgroundColor(option: t.SetBackgroundColorOption): void { }
    setBackgroundTextStyle(option: t.SetBackgroundTextStyleOption): void { }
    setClipboardData(option: t.SetClipboardDataOption): void { }
    setEnableDebug(option: t.SetEnableDebugOption): void { }
    setInnerAudioOption(option: t.SetInnerAudioOption): void { }
    setKeepScreenOn(option: t.SetKeepScreenOnOption): void { }
    setNavigationBarColor(option: t.SetNavigationBarColorOption): void { }
    setNavigationBarTitle(option: t.SetNavigationBarTitleOption): void { }
    setScreenBrightness(option: t.SetScreenBrightnessOption): void { }
    setStorage(option: t.SetStorageOption): void { }
    setStorageSync(
        /** 本地缓存中指定的 key */
        key: string,
        /** 需要存储的内容。只支持原生类型、Date、及能够通过`JSON.stringify`序列化的对象。 */
        data: any,
    ): void { }
    setTabBarBadge(option: t.SetTabBarBadgeOption): void { }
    setTabBarItem(option: t.SetTabBarItemOption): void { }
    setTabBarStyle(option: t.SetTabBarStyleOption): void { }
    setTopBarText(option: t.SetTopBarTextOption): void { }
    setWifiList(option: t.SetWifiListOption): void { }
    showActionSheet(option: t.ShowActionSheetOption): void { }
    showLoading(option: t.ShowLoadingOption): void { }
    showModal(option: t.ShowModalOption): void { }
    showNavigationBarLoading(option?: t.ShowNavigationBarLoadingOption): void { }
    showShareMenu(option: t.ShowShareMenuOption): void { }
    showTabBar(option: t.ShowTabBarOption): void { }
    showTabBarRedDot(option: t.ShowTabBarRedDotOption): void { }
    showToast(option: t.ShowToastOption): void { }
    startAccelerometer(option: t.StartAccelerometerOption): void { }
    startBeaconDiscovery(option: t.StartBeaconDiscoveryOption): void { }
    startBluetoothDevicesDiscovery(
        option: t.StartBluetoothDevicesDiscoveryOption,
    ): void { }
    startCompass(option?: t.StartCompassOption): void { }
    startDeviceMotionListening(option: t.StartDeviceMotionListeningOption): void { }
    startGyroscope(option: t.StartGyroscopeOption): void { }
    startHCE(option: t.StartHCEOption): void { }
    startLocalServiceDiscovery(option: t.StartLocalServiceDiscoveryOption): void { }
    startPullDownRefresh(option?: t.StartPullDownRefreshOption): void { }
    startRecord(option: t.WxStartRecordOption): void { }
    startSoterAuthentication(option: t.StartSoterAuthenticationOption): void { }
    startWifi(option?: t.StartWifiOption): void { }
    stopAccelerometer(option?: t.StopAccelerometerOption): void { }
    stopBackgroundAudio(option?: t.StopBackgroundAudioOption): void { }
    stopBeaconDiscovery(option?: t.StopBeaconDiscoveryOption): void { }
    stopBluetoothDevicesDiscovery(
        option?: t.StopBluetoothDevicesDiscoveryOption,
    ): void { }
    stopCompass(option?: t.StopCompassOption): void { }
    stopDeviceMotionListening(option?: t.StopDeviceMotionListeningOption): void { }
    stopGyroscope(option?: t.StopGyroscopeOption): void { }
    stopHCE(option?: t.StopHCEOption): void { }
    stopLocalServiceDiscovery(option?: t.StopLocalServiceDiscoveryOption): void { }
    stopPullDownRefresh(option?: t.StopPullDownRefreshOption): void { }
    stopRecord(): void { }
    stopVoice(option?: t.StopVoiceOption): void { }
    stopWifi(option?: t.StopWifiOption): void { }
    switchTab(option: t.SwitchTabOption): void { }
    updateShareMenu(option: t.UpdateShareMenuOption): void { }
    vibrateLong(option?: t.VibrateLongOption): void { }
    vibrateShort(option?: t.VibrateShortOption): void { }
    writeBLECharacteristicValue(
        option: t.WriteBLECharacteristicValueOption,
    ): void { }

    clearInterval(
        intervalID: number,
    ): void { }

    clearTimeout(
        timeoutID: number,
    ): void { }
    setInterval(
        /** 回调函数 */
        callback: Function,
        /** 执行回调函数之间的时间间隔，单位 ms。 */
        delay?: number,
        /** param1, param2, ..., paramN 等附加参数，它们会作为参数传递给回调函数。 */
        rest?: any,
    ): number {
        return undefined;
    }
    setTimeout(
        /** 回调函数 */
        callback: Function,
        /** 延迟的时间，函数的调用会在该延迟之后发生，单位 ms。 */
        delay?: number,
        /** param1, param2, ..., paramN 等附加参数，它们会作为参数传递给回调函数。 */
        rest?: any,
    ): number {
        return undefined;
    }
}