<template>
    <div>
        <router-view></router-view>
        <ul class="ul_layout">
            <li class="head_layout">
                <div class="head">
                    编辑资料
                    <div class="decoration"></div>
                </div>
                <div class="none"></div>
            </li>
            <li class="ucard_layout">
                <el-form
                    class="form"
                    :label-position="labelPosition"
                    label-width="200px"
                    :model="form"
                    size="max"
                >
                    <el-form-item label="用户名" size="max">
                        <el-input v-model="form.name" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="性别">
                        <el-input v-model="form.sex"></el-input>
                    </el-form-item>
                    <el-form-item label="身高">
                        <el-input v-model="form.tall"></el-input>
                    </el-form-item>
                    <el-form-item label="体重">
                        <el-input v-model="form.weight"></el-input>
                    </el-form-item>
                </el-form>
                <div class="btn_layout">
                    <el-button type="primary" class="btn" @click="submitForm('ruleForm')">
                        修改
                    </el-button>
                </div>
                <div class="none"></div>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    data() {
        return {
            labelPosition: 'left',
            form: {
                name: '',
                sex: '',
                tall: '',
                weight: '',
            },
            uid:'',
            token:'',
            userName:''
        };
    },
    mounted() {
        let obj = JSON.parse(localStorage.getItem('user_data'));
        this.form.name = obj.userName;
        this.form.sex = obj.sex;
        this.form.tall = obj.tall;
        this.form.weight = obj.weight;
        this.uid = obj.uid
        this.token = obj.token


    },
    methods: {
        submitForm(formName) {
            this.$confirm('确认要修改吗？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'info',
            })
                .then(() => {
                    let obj1={
                        uid:this.uid,
                        sex:this.form.sex,
                        tall:this.form.tall,
                        weight:this.form.weight,
                    }
                    this.$store.dispatch('userData/ToUpdate', JSON.stringify(obj1));
                    let obj2={
                        uid:this.uid,
                        token:this.token,
                        sex:this.form.sex,
                        tall:this.form.tall,
                        weight:this.form.weight,
                        userName:this.userName
                    }
                    localStorage.setItem("user_data",JSON.stringify(obj2))

                })
                .catch(() => {});
        },
    },
};
</script>

<style scoped>
.ul_layout {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 21.25rem;
    width: 100%;
    margin-bottom: 0;
    margin-top: 0;
    list-style: none;
    padding: 0;
    position: absolute;
    top: 4rem;
}
.ucard_layout {
    display: flex;
    margin-top: 1.25rem;
    flex-direction: column;
    margin-left: 0.9375rem;
    flex-wrap: wrap;
}
.head_layout {
    position: relative;
    background: white;
    display: flex;
    justify-content: space-between;
    margin: 3.125rem 0 0 4.6875rem;
}
.head {
    font-family: zhongwen1;
    font-size: 30px;
    font-weight: bolder;
    flex: 3;
}
.decoration {
    width: 50px;
    height: 5px;
    background: #232323;
    margin-top: 10px;
}
.form {
    margin-left: 3.6875rem;
    margin-top: 1rem;
}
/deep/.el-form-item__label {
    font-size: 20px;
    font-weight: bolder;
}
/deep/.el-input__inner {
    height: 2.825rem;
    width: 18.75rem;
    font-size: 16px;
}
.btn {
    width: 7rem;
    margin-left: 3.6875rem;
    margin-top: 2rem;
}
.btn_layout {
    width: 35rem;
    display: flex;
    justify-content: flex-end;
}
</style>
