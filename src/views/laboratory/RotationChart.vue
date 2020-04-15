<!-- 实验室轮播图 -->
<template>
    <div class="rotationChart">
        <el-carousel
            :interval="interval"
            arrow="never"
            :autoplay="true"
            :height="fullHeight"
            trigger="click"
            :loop="true"
        >
            <el-carousel-item
                v-for="(item, index) in settings"
                :key="`settings_item_${index}`"
            >
                <div class="tab-warpper">
                    <!-- <div class="btn-fullscreen" @click="getFullCreeen">
                        <el-tooltip
                            effect="dark"
                            :content="n % 2 !== 0 ? `取消全屏` : `全屏`"
                            placement="bottom"
                        >
                            <i class="el-icon-rank" style="font-size:26px;"></i>
                        </el-tooltip>
                    </div> -->
                    <div class="tab-warpper-box">
                        <h4>
                            {{ item.title }}
                        </h4>
                        <img :src="item.img" alt="" />
                        <p>
                            {{ item.abstracts }}
                        </p>
                    </div>
                    <div
                        class="togger-btn"
                        @click="toggerWarpper"
                        v-show="!isShow"
                    >
                        <i class="el-icon-s-grid" style="font-size:40px;"></i>
                    </div>
                </div>
            </el-carousel-item>
        </el-carousel>
        <transition name="fade">
            <div class="wapper-box" v-show="isShow">
                <div class="wapper-box-close" @click="warpperClose">
                    <i class="el-icon-error" style="font-size:40px;"></i>
                </div>
                <div class="wapper-box-content">
                    <div class="wapper-box-content-main">
                        <div
                            class="wapper-box-content-main-item"
                            v-for="(item, index) in tabData"
                            :key="index"
                            :class="{ active: index === currentIndex }"
                            @click="handleClickItem(index, item.id)"
                        >
                            <span>{{ item.name }}</span>
                            <i class="el-icon-question"></i>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
        <div class="mouse-position">
            <span class="goHomeBtn" @click="goBack">综合管理台</span>
        </div>
    </div>
</template>

<script>
import { getClassifcaList, getTabList } from '../../api/rotationChart'
export default {
    name: 'RotationChart',
    components: {},
    data() {
        return {
            // n: 0,
            fullHeight: '',
            currentIndex: 0,
            settings: [
                {
                    title: '测试',
                    abstracts: '测试',
                    img: require('../../assets/img/0.png')
                }
            ],
            interval: 2000,
            isShow: false,
            tabData: []
        }
    },
    created() {
        this.fullHeight = window.screen.height + 'px'
    },
    mounted() {
        // this.getFullCreeen()
        this.getTabData()
    },
    methods: {
        goBack() {
            this.$router.push({
                path: '/'
            })
        },
        getTabData() {
            getTabList().then(res => {
                console.log(res)
                this.tabData = res.data
                let params = {
                    ltid: this.tabData[0].id
                }
                getClassifcaList(params).then(res => {
                    console.log(res)
                    this.settings = res.data
                    this.interval = this.tabData[0].imgDate * 1000
                })
            })
        },
        handleClickItem(index, id) {
            this.currentIndex = index
            let params = {
                ltid: id
            }
            getClassifcaList(params).then(res => {
                this.settings = res.data
                this.interval = this.tabData[index].imgDate * 1000
                this.warpperClose()
            })
        },
        settingsFn(itemData) {
            this.settings = {
                title: itemData.title,
                abstracts: itemData.abstracts,
                img: itemData.img
            }
        },
        warpperClose() {
            this.isShow = false
        },
        toggerWarpper() {
            this.isShow = true
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
.rotationChart {
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
    .tab-warpper {
        width: 100%;
        height: 100%;
        position: relative;
        z-index: 13;
        &-box {
            width: 100%;
            height: 100%;
            position: absolute;
            img {
                width: 100%;
                height: 100%;
                display: block;
                display: block;
            }
            h4 {
                position: absolute;
                top: 160px;
                left: 0;
                width: 100%;
                text-indent: 2em;
                line-height: 50px;
                font-size: 40px;
                font-weight: bold;
                color: #fff;
                background: rgba(241, 16, 16, 0.5);
            }
            p {
                position: absolute;
                bottom: 111px;
                left: 0;
                width: 100%;
                line-height: 40px;
                font-size: 30px;
                font-weight: bold;
                color: #fff;
                background: rgba(0, 0, 0, 0.5);
            }
        }
        // .btn-fullscreen {
        //     position: absolute;
        //     top: 40px;
        //     left: 20px;
        //     z-index: 1;
        //     cursor: pointer;
        // }
        .togger-btn {
            position: absolute;
            top: 40px;
            right: 20px;
            cursor: pointer;
            &:hover {
                color: red;
            }
        }
    }
    .wapper-box {
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
        z-index: 10;
        &-close {
            position: absolute;
            top: 40px;
            right: 20px;
            z-index: 1;
            cursor: pointer;
            &:hover {
                color: red;
            }
        }
        &-content {
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            background: #000;
            background: rgba(0, 0, 0, 0.5);
            &-main {
                width: 70%;
                height: 70%;
                display: flex;
                padding: 100px 150px;
                box-sizing: border-box;
                display: flex;
                justify-content: space-between;
                flex-wrap: wrap;
                &-item {
                    width: 23%;
                    height: 30%;
                    background: #fff;
                    margin-bottom: 20px;
                    display: flex;
                    align-items: center;
                    justify-content: space-around;
                    transition: 0.4s ease-in-out;
                    cursor: pointer;
                    span {
                        font-size: 20px;
                    }
                    i {
                        font-size: 80px;
                    }
                    &:hover {
                        transform: translateY(-10px);
                        -ms-transform: translateY(-10px);
                        -moz-transform: translateY(-10px);
                        -webkit-transform: translateY(-10px);
                        -o-transform: translateY(-10px);
                        box-shadow: 0 0 20px #000;
                    }
                    &.active {
                        background: blue;
                    }
                }
            }
        }
    }
    .fade-enter-active {
        animation: rotateEnter 0.5s;
    }
    .fade-leave-active {
        animation: rotateLeave 0.5s;
    }
    @keyframes rotateEnter {
        0% {
            transform: perspective(900) rotateX(-90deg);
            -webkit-transform: perspective(900) rotateX(-90deg);
            -ms-transform: perspective(900) rotateX(-90deg);
            -moz-transform: perspective(900) rotateX(-90deg);
            -o-transform: perspective(900) rotateX(-90deg);
            opacity: 0;
        }
        100% {
            transform: perspective(900) rotateX(0deg);
            -webkit-transform: perspective(900) rotateX(0deg);
            -ms-transform: perspective(900) rotateX(0deg);
            -moz-transform: perspective(900) rotateX(0deg);
            -o-transform: perspective(900) rotateX(0deg);
            opacity: 1;
        }
    }
    @keyframes rotateLeave {
        0% {
            transform: perspective(900) rotateX(0deg);
            -webkit-transform: perspective(900) rotateX(0deg);
            -webkit-transform: perspective(900) rotateX(0deg);
            -ms-transform: perspective(900) rotateX(0deg);
            -moz-transform: perspective(900) rotateX(0deg);
            -o-transform: perspective(900) rotateX(0deg);
            opacity: 1;
        }
        100% {
            transform: perspective(900) rotateX(90deg);
            -webkit-transform: perspective(900) rotateX(90deg);
            -webkit-transform: perspective(900) rotateX(90deg);
            -ms-transform: perspective(900) rotateX(90deg);
            -moz-transform: perspective(900) rotateX(90deg);
            -o-transform: perspective(900) rotateX(90deg);
            opacity: 0;
        }
    }
    .mouse-position {
        width: 80%;
        height: 200px;
        position: absolute;
        top: 0;
        right: 200px;
        z-index: 11;
        .goHomeBtn {
            width: 100%;
            height: 100%;
            line-height: 100px;
            display: inline-block;
            // text-align: center;
            cursor: pointer;
            font-size: 18px;
            font-weight: bold;
        }
    }
}
</style>
