/**备忘,登陆前向vuex的查询请求应该带上用户参数 */

<template>
    <div class="Ubody">
        <div class="block">
            <el-carousel height="25.5rem" class="carousel">
                <el-carousel-item v-for="item in 4" :key="item">
                    <h3 class="small">{{ item }}</h3>
                </el-carousel-item>
            </el-carousel>
        </div>
        <div class="none"></div>
        <!-- 日历 -->
        <div class="card">
            <Calendar class="calendar" :markDate="arr" v-on:choseDay="clickDay" />
            <div class="tips btn_tips" v-show="!afterLogin_show">
                <el-button type="primary" class="btn_login" @click="goLogin">点击登录</el-button>
                <div class="text">定制属于自己的健身计划</div>
            </div>
            <!-- 登录后展示 -->
            <div class="todoList" v-show="afterLogin_show">
                <div class="head_title">今日计划</div>
                <div class="finshed_layout">
                    <div class="finshed">
                        已完成&nbsp;&nbsp;{{ doneTotal }}&nbsp;/&nbsp;{{ todoList_data.length }}
                    </div>
                </div>
                <div class="card_layout">
                    <div
                        class="list_card"
                        :class="done_style"
                        v-for="(t, index) in todoList_data"
                        :key="index"
                    >
                        <div class="content" :class="t.done">{{ t.content }}</div>
                        <div class="btn_layout" v-show="!t.done">
                            <div class="icon check" @click="bedone(index)">✔️</div>
                            <div class="icon del" @click="del(index)">❌</div>
                        </div>
                        <transition name="fade">
                            <div class="done text" v-show="t.done">已完成</div>
                        </transition>
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
export default {
    name: 'recommend',
    components: {
        Calendar,
    },
    data() {
        return {
            //登录后展示的信息，应该根据是否有本地存储token来判断
            afterLogin_show: false,
            // 被标记的日期
            //arr: [],
            // 我的计划
            todoList_data: [],
            // 完成样式
            done_style: '',
            //获得日期
            thisDate: '',
        };
    },
    computed: {
        doneTotal() {
            let i = 0;
            this.todoList_data.forEach(todo => {
                if (todo.done) i++;
            });
            return i;
        },
        arr() {
            let arr1 = [];
            this.$store.state.calendarData.Ttest.forEach(list => {
                arr1.push(list.date);
            });
            return arr1;
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
            this.$router.replace({
                name: 'user_plan',
            });
        },
        //修改完成状态
        bedone(index) {
            this.done_style = 'a';
            //修改、提交完成状态
            Vue.set(this.todoList_data[index], 'done', 'true');
            //向后端发送请求完成修改
        },
        //点击日历日期
        clickDay(data) {
            
            let chosedata = [];
            this.$store.state.calendarData.Ttest.forEach(list => {
                if (list.date == data) {
                    chosedata.push(list);
                }
                return chosedata;
            });
            this.todoList_data = chosedata;
            // console.log(data);
        },
        //删除按钮
        del(index) {
            this.todoList_data.splice(index, 1);
            //向后端传值删除
        },
    },
    mounted() {
        //获取当日数据
        let Tdate = new Date();
        this.thisDate = Tdate.getFullYear() + '/' + (Tdate.getMonth() + 1) + '/' + Tdate.getDate();
        // console.log(thisDate);
        //从仓库获取数据
        this.$store.state.calendarData.Ttest.forEach(list => {
            //this.arr.push(list.date);
            if (list.date == this.thisDate) {
                this.todoList_data.push(list);
            }
        });

        // this.todoList_data = ;
        //获取

        //判断是否有用户登录
            if(localStorage.getItem('token')!=null){
            //传回后端判断后端，
            this.afterLogin_show=true
            
        }
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
.fade-enter-active,.fade-leave-active  {
    transition: all ease-in-out 0.2s;
}
.fade-enter,.fade-leave{
    transform: translateY(-50%);
    opacity: 0;
}
</style>
