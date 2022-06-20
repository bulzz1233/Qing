<template>
    <div class="box_layout">
        <div class="box">
            <router-link
                replace
                
                class="el-icon-close icon close"
                to="/mainpage"
            ></router-link>
            <div class="left_layout">
                <div class="left">
                    <div class="flex">
                        <div class="img_layout">
                            <img src="../assets/img/a.jpg" width="130%" height="100%" />
                        </div>
                    </div>
                    <div class="plan_title">定制计划</div>
                    <div class="text_layout">
                        <div class="sport_describe">{{ params.describe }}</div>
                    </div>
                </div>
            </div>
            <div class="right_layout">
                <planform :title="params.title"/>
            </div>
        </div>
    </div>
</template>

<script>
import planform from './plan_form.vue'
export default {
    components: { planform },
    data() {
        return {
            params: JSON.parse(this.$route.query.detail),
        };
    },
};
</script>

<style scoped>
.box {
    position: relative;
    min-width: 57rem;
    min-height: 35rem;
    background: rgb(239, 239, 243);
    display: flex;
}
.box_layout {
    width: 100%;
    height: 100%;
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 6;
}
.left_layout {
    position: relative;
    min-height: 100%;
    min-width: 30%;
    max-width: 40%;
    background: rgb(218, 217, 217);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.right_layout{
    position: relative;
    
}
.plan_title {
    display: flex;
    font-size: 2.1875rem;
    font-weight: bolder;
    align-items: center;
    flex: 2;
}
.text_layout {
    width: 100%;
    /* height: 100%; */
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    flex: 3;
}

.sport_describe {
    width: 70%;
    text-indent: 2em;
    flex: 2;
}
.left {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
}
.flex {
    flex: 4;
    display: flex;
    align-items: center;
    justify-content: center;
}
.close {
    float: right;
    position: absolute;
    font-size: 1.875rem;
    top: 0.9375rem;
    left:55rem;
    text-decoration: none;
    color: #0f0f0f;
    z-index: 9;
}
.img_layout {
    width: 11.25rem;
    height: 11.25rem;
    border-radius: 50%;
    aspect-ratio: 1/1;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
    overflow: hidden;
}

img {
    position: relative;
    left: -25px;
}
</style>
