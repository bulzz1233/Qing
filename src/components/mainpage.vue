<template>
    <div class="mainpage">
        <el-backtop class="toTop"></el-backtop>

            <router-view></router-view>
        <uheader />
        <recommend v-show="mainShow" />
        <extension v-show="mainShow" />
    </div>
</template>

<script>
import Uheader from './Uheader.vue';
import { Loading } from 'element-ui';
import recommend from './recommend';
import extension from './extension';
export default {
    name: 'mainpage',
    data() {
        return {
            uid: '',
        };
    },
    components: {
        Uheader,
        recommend,
        extension,
    },
    computed: {
        mainShow() {
            if (
                this.$route.path.indexOf('more') == -1 &&
                this.$route.path.indexOf('planChart') == -1 &&
                this.$route.path.indexOf('searchResult') == -1 &&
                this.$route.path.indexOf('edit') == -1 &&
                this.$route.path.indexOf('Likes') == -1
            ) {
                return true;
            } else {
                return false;
            }
        },
    },
    created() {
        if (localStorage.getItem('user_data')) {
            let i;
            i = JSON.parse(localStorage.getItem('user_data')).uid;
            let obj = {
                userId: i,
            };
            const msg =async ()=>{
            await this.$store.dispatch('ucardData/AllLikes', JSON.stringify(obj));
                
            }
            msg()
        }
    },
    mounted() {
        
        const loading = () => {
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
            }, 2000);
        };
        this.$nextTick(()=>{
            loading()
        })
    },
};
</script>

<style scoped>
.mainpage {
    position: relative;
}
.toTop {
    box-shadow: 4px 7px 5px rgb(111, 111, 111);
}
</style>
