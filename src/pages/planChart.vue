<template>
    <div class="myplan_layout">
        <div class="head_layout">
            <div class="head">
                我的计划
                <div class="decoration"></div>
            </div>
            <div class="none"></div>
        </div>
        <div class="chart_layout">
            <plan-list></plan-list>
            
        <circular  class="pie"></circular>
        </div>
    </div>
</template>

<script>
import circular from '../components/chart'
import planList from '../components/planlist.vue'
export default {
    data(){
        return{

        }
    },
    components:{
        
        circular,
        planList

    }
};
</script>

<style scoped>
.myplan_layout{
    position: absolute;
    top: 4rem;
    

}
.head_layout {
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
    width: 100px;
    height: 5px;
    background: #232323;
    margin-top: 10px;
}
.chart_layout{
    display: flex;
}
.pie{
    position: relative;
    width: 50rem;
    height: 20rem;
    margin: 3.125rem 0 0 4.6875rem;
    

}
</style>
