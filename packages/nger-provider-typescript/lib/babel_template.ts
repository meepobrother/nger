import template from '@babel/template';

const appTpl = template(`
const platform = require(PLATFORM).default;
const app = require(MAIN).default;
platform().bootstrapModule(app).then(ref=>{
    const {instance} = ref;
    App({
        ngModuleRef: ref,
        onLaunch (){
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
`)

const pageTpl = template(`
const appInstance = getApp()
const ngModuleRef = appInstance.ngModuleRef;
const {NAME} = require(PAGE);
const pageFactory = ngModuleRef.componentFactoryResolver.resolveComponentFactory(NAME);
const pageRef = pageFactory.create(ngModuleRef.injector)
Page(pageRef.createWeapp())
`)

const componentTpl = template(`
const appInstance = getApp()
const ngModuleRef = appInstance.ngModuleRef;
const NAME = require('./Component').NAME;
const pageFactory = ngModuleRef.componentFactoryResolver.resolveComponentFactory(NAME);
Component(pageRef.createWeapp())
`)


export default {
    app: appTpl,
    page: pageTpl,
    component: componentTpl
}