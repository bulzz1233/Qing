<template>
    <div class="mainpage">
        <el-backtop ></el-backtop>
        <transition
            name="custom-classes-transition"
            enter-active-class="animate__animated animate__fadeIn"
            leave-active-class="animate__animated animate__fadeOut"
        >
            <router-view></router-view>
        </transition>
        <uheader />
        <recommend v-show="this.$route.path.indexOf('more') ==-1"/>
        <extension v-show="this.$route.path.indexOf('more') ==-1"/>
    </div>
</template>

<script>
import Uheader from './Uheader.vue';
import recommend from './recommend';
import extension from './extension';
export default {
    name: 'mainpage',
    components: {
        Uheader,
        recommend,
        extension,
    },
};
</script>

<style scoped>

.mainpage {
    position: relative;
}

</style>
