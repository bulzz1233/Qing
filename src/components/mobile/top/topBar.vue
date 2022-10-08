<template>
    <div class="top_layout">
        <div class="box"></div>
        <div class="title">轻运动</div>
        <div class="avatar" v-show="avatar_show"></div>
        <div class="tips" @click="gologin()" v-show="!avatar_show">登录</div>
        <router-view name="login"></router-view>
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
.title {
    font-size: 3vh;
    font-weight: bolder;
    letter-spacing: 3px;
    font-style: italic;
}
.avatar {
    height: 5vh;
    width: 5vh;
    background: white;
    border-radius: 50%;
}
.box {
    height: 5vh;
    width: 5vh;
}
.tips {
    font-size: 1vh;
}
</style>
