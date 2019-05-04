import * as create from './src'
export function build(name: string){
    Object.keys(create).map(key=>{
        create[key](name)
    })
}