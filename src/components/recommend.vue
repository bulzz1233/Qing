<template>
    <div class="Ubody">
        <div class="block">
            <el-carousel height="25.5rem" class="carousel">
                <el-carousel-item v-for="item in ImgUrl" :key="item">
                    <img class="img1" :src="require('../assets/' + item)" />
                </el-carousel-item>
            </el-carousel>
        </div>
        <div class="none"></div>
        <!-- 日历 -->
        <div class="card">
            <Calendar class="calendar" :markDate="mark_arr" v-on:choseDay="clickDay" />
            <div class="tips btn_tips" v-show="!afterLogin_show">
                <el-button type="primary" class="btn_login" @click="goLogin">点击登录</el-button>
                <div class="text">定制属于自己的健身计划</div>
            </div>
            <!-- 登录后展示 -->
            <div class="todoList" v-show="afterLogin_show">
                <div class="head_title">今日计划</div>
                <div class="finshed_layout">
                    <div class="finshed">
                        已完成&nbsp;&nbsp;{{ doneTotal }}&nbsp;/&nbsp;{{ list.length }}
                    </div>
                </div>
                <div class="card_layout">
                    <div
                        class="list_card"
                        :class="done_style"
                        v-for="(t, index) in list"
                        :key="t.planId"
                    >
                        <div
                            class="content"
                            :class="t.planDone ? 'true' : 'false'"
                            @click="toStudy(t.planContent)"
                        >
                            {{ t.planContent }}
                        </div>
                        <div class="btn_layout" v-show="!t.planDone">
                            <div class="icon check" @click="bedone(t, index)">✔️</div>
                            <div class="icon del" @click="del(t.planId, index)">❌</div>
                        </div>
                        <transition name="fade">
                            <div class="done text" v-show="t.planDone">已完成</div>
                        </transition>
                    </div>
                    <div class="todotips" v-show="todotips_show">
                        今日还没有训练计划过，快去添加吧
                    </div>
                    <div class="todotips" v-show="finsh_show">
                        ✅打卡成功，已完成打卡 {{ thisDay }} 天
                    </div>
                    <div class="null"></div>
                </div>
                <div class="coustomized">
                    <el-button type="primary" @click="goplan">定制个性计划</el-button>
                </div>
            </div>
        </div>
        <div class="none"></div>
    </div>
</template>

<script>
import Calendar from 'vue-calendar-component';
import Vue from 'vue';
import { MessageBox } from 'element-ui';
export default {
    name: 'recommend',
    components: {
        Calendar,
    },
    data() {
        return {
            //登录后展示的信息，应该根据是否有本地存储token来判断
            afterLogin_show: false,
            ImgUrl: [`img/a.jpg`, `img/b.jpg`],
            uid: '',
            // 被标记的日期
            //arr: [],
            // 我的计划
            list: [],
            mark_arr: [],
            // 完成样式
            done_style: '',
            //获得日期
            thisDate: '',
            finsh_show: false,
            thisDay: 0,
        };
    },
    computed: {
        doneTotal() {
            let i = 0;
            if (this.todoList_data) {
                this.todoList_data.forEach(todo => {
                    if (todo.planDone) i++;
                });
            }
            return i;
        },
        arr() {
            var arr1 = [];

            this.$store.state.calendarData.Plan.forEach(item => {
                arr1.push(item.planDate);
            });

            return arr1;
        },
        todoList_data() {
            let arr = [];
            if (this.$store.state.calendarData.Plan) {
                this.$store.state.calendarData.Plan.forEach(list => {
                    //this.arr.push(list.date);
                    if (list.planDate == this.thisDate) {
                        arr.push(list);
                    }
                });
            }
            return arr;
        },
        todotips_show() {
            if (this.list.length == 0) {
                return true;
            } else return false;
        },
        finish_day() {
            return this.$store.state.calendarData.FinishDay;
        },
    },
    watch: {
        finish_day: {
            deep: true,
            handler(newArry, oldArry) {
                this.thisDay = newArry;
            },
        },
        arr: {
            deep: true,
            handler(newArry, oldArry) {
                this.mark_arr = newArry;
            },
        },
        todoList_data: {
            deep: true,
            handler(newArry, oldArry) {
                this.list = newArry;
            },
        },
        list: {
            deep: true,
            handler(newArry, oldArry) {
                if (newArry.length == this.doneTotal && newArry != 0) {
                    this.finsh_show = true;
                } else {
                    this.finsh_show = false;
                }
            },
        },
    },
    methods: {
        //转到登录界面
        goLogin() {
            this.$router.replace({
                name: 'login',
            });
        },
        //转到定制计划界面
        goplan() {
            this.$nextTick(() => {
                document
                    .getElementsByClassName('extension_layout')[0]
                    .scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
            });
        },
        //修改完成状态
        bedone(t, index) {
            this.done_style = 'a';
            //修改、提交完成状态
            //向后端发送请求完成修改

            let obj = {
                pid: t.planId,
                userId: t.usrId,
                planDate: t.planDate,
                planInterval: t.planInterval,
                planContent: t.planContent,
                planReminder: t.planReminder,
                planDone: false,
            };
            this.$store.dispatch('calendarData/UpdatePlan', JSON.stringify(obj));
            Vue.set(this.list[index], 'planDone', 'true');

            if (this.doneTotal == this.list.length) {
                let obj1 = {
                    userId: t.userId,
                    finishDate: t.planDate,
                };
                console.log(obj1);
                this.$store.dispatch('calendarData/Addfinish', JSON.stringify(obj1));
                this.thisDay = this.thisDay + 1;
                MessageBox.alert('恭喜完成今日打卡');
                this.finsh_show = true;
            }
        },
        //点击日历日期
        clickDay(data) {
            this.thisDate = data;
            this.list = this.todoList_data;
            // console.log(data);
        },
        //删除按钮
        del(id, index) {
            // this.list.splice(index, 1);
            //向后端传值删除
            this.$confirm('确认要删除吗？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'error',
            })
                .then(() => {
                    let obj = {
                        pid: id,
                    };
                    this.$store.dispatch('calendarData/DelPlan', JSON.stringify(obj));
                    this.list.splice(index, 1);
                })
                .catch(() => {});
        },
        //跳转详情
        toStudy(name) {
            let obj;
            this.$store.state.runData.All.forEach(element => {
                if (element.sportName == name) {
                    obj = element;
                }
            });

            this.$router.replace({
                path: '/mainpage/details?detail=' + JSON.stringify(obj),
            });
        },
    },
    created() {
        if (localStorage.getItem('user_data')) {
            let i = JSON.parse(localStorage.getItem('user_data')).uid;
            let planobj = {
                uid: i,
            };
            let obj1 = {
                userId: i,
            };
            const msg = async ()=> {
                await this.$store.dispatch('calendarData/AllPlan', JSON.stringify(planobj));
                await this.$store.dispatch('calendarData/Allfinish', JSON.stringify(obj1));
            }
                msg()
        }
    },
    mounted() {
        //获取当日数据
        let Tdate = new Date();
        this.thisDate = Tdate.getFullYear() + '/' + (Tdate.getMonth() + 1) + '/' + Tdate.getDate();
        setTimeout(() => {
            this.list.forEach(element => {
                if (element.planReminder) {
                    MessageBox.alert(element.sportName, '今日计划');
                }
            });
        }, 200);
        if (localStorage.getItem('user_data')) {
            this.uid = JSON.parse(localStorage.getItem('user_data')).uid;
        }
        //判断是否有用户登录
        if (localStorage.getItem('token') != null) {
            this.afterLogin_show = true;
        }
        this.thisDay = this.$store.state.calendarData.FinishDay;
    },
};
</script>

<style scoped>
.Ubody {
    position: relative;
    display: flex;
    justify-content: space-between;
    margin-top: 4.6875rem;
    margin-left: 4.6875rem;
    /* margin-right: 2.5rem; */
    height: 25.5rem;
    overflow: hidden;
}
.calendar {
    position: relative;
    flex: 5;
}
.tips {
    flex: 3;
    margin-left: 0.625rem;
    /* background: olivedrab; */
    border: 3px dashed #dfe0e6;
    z-index: -1;
}
.todoList {
    flex: 3;
    height: 100%;
    position: relative;
    margin-left: 0.625rem;
    /* background: olivedrab; */
    border: 1px solid #dfe0e6;
    z-index: 1;
    border-radius: 5px;
}
.img1 {
    width: 120%;
    height: 100%;
}
.card_layout {
    position: relative;
    overflow: scroll;
    height: 80%;
}
.list_card {
    position: relative;
    background: white;
    height: 3.75rem;
    border-radius: 5px;
    border: 1px solid #dfe0e6;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 0.4688rem;
}
.null {
    position: relative;
    height: 3.75rem;
    margin-top: 0.4688rem;
}
.content {
    font-size: 16px;
    margin-left: 15px;
    line-height: 1.25;
    overflow: hidden;
    cursor: default;
    cursor: pointer;

    text-overflow: ellipsis;
}
.icon {
    /* background: #99a9bf; */
    position: relative;
    margin-right: 20px;
    font-size: 1.25rem;
    cursor: pointer;
    transition: all ease-in-out 0.5s;
}
.text {
    color: #7b7a7a;
    /* background: #99a9bf; */
    position: relative;
    margin-right: 20px;
    font-size: 1rem;
    cursor: default;
    transition: all ease-in-out 0.5s;
}
.true {
    color: #7b7a7a;
    cursor: default;
    text-decoration: line-through;
}
.todotips {
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 1rem;
    color: #7b7a7a;
    font-size: 12px;
}
.btn_layout {
    display: flex;
}
.head_title {
    position: relative;
    height: 2.8125rem;
    background: #1a1a1a;
    font-size: 18px;
    color: #f0f8ff;
    font-weight: bolder;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px 5px 0 0;
    cursor: default;
}
.tips .text {
    margin-top: 0.9375rem;
    color: #7b7a7a;
}
.btn_tips {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    z-index: 1;
}
.btn_login {
    height: 45px;
}
.none {
    height: 100%;
    flex: 1;
    max-width: 3%;
}
.card {
    position: relative;
    flex: 6;
    display: flex;
    width: 100%;
    margin-left: 1.25rem;
    justify-content: space-between;
}
.block {
    position: relative;
    width: 700px;

    flex: 4;
}
.finshed_layout {
    position: relative;
    display: flex;
    justify-content: center;
    color: #7b7a7a;
    margin: 0.625rem;
}
.finshed {
    font-size: 14px;
    cursor: default;
}
.carousel {
    border-radius: 10px;
}
.del:hover {
    transform: rotate(360deg);
}
.list_card:hover {
    background: #e4e4e4;
    /* cursor: pointer; */
}
.check:hover {
    transform: scale(1.5, 1.5);
}

.coustomized {
    z-index: 10;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 21.3125rem;
    /* margin-top: 3.125rem; */
    width: 100%;
    height: 50px;
    background: white;
}

.el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
    background-color: #d3dce6;
}
/* 日历样式 */
/* 整体颜色 */
.wh_container >>> .wh_content_all {
    background-color: #ffffff !important;
    border: 1px solid #dfe0e6;
    width: 100%;
    height: 25.3rem;
    border-radius: 6px;
    padding-bottom: 0;
}
.wh_container {
    margin: 0px !important;
}

.wh_container >>> .wh_item_date {
    color: #232323;
}

/* 顶部表头 */
.wh_container >>> .wh_top_changge {
    background: #232323;
    color: #d3dce6;
}
.wh_container >>> .wh_item_date:hover {
    color: #ffffff;
    background: #1a1a1a;
    border-radius: 50%;
}
/* 隐藏时间的颜色 */
.wh_container >>> .wh_other_dayhide {
    color: #cccccc;
}

.wh_container >>> .wh_content_item {
    margin-bottom: 0.2188rem;
    margin-top: 0.25rem;
}

.wh_container >>> .wh_content {
    color: black;
}
/* 周几颜色 */
.wh_container >>> .wh_top_tag {
    color: black;
}
/* 上面大日期 */
.wh_container >>> .wh_content_li {
    color: #f0f8ff;
    font-weight: bold;
}
/* 左右箭头 */
.wh_container >>> .wh_jiantou1 {
    border-top: 2px solid #f0f8ff;
    border-left: 2px solid #f0f8ff;
}
.wh_container >>> .wh_jiantou2 {
    border-top: 2px solid #f0f8ff;
    border-right: 2px solid #f0f8ff;
}
/* 标记后 */
.wh_container >>> .wh_content_item > .wh_isMark {
    border: 1px solid #7b7a7a;
    background: white;
    color: black;
    /*border-radius: 0px;*/
}
/* 调节今天日期的颜色 */
.wh_container >>> .wh_content_item .wh_isToday {
    background-color: #232323;
    /*border-radius: 0px;*/
    color: #ffffff;
}
/* 调节按下按钮后日期颜色 */
.wh_container >>> .wh_content_item .wh_chose_day {
    background-color: #3b3b3b;
    /*border-radius: 0px;*/
    color: #ffffff;
}
.fade-enter-active,
.fade-leave-active {
    transition: all ease-in-out 0.2s;
}
.fade-enter,
.fade-leave {
    transform: translateY(-50%);
    opacity: 0;
}
</style>
