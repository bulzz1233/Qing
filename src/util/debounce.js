const debounce={
    bind(el,binding){
        //防抖时间
        let delay = binding.value;
        //如果用户不设置防抖时间，默认为两秒
        if(!delay){
            delay = 2000
        }
        let timer
        el.addEventListener('click',event=>{
            //第一次执行
            if(!timer){
                    timer=setTimeout(()=>{
                        timer = null;
                    },delay)
            }else{
                event && event.stopImmediatePropagation();
            }
        },true)
    }
}
export default debounce