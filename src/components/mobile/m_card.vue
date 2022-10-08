<template>
    <div class="card">
        <ul class="card_layout">
            <li class="box">
                <router-link
                    replace
                    :to="`details?detail=${JSON.stringify(o)}`"
                    class="img"
                >
                    <img v-lazyload="o.sportPic" src="" width="100%" height="100%" />
                </router-link>
                <div class="detail">
                    <router-link
                        replace
                        :to="`details?detail=${JSON.stringify(o)}`"
                        class="title"
                    >
                        {{ o.sportName }}
                    </router-link>
                    <div class="icon_layout">
                        <a
                            href="#"
                            @click.prevent="UserStar(o)"
                            class="el-icon-star-off icon"
                            v-show="!o.sportStar"
                        >
                            <span>{{ o.sportLikes }}</span>
                        </a>
                        <a
                            href="#"
                            @click.prevent="UserStar(o)"
                            class="el-icon-star-on icon"
                            v-show="o.sportStar"
                        >
                            <span>{{ o.sportLikes }}</span>
                        </a>

                        <router-link
                            replace
                            :to="`detail=${JSON.stringify(o)}`"
                            class="el-icon-circle-plus-outline icon add_plan"
                        ></router-link>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
import { Loading } from 'element-ui';

export default {
    name:'mcard',
    data() {
        return {};
    },
    methods: {
         //收藏功能
        UserStar(o, index) {
            let obj = {
                userId : this.uid,
                sid:o.sid
            }
            this.$store.dispatch('ucardData/UserLikes', JSON.stringify(obj));

            this.$set(o, 'sportStar', !o.sportStar);
            if (o.sportStar) {
                this.$set(o, 'sportLikes', parseInt(o.sportLikes) + 1);
            } else {
                this.$set(o, 'sportLikes', parseInt(o.sportLikes) - 1);
            }
        },
        card_loading(time) {
            let options = {
                fullscreen: true,
                text: '请稍后',
                background: 'white',
            };
            let loadingInstance = Loading.service(options);
            //         this.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
            //         loadingInstance.close();
            // });
            setTimeout(() => {
                loadingInstance.close();
                // });
            }, time);
        },
    },
    mounted() {
        this.$nextTick( async ()=>{
            if (localStorage.getItem('user_data')) {
            let i;
            i = JSON.parse(localStorage.getItem('user_data')).uid;
            let obj = {
                userId: i,
            };
            await this.$store.dispatch('ucardData/AllLikes', JSON.stringify(obj));
        }
        })
        let arr=this.$store.state.ucardData.Likes
        for(let i = 0; i<arr.length;i++){
        
                if(this.o.sid==arr[i]){
                this.$set(this.o, 'sportStar',1 );
            };
        }
    },
    props: ['o','uid','title'],
};
</script>
<style scoped>
.box {
    display: flex;
    height: 16vh;
    width: 20vh;
    position: relative;
    flex-direction: column;
    border-radius: 5px;
}
.img {
    width: 100%;
    height: 100%;
    overflow: hidden;
}
.detail {
    line-height: 25px;
    width: 100%;
    font-size: 1.5vh;
    /* margin-top: 5px; */
}
.detail a {
    color: rgb(94, 90, 90);
    text-decoration: none;
}
.title {
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    display: block;
    margin-top: 0.3vh;
    margin-bottom: 0.3vh;
    text-overflow: ellipsis;
    transition: all 0.2s;
    padding: 0px 1vh 0px 1vh;

}
.icon {
    font-size: 1.8vh;
    transition: all 0.2s;
}
.card {
    width: 20vh;
    position: relative;
    box-sizing: border-box;
    border-radius: 5px;
    overflow:hidden ;
    box-shadow: 0px 0px 10px -2px rgba(0,0,0,0.2) ;
}
.add_plan {
    /* margin-left: 3.125rem; */
    font-size: 20px;
}
.icon_layout {
    position: relative;
    display: flex;
    justify-content: space-between;
    padding: 0px 1vh 0px 1vh;
    
}

.card_layout {
    /* position: absolute; */
    padding:0;
    margin-top:0;
}
img {
    z-index: -1;
    transition: all 0.5s;
}
.detail a:hover {
    color: rgb(0, 0, 0);
}
.icon:hover {
    transform: scale(1.1, 1.1);
}
img:hover {
    transform: scale(1.5, 1.5);
}</style>
