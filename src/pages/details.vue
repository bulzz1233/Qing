<template>
    <div class="details_layout">
        <div class="background"></div>
        <div class="box">
            <div class="left" :class="left_width">
                <ul v-show="btn_show1" class="ul_layout">
                    <li class="detail">详情</li>
                    <li class="li_layout" @click="show1">
                        <router-link
                            class="link"
                            replace
                            :to="`${thePath}details?detail=${JSON.stringify(params)}`"
                        >
                            介绍
                        </router-link>
                    </li>
                    <!-- <li class="li_layout" @click="show2()">
                        <router-link
                            class="link"
                            replace
                            :to="`/mainpage/details/plan?detail=${JSON.stringify(params)}`"
                        >
                            定制计划
                        </router-link>
                    </li> -->
                    <li class="li_layout" @click="show3()">
                        <router-link
                            class="link"
                            replace
                            :to="`${thePath}details/study?detail=${JSON.stringify(params)}`"
                        >
                            开始学习
                        </router-link>
                    </li>
                    <!-- <li>
                        <el-button
                            class="btn"
                            type="primary"
                            round
                            v-show="btn_show"
                            @click="goplan"
                        >
                            定制计划
                        </el-button>
                    </li> -->
                    <li>
                        <el-button
                            class="btn"
                            type="primary"
                            round
                            v-show="btn_show1"
                            @click="gostudy"
                        >
                            开始学习
                        </el-button>
                    </li>
                </ul>
            </div>
            <div class="right_layout">
                <router-view class="link" v-show="!show"></router-view>

                <div class="introduce" v-show="show">
                    <div class="right_top">
                        <el-carousel height="28rem" class="carousel">
                            <el-carousel-item>
                                <img
                                    class="img"
                                    :src="require('../assets/img/' + params.sportPic)"
                                />
                            </el-carousel-item>
                        </el-carousel>
                    </div>
                    <div class="right_bottom">
                        <div class="title">
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{
                                params.sportIntroduce
                            }}
                        </div>
                    </div>
                </div>
            </div>
            <router-link replace class="el-icon-close icon close" :to="`${thePath}`"></router-link>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            params: JSON.parse(this.$route.query.detail),
            show: true,
            // btn_show: true,
            btn_show1: true,
            left_width: 'a',
        };
    },
    methods: {
        show1() {
            this.show = true;
            // this.btn_show = true;
            this.btn_show1 = true;
        },
        // show2() {
        //     this.show = false;
        //     this.btn_show = false;
        //     this.btn_show1 = true;
        // },
        show3() {
            this.left_width = 'b';

            this.show = false;
            this.btn_show = false;
            this.btn_show1 = false;
        },
        goplan() {
            this.show = false;
            this.btn_show = false;
            this.btn_show1 = true;
            this.$router.replace({
                name: 'plan',
                query: {
                    detail: JSON.stringify(this.params),
                },
            });
        },
        gostudy() {
            this.left_width = 'b';
            this.show = false;
            this.btn_show = false;
            this.btn_show1 = false;
            this.$router.replace({
                path: this.thePath + 'details/study?detail=' + JSON.stringify(this.params),
            });
        },
    },
    computed: {
        thePath() {
            if (this.$route.path.indexOf('searchResult') != -1) {
                return '/mainpage/searchResult/';
            }
            if (this.$route.path.indexOf('Likes') != -1) {
                return '/mainpage/Likes/';
            } else {
                return '/mainpage/';
            }
        },
    },
    mounted() {},
};
</script>

<style scoped>
.details_layout {
    position: fixed;
    display: flex;
    justify-content: center;
    width: 100%;
    height: 100%;
    align-items: center;
    z-index: 10;
}
.background {
    background: #0f0f0f;
    width: 100%;
    height: 100%;
    position: absolute;

    opacity: 0.4;
    color: rgb(255, 255, 255);
}
.a {
    min-width: 30%;
}
.img {
    height: 100%;
    width: 100%;
}
.b {
    min-width: 0;
}
.box {
    position: relative;
    min-width: 66rem;
    min-height: 40rem;
    background: #e9e9e9;
    z-index: 6;
    display: flex;
}
.introduce {
    width: 100%;
    height: 100%;
}
.title {
    font-size: 1.5625rem;
    line-height: 60px;
    margin-top: 5px;
}
.ul_layout {
    list-style: none;
}
.close {
    float: right;
    position: absolute;
    font-size: 1.875rem;
    top: 0.9375rem;
    left: 62.5rem;
    text-decoration: none;
    color: #8e8888;
    z-index: 11;
}
.left {
    position: relative;
    min-height: 100%;
    background: #f5f5f5;
    transition: all ease-in-out 0.5s;
}
.detail {
    font-size: 1.75rem;
    font-weight: bolder;
    margin-top: 3.125rem;
    margin-bottom: 3.125rem;
}
.li_layout {
    font-size: 1.2rem;
    margin-bottom: 1.5625rem;
}
.link {
    color: #0f0f0f;
    text-decoration: none;
}
.right_layout {
    position: relative;
    min-width: 70%;
    min-height: 100%;
}
.right_top {
    position: relative;
    min-height: 70%;
    min-width: 100%;
    background: orange;
}
.btn {
    position: relative;
    /* padding: .625rem; */
    top: 15.25rem;
}

.el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
    background-color: #d3dce6;
}
</style>
