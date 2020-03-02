<!-- empty 空路由 -->
<template>
    <div class="empty">
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    name: 'empty',
    components: {},
    data() {
        return {}
    },
    mounted() {},
    methods: {}
}
</script>
<style lang="less" scoped>
.empty {
    width: 100%;
    height: 100%;
}
</style>
