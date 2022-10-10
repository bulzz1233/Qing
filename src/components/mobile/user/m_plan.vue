<template>
    <div class="plan_layout" >
        <div class="list_layout">
            <el-collapse class="date" accordion>
                <el-collapse-item v-for="(t, index) in planDateArry" :key="index" :name="index">
                    <template slot="title">
                        <div @click="show_plan(t)" class="date_style">{{ t }}</div>
                    </template>
                    <ul>
                        <li class="text" v-for="v in thisList" :key="v.planId">
                            {{ v.sportName }}
                        </li>
                    </ul>
                </el-collapse-item>
            </el-collapse>
        </div>
        <circular  class="pie"></circular>
        
    </div>
</template>

<script>
import circular from '@/components/chart'

export default {
    name: 'm_plan',
    data() {
        return {
            thisList: [],
        };
    },
    computed: {
        list_data() {
            return this.$store.state.calendarData.Plan;
        },
        planDateArry() {
            let dateArry = [];
            let newDateArry = [];
            this.$store.state.calendarData.Plan.forEach(element => {
                dateArry.push(element.planDate);
            });
            for (let i = 0; i < dateArry.length; i++) {
                if (newDateArry.indexOf(dateArry[i]) === -1) {
                    newDateArry.push(dateArry[i]);
                }
            }
            return newDateArry.reverse()
        },
    },
    methods: {
        show_plan(t) {
            let newArry = [];
            this.$store.state.calendarData.Plan.forEach(element => {
                if (element.planDate.indexOf(t) != -1) {
                    newArry.push(element);
                }
            });
            this.thisList = newArry;
        },
    
    },
    mounted() {
        
        if (localStorage.getItem('token') != null) {
            let o = JSON.parse(localStorage.getItem('user_data')).uid;
            let planobj = {
                uid: o,
            };
            this.$store.dispatch('calendarData/AllPlan', JSON.stringify(planobj));
        }
    },
    components:{
        circular,

    }
};
</script>
<style scoped>
.plan_layout {
    height: 100%;
    margin-top: 5vh;
    color: #000;
}
.list_layout {
    padding-left:2vh ;
    padding-right:2vh ;
    overflow: scroll;
    height: calc(30vh);
    box-shadow: 0px 2px 10px -1px rgb(173, 173, 173);
}
.date {
    width: 50rem;
    height: 20rem;
}
.date_style {
    font-size: 4vw;
    font-family: zhongwen1;
    width: 100%;
}
.text {
    font-size:4vw;
}
/deep/.el-collapse-item__content{
    padding: 0;
}
.pie{
    margin-top:2vh ;
    width: 100vw;
    height: 40vh;

}
</style>
