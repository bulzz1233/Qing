<template>
    <div class="extension_layout">
        <ul class="ul_layout">
            <li class="head_layout">
                <div class="head">
                    {{title[0]}}
                    <div class="decoration"></div>
                </div>
                <el-button type="primary" class="more"  @click="gomore(0)" >查看更多 ></el-button>
                <div class="none"></div>
            </li>
            <!-- 卡片遍历 -->
            <li class="ucard_layout">
                <ucard class="ucard" v-for="(o, index) in extension_data" :key="index" :o="o" />
                <div class="none"></div>
            </li>
        </ul>
        <ul class="ul_layout">
            <li class="head_layout">
                <div class="head">
                    {{title[1]}}
                    <div class="decoration"></div>
                </div>
                <el-button type="primary" class="more"  @click="gomore(1)" >查看更多 ></el-button>
                <div class="none"></div>
            </li>
            <li class="ucard_layout">
                <ucard class="ucard" v-for="(o, index) in extension_data" :key="index" :o="o" />
                <div class="none"></div>
            </li>
        </ul>
        <ul class="ul_layout">
            <li class="head_layout">
                <div class="head">
                    {{title[2]}}
                    <div class="decoration"></div>
                </div>
                <el-button type="primary" class="more"  @click="gomore(2)"  >查看更多 ></el-button>
                <div class="none"></div>
            </li>
            <li class="ucard_layout">
                <ucard class="ucard" v-for="(o, index) in extension_data" :key="index" :o="o" />
                <div class="none"></div>
            </li>
        </ul>
        
    </div>
</template>

<script>
import Ucard from './Ucard.vue';

export default {
    name: 'extension',
    components: { Ucard },
    data() {
        return {
            extension_data: [],
            title:['青年','中年','老年']
        };
    },
    methods:{
        gomore(data_index){
            this.$router.replace({
                name:'more',
                query:{
                    title:this.title[data_index]
                }
            })
        }
    },
    beforeCreate(){
        this.$store.dispatch("runData/All")

    },
    mounted() {
        this.extension_data = this.$store.state.runData.Ttest;
    },
};
</script>

<style scoped>
.extension_layout {
    position: relative;
}
.ul_layout {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 21.25rem;
    margin-bottom: 0;
    margin-top: 0;
}
ul {
    list-style: none;
    padding: 0;
}
.ucard_layout {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    flex-wrap: wrap;
    overflow: hidden;
    margin: 1.25rem;
}
.head_layout {
    background: white;
    display: flex;
    justify-content: space-between;
    margin: 3.125rem 0 0 4.6875rem;
}
.none {
    height: 100%;
    flex: 1;
    max-width: 3%;
}
.ucard {
    flex: 9;
}
.head {
    font-family: zhongwen1;
    font-size: 1.875rem;
    font-weight: bolder;
    flex: 3;
}
.more {
    margin-bottom: 8px;
}
.decoration {
    width: 50px;
    height: 5px;
    background: #232323;
    margin-top: 10px;
}
</style>
