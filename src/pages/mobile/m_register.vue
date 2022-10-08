<template>
    <div class="layout">
        <div class="title_layout">
            <div class="el-icon-arrow-left icon close" @click="$router.go(-1)"></div>
        </div>
        <div class="all_layout">
            <div class="title">注&nbsp;&nbsp;&nbsp;册</div>

            <div class="form_layout">
                <el-form
                    :model="ruleForm"
                    status-icon
                    :rules="rules"
                    ref="ruleForm"
                    label-width="7.5vh"
                    id="selectForm"
                >
                    <el-form-item label="用户名" prop="username">
                        <el-input
                            class="input"
                            type="username"
                            v-model="ruleForm.userName"
                            autocomplete="off"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="pass">
                        <label slot="label">密&nbsp;&nbsp;&nbsp;&nbsp;码</label>
                        <el-input
                            class="input"
                            type="password"
                            v-model="ruleForm.userPassword"
                            autocomplete="off"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="确认密码" prop="checkPass">
                        <el-input
                            class="input"
                            type="password"
                            v-model="ruleForm.checkPass"
                            autocomplete="off"
                        ></el-input>
                    </el-form-item>

                    <el-form-item>
                        <div class="btn_layout">
                            <el-button type="primary" @click="submitForm('ruleForm')">
                                注册
                            </el-button>
                            <el-button @click="resetForm('ruleForm')">重置</el-button>
                        </div>
                    </el-form-item>
                </el-form>
                <div class="tips_layout">
                    <div @click="goLogin()" class="login">已有账号？点击这里进行登录</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'm_register',
    data() {
        var validateUser = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入用户名'));
            } else {
                if (this.ruleForm.checkPass !== '') {
                    this.$refs.ruleForm.validateField('checkUser');
                }
                callback();
            }
        };
        var validatePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入密码'));
            } else {
                if (this.ruleForm.checkPass !== '') {
                    this.$refs.ruleForm.validateField('checkPass');
                }
                callback();
            }
        };
        var validatePass2 = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请再次输入密码'));
            } else if (value !== this.ruleForm.userPassword) {
                callback(new Error('两次输入密码不一致!'));
            } else {
                callback();
            }
        };
        return {
            ruleForm: {
                userName: '',
                userPassword: '',
                checkPass: '',
            },
            rules: {
                username: [{ validator: validateUser, trigger: 'blur' }],
                pass: [{ validator: validatePass, trigger: 'blur' }],
                checkPass: [{ validator: validatePass2, trigger: 'blur' }],
            },
        };
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    this.$store.dispatch('userData/ToRegister', JSON.stringify(this.ruleForm));
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        goLogin() {
            this.$router.push({
                name: 'm_login',
            });
        },
    },
    created() {},
};
</script>

<style scoped>
.layout {
    position: fixed;
    width: 100%;
    height: 100%;
    background: white;
    top: 6vh;
    z-index: 5;
}
.title_layout {
    position: relative;
    color: #000;
    display: flex;
    flex-direction: column;
}
.title {
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: center;
    font-weight: bolder;
    font-size: 4vh;
    margin-left: 5vh;
    margin-bottom: 2vh;
    color: #000;
}
.all_layout {
    position: relative;
    top: 5vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.close {
    position: relative;
    top: 0.2vh;
    text-decoration: none;
    color: #0f0f0f;
    font-size: 4vh;
    margin: 1.5vh;
}
.input {
    width: 25vh;
}
.form_layout {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 1vh;
}
.btn_layout {
    display: flex;
    justify-content: space-between;
}
.login {
    color: rgb(132, 131, 131);
    text-decoration: underline;
}
#selectForm >>> .el-form-item__label {
    font-size: 1.6vh;
}
</style>
