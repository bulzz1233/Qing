<template>
    <div class="likes">
        <mcard
            class="mcard"
            v-for="o in LikesData"
            :addPlan_router="addPlan_router"
            :player_router="player_router"
            :type_name="type_name"
            :key="o.sid"
            :o="o"
        />
    </div>
</template>

<script>
import mcard from '@/components/mobile/m_card.vue';

export default {
    name: 'm_likes',
    data() {
        return {
            addPlan_router: 'm_laddPlan',
            player_router: 'm_lplayer',
        };
    },
    computed: {
        type_name() {
            return this.$route.query.name;
        },
        LikesData() {
            let likesArry = this.$store.state.ucardData.Likes;
            let sportArry = this.$store.state.runData.All;
            let likesSport = [];
            for (let i = 0; i < likesArry.length; i++) {
                sportArry.forEach(element => {
                    if (element.sid == likesArry[i]) {
                        likesSport.push(element);
                    }
                });
            }
            return likesSport;
        },
    },
    components: {
        mcard,
    },
    methods: {},
    created() {
    },
};
</script>
<style scoped>
.likes {
    display: flex;
    flex-wrap: wrap;
    overflow: scroll;
    justify-content: space-around;
    align-content: center;
    margin-top: 5vh;
    padding-bottom: 1vh;
}
.mcard {
    margin-top: 2vh;
}
</style>
