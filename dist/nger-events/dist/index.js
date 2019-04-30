/**
 * 应用事件
 */
Object.defineProperty(exports, "__esModule", { value: true });
/** 安装应用 */
exports.AddonInstall = `[AddonInstall]`;
/** 安装成功 */
exports.AddonInstallSuccess = `[AddonInstallSuccess]`;
/** 安装失败 */
exports.AddonInstallFail = `[AddonInstallFail]`;
/** 卸载应用 */
exports.AddonUnInstall = `[AddonUnInstall]`;
// 卸载成功
exports.AddonUnInstallSuccess = `[AddonUnInstallSuccess]`;
// 卸载失败
exports.AddonUnInstallFail = `[AddonUnInstallFail]`;
/** 更新应用 */
exports.AddonUpgrade = `[AddonUpgrade]`;
// 更新成功
exports.AddonUpgradeSuccess = `[AddonUpgrade]`;
// 更新失败
exports.AddonUpgradeFail = `[AddonUpgrade]`;
/** 加载应用 */
exports.AddonLoad = `[AddonLoad]`;
exports.AddonLoadSuccess = `[AddonLoadSuccess]`;
exports.AddonLoadFail = `[AddonLoadFail]`;
/** 应用启动 */
exports.AddonStart = `[AddonStart]`;
exports.AddonStartSuccess = `[AddonStartSuccess]`;
exports.AddonStartFail = `[AddonStartFail]`;
/** 应用重启 */
exports.AddonRestart = `[AddonRestart]`;
exports.AddonRestartSuccess = `[AddonRestartSuccess]`;
exports.AddonRestartFail = `[AddonRestartFail]`;
/** 应用停止 */
exports.AddonStop = `[AddonStop]`;
exports.AddonStopSuccess = `[AddonStopSuccess]`;
exports.AddonStopFail = `[AddonStopFail]`;

/**
 * 系统事件
 */
Object.defineProperty(exports, "__esModule", { value: true });
/** 系统初始化 */
exports.ApplicationReady = `[typeorm application ready]`;
/** 安装系统 */
exports.ApplicationInstall = `[application install]`;
/** 安装成功 */
exports.ApplicationInstallSuccess = `[application install]`;
/** 安装失败 */
exports.ApplicationInstallFail = `[application install]`;
/** 卸载系统 */
exports.ApplicationUninstall = `[application uninstall]`;
/** 更新系统 */
exports.ApplicationUpgrade = `[application upgrade]`;

Object.defineProperty(exports, "__esModule", { value: true });
/** 系统更新 */
exports.CloudSystemUpdate = `CloudSystemUpdate`;
/** 应用更新 */
exports.CloudAddonUpdate = `CloudAddonUpdate`;
/** 新消息 */
exports.CloudNewMessage = `CloudNewMessage`;

Object.defineProperty(exports, "__esModule", { value: true });
exports.DomReady = `[DomReady]`;
exports.Resize = `[Resize]`;
exports.Scroll = `[Scroll]`;

Object.defineProperty(exports, "__esModule", { value: true });
/** 创建页面 */
exports.EditorCreatePage = `[EditorCreatePage]`;
/** 选择页面 */
exports.EditorSelectPage = `[EditorSelectPage]`;
/** 创建应用 */
exports.EditorCreateAddon = `[EditorCreateAddon]`;
/** 选择应用 */
exports.EditorSelectAddon = `[EditorSelectAddon]`;
/** 创建组件 */
exports.EditorCreateComponent = `[EditorCreateComponent]`;
/** 选择组件 */
exports.EditorSelectComponent = `[EditorSelectComponent]`;
/** 保存组件 */
exports.EditorSaveComponent = `[EditorSelectComponent]`;

Object.defineProperty(exports, "__esModule", { value: true });
/** http 发送前 */
exports.HttpBeforeSend = `[http before send]`;
/** http 发送中 */
exports.HttpSending = `[http sending]`;
/** http 发送结束 */
exports.HttpEnd = `[http end]`;

Object.defineProperty(exports, "__esModule", { value: true });

Object.defineProperty(exports, "__esModule", { value: true });
/** 注册injector */
exports.InjectorRegister = `InjectorRegister`;

Object.defineProperty(exports, "__esModule", { value: true });
/** 路由跳转 */
exports.RouterGo = `[RouterGo]`;
/** 后退 */
exports.RouterBack = `[RouterBack]`;
/** 前进 */
exports.RouterForward = `[RouterBack]`;

Object.defineProperty(exports, "__esModule", { value: true });
/** 数据库连接 */
exports.TypeormConnectedSuccess = `[typeorm connected success]`;
/** 数据库连接失败 */
exports.TypeormConnectedFail = `[typeorm connected fail]`;

/**
 * 用户
 **/
Object.defineProperty(exports, "__esModule", { value: true });
/** 登录 */
exports.UserLogin = ``;
/** 退出登录 */
exports.UserLogout = ``;
/** 用户升级 */
exports.UserUpgrade = ``;
/** 用户注册 */
exports.UserRegister = ``;
/** 用户上线 */
exports.UserOnLine = ``;
/** 用户下线 */
exports.UserOffLine = ``;
