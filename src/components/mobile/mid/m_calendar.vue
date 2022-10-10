<template>
    <div class="card">
        <Calendar class="calendar" :markDate="mark_arr" v-on:choseDay="clickDay" />
        <div class="tips btn_tips" v-show="!afterLogin_show">
            <el-button type="primary" class="btn_login" @click="goLogin">点击登录</el-button>
            <div class="text text_layout">定制属于自己的健身计划</div>
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
                <div class="todotips" v-show="todotips_show">今日还没有训练计划，快去添加吧</div>
                <div class="todotips" v-show="finsh_show">
                    ✅打卡成功，已完成打卡 {{ thisDay }} 天
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Calendar from 'vue-calendar-component';
import Vue from 'vue';
export default {
    name: 'm_calendar',
    data() {
        return {
            afterLogin_show: false,
            uid: '',
            // 我的计划
            list: [],
            // 被标记的日期
            mark_arr: [],
            // 完成样式
            done_style: '',
            //获得日期
            thisDate: '',
            finsh_show: false,
            thisDay: 0,
            mark_arr: [],
        };
    },
    components: {
        Calendar,
    },
    methods: {
        //转到登录界面
        goLogin() {
            if (this.$route.path.includes('login')) {
                return;
            } else {
                this.$router.push({
                    name: 'm_login',
                });
            }
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
    created() {
        if (localStorage.getItem('user_data')) {
            let i = JSON.parse(localStorage.getItem('user_data')).uid;
            let planobj = {
                uid: i,
            };
            let obj1 = {
                userId: i,
            };
            const msg = async () => {
                await this.$store.dispatch('calendarData/AllPlan', JSON.stringify(planobj));
                await this.$store.dispatch('calendarData/Allfinish', JSON.stringify(obj1));
            };
            msg();
        }
    },
    mounted() {
        //获取当日数据
        let Tdate = new Date();
        this.thisDate = Tdate.getFullYear() + '/' + (Tdate.getMonth() + 1) + '/' + Tdate.getDate();

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
.calendar {
    position: relative;
}
.tips {
    /* background: olivedrab; */
    position: relative;
    border: 3px dashed #dfe0e6;
    height: 40%;
}
.todoList {
    width: 100%;
    position: relative;
}

.card_layout {
    position: relative;
    overflow: scroll;
    box-sizing: border-box;
    transition: all 0.5s;
}
.list_card {
    position: relative;
    background: white;
    height: 8vh;
    border: 1px solid #dfe0e6;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 1vh;
}

.content {
    font-size: 4vw;
    margin-left: 4vw;
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
    margin-right: 5vw;
    font-size: 2vw;
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
    font-size: 3vw;
}
.btn_layout {
    display: flex;
}
.head_title {
    position: relative;
    height: 4.5vh;
    background: #232323;
    font-size: 18px;
    color: #f0f8ff;
    font-weight: bolder;
    display: flex;
    align-items: center;
    justify-content: center;
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
}
.btn_login {
    height: 45px;
}

.card {
    position: relative;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
}
.block {
    position: relative;
    width: 700px;
}
.finshed_layout {
    position: relative;
    display: flex;
    justify-content: center;
    color: #7b7a7a;
    margin: 0.625rem;
}
.finshed {
    font-size: 1vw;
    cursor: default;
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
.text_layout {
    width: 100%;
    display: flex;
    justify-content: center;
    margin: 0;
    font-size: 1.5vh;
}

/* 日历样式 */
/* 整体颜色 */
.wh_container >>> .wh_content_all {
    position: relative;
    background-color: #ffffff !important;
    width: calc(100vw);
    padding-bottom: 1vh;
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
    margin-bottom: 0.2vh;
    margin-top: 0.3vh;
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
    transition: all ease-in-out 1s;
}
.fade-enter,
.fade-leave {
    transform: translateY(-50%);
    opacity: 0;
}
</style>
