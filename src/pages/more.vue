<template>
    <div>
        <router-view></router-view>
        <ul class="ul_layout">
            <li class="head_layout">
                <div class="head">
                    {{ $route.query.title }}
                    <div class="decoration"></div>
                </div>
                <div class="none"></div>
            </li>
            <li class="ucard_layout">
                <morecard class="ucard" v-for="(o, index) in more_data" :key="index" :o="o" :title="$route.query.title" />
                <div class="none"></div>
            </li>
        </ul>
    </div>
</template>

<script>
import Morecard from '../components/Morecard .vue';

export default {
    data() {
        return {};
    },
    computed: {
        more_data() {
            if (this.$route.query.title == '青年') {
                let arr = [];
                arr = this.$store.state.runData.Young;
                return arr;
            }
            if (this.$route.query.title == '中年') {
                let arr = [];
                arr = this.$store.state.runData.Mid;
                return arr;
            }
            if (this.$route.query.title == '老年') {
                let arr = [];
                arr = this.$store.state.runData.Old;
                return arr;
            }
            if (this.$route.query.title == '跑步') {
                                let arr = [];
                arr = this.$store.state.runData.Run;
                return arr;
            }
            if (this.$route.query.title == '游泳') {
                                let arr = [];
                arr = this.$store.state.runData.Swim;
                return arr;
            }
            if (this.$route.query.title == '足球') {
                                let arr = [];
                arr = this.$store.state.runData.Football;
                return arr;
            }
            if (this.$route.query.title == '骑行') {
                                let arr = [];
                arr = this.$store.state.runData.Ride;
                return arr;
            }
            if (this.$route.query.title == '篮球') {
                                let arr = [];
                arr = this.$store.state.runData.Baseketball;
                return arr;
            }
            if (this.$route.query.title == '瑜伽') {
                                let arr = [];
                arr = this.$store.state.runData.Yoga;
                return arr;
            }
            if (this.$route.query.title == '行走') {
                                let arr = [];
                arr = this.$store.state.runData.Walk;
                return arr;
            }
        },
    },
    components: {
        
        Morecard,
    },
    beforeCreate(){
    }
};
</script>

<style scoped>
.ul_layout {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 21.25rem;
    width: 100%;
    margin-bottom: 0;
    margin-top: 0;
    list-style: none;
    padding: 0;
    position: absolute;
    top: 4rem;
}
.ucard_layout{
    display: flex;
    margin-top: 1.25rem;
    margin-left: .9375rem;
    flex-wrap: wrap;
    
}
.head_layout {
    position: relative;
    background: white;
    display: flex;
    justify-content: space-between;
    margin: 3.125rem 0 0 4.6875rem;
}
.head {
    font-family: zhongwen1;
    font-size: 30px;
    font-weight: bolder;
    flex: 3;
}
.decoration {
    width: 50px;
    height: 5px;
    background: #232323;
    margin-top: 10px;
}
</style>
