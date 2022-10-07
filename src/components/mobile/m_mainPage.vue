<template>
    <div>
        <top-bar />
        <div class="view_layout">
        
                <router-view></router-view>
        </div>
        <div class="bottom">
            <div class="item" :class="light1" @click="trans('m_home')">
                <div class="icon el-icon-house"></div>
                <div>主页</div>
            </div>
            <div class="item" :class="light2" @click="trans('m_calendar')">
                <div class="el-icon-date icon"></div>
                <div>日历</div>
            </div>
            <div class="item" :class="light3" @click="trans('m_user')">
                <div class="el-icon-user icon"></div>
                <div>我的</div>
            </div>
        </div>
    </div>
</template>

<script>
import topBar from '../mobile/top/topBar.vue';
export default {
    name: 'm_mainPage',
    data() {
        return {};
    },
    computed: {
        light1() {
            if (this.$route.path.includes('m_home')) {
                return 'light';
            }
        },
        light2() {
            if (this.$route.path.includes('m_calendar')) {
                return 'light';
            }
        },
        light3() {
            if (this.$route.path.includes('m_user')) {
                return 'light';
            }
        },
    },
    methods: {
        trans(name) {
            //判断是否已经到页面了
            if (this.$route.path.includes(`${name}`)) {
                return;
            } else {
                this.$router.replace({
                    name: `${name}`,
                });
            }
        },
    },
    created() {},
    components: {
        topBar,
    },
};
</script>
<style scoped>
.bottom {
    width: 100%;
    position: fixed;
    display: flex;
    justify-content: space-around;
    align-items: center;
    bottom: 0;
    height: 7vh;
    font-size: 1vh;
    background-color: #232323;
    color: rgb(120, 123, 125);
}
.item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    transition: all 0.5s;
}
.icon {
    font-size: 2.5rem;
}
.light {
    color: #ffffff;
}
.view_layout {
    position: fixed;
    height: calc(87vh);
    top: 6vh;
    width: 100%;
}
</style>
