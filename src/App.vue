<template>
    <div id="app">
        
        
        <keep-alive>
        <router-view ></router-view>
        </keep-alive>
            
        
    </div>
</template>

<script>
export default {
    name: 'App',

    components: {
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
        font-size: 10px;
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
