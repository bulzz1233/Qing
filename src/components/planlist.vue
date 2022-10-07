<template>
    <div class="list_layout">
        <el-collapse class="date"   accordion>
            <el-collapse-item   v-for="(t, index) in planDateArry" :key="index" :name="index" >
                <template slot="title">
                    <div @click="show_plan(t)" class="date_style">{{ t }}</div>
                </template>
                <ul>
                    <li class="text" v-for="(v,index) in thisList" :key="index">{{v.sportName}}</li>
                </ul>
            </el-collapse-item>
        </el-collapse>
    </div>
</template>

<script>
export default {
    name: 'planList',
    data() {
        return {
            planDateArry: '',
            thisList: [],
        };
    },
    computed: {
        list_data() {
            return this.$store.state.calendarData.Plan;
        },
    },
    methods: {
        show_plan(t) {
                let newArry = []
                this.$store.state.calendarData.Plan.forEach(element => {
                    if (element.planDate.indexOf(t) != -1) {
                        newArry.push(element)
                    }
                });
                this.thisList = newArry
            
        },
    },
    beforeCreate() {
        const i = async ()=>{
            if (this.$store.state.calendarData.Plan == null) {
            let i = JSON.parse(localStorage.getItem('user_data')).uid;
            let planobj = {
                uid: i,
            };
            await this.$store.dispatch('calendarData/AllPlan', JSON.stringify(planobj));
        }
        }
        
    },
    mounted() {
        this.$nextTick(() => {
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
            this.planDateArry = newDateArry;
            // let list = [];
            // for (let i = 0; i < newDateArry.length; i++) {
            //     this.$store.state.calendarData.Plan.forEach(element => {
            //         if (element.planDate.indexOf(newDateArry[i]) != -1) {
            //             list;
            //         }
            //     });
            // }
        });
    },
};
</script>

<style scoped>
.list_layout {
    margin: 3.125rem 0 0 4.6875rem;
}
.date {
    width: 50rem;
    height: 20rem;
}
.date_style {
    font-size: 1.2rem;
    font-family: zhongwen1;
    width: 100%;
}
.text{
    font-size: 1rem;
}
</style>
