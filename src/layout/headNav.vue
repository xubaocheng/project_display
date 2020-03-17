<!-- head-nav -->
<template>
    <div class="head-nav" :style="{ width: headNavWidth + 'px' }">
        <div></div>
        <div class="userinfo-right">
            <div class="userinfo">
                <el-menu class="el-menu-demo" mode="horizontal">
                    <el-submenu index="2" popper-class="infoItem">
                        <template slot="title">
                            <div class="welcome">
                                <span class="name">{{ avatar }},</span>
                                <span class="name avatarname"> {{ name }}</span>
                            </div>
                        </template>
                        <el-menu-item index="2-1" @click="setDialogInfo('info')"
                            >个人信息</el-menu-item
                        >
                        <!-- <el-menu-item index="2-2" @click="setDialogInfo('pass')"
                            >修改信息</el-menu-item
                        > -->
                        <el-menu-item
                            index="2-3"
                            @click="setDialogInfo('logout')"
                            >退出</el-menu-item
                        >
                    </el-submenu>
                </el-menu>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    name: 'head-nav',
    components: {},
    data() {
        return {}
    },
    computed: {
        ...mapGetters(['sidebar', 'name', 'avatar']),
        headNavWidth() {
            return document.body.clientWidth - this.sidebar.width - 15
        }
    },
    mounted() {},
    methods: {
        logout() {
            this.$store.dispatch('LogOut').then(() => {
                location.reload()
            })
        },
        // 弹出框-修改密码或者系统设置
        setDialogInfo(cmditem) {
            switch (cmditem) {
                case 'info':
                    this.$router.push('/home/infoShow')
                    break
                // case 'pass':
                //     this.$router.push('/home/infoModify')
                //     break
                case 'logout':
                    this.logout()
                    break
            }
        }
    }
}
</script>
<style lang="less" scoped>
.head-nav {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 29;
    transition: width 0.2s;
    display: flex;
    justify-content: space-between;
    height: 60px;
    box-sizing: border-box;
    background: #fff;
    align-items: center;
    border-bottom: solid 1px #e6e6e6;
    .userinfo-right {
        width: 320px;
        padding: 0 10px;
    }
    .userinfo {
        line-height: 60px;
        text-align: right;
        .welcome {
            display: inline-block;
            vertical-align: middle;
            padding: 0 5px;
            .name {
                line-height: 20px;
                text-align: center;
                font-size: 12px;
            }
            .avatarname {
                color: #a9d86e;
                font-weight: bolder;
                font-size: 13px;
            }
        }

        .username {
            cursor: pointer;
            margin-right: 5px;
        }
    }
}
</style>
