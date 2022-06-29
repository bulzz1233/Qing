<template>
    <div class="card" >
        <ul class="card_layout">
            <li class="box">
                <router-link
                    replace
                    :to="`/mainpage/more/Moredetails?detail=${JSON.stringify(o)}&title=${title}`"
                    class="img"
                >
                    <img v-lazyload="o.sportPic" src="" width="100%" height="100%" />
                </router-link>
                <div class="detail">
                    <router-link
                        replace
                        :to="`/mainpage/more/Moredetails?detail=${JSON.stringify(o)}&title=${title}`"
                        class="title"
                    >
                        {{ o.sportName }}
                    </router-link>
                    <div class="icon_layout" >
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
                            :to="`/mainpage/more/MoreAddCalendar?detail=${JSON.stringify(o)}&title=${title}`"
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
    name: 'Morecard',
    data() {
        return {
            imgdata: 'a.jpg',
            uid:''
        };
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
    props: ['o','title'],
    mounted() {
         this.$nextTick(()=>{
            if (localStorage.getItem('user_data')) {
            let i;
            i = JSON.parse(localStorage.getItem('user_data')).uid;
            this.uid=i
            let obj = {
                userId: i,
            };
            this.$store.dispatch('ucardData/AllLikes', JSON.stringify(obj));
        }
        })
        let arr=this.$store.state.ucardData.Likes
        for(let i = 0; i<arr.length;i++){
        
                if(this.o.sid==arr[i]){
                this.$set(this.o, 'sportStar',1 );
            };
        }

    },
};
</script>

<style scoped>
.box {
    display: flex;
    height: 12.5rem;
    width: 12.5rem;
    max-height: 200px;
    max-width: 250px;
    position: relative;
    min-height: 150px;
    min-width: 200px;
    flex-direction: column;
    border-radius: 10px;
}
.img {
    width: 100%;
    height: 80%;
    border-radius: 10px;
    overflow: hidden;
}
.detail {
    line-height: 25px;
    width: 100%;
    margin-top: 5px;
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
    text-overflow: ellipsis;
    transition: all 0.2s;
}
.icon {
    font-size: 18px;
    transition: all 0.2s;
}
.card {
    position: relative;
}
.add_plan {
    /* margin-left: 3.125rem; */
    font-size: 20px;
}
.icon_layout {
    position: relative;
    display: flex;
    justify-content: space-between;
    margin-bottom: 5px;
}

.card_layout {
    /* position: absolute; */
    margin: 0;
}
img {
    border-radius: 10px;
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
}
</style>
