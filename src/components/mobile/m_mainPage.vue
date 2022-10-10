<template>
    <div class="main_layout" >
        <top-bar />
        <div class="view_layout" v-show="view_show" >
        <transition name="fade1">
                <router-view :key="$route.name" ></router-view>
        </transition>
        </div>
        <div class="bottom">
            <div class="item" :class="light1" @click="trans('view')">
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
        return {
        };
    },
    computed: {
        view_show(){
            if(this.$route.path.includes('login')||this.$route.path.includes('register')||this.$route.path.includes('common')){
                return false
            }else{
                return true
            }
        },
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
                    query:{
                        name:'全部'
                    }
                });
            }
        },
    },
    created() {
        if (localStorage.getItem('user_data')) {
            let i;
            i = JSON.parse(localStorage.getItem('user_data')).uid;
            this.uid = i;
            let obj = {
                userId: i,
            };
            const l = async () => {
                await this.$store.dispatch('ucardData/AllLikes', JSON.stringify(obj));
            };
            l()
        }

        const k = async () => {
            await this.$store.dispatch('runData/AllSport');
        };
        k();
    },
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
    z-index: 1;
}
.main_layout{
    overflow-x:hidden ;
}
.fade1-enter-active,
.fade1-leave-active {
    transition: all ease-in-out 0.2s;
}
.fade1-enter,
.fade1-leave {
    opacity: 0.5;
}
</style>
