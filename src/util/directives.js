import lazyload from './lazyload'
import throttled from './throttled'
import debounce  from './debounce'
const directives={
    lazyload,
    throttled,
    debounce
}

export default{
    install(Vue){
        Object.keys(directives).forEach((key)=>{
            Vue.directive(key,directives[key])
        })
    }
}

