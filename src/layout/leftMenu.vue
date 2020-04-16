<!-- left-menu -->
<template>
    <div class="left-menu" :style="{ width: sidebar.width + 'px' }">
        <div class="menu_top">
            <img
                :class="['logo', { closeLogo: !sidebar.opened }]"
                :src="logo"
                alt=""
            />
            <span class="title" v-show="sidebar.opened">项目成果展示系统</span>
        </div>
        <div class="menu_bottom">
            <el-menu
                :default-active="$route.path"
                class="el-menu-vertical-demo"
                @open="handleOpen"
                @close="handleClose"
                :collapse="isCollapse"
                background-color="#545c64"
                text-color="#fff"
                active-text-color="#ffd04b"
            >
                <template v-for="(item, index) in permission_routers">
                    <!--表示 有一级菜单-->
                    <router-link
                        v-if="!item.hidden && item.noDropdown"
                        :to="item.path + '/' + item.children[0].path"
                        :key="index"
                    >
                        <el-menu-item
                            class="dropItem"
                            :index="item.path + '/' + item.children[0].path"
                        >
                            <i
                                v-if="item.meta.icon"
                                :class="item.meta.icon"
                            ></i>
                            <span v-if="item.meta.title" slot="title">{{
                                item.meta.title
                            }}</span>
                        </el-menu-item>
                    </router-link>
                    <!--表示 有二级或者多级菜单 -->
                    <el-submenu
                        v-if="
                            item.children &&
                                item.children.length >= 1 &&
                                !item.hidden &&
                                !item.noDropdown
                        "
                        :index="item.path"
                        :key="index"
                    >
                        <template slot="title">
                            <i
                                v-if="item.meta.icon"
                                :class="item.meta.icon"
                            ></i>
                            <span v-if="item.meta.title" slot="title">{{
                                item.meta.title
                            }}</span>
                        </template>
                        <!--直接定位到子路由上，子路由也可以实现导航功能-->
                        <router-link
                            v-for="(citem, cindex) in item.children"
                            :to="getIindex(citem, item, cindex)"
                            :key="cindex"
                        >
                            <el-menu-item
                                :index="getIindex(citem, item, cindex)"
                            >
                                <span slot="title">
                                    {{ citem.meta.title }}</span
                                >
                            </el-menu-item>
                        </router-link>
                    </el-submenu>
                </template>
            </el-menu>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
// import logoImg from '@/assets/img/logo.png'
export default {
    name: 'left-menu',
    components: {},
    computed: {
        ...mapGetters(['permission_routers', 'isCollapse', 'sidebar'])
    },
    data() {
        return {
            logo: require('@/assets/img/logo.png')
        }
    },
    mounted() {},
    methods: {
        getIindex(citem, item) {
            return citem.meta.titleList
                ? item.path +
                      '/' +
                      citem.path +
                      '/' +
                      citem.meta.titleList[0].path
                : item.path + '/' + citem.path
        },
        handleOpen(key, keyPath) {
            console.log(key, keyPath)
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath)
        }
    }
}
</script>
<style lang="less" scoped>
.el-menu {
    border-right: solid 0px #e6e6e6;
}
.left-menu {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    background-color: #545c64;
    .menu_top {
        width: 100%;
        height: 60px;
        display: flex;
        align-items: center;
        justify-content: space-around;
        text-transform: uppercase;
        box-sizing: border-box;
        box-shadow: 0px 2px 5px 0px rgba(230, 224, 224, 0.5);
        background: #fff;
        border-bottom: solid 1px #e6e6e6;
        .logo {
            height: 36px;
            width: 36px;
            vertical-align: middle;
            display: inline-block;
        }
        .closeLogo {
            width: 30px;
            height: 30px;
        }
        .title {
            font-size: 22px;
            i {
                color: #ff6c60;
            }
        }
    }
}
</style>
