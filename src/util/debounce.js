
const debounce ={
    //该指令需要传递两个参数，第一个为fn，第二个是监听事件类型,第二个为间隔时间
    inserted(el,binding){
        let timer;
        let{fn,type,delay} = binding.value 
        if(!delay){
            delay=300
        }
        el.addEventListener(type,()=>{
            if(timer){
                clearTimeout(timer)
            }
            timer = setTimeout(fn,delay)
        })
    }
}
export default debounce