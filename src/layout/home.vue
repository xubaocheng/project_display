<template>
    <div class="home">
        <left-menu></left-menu>
        <div
            class="container"
            :style="{
                left: sidebar.width + 'px'
            }"
        >
            <head-nav></head-nav>
            <div class="content">
                <bread></bread>
                <router-view></router-view
                ><!--页面渲染入口-->
            </div>
            <footerNav v-show="isFooter"></footerNav>
        </div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
import HeadNav from './headNav.vue'
import LeftMenu from './leftMenu.vue'
import FooterNav from './footerNav.vue'
import Bread from './bread.vue'
export default {
    name: 'home',
    data() {
        return {}
    },
    components: {
        HeadNav,
        LeftMenu,
        FooterNav,
        Bread
    },
    computed: {
        ...mapGetters(['sidebar', 'isFooter']),
        content() {
            return document.body.clientWidth - this.sidebar.width
        }
    },
    created() {},
    mounted() {
        this.inFullCreeen(document.documentElement)
    },
    watch: {},
    methods: {
        inFullCreeen(element) {
            let el = element
            let rfs =
                el.requestFullScreen ||
                el.webkitRequestFullScreen ||
                el.mozRequestFullScreen ||
                el.msRequestFullScreen
            if (typeof rfs != 'undefined' && rfs) {
                rfs.call(el)
            } else if (typeof window.ActiveXObject != 'undefined') {
                // eslint-disable-next-line no-undef
                let wscript = new ActiveXObject('WScript.Shell')
                if (wscript != null) {
                    wscript.SendKeys('{F11}')
                }
            }
        }
    }
}
</script>
<style scoped lang="less">
.home {
    width: 100%;
    .container {
        overflow: auto;
        position: absolute;
        right: 0;
        top: 0;
        bottom: 0;
        background: #fff;
        .content {
            position: relative;
            margin-top: 60px;
            width: 100%;
        }
    }
}
</style>
