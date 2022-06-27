<template>
    <div class="style" v-show='show'>
        
        <div class="mask"></div>

        <div class="background"></div>
        <div class="content">
            
            <transition
                enter-active-class="animate__zoomInDown"
                appear
                >
                <ul class="list animate__animated animate__zoomInDown" >
                    <li class="title "
                        
                        >轻运动</li>
                    <li class="Etitle">Light Exercise</li>
                    <li class="details">定制属于自己的健身计划</li>
                </ul>
            </transition>
            
            <button  class="start animate__animated animate__zoomInUp" 
            @click="gologin"
            >开始使用</button>
        </div>
        <!-- 轮播图 -->
        <el-carousel :height="main_height + 'px'">
            <el-carousel-item v-for="item in ImgUrl" :key="item">
                <img :src="require('../assets/' + item)" />
            </el-carousel-item>
        </el-carousel>
        
    </div>

</template>

<script>

export default {
    name: 'home',
    data() {
        return {
            main_height: document.body.clientHeight,
            ImgUrl: [`img/a.jpg`, `img/b.jpg`],
            show:true,
            
        };
    },
    methods:{
        gologin(){
            this.show=!this.show
            this.$router.replace({
                name:'mainpage',
                
            })
        }
    },
    mounted() {
        // 响应式高度
        this.main_height = document.body.clientHeight;

        window.addEventListener('resize', () => {
            this.main_height = document.body.clientHeight;
        });
        
        
    },
};
</script>

<style scoped>
.mask {
    position: absolute;
    width: 100%;
    height: 100%;
    background: #000;
    z-index: 3;
    opacity: 0.75;
}
.background {
    position: absolute;
    width: 100%;
    height: 100%;
    background: #3a3a3a;
}
.content {
    width: 100%;
    height: 100%;
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 5;
}
.list {
    display: flex;
    list-style: none;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    margin-bottom: 4.25rem;
    color: rgb(233, 242, 248);
}
.style{
    overflow-x: hidden;
    
}
.title {
    font-family: 'zhongwen1';
    font-weight: bold;
    font-size: 6.375rem;
}
.Etitle {
    font-family: 'yinwen';
    font-size: 6.375rem;
}
.details {
    font-family: 'zhongwen1';

    font-size: 2.375rem;
}
.list li {
    margin: 1.25rem;
}
.start {
    width: 12.5rem;
    height: 4.375rem;
    cursor: pointer;
    font-size: 1.875rem;
    font-family: 'zhongwen1';

    color: #3a3a3a;
    border: 3px solid black;
    border-radius: 1.5625rem;
    background: rgb(233, 242, 248);
}
.start:active {
    color: rgb(233, 242, 248);
    background: #000;
}
img {
    height: 100%;
    width: 100%;
}
.el-carousel {
    padding-left: 6.25rem;
    padding-right: 6.25rem;
}
.el-carousel__item:nth-child(2n) {
    background-color: #3a3a3a;
}

.el-carousel__item:nth-child(2n + 1) {
    background-color: #3a3a3a;
}
</style>
