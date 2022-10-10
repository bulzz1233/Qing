<template>
    <div class="user_layout">
        <div class="head">
            <div class="img_layout">
            <img class="head_portrait_img" src="@/assets/img/12.png" alt="" />

            </div>
            <div class="username" v-show="!afterLogin_show">{{ user_name }}</div>
            <div class="loginTips" @click="goLogin()" v-show="afterLogin_show">请登录</div>
        </div>
        <ul class="meun">
            <li @click="goView('我的收藏')">
                <div class="left_layout">
                    <div class="el-icon-star-off icon"></div>
                    <div class="text">我的收藏</div>
                </div>
                <div class="el-icon-arrow-right icon right"></div>
            </li>
            <li @click="goView('我的计划')">
                <div class="left_layout">
                    <div class="el-icon-finished icon"></div>
                    <div class="text">我的计划</div>
                </div>
                <div class="el-icon-arrow-right icon right"></div>
            </li>
            <li @click="goView('编辑资料')">
                <div class="left_layout">
                    <div class="el-icon-edit icon"></div>
                    <div class="text">编辑资料</div>
                </div>
                <div class="el-icon-arrow-right icon right"></div>
            </li>
            <li @click="outLogin()">
                <div class="left_layout">

                <div class="el-icon-switch-button icon"></div>
                <div class="text">退出登录</div>
                </div>
                <div class="el-icon-arrow-right icon right"></div>

            </li>
        </ul>
        <router-view name="common"></router-view>
    </div>
</template>

<script>
export default {
    name: 'm_user',
    data() {
        return {
            afterLogin_show: true,
            user_name: '',
        };
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
        goView(title) {
            this.$router.replace({
                name: 'common',
                query: {
                    name: `${title}`,
                },
            });
        },
        outLogin() {
            if(localStorage.getItem('token')){

                this.$confirm('确认要退出登录吗？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                })
                    .then(() => {
                        localStorage.removeItem('user_data');
                        localStorage.removeItem('token');
                        window.location.reload();
                    })
                    .catch(() => {});
            }else{
                alert('请先登录')
            }
        },
    },
    mounted() {
        //判断是否有token
        if (localStorage.getItem('token') != null) {
            //传回后端判断后端，
            this.afterLogin_show = false;
        }
        if (localStorage.getItem('user_data')) {
            let i = JSON.parse(localStorage.getItem('user_data')).userName;
            this.user_name = i;
        }
    },
};
</script>
<style scoped>
.user_layout {
    position: relative;
    height: 100%;
}
.head {
    position: relative;
    width: 100%;
    height: 12vh;
    display: flex;
    align-items: center;
    margin-top: 3vh;
    padding-left: 3vh;
    padding-top: 1vh;
    padding-bottom: 3vh;
    border-bottom: 1px solid #aaa6a6;
}
.img_layout {
    position: relative;
    width: 12vh;
    height: 12vh;
    border-radius: 50%;
}
.head_portrait_img {
    position: absolute;
    width: 100%;
    height: 100%;
}
.right{
    padding-right:2vh ;
}
.left_layout {
    display: flex;
    align-items: center;
}
.loginTips {
    color: #7b7a7a;
    font-size: 5vw;
    margin-left: 10vw;
}
.username {
    color: #232323;
    font-size: 5vw;
    margin-left: 10vw;
}
.meun {
    position: relative;
    list-style: none;
    font-size: 5vw;
    margin: 0;
    padding: 0;
}
.meun > li {
    position: relative;
    height: 10vh;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 3vh;
    padding-left: 3vh;
    transition: all 0.2s;
}
.icon {
    font-size: 8vw;
}
.text {
    margin-left: 5vw;
}
li:hover {
    background: #c5c5c5;
}
</style>
