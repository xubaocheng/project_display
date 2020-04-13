<!-- 理论成果 -->
<template>
    <div class="theory">
        <div class="theory-warpper">
            <div class="theory-warpper-top">
                <div class="btn-fullscreen" @click="getFullCreeen">
                    <el-tooltip
                        effect="dark"
                        :content="n % 2 !== 0 ? `取消全屏` : `全屏`"
                        placement="bottom"
                    >
                        <i
                            class="el-icon-rank"
                            style="font-size:26px; color:#fff;"
                        ></i>
                    </el-tooltip>
                </div>
                <div class="theory-warpper-top-container">
                    <div class="theory-warpper-top-container-title">
                        《出版"有数"》理论成果展示
                    </div>
                    <div class="theory-warpper-top-container-cumrp">

                    </div>
                </div>
            </div>
            <div class="theory-warpper-bottom">
                <div class="book"></div>
                <div class="tab">
                    <div class="tab-box">
                        <div class="tab-box-content">
                            <div class="tab-box-content-top">
                                111
                            </div>
                            <div class="tab-box-content-bottom">
                                <i></i>
                            </div>
                        </div>
                    </div>
                    <div class="tab-list">
                        <div
                            class="tab-list-item"
                            v-for="(item, index) in tabList"
                            :key="`tabList_item_${index}`"
                            @click="handlerItem(index)"
                        >
                            <div class="tab-list-item-triangle">
                                <span
                                    v-show="index === currentIndex"
                                    :style="{
                                        borderBottom: `22px solid ${item.color}`
                                    }"
                                ></span>
                            </div>
                            <div
                                class="tab-list-item-moudle"
                                :style="{ background: item.color }"
                            >
                                <i :class="item.icon"></i>
                            </div>
                            <h5>{{ item.name }}</h5>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { getDetail } from '@/api/theory'
export default {
    name: 'theorys',
    components: {},
    data() {
        return {
            n: 0,
            fullHeight: '',
            isShow: false,
            tabList: [
                {
                    name: '成果介绍',
                    icon: 'el-icon-tickets',
                    color: 'rgb(120,160,255)'
                },
                {
                    name: '重要观点',
                    icon: 'el-icon-tickets',
                    color: 'rgb(160,130,250)'
                },
                {
                    name: '建设历程',
                    icon: 'el-icon-tickets',
                    color: 'rgb(250,140,80)'
                },
                {
                    name: '社会效益',
                    icon: 'el-icon-tickets',
                    color: 'rgb(240,50,80)'
                }
            ],
            currentIndex: 0
        }
    },
    mounted() {
        this.getDetailFn()
    },
    methods: {
        handlerItem(index) {
            this.currentIndex = index
        },
        //获取详情
        getDetailFn() {
            let params = {
                id: 1
            }
            getDetail(params).then(res => {
                console.log(res)
            })
        },
        warpperClose() {
            this.isShow = false
        },
        toggerWarpper() {
            this.isShow = true
        },
        getFullCreeen() {
            this.n++
            this.n % 2 == 0
                ? this.outFullCreeen(document)
                : this.inFullCreeen(document.documentElement)
        },
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
        },
        outFullCreeen(element) {
            let el = element
            let cfs =
                el.cancelFullScreen ||
                el.webkitCancelFullScreen ||
                el.mozCancelFullScreen ||
                el.exitFullScreen
            if (typeof cfs != 'undefined' && cfs) {
                cfs.call(el)
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
<style lang="less" scoped>
.theory {
    width: 100%;
    height: 100%;
    padding-top: 20px;
    box-sizing: border-box;
    background: blue;
    &-warpper {
        width: 100%;
        height: 100%;
        &-top {
            width: 100%;
            height: 100px;
            background: rgb(114, 115, 130);
            margin-bottom: 20px;
            position: relative;
            .btn-fullscreen {
                position: absolute;
                top: 40px;
                left: 20px;
                z-index: 1;
                cursor: pointer;
            }
            &-container {
                width: 100%;
                height: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
                &-title{
                    font-size: 30px;
                    color: #fff;
                }
            }
        }
        &-bottom {
            width: 100%;
            height: calc(100% - 120px);
            display: flex;
            justify-content: space-around;
            .book {
                width: 40%;
                height: 100%;
                border: 1px solid #ccc;
                box-sizing: border-box;
            }
            .tab {
                width: 55%;
                height: 100%;
                display: flex;
                flex-direction: column;
                &-box {
                    width: 100%;
                    height: calc(100% - 180px);
                    padding: 20px;
                    box-sizing: border-box;
                    border: 1px solid #ccc;
                    background: #fff;
                    &-content {
                        width: 100%;
                        height: 100%;
                        &-top {
                            width: 100%;
                            height: 95%;
                        }
                        &-bottom {
                            width: 100%;
                            height: 5%;
                            border-top: 3px solid #000;
                            display: flex;
                            justify-content: center;
                            i {
                                width: 30px;
                                height: 30px;
                                cursor: pointer;
                                background-image: url('../../assets/img/more.png');
                                background-size: 100%;
                                animation: container 1.5s linear infinite;
                            }
                            @keyframes container {
                                0% {
                                    transform: translateY(0);
                                }
                                25% {
                                    transform: translateY(2px);
                                }
                                50% {
                                    transform: translateY(5px);
                                }
                                75% {
                                    transform: translateY(2px);
                                }
                                100% {
                                    transform: translateY(0);
                                }
                            }
                        }
                    }
                }
                &-list {
                    width: 100%;
                    height: 180px;
                    display: flex;
                    justify-content: space-between;
                    &-item {
                        width: 23%;
                        text-align: center;
                        cursor: pointer;
                        &-triangle {
                            width: 100%;
                            height: 22px;
                            position: relative;
                            span {
                                position: absolute;
                                top: 0;
                                left: 80px;
                                width: 0;
                                height: 0;
                                border-right: 22px solid transparent;
                                border-left: 22px solid transparent;
                                border-bottom: 22px solid red;
                            }
                        }
                        &-moudle {
                            width: 100%;
                            height: 120px;
                            color: #fff;
                            border-radius: 15px;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            margin-bottom: 10px;
                            i {
                                font-size: 60px;
                            }
                        }
                        h5 {
                            font-size: 24px;
                            font-weight: bold;
                            color: #fff;
                        }
                    }
                }
            }
        }
    }
}
</style>
