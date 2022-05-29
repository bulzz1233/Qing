<template>
    <div class="head">
        <div class="none"></div>
        <ul class="list_1">
            <li class="li_1">轻运动</li>
            <li><router-link replace to="/mainpage">首页</router-link></li>
            <li v-for="(t, index) in head_list" :key="index">
                <router-link replace :to="`/mainpage/more?title=${t}`">{{t}}</router-link>
            </li>
        </ul>

        <ul class="top-right">
            <transition name="left">
                <li v-if="!search_show" class="download_layout" @click="show = !show">
                    <a class="download" href="#" @click.prevent="">下载 APP</a>
                    <transition name="fade">
                        <div v-show="show" class="show_layout">
                            <div class="sanjiao"></div>
                            <div class="download_pic">
                                <span>二维码</span>
                            </div>
                        </div>
                    </transition>
                </li>
            </transition>
            <transition name="in">
                <li class="in_layout" v-if="search_show">
                    <el-input
                        placeholder="请输入搜索内容"
                        v-model="search"
                        v-focus
                        class="input_layout"
                        name="key"
                        @input="tips_list"
                        @blur="search_show = !search_show"
                    >
                        <el-button
                            slot="append"
                            icon="el-icon-search"
                            @mousedown.native="searchByKey"
                        ></el-button>
                    </el-input>
                    <div class="search_tips" v-if="tipsList_show">
                        <ul class="tips_layout">
                            <li v-for="t in tipsList" :key="t.id">
                                <div @mousedown="click_tips($event, t)" class="tips_list">
                                    {{ t.title }}
                                </div>
                            </li>
                        </ul>
                    </div>
                </li>
            </transition>

            <transition name="left1">
                <div v-if="search_show" class="none"></div>
            </transition>

            <transition name="left">
                <li v-if="!search_show" class="details_layout">
                    <span @click="search_method">
                        <a class="el-icon-search layout_2" href="#">
                            <div class="layout_2">搜索</div>
                        </a>
                    </span>
                </li>
            </transition>
            <li class="details_layout">
                <!-- 登录后隐藏 -->
                <router-link
                    v-show="afterLogin_show"
                    replace
                    class="el-icon-user layout_2"
                    to="/mainpage/login"
                >
                    <div class="layout_2">个人</div>
                </router-link>
                <!-- 登录后显示· -->

                <div
                    v-show="!afterLogin_show"
                    class="head_portrait_layout"
                    @mouseenter="userMsg_show = true"
                    @mouseleave="userMsg_show = false"
                >
                    <div class="head_portrait" :class="a">
                        <img class="head_portrait_img" src="../assets/img/12.jpg" alt="" />
                    </div>

                    <transition name="fade">
                        <div
                            v-show="userMsg_show"
                            class="user_msg"
                            @mouseenter="a = 'portrait_style'"
                            @mouseleave="a = ''"
                        >
                            <center><div class="username">用户名</div></center>
                            <div class="box">
                                <a class="meum_layout" href="">
                                    <span class="el-icon-star-off icon"></span>
                                    <span>我的收藏</span>
                                </a>
                            </div>
                            <div class="box">
                                <a class="meum_layout" href="">
                                    <span class="el-icon-finished icon"></span>
                                    <span>我的计划</span>
                                </a>
                            </div>
                            <div class="box">
                                <a class="meum_layout" href="">
                                    <span class="el-icon-edit icon"></span>
                                    <span>编辑资料</span>
                                </a>
                            </div>
                            <div class="box">
                                <a class="meum_layout" href="">
                                    <span class="el-icon-switch-button icon"></span>
                                    <span>退出登录</span>
                                </a>
                            </div>
                        </div>
                    </transition>
                </div>
            </li>
        </ul>
        <div class="none"></div>
    </div>
</template>
<script>
export default {
    name: 'Uheader',
    data() {
        return {
            head_list: ['跑步', '游泳', '足球', '骑行', '篮球', '瑜伽', '行走', '课程', '商城'],
            // app二维码展示
            show: false,
            // 登录后显示
            afterLogin_show: false,
            // 搜索栏展示
            search_show: false,
            // 个人信息展示
            userMsg_show: false,
            // 搜索提示展示
            tipsList_show: false,
            search: '',
            a: '',
            tipsList: [],
        };
    },
    methods: {
        // 向action提交请求，action在通过axios向服务器请求获得数据
        search_method() {
            this.search_show = !this.search_show;
            this.$store.dispatch('Ttest');
        },
        // 通过关键字搜索
        searchByKey(e) {
            e.preventDefault();
            console.log(this.search);
            //搜索内容
        },
        // 搜索提示
        tips_list() {
            if (this.search.trim().length != 0) {
                this.tipsList_show = true;
                this.tipsList = this.$store.state.headData.Ttest;
            } else {
                this.tipsList_show = false;
                this.tipsList = [];
            }
        },
        //点击提示
        click_tips(e, key) {
            e.preventDefault();
            this.search = key.title;
            //搜索

            this.tipsList_show = false;
            this.tipsList = [];
        },
    },
    // 自定义指令
    directives: {
        focus: {
            // 指令的定义
            inserted(element, binding) {
                element.querySelector('input').focus();
            },
        },
    },
};
</script>

<style scoped>
.head a {
    color: rgb(197, 208, 211);
    text-decoration: none;
    font-size: 1.125rem;
}
.head {
    display: flex;
    background-color: #232323;
    position: relative;
    width: 100%;
    height: 4rem;
    min-width: 1080px;

    justify-content: center;
}
.download_layout {
    margin-left: 11rem;
}
.input_layout {
    position: relative;
    width: 100%;
    height: 95%;
}
.details_layout {
    max-width: 70px;
}
.in_layout {
    position: absolute;
    width: 75%;
    top: -0.3125rem;
}
.search_tips {
    position: absolute;
    width: 100%;
    background: white;
    z-index: 3;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
    border: 0.1px solid rgb(226, 220, 220);
}
.tips_layout {
    list-style: none;
    padding: 0;
}
.tips_list {
    border-radius: 5px;
    line-height: 1.25;
    font-size: 1rem;
    height: 2.5rem;
    margin: 0.625rem;
    display: flex;
    align-items: center;
    white-space: nowrap;
    overflow: hidden;
}
.list_1 {
    display: flex;
    flex: 7;
    width: 100%;
    position: relative;
    height: 100%;
    justify-content: space-around;
    top: 0.1875rem;
    list-style: none;
}
.list_1 li {
    width: 100%;
    height: 100%;
}
.list_1 li a {
    transition: all 0.5s ease-in-out;
}
.list_1 li a:hover {
    color: rgb(255, 255, 255);
}

.li_1 {
    position: relative;
    font-family: zhongwen1;
    font-size: 1.75rem;
    font-weight: bold;
    left: -0.625rem;
    top: -0.3125rem;
    color: aliceblue;
}
.show_layout {
    position: absolute;

    z-index: 5;
}
.sanjiao {
    position: relative;

    width: 0;
    height: 0;
    left: 1.5625rem;
    top: 0.1875rem;
    border-left: 11px solid transparent;
    border-right: 11px solid transparent;
    border-bottom: 18px solid rgb(82, 123, 159);
}

.download_pic {
    z-index: 5;
    position: absolute;
    width: 9.375rem;
    height: 9.375rem;
    border-radius: 15px;
    background: rgb(82, 123, 159);
}
.none {
    position: relative;
    height: 100%;
    flex: 1;
    max-width: 3%;
}
.top-right {
    display: flex;
    list-style: none;
    position: relative;
    /* font-size: 1.25rem; */
    min-width: 28%;
    margin-left: 1rem;
    flex: 4;
    background-color: #232323;
    justify-content: space-between;
    padding: 0;
}

.download {
    border-radius: 0.625rem;
    white-space: nowrap;
    text-align: center;
    font-size: 1.125rem;
    border: rgb(197, 208, 211) 1px solid;
    display: block;
    margin-top: 0.3125rem;
    transition: all 0.5s ease-in-out;
}
.layout_2 {
    font-size: 0.9375rem;
    margin-top: 0.125rem;
    margin-right: 0.125rem;
    position: relative;
    left: -0.25rem;
    color: rgb(197, 208, 211);
    transition: all 0.5s ease-in-out;
}
.li_style {
    color: rgb(197, 208, 211);
}
.head_portrait_layout {
    position: relative;
    /* display: flex; */
    flex-direction: column;
    align-items: center;
    transition: all ease-in-out 0.2s;
}
.head_portrait {
    position: relative;
    width: 3rem;
    height: 3rem;
    top: -0.6rem;
    z-index: 9;
    background: white;
    border-radius: 50%;
    overflow: hidden;
    border: 2px solid white;
    transition: all ease-in-out 0.2s;
}
.head_portrait_img {
    position: absolute;
    width: 100%;
    height: 100%;
}
.user_msg {
    position: absolute;
    /* left: -4rem; */
    z-index: 8;
    width: 9.375rem;
    height: 13.75rem;
    left: -3.55rem;
    top: 3rem;
    line-height: 1.25;
    border-radius: 5px;
    background: white;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
    border: 0.1px solid rgb(226, 220, 220);
}

.box {
    position: relative;
    height: 2.5rem;
    display: flex;
    /* justify-content: center; */
    align-content: center;
    align-items: center;
}
.user_msg div a {
    position: relative;
    font-size: 0.9375rem;
    color: #232323;
    padding: 1.25rem;
}
.icon {
    font-size: 20px;
}
.meum_layout {
    display: flex;
    width: 100%;
    justify-content: space-around;
}
.box:hover {
    background: #d9d7d7;
}
.username {
    position: relative;
    margin-top: 1.5625rem;
    margin-bottom: 0.625rem;
}
.tips_layout li:hover {
    background: #d9d7d7;
}
.download:hover {
    background-color: white;
    color: #232323;
}
.layout_2:hover {
    color: white;
}
.head_portrait:hover {
    transform: scale(1.5) translateY(20%);
}

.fade-enter-active,
.fade-leave-active {
    transition: all ease-in-out 0.3s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    transform: translateY(-50%);
    opacity: 0;
}
.portrait_style {
    transform: scale(1.5) translateY(20%);
}
.in-enter-active,
.in-leave-active {
    transition: all ease-in-out 0.4s;
}
.in-enter, .in-leave-to /* .fade-leave-active below version 2.1.8 */ {
    width: 0%;
    opacity: 0;
}
.left-enter-active,
.left-leave-active {
    transition: all ease-in-out 0.1s;
}
.left-enter, .left-leave-to /* .fade-leave-active below version 2.1.8 */ {
    transform: translateX(50%);

    opacity: 0;
}
.left1-enter-active {
    transition: all ease-in-out 0.1s;
}
.left1-enter/* .fade-leave-active below version 2.1.8 */ {
    transform: translateX(50%);

    opacity: 0;
}
</style>
