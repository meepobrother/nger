// import { makeDecorator, ClassContext } from 'ims-decorator'
// interface AuthGuardOption {
//     // 可以访问者权限标识
//     allows: string[]
// }
// const AuthGuard = makeDecorator<AuthGuardOption>(`AuthGuard`)
// @AuthGuard({
//     // 定义 只能站长、用户、粉丝和会员访问
//     allows: ['admin', 'user', 'fans', 'member']
// })
// export class AdminController { }
// /** 解析 platform */
// import { visitor } from 'nger-core'
// // 拿到typecontext 上下文
// const context = visitor.visitType(AdminController)
// const auth = context.getClass(`AuthGuard`) as ClassContext<AuthGuardOption>;
// // 拿到定义的内容
// // allows: ['admin', 'user', 'fans', 'member']
// const def = auth.ast.metadataDef
// app.use((req,res,next)=>{
//     req.role = 'member';
//     if(def.allows.includes(req.role)){
//         next();
//     }
// })