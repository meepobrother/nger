Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const template_1 = tslib_1.__importDefault(require("@babel/template"));
const appTpl = template_1.default(`
const platform = require('PLATFORM').default;
const app = require('./nger.js').default;
platform().bootstrapModule(app).then(ref=>{
    const {instance} = ref;
    App({
        ngModuleRef: ref,
        onLaunch: (){
            instance.ngDoBootstrap && instance.ngDoBootstrap()
        },
        onError (){
            instance.ngOnError && instance.ngOnError()
        },
        onShow(){
            instance.ngOnInit && instance.ngOnInit()
        },
        onHide(){
            instance.ngOnDestroy && instance.ngOnDestroy()
        }
    })
})
`);
const pageTpl = template_1.default(`
const appInstance = getApp()
const ngModuleRef = appInstance.ngModuleRef;
const NAME = require('./PAGE').NAME;
const pageFactory = ngModuleRef.componentFactoryResolver.resolveComponentFactory(NAME);
Page(pageRef.createWeapp())
`);
const componentTpl = template_1.default(`
const appInstance = getApp()
const ngModuleRef = appInstance.ngModuleRef;
const NAME = require('./Component').NAME;
const pageFactory = ngModuleRef.componentFactoryResolver.resolveComponentFactory(NAME);
Component(pageRef.createWeapp())
`);
exports.default = {
    app: appTpl,
    page: pageTpl,
    component: componentTpl
};
