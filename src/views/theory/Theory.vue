<!-- 理论成果 -->
<template>
    <div class="theory">
        <div class="theory-warpper">
            <div class="theory-warpper-top">
                <!-- <div class="btn-fullscreen" @click="getFullCreeen">
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
                </div> -->
                <div class="theory-warpper-top-container">
                    <div class="btn-goback">
                        <span class="goHomeBtn" @click="goBack"
                            >综合管理台</span
                        >
                    </div>
                    <div class="theory-warpper-top-container-title">
                        《出版"有数"》理论成果展示
                    </div>
                    <div class="theory-warpper-top-container-cumrp"></div>
                </div>
            </div>
            <div class="theory-warpper-bottom">
                <div class="book">
                    <Book />
                </div>
                <div class="tab">
                    <div class="tab-box">
                        <div class="tab-box-content">
                            <div
                                class="tab-box-content-bottom"
                                v-show="top > 0"
                            >
                                <i class="active" @click="scrollHightFn(0)"></i>
                            </div>
                            <div
                                class="tab-box-content-top"
                                ref="elHight"
                                :style="
                                    top > 0 ? { height: '91%' } : styleObject
                                "
                            >
                                <div
                                    class="tab-box-content-top-warpper"
                                    :style="{ top: scrollHeight }"
                                >
                                    <p>{{ contentItem.content }}</p>
                                    <img :src="contentItem.img" alt="" />
                                    <p>{{ contentItem.content }}</p>
                                    <p>{{ contentItem.content }}</p>
                                </div>
                            </div>
                            <div class="tab-box-content-bottom">
                                <i @click="scrollHightFn(1)"></i>
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
import { getTabDetail } from '@/api/theory'
import Book from '_c/book/book2.vue'
export default {
    name: 'theorys',
    components: {
        Book
    },
    data() {
        return {
            // n: 0,
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
            currentIndex: 0,
            contentItem: {},
            top: 0,
            index: 0
        }
    },
    mounted() {
        // this.getFullCreeen()
        this.getDetailFn()
    },
    computed: {
        scrollHeight: function() {
            return -this.top + 'px'
        },
        styleObject() {
            return { height: '95%' }
        }
    },
    methods: {
        goBack() {
            this.$router.push({
                path: '/'
            })
        },
        //滚动
        scrollHightFn(state) {
            if (state) {
                if (
                    this.$refs.elHight.firstChild.offsetHeight - this.top >
                    this.$refs.elHight.offsetHeight
                ) {
                    this.index++
                } else {
                    this.$message('内容加载完毕')
                }
            } else {
                if (this.top > 0) {
                    this.index--
                } else {
                    this.$message('内容已加载')
                }
            }
            this.top = this.$refs.elHight.offsetHeight * this.index
        },
        //切换tab 三角
        handlerItem(index) {
            this.currentIndex = index
        },
        //获取详情
        getDetailFn() {
            let params = {
                id: 1
            }
            getTabDetail(params).then(res => {
                console.log(res)
                this.contentItem = res.data
            })
        }
        // getFullCreeen() {
        //     this.n++
        //     this.n % 2 == 0
        //         ? this.outFullCreeen(document)
        //         : this.inFullCreeen(document.documentElement)
        // },
        // inFullCreeen(element) {
        //     let el = element
        //     let rfs =
        //         el.requestFullScreen ||
        //         el.webkitRequestFullScreen ||
        //         el.mozRequestFullScreen ||
        //         el.msRequestFullScreen
        //     if (typeof rfs != 'undefined' && rfs) {
        //         rfs.call(el)
        //     } else if (typeof window.ActiveXObject != 'undefined') {
        //         // eslint-disable-next-line no-undef
        //         let wscript = new ActiveXObject('WScript.Shell')
        //         if (wscript != null) {
        //             wscript.SendKeys('{F11}')
        //         }
        //     }
        // },
        // outFullCreeen(element) {
        //     let el = element
        //     let cfs =
        //         el.cancelFullScreen ||
        //         el.webkitCancelFullScreen ||
        //         el.mozCancelFullScreen ||
        //         el.exitFullScreen
        //     if (typeof cfs != 'undefined' && cfs) {
        //         cfs.call(el)
        //     } else if (typeof window.ActiveXObject != 'undefined') {
        //         // eslint-disable-next-line no-undef
        //         let wscript = new ActiveXObject('WScript.Shell')
        //         if (wscript != null) {
        //             wscript.SendKeys('{F11}')
        //         }
        //     }
        // }
    }
}
</script>
<style lang="less" scoped>
.theory {
    width: 100%;
    height: 100%;
    padding-top: 20px;
    padding-bottom: 10px;
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
            // position: relative;
            // .btn-fullscreen {
            //     position: absolute;
            //     top: 40px;
            //     left: 20px;
            //     z-index: 1;
            //     cursor: pointer;
            // }
            &-container {
                width: 100%;
                height: 100%;
                display: flex;
                justify-content: space-around;
                align-items: center;
                &-title {
                    font-size: 30px;
                    color: #fff;
                }
                .btn-goback {
                    width: 100px;
                    height: 50px;
                    border: 1px solid #ccc;
                    .goHomeBtn {
                        width: 100%;
                        line-height: 50px;
                        text-align: center;
                        display: inline-block;
                        cursor: pointer;
                        color: #fff;
                    }
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
                    padding: 0 20px;
                    box-sizing: border-box;
                    border: 1px solid #ccc;
                    background: #fff;
                    &-content {
                        width: 100%;
                        height: 100%;
                        &-top {
                            width: 100%;
                            height: 91%;
                            position: relative;
                            overflow: hidden;
                            &-warpper {
                                width: 100%;
                                position: absolute;
                                // top: 0;
                                left: 0;
                                transition: 2s all ease;
                                p {
                                    font-size: 16px;
                                    text-indent: 2em;
                                    line-height: 26px;
                                }
                                img {
                                    width: 100%;
                                    height: 50%;
                                    display: inline-block;
                                }
                            }
                        }
                        &-bottom {
                            width: 100%;
                            height: 4%;
                            border-top: 3px solid #000;
                            display: flex;
                            justify-content: center;
                            i {
                                width: 30px;
                                height: 30px;
                                cursor: pointer;
                                background-image: url('../../assets/img/jump_to_bottom.png');
                                background-size: 100%;
                                animation: container 1.5s linear infinite;
                                &.active {
                                    background-image: url('../../assets/img/jump_to_top.png');
                                }
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
