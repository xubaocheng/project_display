<template>
    <div class="login_page">
        <transition name="form-fade" mode="in-out">
            <section class="form_contianer">
                <div class="titleArea rflex">
                    <span class="title">项目成果展示后台管理</span>
                </div>
                <el-form
                    :model="loginForm"
                    :rules="rules"
                    ref="loginForm"
                    class="loginForm"
                >
                    <el-form-item prop="name" class="login-item">
                        <el-input
                            prefix-icon="el-icon-user-solid"
                            @keyup.enter.native="submitForm('loginForm')"
                            class="area"
                            type="text"
                            placeholder="用户名"
                            v-model="loginForm.name"
                        ></el-input>
                    </el-form-item>
                    <el-form-item prop="password" class="login-item">
                        <el-input
                            prefix-icon="icon-myicon-test26"
                            @keyup.enter.native="submitForm('loginForm')"
                            class="area"
                            type="password"
                            placeholder="密码"
                            v-model="loginForm.password"
                        ></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button
                            type="primary"
                            :loading="loading"
                            @click="submitForm('loginForm')"
                            class="submit_btn"
                            >登录</el-button
                        >
                    </el-form-item>
                    <div class="tiparea">
                        <p class="wxtip">温馨提示：</p>
                        <p class="tip">用户名为：BatesAdmin</p>
                        <p class="tip">密码为：111111Qq</p>
                    </div>
                    <div class="sanFangArea">
                        <p class="title">第三方账号登录</p>
                        <ul class="rflex">
                            <li @click="loginByWechat">
                                <i class="icon-myicon-test80"> </i>
                            </li>
                            <li>
                                <i class="icon-myicon-test72"></i>
                            </li>
                        </ul>
                    </div>
                </el-form>
            </section>
        </transition>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
    data() {
        return {
            loginForm: {
                name: 'BatesAdmin',
                password: '111111Qq'
            },
            rules: {
                name: [
                    {
                        required: true,
                        message: '请输入用户名',
                        trigger: 'blur'
                    },
                    {
                        min: 2,
                        max: 20,
                        message: '长度在 2 到 8 个字符',
                        trigger: 'blur'
                    }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' }
                ]
            },
            loading: false
        }
    },
    mounted() {},
    methods: {
        loginByWechat() {},
        submitForm(loginForm) {
            this.loading = true
            this.$refs[loginForm].validate(valid => {
                if (valid) {
                    let userinfo = {
                        name: this.loginForm.name,
                        password: this.$md5(this.loginForm.password)
                    }
                    this.logIn(userinfo)
                        .then(() => {
                            this.loading = false
                            this.$message.success('登录成功')
                            this.$router.push({ path: '/' })
                        })
                        .catch(() => {
                            this.loading = false
                            this.$message.error('登录失败')
                        })
                } else {
                    this.$message.error('失败')
                    return false
                }
            })
        },
        ...mapActions(['logIn', 'initLeftMenu'])
    }
}
</script>

<style lang="less" scoped>
.login_page {
    position: absolute;
    width: 100%;
    height: 100%;
    background: #2d3a4b;
    background-size: 100% 100%;
}
.form_contianer {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: #fff;
    width: 370px;
    border-radius: 5px;
    padding: 25px;
    text-align: center;
    .titleArea {
        justify-content: center;
        align-items: center;
        text-transform: uppercase;
        font-size: 22px;
        width: 100%;
        padding-bottom: 20px;
        .logo {
            width: 40px;
            margin-right: 10px;
        }
        .title {
            i {
                color: #ff6c60;
            }
        }
    }

    .loginForm {
        .submit_btn {
            width: 100%;
            padding: 13px 0;
            font-size: 16px;
        }
    }
}

.tiparea {
    text-align: left;
    font-size: 12px;
    color: #4cbb15;
    padding: 10px 0;
    .tip {
        margin-left: 54px;
    }
}

.form-fade-enter-active,
.form-fade-leave-active {
    transition: all 1s;
}
.form-fade-enter,
.form-fade-leave-active {
    transform: translate3d(0, -50px, 0);
    opacity: 0;
}
.loginForm {
    .el-button--primary {
        background-color: #ff7c1a;
        border: 1px solid #ff7c1a;
    }
}
.sanFangArea {
    border-top: 1px solid #dcdfe6;
    padding: 10px 0;
    display: none;
    .title {
        font-size: 14px;
        color: #8b9196;
        margin-bottom: 10px;
    }
    ul {
        li {
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            .svg-icon {
                font-size: 24px;
            }
        }
    }
}
</style>
