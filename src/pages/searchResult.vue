<template>
      <div>
          <router-view></router-view>
        <ul class="ul_layout">
            <li class="head_layout">
                <div class="head">
                    搜索结果
                    <div class="decoration"></div>
                </div>
                <div class="none"></div>
            </li>
            <li class="ucard_layout">
                <ucard class="ucard" v-for="(o, index) in searchData" :key="index" :o="o" />
                <div class="none"></div>
            </li>
        </ul>
    </div>
</template>

<script>
import Ucard from '../components/Ucard.vue';

export default {
        computed:{
            searchData(){
                return this.$store.state.headData.Tips_list
            }
        },
        components: {
        Ucard,
    },
    
}
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
.ucard{
    margin-left: .9375rem;

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