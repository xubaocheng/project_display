<!-- 书架 bookshelf-->
<template>
    <div class="bookshelf">
        <div class="box">
            <span @click="gotoSystem">后退</span>
        </div>
        <div class="bookContainer">
            <span class="el-icon-arrow-left taggerBtn"></span>
            <ul class="bookList">
                <li class="bookItemBox" v-for="item in 10" :key="item">
                    <div class="bookItem">
                        {{ item }}
                    </div>
                </li>
            </ul>
            <span class="el-icon-arrow-right taggerBtn"></span>
        </div>
        <div class="tab">
            <span
                v-for="(item, index) in tabData"
                :key="index"
                :style="{ background: item.color }"
                :class="`active${index}` && activeName === `active${index}`"
                @click="handleClick(index)"
                ><strong :class="item.icon"></strong>&nbsp;&nbsp;{{
                    item.name
                }}</span
            >
        </div>
    </div>
</template>

<script>
export default {
    name: 'bookshelf',
    components: {},
    data() {
        return {
            current: 0,
            activeName: 'active1',
            data: 10,
            tabData: [
                { name: '小说', icon: 'el-icon-reading', color: '#00a8f1' },
                { name: '文学', icon: 'el-icon-reading', color: '#99e1a1' },
                { name: '少儿', icon: 'el-icon-reading', color: '#ffb47b' },
                { name: '教育', icon: 'el-icon-reading', color: '#a3a2e4' },
                { name: '健康', icon: 'el-icon-reading', color: '#e399d8' },
                { name: '生活', icon: 'el-icon-reading', color: '#f48a9e' },
                { name: '图刊', icon: 'el-icon-reading', color: '#5ce4d6' },
                { name: '社会科学', icon: 'el-icon-reading', color: '#e5c944' }
            ]
        }
    },
    mounted() {},
    methods: {
        gotoSystem() {
            this.$router.push({
                path: '/'
            })
        },
        handleClick(index) {
            this.current = index
            this.activeName = 'active' + index
        }
    }
}
</script>
<style lang="less" scoped>
.bookshelf {
    width: 100%;
    box-sizing: border-box;
    background: rgb(180, 225, 255);
    .box {
        padding: 15px 50px;
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
    .bookContainer {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 10px;
        .taggerBtn {
            font-size: 50px;
            font-weight: bold;
            cursor: pointer;
            &:hover {
                color: #f60;
            }
        }
        .bookList {
            width: 100%;
            padding: 10px 0;
            display: flex;
            justify-content: space-around;
            flex-wrap: wrap;
            .bookItemBox {
                width: 20%;
                height: 350px;
                padding: 0 10px;
                box-sizing: border-box;
                margin-bottom: 10px;
                .bookItem {
                    width: 100%;
                    height: 100%;
                    background: #6fc;
                    border: 1px solid #ccc;
                }
            }
        }
    }
    .tab {
        width: 100%;
        display: flex;
        justify-content: space-between;
        span {
            width: 100%;
            height: 140px;
            line-height: 140px;
            font-size: 40px;
            font-weight: bold;
            color: #fff;
            text-align: center;
            border: 1px solid #ccc;
            cursor: pointer;
            border: 4px solid #c2e1f5;
            position: relative;
            user-select: none;
            &.active0:before {
                content: '';
                width: 0px;
                height: 0px;
                border: 20px solid;
                border-color: transparent transparent yellow;
                position: absolute;
                top: -40px;
                left: 65px;
            }
            &.active1:before {
                content: '';
                width: 0px;
                height: 0px;
                border: 20px solid;
                border-color: transparent transparent yellow;
                position: absolute;
                top: -40px;
                left: 65px;
            }
            &.active2:before {
                content: '';
                width: 0px;
                height: 0px;
                border: 20px solid;
                border-color: transparent transparent yellow;
                position: absolute;
                top: -40px;
                left: 65px;
            }
            &.active3:before {
                content: '';
                width: 0px;
                height: 0px;
                border: 20px solid;
                border-color: transparent transparent yellow;
                position: absolute;
                top: -40px;
                left: 65px;
            }
            &.active4:before {
                content: '';
                width: 0px;
                height: 0px;
                border: 20px solid;
                border-color: transparent transparent yellow;
                position: absolute;
                top: -40px;
                left: 65px;
            }
            &.active5:before {
                content: '';
                width: 0px;
                height: 0px;
                border: 20px solid;
                border-color: transparent transparent yellow;
                position: absolute;
                top: -40px;
                left: 65px;
            }
            &.active6:before {
                content: '';
                width: 0px;
                height: 0px;
                border: 20px solid;
                border-color: transparent transparent yellow;
                position: absolute;
                top: -40px;
                left: 65px;
            }
            &.active1:before {
                content: '';
                width: 0px;
                height: 0px;
                border: 20px solid;
                border-color: transparent transparent yellow;
                position: absolute;
                top: -40px;
                left: 65px;
            }
            &.active7:before {
                content: '';
                width: 0px;
                height: 0px;
                border: 20px solid;
                border-color: transparent transparent yellow;
                position: absolute;
                top: -40px;
                left: 65px;
            }
            strong {
                font-size: 30px;
            }
        }
    }
}
</style>
