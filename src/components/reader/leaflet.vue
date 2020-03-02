<!-- leaflet 宣传页 -->
<template>
    <div class="leaflet">
        <div class="box">
            <span @click="gotoSystem">后退</span>
            <span @click="gotoBookshelfView">跳过</span>
        </div>
    </div>
</template>

<script>
export default {
    name: 'leaflet',
    components: {},
    data() {
        return {}
    },
    mounted() {},
    methods: {
        gotoSystem() {
            this.$router.push({
                path: '/'
            })
        },
        gotoBookshelfView() {
            this.$router.push({
                path: '/reader/bookshelf'
            })
        }
    }
}
</script>
<style lang="less" scoped>
.leaflet {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    border: 1px solid red;
    background: url('../../assets/img/bookLeaflet.jpg') no-repeat;
    background-size: 100% 100%;
    .box {
        padding: 35px 50px;
        display: flex;
        justify-content: space-between;
        span {
            width: 110px;
            height: 40px;
            background: rgba(45, 70, 86, 0.8);
            color: #fff;
            text-align: center;
            line-height: 40px;
            font-size: 20px;
            border-radius: 5px;
            cursor: pointer;
        }
    }
}
</style>
