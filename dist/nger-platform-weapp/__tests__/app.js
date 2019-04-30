const { Compiler, WeappFactory } = require('./npm/nger-core')
const { ImsTestWeapp } = require('./nger/app')
const compiler = new Compiler();
const ref = compiler.bootstrap(ImsTestWeapp);
const factory = new WeappFactory();
App(factory.createApp(ref));