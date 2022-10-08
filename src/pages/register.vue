<template>
    <div class="layout_1">
        <div class="background"></div>
        <div class="box">
            <div>
                <div class="title_layout">
                    <h1 class="title">注&nbsp;&nbsp;&nbsp;&nbsp;册</h1>
                    <router-link
                        replace
                        href="#"
                        class="el-icon-close icon close"
                        to="/mainpage"
                    ></router-link>
                </div>
                <div class="form_layout">
                    <el-form
                        :model="ruleForm"
                        status-icon
                        :rules="rules"
                        ref="ruleForm"
                        label-width="6.25rem"
                        class="demo-ruleForm"
                    >
                        <el-form-item label="用户名" prop="username">
                            <el-input
                                type="username"
                                v-model="ruleForm.userName"
                                autocomplete="off"
                            ></el-input>
                        </el-form-item>
                        <el-form-item label="密码" prop="pass">
                            <label slot="label">密&nbsp;&nbsp;&nbsp;&nbsp;码</label>
                            <el-input
                                type="password"
                                v-model="ruleForm.userPassword"
                                autocomplete="off"
                            ></el-input>
                        </el-form-item>
                        <el-form-item label="确认密码" prop="checkPass">
                            <el-input
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
                        <router-link class="login" to="/mainpage/login">
                            已有账号？点击这里进行登录
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
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
    },
};
</script>

<style scoped>
.title {
    margin-top: 0;
    margin-bottom: 1.5625rem;

    font-size: 2.5rem;
}
.close {
    position: relative;
    left: 7.5rem;
    text-decoration: none;
    color: #0f0f0f;
}
.layout_1 {
    position: fixed;
    display: flex;
    z-index: 10;
    justify-content: center;
    width: 100%;
    height: 100%;
    align-items: center;
}
.background {
    background: #0f0f0f;
    width: 100%;
    height: 100%;
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0.4;
    z-index: 1;
}
.box {
    min-height: 25rem;
    min-width: 28.125rem;
    background: rgb(240, 243, 245);
    z-index: 2;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.25rem;
    border-radius: 25px;
}
.title_layout {
    position: relative;
    left: 0.625rem;
    display: flex;
    justify-content: center;
}
.form_layout {
    margin-right: 3.75rem;
}
.btn_layout {
    display: flex;
    justify-content: space-between;
}
.tips_layout {
    display: flex;
    justify-content: flex-end;
}
.login {
    color: #606266;
    font-size: 0.8125rem;
}
</style>
