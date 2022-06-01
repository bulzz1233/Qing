

const lazyload = {
    bind(el, binding){
        el.binding=binding.value
        //用来监听元素是否进入可视区域
        //var observer = new IntersectionObserver(callback,options);
        //callback是被监听元素的可见性变化时，触发的回调函数
        //option是一个配置参数，可选，有默认值
        let lazyloadObser = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach((entry,index)=>{
                    let lazyImage = entry.target
                    if(entry.intersectionRatio>0){
                        lazyImage.src = observer.binging.value
                        lazyloadObser.unobserve(lazyImage)
                    }
                })
            });
            lazyloadObser.observe(el)
    },
};
export default lazyload;
