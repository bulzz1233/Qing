import lazyload from './lazyload'

const directives={
    lazyload,
}

export default{
    install(Vue){
        Object.keys(directives).forEach((key)=>{
            Vue.directive(key,directives[key])
        })
    }
}

