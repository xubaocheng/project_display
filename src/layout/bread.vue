<template>
    <div class="bread_container" id="bread_container">
        <span @click="handleLefeMenu" class="bars">
            <i
                class="el-icon-s-fold"
                :class="{ isactive: changeBarDirection }"
            ></i>
        </span>
        <el-breadcrumb class="breadcrumb" separator="/">
            <el-breadcrumb-item
                v-for="(name, index) in matchedArr"
                :key="index"
            >
                {{ name }}
            </el-breadcrumb-item>
        </el-breadcrumb>
    </div>
</template>

<script>
export default {
    data() {
        return {
            changeBarDirection: false
        }
    },
    created() {},
    computed: {
        matchedArr() {
            let temp = [],
                temps = []
            this.$route.matched.filter(item => {
                if (item.meta.title) {
                    const title = item.meta.title
                    temp.push(title)
                }
            })
            temp.filter(item => {
                if (!temps.includes(item)) {
                    temps.push(item)
                }
            })
            return temps
        }
    },
    mounted() {},
    methods: {
        handleLefeMenu() {
            this.$store.dispatch('setLeftCollapse') // 折叠菜单
            this.$store.dispatch('handleLeftMenu') // 改变菜单宽度 180->35/35-180
            this.changeBarDirection = !this.changeBarDirection
        }
    }
}
</script>

<style lang="less">
.bread_container {
    background-color: #eaebec;
    width: 100%;
    padding-top: 10px;
    padding-bottom: 10px;
    .bars {
        float: left;
        margin: 4px 10px;
        cursor: pointer;
        i {
            font-size: 24px;
        }
        .isactive {
            -webkit-transform: rotate(90deg);
            transform: rotate(90deg);
            transition: 0.38s;
            -webkit-transform-origin: 50% 50%;
            transform-origin: 50% 50%;
        }
    }
    .breadcrumb {
        height: 30px;
        line-height: 30px;
        .breadbutton {
            float: left;
            margin: 4px 5px 0 0;
        }
    }
}
</style>
