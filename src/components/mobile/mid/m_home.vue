<template>
    <div class="home_layout">
        <div class="carousel_layout">
            <el-carousel height="25.5vh" class="carousel">
                <el-carousel-item v-for="item in ImgUrl" :key="item">
                    <img class="img1" :src="require('@/assets/' + item)" />
                </el-carousel-item>
            </el-carousel>
        </div>
        <div class="list_layout">
            <ul class="nav_list">
                <li class="nav_li" v-for="item in head_list" :key="item" @click="goView(item)">
                    {{ item }}
                </li>
                <div class="line" id="line"></div>
            </ul>
        </div>
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    name: 'm_home',
    data() {
        return {
            ImgUrl: [`img/a.jpg`, `img/b.jpg`],
            head_list: ['全部', '篮球', '跑步', '瑜伽', '游泳', '足球', '骑行', '行走', '更多'],
        };
    },
    methods: {
        goView(name) {
            this.type_style(name)
            if (this.$route.query.name == `${name}`) {
                return;
            } else {
                this.$router.replace({
                    name: 'view',
                    query: {
                        name: `${name}`,
                    },
                });
            }
        },
        type_style(name) {
            let line = document.getElementById('line');
            console.log(name);
            switch (name) {
                case '全部':
                    line.style.left = '3.5vh';

                    break;

                case '篮球':
                    line.style.left = '15.5vh';

                    break;
                case '跑步':
                    line.style.left = '27.5vh';

                    break;
                case '瑜伽':
                    line.style.left = '39.5vh';

                    break;
                case '游泳':
                    line.style.left = '51.5vh';

                    break;
                case '足球':
                    line.style.left = '63.5vh';

                    break;
                case '骑行':
                    line.style.left = '75.5vh';

                    break;
                case '行走':
                    line.style.left = '87.5vh';

                    break;
                case '更多':
                    line.style.left = '99.5vh';

                    break;
            }
        },
    },
    mounted() {
        let i = this.$route.query.name
        this.type_style(i)
    },
};
</script>
<style scoped>
.home_layout {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    /* overflow-y:scroll ; */
}
.carousel_layout {
    position: relative;
    height: 100%;
    width: 100%;
}

.img1 {
    width: 100%;
    aspect-ratio: 16/9;
}
.nav_list {
    width: 100%;
    height: 7vh;
    position: relative;
    list-style: none;
    display: flex;
    font-size: 2vh;
    overflow: scroll;
    scroll-behavior: contain;
    margin: 0;
    flex-flow: row;

    align-items: center;
    padding: 0;
}
.nav_li {
    flex: 2;
    height: 100%;
    font-size: 2vh;
    display: flex;
    justify-content: center;
    align-items: center;
    white-space: nowrap;
    margin-right: 4vh;
    margin-left: 4vh;
}
.list_layout {
    width: 100%;
    position: sticky;
    top: 6vh;
}
.line {
    position: absolute;
    height: 0.4vh;
    width: 5vh;
    bottom: 0;
    left: 3.5vh;
    background: #232323;
    transition: all 0.2s;
}
</style>
