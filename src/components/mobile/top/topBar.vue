<template>
    <div class="top_layout">
        <div class="box"></div>
        <div class="title">轻运动</div>
        <div class="avatar" v-show="avatar_show">
            <img class="head_portrait_img" src="@/assets/img/12.png" alt="" />
        </div>
        <div class="tips" @click="gologin()" v-show="!avatar_show">登录</div>
        <transition name="fade1">
        <router-view :key="$route.name" name="login"></router-view>
        </transition>
    </div>
</template>

<script>
export default {
    name: 'topBar',
    data() {
        return {};
    },
    computed: {
        avatar_show() {
            if (localStorage.getItem('token')) {
                return true;
            } else {
                return false;
            }
        },
    },
    methods: {
        gologin() {
            if (this.$route.path.includes('login')) {
                return;
            } else {
                this.$router.push({
                    name: 'm_login',
                });
            }
        },
    },
    created() {},
};
</script>
<style scoped>
.top_layout {
    height: 6vh;
    width: 100%;
    background: #232323;
    color: white;
    display: flex;
    position: fixed;
    justify-content: space-around;
    align-items: center;
}
.head_portrait_img {
    position: absolute;
    width: 100%;
    height: 100%;
}
.title {
    font-size: 3vh;
    font-weight: bolder;
    letter-spacing: 3px;
    font-style: italic;
}
.avatar {
    height: 5vh;
    width: 5vh;
    border-radius: 50%;
    position: relative;
    overflow: hidden;
    left: 4vw;
}
.box {
    height: 5vh;
    width: 5vh;
}
.tips {
    font-size: 1.5vh;
}
.fade1-enter-active,
.fade1-leave-active {
    transition: all ease-in-out 1s;
}
.fade1-enter,
.fade1-leave {
    opacity: 0.5;
}
</style>
