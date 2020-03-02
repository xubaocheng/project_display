<template>
    <div class="fillcontain">
        <!--个人信息栏-->
        <div class="info_container">
            <el-row class="info_row" :gutter="10">
                <el-col :span="5">
                    <div class="area">
                        <div class="namearea">
                            <p>
                                用户名：<span>{{ userInfoData.name }}</span>
                            </p>
                            <p>
                                角色：<span>{{ userInfoData.rname }}</span>
                            </p>
                            <p>
                                最近登录时间：<span>{{
                                    userInfoData.last_login_time
                                        | dateFormat(
                                            userInfoData.last_login_time
                                        )
                                }}</span>
                            </p>
                            <p>
                                绑定邮箱：<span>{{ userInfoData.email }}</span>
                            </p>
                            <p>
                                绑定手机：<span>{{ userInfoData.phone }}</span>
                            </p>
                            <p>
                                状态：<span>{{
                                    userInfoData.state ? '已开启' : '已禁用'
                                }}</span>
                            </p>
                        </div>
                    </div>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
import { getJSON } from '@/utils/auth'
import moment from 'moment'
export default {
    data() {
        return {
            userInfoData: {}
        }
    },
    filters: {
        // 时间格式化
        dateFormat(val) {
            return moment(val).format('YYYY-MM-DD HH:mm:ss')
        }
    },
    mounted() {
        this.userInfoData = getJSON('userInfoData')
        console.log(this.userInfoData)
    },
    methods: {}
}
</script>

<style lang="less" scoped>
.info_container {
    padding: 20px;
    background: #fff;
    box-sizing: border-box;
    overflow: auto;
}
.row {
    margin: 20px;
}
.info_row {
    .area {
        border: 1px solid #dfdfdf;
        height: 178px;
        overflow: hidden;
        .namearea {
            padding: 10px;
            font-size: 14px;
            p {
                line-height: 24px;
            }
        }
    }
}
</style>
