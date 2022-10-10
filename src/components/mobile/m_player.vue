<template>
    <div class="layout">
        <div class="background"></div>
                        <div
                replace
                href="#"
                class="el-icon-close icon close"
                @click="$router.go(-1)"
            ></div>
        <div class="box">
            <video-player
                class="uvideo vjs-big-play-centered"
                :options="videoOptions"
            ></video-player>
        </div>
    </div>
</template>

<script>
import VideoPlayer from '@/components/VideoPlayer.vue';

export default {
    name: 'm_player',
    data() {
        return {
            videoOptions: {
                autoplay: true, //自动播放
                controls: true, //用户可以与之交互的控件
                loop: true, //视频一结束就重新开始
                muted: false, //默认情况下将使所有音频静音
                aspectRatio: '16:9', //显示比率
                fluid: true,
                fullscreen: {
                    options: { navigationUI: 'hide' },
                },
                controlBar: {
                    timeDivider: true, // 是否显示当前时间和持续时间的分隔符，"/"
                    durationDisplay: true, // 是否显示持续时间
                    remainingTimeDisplay: false, // 是否显示剩余时间
                    fullscreenToggle: true, // 是否显示全屏按钮
                },
                sources: [
                    {
                        src: require('@/assets/video/' + JSON.parse(this.$route.query.link)),
                        type: 'video/mp4',
                    },
                ],
            },
        };
    },
    components: {
        VideoPlayer,
    },
    methods: {},
    created() {},
};
</script>
<style scoped>
.box {
    position: relative;
    width: 90vw;
    height: 20vh;
    background: #3f3333;
    top:0vh;
    z-index: 5;
}
.uvideo {
    position: relative;
    width: 100%;
    height: 100%;
}
.layout {
    position: fixed;
    width: 100vw;
    height: calc(110vh);
    z-index: 7;
    top:0;
    display: flex;
    justify-content: center;
    align-items: center;

}
.background {
    background: #0f0f0f;
    width: 100vw;
    height: calc(120vh);
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 5;
    opacity: 0.5;
    top: 0;
    bottom: 0;
}
.close {
    position: absolute;
    font-size: 10vw;
    top:15vh;
    left: 85vw;
    text-decoration: none;
    color: white;
    z-index: 9;
}
</style>
