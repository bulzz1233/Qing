<template>
    <div class="layout">
        <mcard
            class="card"
            v-for="o in type_data"
            :key="o.sid"
            :o="o"
            :type_name="type_name"
            :addPlan_router='addPlan_router'
            :player_router='player_router'
        />
            <router-view name="m_addPlan"></router-view>
    </div>
</template>

<script>
import mcard from '@/components/mobile/m_card.vue';
export default {
    name: 'card_view',
    data() {
        return {
            
            addPlan_router:'m_addPlan',
            player_router:'m_player'
        };
    },
    computed: {
        type_name(){
            return this.$route.query.name
        },
        type_data() {
            let arr = [];
            switch (this.$route.query.name) {
                case '全部':
                    arr = this.$store.state.runData.All;
                    return arr;

                case '跑步':
                    arr = this.$store.state.runData.Run;
                    return arr;

                case '游泳':
                    arr = this.$store.state.runData.Swim;
                    return arr;
                case '足球':
                    arr = this.$store.state.runData.Football;
                    return arr;
                case '骑行':
                    arr = this.$store.state.runData.Ride;
                    return arr;
                case '篮球':
                    arr = this.$store.state.runData.Basketball;
                    return arr;
                case '瑜伽':
                    arr = this.$store.state.runData.Yoga;
                    return arr;
                case '行走':
                    arr = this.$store.state.runData.Walk;
                    return arr;
            }
        },
    },
    // watch: {
    //     type_data: {
    //         deep: true,
    //         handler(newArr, oldArr) {
    //             this.type_data = newArr;
    //         },
    //     },
    // },
    methods: {},
    created() {},
    components: {
        mcard,
    },
};
</script>
<style scoped>
.layout {
    position: relative;
    height: 54.5vh;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    overflow: scroll;
    justify-content: space-around;
    align-items: center;
}
.card {
    margin-top: 1vh;
}

</style>
