import lazyload from './lazyload'
import debounce from './debounce'
const directives={
    lazyload,
    debounce
}

export default{
    install(Vue){
        Object.keys(directives).forEach((key)=>{
            Vue.directive(key,directives[key])
        })
    }
}

