"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nger_core_1 = require("nger-core");
class AlipaySdk extends nger_core_1.Sdk {
    getAccountInfoSync() {
        return undefined;
    }
    getBatteryInfoSync() {
        return undefined;
    }
    getExtConfigSync() {
        return undefined;
    }
    getLaunchOptionsSync() {
        return undefined;
    }
    getMenuButtonBoundingClientRect() {
        return undefined;
    }
    getStorageInfoSync() {
        return undefined;
    }
    getSystemInfoSync() {
        return undefined;
    }
    createAnimation(option) {
        return undefined;
    }
    createAudioContext(
    /** `<audio/>` 组件的 id */
    id, 
    /** 在自定义组件下，当前组件实例的this，以操作组件内 `<audio/>` 组件 */
    component) {
        return undefined;
    }
    getBackgroundAudioManager() {
        return undefined;
    }
    createCameraContext() {
        return undefined;
    }
    createCanvasContext(
    /** 要获取上下文的 `<canvas>` 组件 canvas-id 属性 */
    canvasId, 
    /** 在自定义组件下，当前组件实例的this，表示在这个自定义组件下查找拥有 canvas-id 的 `<canvas/>` ，如果省略则不在任何自定义组件内查找 */
    component) {
        return undefined;
    }
    downloadFile(option) {
        return undefined;
    }
    getFileSystemManager() {
        return undefined;
    }
    createInnerAudioContext() {
        return undefined;
    }
    createIntersectionObserver(...args) {
        return undefined;
    }
    createLivePlayerContext(
    /** `<live-player/>` 组件的 id */
    id, 
    /** 在自定义组件下，当前组件实例的this，以操作组件内 `<live-player/>` 组件 */
    component) {
        return undefined;
    }
    createLivePusherContext() {
        return undefined;
    }
    getLogManager(option) {
        return undefined;
    }
    createMapContext(
    /** `<map/>` 组件的 id */
    mapId, 
    /** 在自定义组件下，当前组件实例的this，以操作组件内 `<map/>` 组件 */
    component) {
        return undefined;
    }
    getRecorderManager() {
        return undefined;
    }
    request(option) {
        return undefined;
    }
    createSelectorQuery() {
        return undefined;
    }
    connectSocket(option) {
        return undefined;
    }
    getUpdateManager() {
        return undefined;
    }
    uploadFile(option) {
        return undefined;
    }
    createVideoContext(
    /** `<video/>` 组件的 id */
    id, 
    /** 在自定义组件下，当前组件实例的this，以操作组件内 `<video/>` 组件 */
    component) {
        return undefined;
    }
    createWorker(
    /** worker 入口文件的**绝对路径** */
    scriptPath) {
        return undefined;
    }
    getStorageSync(
    /** 本地缓存中指定的 key */
    key) {
        return undefined;
    }
    canIUse(
    /** 使用 `${API}.${method}.${param}.${options}` 或者 `${component}.${attribute}.${option}` 方式来调用 */
    schema) {
        return undefined;
    }
    addCard(option) {
        return undefined;
    }
    addPhoneContact(option) {
        return undefined;
    }
    authorize(option) {
        return undefined;
    }
    canvasGetImageData(option, 
    /** 在自定义组件下，当前组件实例的this，以操作组件内 `<canvas/>` 组件 */
    component) {
        return undefined;
    }
    canvasPutImageData(option, 
    /** 在自定义组件下，当前组件实例的this，以操作组件内 `<canvas/>` 组件 */
    component) { }
    canvasToTempFilePath(option, 
    /** 在自定义组件下，当前组件实例的this，以操作组件内 `<canvas/>` 组件 */
    component) { }
    checkIsSoterEnrolledInDevice(option) { }
    checkIsSupportSoterAuthentication(option) { }
    clearStorage(option) { }
    checkSession(option) { }
    chooseAddress(option) { }
    chooseImage(option) { }
    chooseInvoice(option) { }
    chooseInvoiceTitle(option) { }
    chooseLocation(option) { }
    chooseMessageFile(option) { }
    chooseVideo(option) { }
    clearStorageSync() { }
    closeBLEConnection(option) { }
    closeBluetoothAdapter(option) { }
    closeSocket(option) { }
    compressImage(option) { }
    connectWifi(option) { }
    createBLEConnection(option) { }
    getAvailableAudioSources(option) { }
    getBLEDeviceCharacteristics(option) { }
    getBLEDeviceServices(option) { }
    getBackgroundAudioPlayerState(option) { }
    getBatteryInfo(option) { }
    getBeacons(option) { }
    getBluetoothAdapterState(option) { }
    getBluetoothDevices(option) { }
    getClipboardData(option) { }
    getConnectedBluetoothDevices(option) { }
    getConnectedWifi(option) { }
    getExtConfig(option) { }
    getFileInfo(option) { }
    getHCEState(option) { }
    getImageInfo(option) { }
    getLocation(option) { }
    getNetworkType(option) { }
    getSavedFileInfo(option) { }
    getSavedFileList(option) { }
    getScreenBrightness(option) { }
    getSetting(option) { }
    getShareInfo(option) { }
    getStorage(option) { }
    getStorageInfo(option) { }
    getSystemInfo(option) { }
    getUserInfo(option) { }
    getWeRunData(option) { }
    getWifiList(option) { }
    hideLoading(option) { }
    hideNavigationBarLoading(option) { }
    hideShareMenu(option) { }
    hideTabBar(option) { }
    hideTabBarRedDot(option) { }
    hideToast(option) { }
    loadFontFace(option) { }
    login(option) { }
    makePhoneCall(option) { }
    navigateBack(option) { }
    navigateBackMiniProgram(option) { }
    navigateTo(option) { }
    navigateToMiniProgram(option) { }
    nextTick(callback) { }
    notifyBLECharacteristicValueChange(option) { }
    offAppHide(
    /** 小程序切后台事件的回调函数 */
    callback) { }
    offAppShow(
    /** 小程序切前台事件的回调函数 */
    callback) { }
    offAudioInterruptionBegin(
    /** 音频因为受到系统占用而被中断开始事件的回调函数 */
    callback) { }
    offAudioInterruptionEnd(
    /** 音频中断结束事件的回调函数 */
    callback) { }
    offError(
    /** 小程序错误事件的回调函数 */
    callback) { }
    offLocalServiceDiscoveryStop(
    /** mDNS 服务停止搜索的事件的回调函数 */
    callback) { }
    offLocalServiceFound(
    /** mDNS 服务发现的事件的回调函数 */
    callback) { }
    offLocalServiceLost(
    /** mDNS 服务离开的事件的回调函数 */
    callback) { }
    offLocalServiceResolveFail(
    /** mDNS 服务解析失败的事件的回调函数 */
    callback) { }
    offPageNotFound(
    /** 小程序要打开的页面不存在事件的回调函数 */
    callback) { }
    offWindowResize(
    /** 窗口尺寸变化事件的回调函数 */
    callback) { }
    onAccelerometerChange(
    /** 加速度数据事件的回调函数 */
    callback) { }
    onAppHide(
    /** 小程序切后台事件的回调函数 */
    callback) { }
    onAppShow(
    /** 小程序切前台事件的回调函数 */
    callback) { }
    onAudioInterruptionBegin(
    /** 音频因为受到系统占用而被中断开始事件的回调函数 */
    callback) { }
    onAudioInterruptionEnd(
    /** 音频中断结束事件的回调函数 */
    callback) { }
    onBLECharacteristicValueChange(
    /** 低功耗蓝牙设备的特征值变化事件的回调函数 */
    callback) { }
    onBLEConnectionStateChange(
    /** 低功耗蓝牙连接状态的改变事件的回调函数 */
    callback) { }
    onBackgroundAudioPause(
    /** 音乐暂停事件的回调函数 */
    callback) { }
    onBackgroundAudioPlay(
    /** 音乐播放事件的回调函数 */
    callback) { }
    onBackgroundAudioStop(
    /** 音乐停止事件的回调函数 */
    callback) { }
    onBeaconServiceChange(
    /** iBeacon 服务状态变化事件的回调函数 */
    callback) { }
    onBeaconUpdate(
    /** iBeacon 设备更新事件的回调函数 */
    callback) { }
    onBluetoothAdapterStateChange(
    /** 蓝牙适配器状态变化事件的回调函数 */
    callback) { }
    onBluetoothDeviceFound(
    /** 寻找到新设备的事件的回调函数 */
    callback) { }
    onCompassChange(
    /** 罗盘数据变化事件的回调函数 */
    callback) { }
    onDeviceMotionChange(
    /** 设备方向变化事件的回调函数 */
    callback) { }
    onError(
    /** 小程序错误事件的回调函数 */
    callback) { }
    onGetWifiList(
    /** 获取到 Wi-Fi 列表数据事件的回调函数 */
    callback) { }
    onGyroscopeChange(
    /** 陀螺仪数据变化事件的回调函数 */
    callback) { }
    onHCEMessage(
    /** 接收 NFC 设备消息事件的回调函数 */
    callback) { }
    onLocalServiceDiscoveryStop(
    /** mDNS 服务停止搜索的事件的回调函数 */
    callback) { }
    onLocalServiceFound(
    /** mDNS 服务发现的事件的回调函数 */
    callback) { }
    onLocalServiceLost(
    /** mDNS 服务离开的事件的回调函数 */
    callback) { }
    onLocalServiceResolveFail(
    /** mDNS 服务解析失败的事件的回调函数 */
    callback) { }
    onMemoryWarning(
    /** 内存不足告警事件的回调函数 */
    callback) { }
    onNetworkStatusChange(
    /** 网络状态变化事件的回调函数 */
    callback) { }
    onPageNotFound(
    /** 小程序要打开的页面不存在事件的回调函数 */
    callback) { }
    onSocketClose(
    /** WebSocket 连接关闭事件的回调函数 */
    callback) { }
    onSocketError(
    /** WebSocket 错误事件的回调函数 */
    callback) { }
    onSocketMessage(
    /** WebSocket 接受到服务器的消息事件的回调函数 */
    callback) { }
    onSocketOpen(
    /** WebSocket 连接打开事件的回调函数 */
    callback) { }
    onUserCaptureScreen(
    /** 用户主动截屏事件的回调函数 */
    callback) { }
    onWifiConnected(
    /** 连接上 Wi-Fi 的事件的回调函数 */
    callback) { }
    onWindowResize(
    /** 窗口尺寸变化事件的回调函数 */
    callback) { }
    openBluetoothAdapter(option) { }
    openCard(option) { }
    openDocument(option) { }
    openLocation(option) { }
    openSetting(option) { }
    pageScrollTo(option) { }
    pauseBackgroundAudio(option) { }
    pauseVoice(option) { }
    playBackgroundAudio(option) { }
    playVoice(option) { }
    previewImage(option) { }
    reLaunch(option) { }
    readBLECharacteristicValue(option) { }
    redirectTo(option) { }
    removeSavedFile(option) { }
    removeStorage(option) { }
    removeStorageSync(
    /** 本地缓存中指定的 key */
    key) { }
    removeTabBarBadge(option) { }
    reportAnalytics(
    /** 事件名 */
    eventName, 
    /** 上报的自定义数据。 */
    data) { }
    reportMonitor(
    /** 监控ID，在「小程序管理后台」新建数据指标后获得 */
    name, 
    /** 上报数值，经处理后会在「小程序管理后台」上展示每分钟的上报总量 */
    value) { }
    requestPayment(option) { }
    saveFile(option) { }
    saveImageToPhotosAlbum(option) { }
    saveVideoToPhotosAlbum(option) { }
    scanCode(option) { }
    seekBackgroundAudio(option) { }
    sendHCEMessage(option) { }
    sendSocketMessage(option) { }
    setBackgroundColor(option) { }
    setBackgroundTextStyle(option) { }
    setClipboardData(option) { }
    setEnableDebug(option) { }
    setInnerAudioOption(option) { }
    setKeepScreenOn(option) { }
    setNavigationBarColor(option) { }
    setNavigationBarTitle(option) { }
    setScreenBrightness(option) { }
    setStorage(option) { }
    setStorageSync(
    /** 本地缓存中指定的 key */
    key, 
    /** 需要存储的内容。只支持原生类型、Date、及能够通过`JSON.stringify`序列化的对象。 */
    data) { }
    setTabBarBadge(option) { }
    setTabBarItem(option) { }
    setTabBarStyle(option) { }
    setTopBarText(option) { }
    setWifiList(option) { }
    showActionSheet(option) { }
    showLoading(option) { }
    showModal(option) { }
    showNavigationBarLoading(option) { }
    showShareMenu(option) { }
    showTabBar(option) { }
    showTabBarRedDot(option) { }
    showToast(option) { }
    startAccelerometer(option) { }
    startBeaconDiscovery(option) { }
    startBluetoothDevicesDiscovery(option) { }
    startCompass(option) { }
    startDeviceMotionListening(option) { }
    startGyroscope(option) { }
    startHCE(option) { }
    startLocalServiceDiscovery(option) { }
    startPullDownRefresh(option) { }
    startRecord(option) { }
    startSoterAuthentication(option) { }
    startWifi(option) { }
    stopAccelerometer(option) { }
    stopBackgroundAudio(option) { }
    stopBeaconDiscovery(option) { }
    stopBluetoothDevicesDiscovery(option) { }
    stopCompass(option) { }
    stopDeviceMotionListening(option) { }
    stopGyroscope(option) { }
    stopHCE(option) { }
    stopLocalServiceDiscovery(option) { }
    stopPullDownRefresh(option) { }
    stopRecord() { }
    stopVoice(option) { }
    stopWifi(option) { }
    switchTab(option) { }
    updateShareMenu(option) { }
    vibrateLong(option) { }
    vibrateShort(option) { }
    writeBLECharacteristicValue(option) { }
    clearInterval(intervalID) { }
    clearTimeout(timeoutID) { }
    setInterval(
    /** 回调函数 */
    callback, 
    /** 执行回调函数之间的时间间隔，单位 ms。 */
    delay, 
    /** param1, param2, ..., paramN 等附加参数，它们会作为参数传递给回调函数。 */
    rest) {
        return undefined;
    }
    setTimeout(
    /** 回调函数 */
    callback, 
    /** 延迟的时间，函数的调用会在该延迟之后发生，单位 ms。 */
    delay, 
    /** param1, param2, ..., paramN 等附加参数，它们会作为参数传递给回调函数。 */
    rest) {
        return undefined;
    }
}
exports.AlipaySdk = AlipaySdk;
