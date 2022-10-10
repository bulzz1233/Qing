<template>
    <div class="common_layout">
        <div class="title_layout">
            <div class="el-icon-arrow-left icon close" @click="goUser()"></div>
            <div class="title">{{ title }}</div>
        </div>
        <div class="contain">
            <likes v-if="likes_show" />
            <plan v-if="plan_show" />
        </div>
            <router-view name="common"></router-view>
    </div>
</template>

<script>
import likes from '@/components/mobile/user/m_likes.vue';
import plan from '@/components/mobile/user/m_plan.vue';
export default {
    name: 'm_common',
    data() {
        return {
            likes_show: false,
            plan_show: false,
            edit_show: false,
        };
    },
    computed: {
        title() {
            return this.$route.query.name;
        },
    },
    methods: {
        goUser() {
            this.$router.push({
                name: 'm_user',
            });
        },
    },
    components: {
        likes,
        plan,
    },
    mounted() {
        switch (this.$route.query.name) {
            case '我的收藏':
                this.likes_show = true;
                break;

            case '我的计划':
                this.plan_show = true;
                break;
            case '编辑资料':
                this.edit_show = true;
                break;
        }
    },
};
</script>
<style scoped>
.common_layout {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 6vh;
    color: #000;
    z-index: 5;
}
.title {
    width: 32vw;
    font-size: 8vw;
    font-weight: bold;
    font-style: italic;
    border-bottom: 5px solid #232323;
    padding-bottom: 1vh;
    margin-left: 2vh;
}
.title_layout {
    display: flex;
    align-items: center;
    margin-top: 2vh;
    margin-left: 1vh;
}
.close {
    font-size: 12vw;
    font-weight: bolder;
}
.layout1{
    position: fixed;
    z-index: 1;
}
</style>
