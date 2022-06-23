<template>
    <div id="app">
        <!-- class="animate__animated animate__zoomInDown animate__backOutLeft" -->
        <home v-if="this.$route.path == '/'" />
        <transition
            appear
            name="custom-classes-transition"
            enter-active-class="animate__animated animate__fadeIn"
            leave-active-class="animate__animated animate__fadeOut"
        >
            <router-view class="mainpage"></router-view>
        </transition>
    </div>
</template>

<script>
import home from './components/home';
import 'animate.css';
export default {
    name: 'App',

    components: {
        home,
    },


};
</script>

<style>
html,
body {
    height: 100%;
}
body {
    margin: 0;
}
::-webkit-scrollbar {
    width: 0px;
}
@media screen and (min-width: 320px) {
    html {
        font-size: 5px;
    }
}
@media screen and (min-width: 640px) {
    html {
        font-size: 13px;
    }
}
@media screen and (min-width: 1080px) {
    html {
        font-size: 15px;
    }
}
.app {
    background: #0f0f0f;
}

@font-face {
    font-family: 'zhongwen1';
    src: url('./assets/font/ji.ttf');
    font-display: auto;
}
@font-face {
    font-family: 'yinwen';
    src: url('./assets/font/edosz.ttf');
    font-display: auto;
}
</style>
