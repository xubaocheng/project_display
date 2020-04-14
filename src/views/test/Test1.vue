<!-- 測試1 -->
<template>
    <div class="test1">
        <Book />
    </div>
</template>

<script>
import Book from '../../components/book/book'
export default {
    name: 'test1',
    components: {
        Book
    },
    data() {
        return {}
    },
    mounted() {},
    methods: {}
}
</script>
<style lang="less" scoped>
.test1 {
    width: 100%;
    height: 500px;
}
</style>
