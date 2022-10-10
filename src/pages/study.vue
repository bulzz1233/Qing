<template>
    <div class="box">
        <video-player class="uvideo vjs-big-play-centered" :options="videoOptions"> </video-player>
    </div>
</template>

<script>
import VideoPlayer from "../components/VideoPlayer.vue"
export default {
    
    data() {
        return {
            videoOptions: {
                autoplay: true,//自动播放
                controls: true,//用户可以与之交互的控件
                loop:true,//视频一结束就重新开始
                muted:false,//默认情况下将使所有音频静音
                //aspectRatio:"8:7",//显示比率
                height:'600px',
                width:"1200px",
                fullscreen:{
                    options: {navigationUI: 'hide'}
                },
                sources: [
                    {
                        
                        src: require("@/assets/video/"+JSON.parse(this.$route.query.detail).sportVideo),
                        type: "video/mp4"
                    }
                ]
            }
        };
    },
components:{
    VideoPlayer
}
};
</script>

<style scoped>
.box {
    position: relative;
    min-width: 43.3125rem;
    height: 37.5rem;
    background: #3f3333;

}
.uvideo{
    position: relative;
    width: 100%;
    height: 100%;
    max-width: 100%;
}
</style>
