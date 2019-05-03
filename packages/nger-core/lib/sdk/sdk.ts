import * as t from './sdk_types'
export abstract class Sdk {
    abstract getAccountInfoSync(): t.AccountInfo;
    abstract getBatteryInfoSync(): t.GetBatteryInfoSyncResult;
    abstract getExtConfigSync(): t.ExtInfo;
    abstract getLaunchOptionsSync(): t.LaunchOptionsApp;
    abstract getMenuButtonBoundingClientRect(): t.Rect;
    abstract getStorageInfoSync(): t.GetStorageInfoSyncOption;
    abstract getSystemInfoSync(): t.GetSystemInfoSyncResult;
    abstract createAnimation(option: t.CreateAnimationOption): t.Animation;
    abstract createAudioContext(
        /** `<audio/>` 组件的 id */
        id: string,
        /** 在自定义组件下，当前组件实例的this，以操作组件内 `<audio/>` 组件 */
        component?: any,
    ): t.AudioContext;
    abstract getBackgroundAudioManager(): t.BackgroundAudioManager;
    abstract createCameraContext(): t.CameraContext;
    abstract createCanvasContext(
        /** 要获取上下文的 `<canvas>` 组件 canvas-id 属性 */
        canvasId: string,
        /** 在自定义组件下，当前组件实例的this，表示在这个自定义组件下查找拥有 canvas-id 的 `<canvas/>` ，如果省略则不在任何自定义组件内查找 */
        component?: any,
    ): t.CanvasContext;
    abstract downloadFile(option: t.DownloadFileOption): t.DownloadTask;
    abstract getFileSystemManager(): t.FileSystemManager;
    abstract createInnerAudioContext(): t.InnerAudioContext;
    abstract createIntersectionObserver(
        /** 自定义组件实例 */
        component: any,
        /** 选项 */
        options: t.CreateIntersectionObserverOption,
    ): t.IntersectionObserver;
    abstract createIntersectionObserver(
        /** 选项 */
        options: t.CreateIntersectionObserverOption,
    ): IntersectionObserver;
    abstract createLivePlayerContext(
        /** `<live-player/>` 组件的 id */
        id: string,
        /** 在自定义组件下，当前组件实例的this，以操作组件内 `<live-player/>` 组件 */
        component?: any,
    ): t.LivePlayerContext;
    abstract createLivePusherContext(): t.LivePusherContext;
    abstract getLogManager(option: t.GetLogManagerOption): t.LogManager;
    abstract createMapContext(
        /** `<map/>` 组件的 id */
        mapId: string,
        /** 在自定义组件下，当前组件实例的this，以操作组件内 `<map/>` 组件 */
        component?: any,
    ): t.MapContext;
    abstract getRecorderManager(): t.RecorderManager;
    abstract request(option: t.RequestOption): t.RequestTask;
    abstract createSelectorQuery(): t.SelectorQuery;
    abstract connectSocket(option: t.ConnectSocketOption): t.SocketTask;
    abstract getUpdateManager(): t.UpdateManager;
    abstract uploadFile(option: t.UploadFileOption): t.UploadTask;
    abstract createVideoContext(
        /** `<video/>` 组件的 id */
        id: string,
        /** 在自定义组件下，当前组件实例的this，以操作组件内 `<video/>` 组件 */
        component: any,
    ): t.VideoContext;
    abstract createWorker(
        /** worker 入口文件的**绝对路径** */
        scriptPath: string,
    ): Worker;
    abstract getStorageSync(
        /** 本地缓存中指定的 key */
        key: string,
    ): any;
    abstract canIUse(
        /** 使用 `${API}.${method}.${param}.${options}` 或者 `${component}.${attribute}.${option}` 方式来调用 */
        schema: string,
    ): boolean;
    abstract addCard(option: t.AddCardOption): void;
    abstract addPhoneContact(option: t.AddPhoneContactOption): void;
    abstract authorize(option: t.AuthorizeOption): void;
    abstract canvasGetImageData(
        option: t.CanvasGetImageDataOption,
        /** 在自定义组件下，当前组件实例的this，以操作组件内 `<canvas/>` 组件 */
        component?: any,
    ): void;
    abstract canvasPutImageData(
        option: t.CanvasPutImageDataOption,
        /** 在自定义组件下，当前组件实例的this，以操作组件内 `<canvas/>` 组件 */
        component?: any,
    ): void;
    abstract canvasToTempFilePath(
        option: t.CanvasToTempFilePathOption,
        /** 在自定义组件下，当前组件实例的this，以操作组件内 `<canvas/>` 组件 */
        component?: any,
    ): void;
    abstract checkIsSoterEnrolledInDevice(
        option: t.CheckIsSoterEnrolledInDeviceOption,
    ): void;
    abstract checkIsSupportSoterAuthentication(
        option?: t.CheckIsSupportSoterAuthenticationOption,
    ): void;
    abstract clearStorage(option?: t.ClearStorageOption): void;
    abstract checkSession(option?: t.CheckSessionOption): void;
    abstract chooseAddress(option?: t.ChooseAddressOption): void;
    abstract chooseImage(option: t.ChooseImageOption): void;
    abstract chooseInvoice(option?: t.ChooseInvoiceOption): void;
    abstract chooseInvoiceTitle(option?: t.ChooseInvoiceTitleOption): void;
    abstract chooseLocation(option?: t.ChooseLocationOption): void;
    abstract chooseMessageFile(option: t.ChooseMessageFileOption): void;
    abstract chooseVideo(option: t.ChooseVideoOption): void;
    abstract clearStorageSync(): void;
    abstract closeBLEConnection(option: t.CloseBLEConnectionOption): void;
    abstract closeBluetoothAdapter(option?: t.CloseBluetoothAdapterOption): void;
    abstract closeSocket(option: t.CloseSocketOption): void;
    abstract compressImage(option: t.CompressImageOption): void;
    abstract connectWifi(option: t.ConnectWifiOption): void;
    abstract createBLEConnection(option: t.CreateBLEConnectionOption): void;
    abstract getAvailableAudioSources(option?: t.GetAvailableAudioSourcesOption): void;
    abstract getBLEDeviceCharacteristics(
        option: t.GetBLEDeviceCharacteristicsOption,
    ): void;
    abstract getBLEDeviceServices(option: t.GetBLEDeviceServicesOption): void;
    abstract getBackgroundAudioPlayerState(
        option?: t.GetBackgroundAudioPlayerStateOption,
    ): void;
    abstract getBatteryInfo(option?: t.GetBatteryInfoOption): void;
    abstract getBeacons(option?: t.GetBeaconsOption): void;
    abstract getBluetoothAdapterState(option?: t.GetBluetoothAdapterStateOption): void;
    abstract getBluetoothDevices(option?: t.GetBluetoothDevicesOption): void;
    abstract getClipboardData(option?: t.GetClipboardDataOption): void;
    abstract getConnectedBluetoothDevices(
        option: t.GetConnectedBluetoothDevicesOption,
    ): void;
    abstract getConnectedWifi(option?: t.GetConnectedWifiOption): void;
    abstract getExtConfig(option?: t.GetExtConfigOption): void;
    abstract getFileInfo(option: t.WxGetFileInfoOption): void;
    abstract getHCEState(option?: t.GetHCEStateOption): void;
    abstract getImageInfo(option: t.GetImageInfoOption): void;
    abstract getLocation(option: t.GetLocationOption): void;
    abstract getNetworkType(option?: t.GetNetworkTypeOption): void;
    abstract getSavedFileInfo(option: t.GetSavedFileInfoOption): void;
    abstract getSavedFileList(option?: t.WxGetSavedFileListOption): void;
    abstract getScreenBrightness(option?: t.GetScreenBrightnessOption): void;
    abstract getSetting(option?: t.GetSettingOption): void;
    abstract getShareInfo(option: t.GetShareInfoOption): void;
    abstract getStorage(option: t.GetStorageOption): void;
    abstract getStorageInfo(option?: t.GetStorageInfoOption): void;
    abstract getSystemInfo(option?: t.GetSystemInfoOption): void;
    abstract getUserInfo(option: t.GetUserInfoOption): void;
    abstract getWeRunData(option?: t.GetWeRunDataOption): void;
    abstract getWifiList(option?: t.GetWifiListOption): void;
    abstract hideLoading(option?: t.HideLoadingOption): void;
    abstract hideNavigationBarLoading(option?: t.HideNavigationBarLoadingOption): void;
    abstract hideShareMenu(option?: t.HideShareMenuOption): void;
    abstract hideTabBar(option: t.HideTabBarOption): void;
    abstract hideTabBarRedDot(option: t.HideTabBarRedDotOption): void;
    abstract hideToast(option?: t.HideToastOption): void;
    abstract loadFontFace(option: t.LoadFontFaceOption): void;
    abstract login(option: t.LoginOption): void;
    abstract makePhoneCall(option: t.MakePhoneCallOption): void;
    abstract navigateBack(option: t.NavigateBackOption): void;
    abstract navigateBackMiniProgram(option: t.NavigateBackMiniProgramOption): void;
    abstract navigateTo(option: t.NavigateToOption): void;
    abstract navigateToMiniProgram(option: t.NavigateToMiniProgramOption): void;
    abstract nextTick(callback: Function): void;
    abstract notifyBLECharacteristicValueChange(
        option: t.NotifyBLECharacteristicValueChangeOption,
    ): void;
    abstract offAppHide(
        /** 小程序切后台事件的回调函数 */
        callback: t.OffAppHideCallback,
    ): void;
    abstract offAppShow(
        /** 小程序切前台事件的回调函数 */
        callback: t.OffAppShowCallback,
    ): void;
    abstract offAudioInterruptionBegin(
        /** 音频因为受到系统占用而被中断开始事件的回调函数 */
        callback: t.OffAudioInterruptionBeginCallback,
    ): void;
    abstract offAudioInterruptionEnd(
        /** 音频中断结束事件的回调函数 */
        callback: t.OffAudioInterruptionEndCallback,
    ): void;
    abstract offError(
        /** 小程序错误事件的回调函数 */
        callback: Function,
    ): void;
    abstract offLocalServiceDiscoveryStop(
        /** mDNS 服务停止搜索的事件的回调函数 */
        callback: t.OffLocalServiceDiscoveryStopCallback,
    ): void;
    abstract offLocalServiceFound(
        /** mDNS 服务发现的事件的回调函数 */
        callback: t.OffLocalServiceFoundCallback,
    ): void;
    abstract offLocalServiceLost(
        /** mDNS 服务离开的事件的回调函数 */
        callback: t.OffLocalServiceLostCallback,
    ): void;
    abstract offLocalServiceResolveFail(
        /** mDNS 服务解析失败的事件的回调函数 */
        callback: t.OffLocalServiceResolveFailCallback,
    ): void;
    abstract offPageNotFound(
        /** 小程序要打开的页面不存在事件的回调函数 */
        callback: t.OffPageNotFoundCallback,
    ): void;
    abstract offWindowResize(
        /** 窗口尺寸变化事件的回调函数 */
        callback: t.OffWindowResizeCallback,
    ): void;
    abstract onAccelerometerChange(
        /** 加速度数据事件的回调函数 */
        callback: t.OnAccelerometerChangeCallback,
    ): void;
    abstract onAppHide(
        /** 小程序切后台事件的回调函数 */
        callback: t.OnAppHideCallback,
    ): void;
    abstract onAppShow(
        /** 小程序切前台事件的回调函数 */
        callback: t.OnAppShowCallback,
    ): void;
    abstract onAudioInterruptionBegin(
        /** 音频因为受到系统占用而被中断开始事件的回调函数 */
        callback: t.OnAudioInterruptionBeginCallback,
    ): void;
    abstract onAudioInterruptionEnd(
        /** 音频中断结束事件的回调函数 */
        callback: t.OnAudioInterruptionEndCallback,
    ): void;
    abstract onBLECharacteristicValueChange(
        /** 低功耗蓝牙设备的特征值变化事件的回调函数 */
        callback: t.OnBLECharacteristicValueChangeCallback,
    ): void;
    abstract onBLEConnectionStateChange(
        /** 低功耗蓝牙连接状态的改变事件的回调函数 */
        callback: t.OnBLEConnectionStateChangeCallback,
    ): void;
    abstract onBackgroundAudioPause(
        /** 音乐暂停事件的回调函数 */
        callback: t.OnBackgroundAudioPauseCallback,
    ): void;
    abstract onBackgroundAudioPlay(
        /** 音乐播放事件的回调函数 */
        callback: t.OnBackgroundAudioPlayCallback,
    ): void;
    abstract onBackgroundAudioStop(
        /** 音乐停止事件的回调函数 */
        callback: t.OnBackgroundAudioStopCallback,
    ): void;
    abstract onBeaconServiceChange(
        /** iBeacon 服务状态变化事件的回调函数 */
        callback: t.OnBeaconServiceChangeCallback,
    ): void;
    abstract onBeaconUpdate(
        /** iBeacon 设备更新事件的回调函数 */
        callback: t.OnBeaconUpdateCallback,
    ): void;
    abstract onBluetoothAdapterStateChange(
        /** 蓝牙适配器状态变化事件的回调函数 */
        callback: t.OnBluetoothAdapterStateChangeCallback,
    ): void;
    abstract onBluetoothDeviceFound(
        /** 寻找到新设备的事件的回调函数 */
        callback: t.OnBluetoothDeviceFoundCallback,
    ): void;
    abstract onCompassChange(
        /** 罗盘数据变化事件的回调函数 */
        callback: t.OnCompassChangeCallback,
    ): void;
    abstract onDeviceMotionChange(
        /** 设备方向变化事件的回调函数 */
        callback: t.OnDeviceMotionChangeCallback,
    ): void;
    abstract onError(
        /** 小程序错误事件的回调函数 */
        callback: t.OnAppErrorCallback,
    ): void;
    abstract onGetWifiList(
        /** 获取到 Wi-Fi 列表数据事件的回调函数 */
        callback: t.OnGetWifiListCallback,
    ): void;
    abstract onGyroscopeChange(
        /** 陀螺仪数据变化事件的回调函数 */
        callback: t.OnGyroscopeChangeCallback,
    ): void;
    abstract onHCEMessage(
        /** 接收 NFC 设备消息事件的回调函数 */
        callback: t.OnHCEMessageCallback,
    ): void;
    abstract onLocalServiceDiscoveryStop(
        /** mDNS 服务停止搜索的事件的回调函数 */
        callback: t.OnLocalServiceDiscoveryStopCallback,
    ): void;
    abstract onLocalServiceFound(
        /** mDNS 服务发现的事件的回调函数 */
        callback: t.OnLocalServiceFoundCallback,
    ): void;
    abstract onLocalServiceLost(
        /** mDNS 服务离开的事件的回调函数 */
        callback: t.OnLocalServiceLostCallback,
    ): void;
    abstract onLocalServiceResolveFail(
        /** mDNS 服务解析失败的事件的回调函数 */
        callback: t.OnLocalServiceResolveFailCallback,
    ): void;
    abstract onMemoryWarning(
        /** 内存不足告警事件的回调函数 */
        callback: t.OnMemoryWarningCallback,
    ): void;
    abstract onNetworkStatusChange(
        /** 网络状态变化事件的回调函数 */
        callback: t.OnNetworkStatusChangeCallback,
    ): void;
    abstract onPageNotFound(
        /** 小程序要打开的页面不存在事件的回调函数 */
        callback: t.OnPageNotFoundCallback,
    ): void;
    abstract onSocketClose(
        /** WebSocket 连接关闭事件的回调函数 */
        callback: t.OnSocketCloseCallback,
    ): void;
    abstract onSocketError(
        /** WebSocket 错误事件的回调函数 */
        callback: t.OnSocketErrorCallback,
    ): void;
    abstract onSocketMessage(
        /** WebSocket 接受到服务器的消息事件的回调函数 */
        callback: t.OnSocketMessageCallback,
    ): void;
    abstract onSocketOpen(
        /** WebSocket 连接打开事件的回调函数 */
        callback: t.OnSocketOpenCallback,
    ): void;
    abstract onUserCaptureScreen(
        /** 用户主动截屏事件的回调函数 */
        callback: t.OnUserCaptureScreenCallback,
    ): void;
    abstract onWifiConnected(
        /** 连接上 Wi-Fi 的事件的回调函数 */
        callback: t.OnWifiConnectedCallback,
    ): void;
    abstract onWindowResize(
        /** 窗口尺寸变化事件的回调函数 */
        callback: t.OnWindowResizeCallback,
    ): void;
    abstract openBluetoothAdapter(option?: t.OpenBluetoothAdapterOption): void;
    abstract openCard(option: t.OpenCardOption): void;
    abstract openDocument(option: t.OpenDocumentOption): void;
    abstract openLocation(option: t.OpenLocationOption): void;
    abstract openSetting(option?: t.OpenSettingOption): void;
    abstract pageScrollTo(option: t.PageScrollToOption): void;
    abstract pauseBackgroundAudio(option?: t.PauseBackgroundAudioOption): void;
    abstract pauseVoice(option?: t.PauseVoiceOption): void;
    abstract playBackgroundAudio(option: t.PlayBackgroundAudioOption): void;
    abstract playVoice(option: t.PlayVoiceOption): void;
    abstract previewImage(option: t.PreviewImageOption): void;
    abstract reLaunch(option: t.ReLaunchOption): void;
    abstract readBLECharacteristicValue(option: t.ReadBLECharacteristicValueOption): void;
    abstract redirectTo(option: t.RedirectToOption): void;
    abstract removeSavedFile(option: t.WxRemoveSavedFileOption): void;
    abstract removeStorage(option: t.RemoveStorageOption): void;
    abstract removeStorageSync(
        /** 本地缓存中指定的 key */
        key: string,
    ): void;
    abstract removeTabBarBadge(option: t.RemoveTabBarBadgeOption): void;
    abstract reportAnalytics(
        /** 事件名 */
        eventName: string,
        /** 上报的自定义数据。 */
        data: t.Data,
    ): void;
    abstract reportMonitor(
        /** 监控ID，在「小程序管理后台」新建数据指标后获得 */
        name: string,
        /** 上报数值，经处理后会在「小程序管理后台」上展示每分钟的上报总量 */
        value: number,
    ): void;
    abstract requestPayment(option: t.RequestPaymentOption): void;
    abstract saveFile(option: t.WxSaveFileOption): void;
    abstract saveImageToPhotosAlbum(option: t.SaveImageToPhotosAlbumOption): void;
    abstract saveVideoToPhotosAlbum(option: t.SaveVideoToPhotosAlbumOption): void;
    abstract scanCode(option: t.ScanCodeOption): void;
    abstract seekBackgroundAudio(option: t.SeekBackgroundAudioOption): void;
    abstract sendHCEMessage(option: t.SendHCEMessageOption): void;
    abstract sendSocketMessage(option: t.SendSocketMessageOption): void;
    abstract setBackgroundColor(option: t.SetBackgroundColorOption): void;
    abstract setBackgroundTextStyle(option: t.SetBackgroundTextStyleOption): void;
    abstract setClipboardData(option: t.SetClipboardDataOption): void;
    abstract setEnableDebug(option: t.SetEnableDebugOption): void;
    abstract setInnerAudioOption(option: t.SetInnerAudioOption): void;
    abstract setKeepScreenOn(option: t.SetKeepScreenOnOption): void;
    abstract setNavigationBarColor(option: t.SetNavigationBarColorOption): void;
    abstract setNavigationBarTitle(option: t.SetNavigationBarTitleOption): void;
    abstract setScreenBrightness(option: t.SetScreenBrightnessOption): void;
    abstract setStorage(option: t.SetStorageOption): void;
    abstract setStorageSync(
        /** 本地缓存中指定的 key */
        key: string,
        /** 需要存储的内容。只支持原生类型、Date、及能够通过`JSON.stringify`序列化的对象。 */
        data: any,
    ): void;
    abstract setTabBarBadge(option: t.SetTabBarBadgeOption): void;
    abstract setTabBarItem(option: t.SetTabBarItemOption): void;
    abstract setTabBarStyle(option: t.SetTabBarStyleOption): void;
    abstract setTopBarText(option: t.SetTopBarTextOption): void;
    abstract setWifiList(option: t.SetWifiListOption): void;
    abstract showActionSheet(option: t.ShowActionSheetOption): void;
    abstract showLoading(option: t.ShowLoadingOption): void;
    abstract showModal(option: t.ShowModalOption): void;
    abstract showNavigationBarLoading(option?: t.ShowNavigationBarLoadingOption): void;
    abstract showShareMenu(option: t.ShowShareMenuOption): void;
    abstract showTabBar(option: t.ShowTabBarOption): void;
    abstract showTabBarRedDot(option: t.ShowTabBarRedDotOption): void;
    abstract showToast(option: t.ShowToastOption): void;
    abstract startAccelerometer(option: t.StartAccelerometerOption): void;
    abstract startBeaconDiscovery(option: t.StartBeaconDiscoveryOption): void;
    abstract startBluetoothDevicesDiscovery(
        option: t.StartBluetoothDevicesDiscoveryOption,
    ): void;
    abstract startCompass(option?: t.StartCompassOption): void;
    abstract startDeviceMotionListening(option: t.StartDeviceMotionListeningOption): void;
    abstract startGyroscope(option: t.StartGyroscopeOption): void;
    abstract startHCE(option: t.StartHCEOption): void;
    abstract startLocalServiceDiscovery(option: t.StartLocalServiceDiscoveryOption): void;
    abstract startPullDownRefresh(option?: t.StartPullDownRefreshOption): void;
    abstract startRecord(option: t.WxStartRecordOption): void;
    abstract startSoterAuthentication(option: t.StartSoterAuthenticationOption): void;
    abstract startWifi(option?: t.StartWifiOption): void;
    abstract stopAccelerometer(option?: t.StopAccelerometerOption): void;
    abstract stopBackgroundAudio(option?: t.StopBackgroundAudioOption): void;
    abstract stopBeaconDiscovery(option?: t.StopBeaconDiscoveryOption): void;
    abstract stopBluetoothDevicesDiscovery(
        option?: t.StopBluetoothDevicesDiscoveryOption,
    ): void;
    abstract stopCompass(option?: t.StopCompassOption): void;
    abstract stopDeviceMotionListening(option?: t.StopDeviceMotionListeningOption): void;
    abstract stopGyroscope(option?: t.StopGyroscopeOption): void;
    abstract stopHCE(option?: t.StopHCEOption): void;
    abstract stopLocalServiceDiscovery(option?: t.StopLocalServiceDiscoveryOption): void;
    abstract stopPullDownRefresh(option?: t.StopPullDownRefreshOption): void;
    abstract stopRecord(): void;
    abstract stopVoice(option?: t.StopVoiceOption): void;
    abstract stopWifi(option?: t.StopWifiOption): void;
    abstract switchTab(option: t.SwitchTabOption): void;
    abstract updateShareMenu(option: t.UpdateShareMenuOption): void;
    abstract vibrateLong(option?: t.VibrateLongOption): void;
    abstract vibrateShort(option?: t.VibrateShortOption): void;
    abstract writeBLECharacteristicValue(
        option: t.WriteBLECharacteristicValueOption,
    ): void;

    abstract clearInterval(
        intervalID: number,
    ): void

    abstract clearTimeout(
        timeoutID: number,
    ): void;
    abstract setInterval(
        /** 回调函数 */
        callback: Function,
        /** 执行回调函数之间的时间间隔，单位 ms。 */
        delay?: number,
        /** param1, param2, ..., paramN 等附加参数，它们会作为参数传递给回调函数。 */
        rest?: any,
    ): number;
    abstract setTimeout(
        /** 回调函数 */
        callback: Function,
        /** 延迟的时间，函数的调用会在该延迟之后发生，单位 ms。 */
        delay?: number,
        /** param1, param2, ..., paramN 等附加参数，它们会作为参数传递给回调函数。 */
        rest?: any,
    ): number;
}