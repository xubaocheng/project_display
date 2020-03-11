<template>
    <div id="data-view">
        <dv-full-screen-container>
            <div class="main-header">
                <div class="mh-left">
                    <div class="btn-fullscreen" @click="getFullCreeen">
                        <el-tooltip
                            effect="dark"
                            :content="n % 2 !== 0 ? `取消全屏` : `全屏`"
                            placement="bottom"
                        >
                            <i class="el-icon-rank"></i>
                        </el-tooltip>
                    </div>
                </div>
                <div class="mh-middle">可视化数据统计分析展示</div>
                <div class="mh-right">
                    <dv-border-box-2
                        style="width: 120px; height: 50px; line-height: 50px; text-align:center;margin-left:200px;"
                    >
                        <span class="goHomeBtn" @click="goBack"
                            >综合管理台</span
                        >
                    </dv-border-box-2>
                </div>
            </div>

            <dv-border-box-1 class="main-container">
                <dv-border-box-3 class="left-chart-container">
                    <Left-Chart-1 />
                    <Left-Chart-2 />
                    <Left-Chart-3 />
                </dv-border-box-3>

                <div class="right-main-container">
                    <div class="rmc-top-container">
                        <dv-border-box-3 class="rmctc-left-container">
                            <!-- <Center-Cmp /> -->
                            <scrollBoard />
                        </dv-border-box-3>

                        <div class="rmctc-right-container">
                            <dv-border-box-3 class="rmctc-chart-1">
                                <Right-Chart-1 />
                            </dv-border-box-3>
                            <dv-border-box-4
                                class="rmctc-chart-2"
                                :reverse="true"
                            >
                                <!-- <Right-Chart-2 /> -->
                                <roseChart />
                            </dv-border-box-4>
                        </div>
                    </div>

                    <dv-border-box-4 class="rmc-bottom-container">
                        <Bottom-Charts />
                    </dv-border-box-4>
                </div>
            </dv-border-box-1>
        </dv-full-screen-container>
    </div>
</template>

<script>
import LeftChart1 from './LeftChart1'
import LeftChart2 from './LeftChart2'
import LeftChart3 from './LeftChart3'

// import CenterCmp from './CenterCmp'

import RightChart1 from './RightChart1'
// import RightChart2 from './RightChart2'

import BottomCharts from './BottomCharts'

//新增模块
import roseChart from './RoseChart'
import scrollBoard from './ScrollBoard'

export default {
    name: 'DataView',
    components: {
        LeftChart1,
        LeftChart2,
        LeftChart3,
        // CenterCmp,
        RightChart1,
        // RightChart2,
        BottomCharts,
        roseChart,
        scrollBoard
    },
    data() {
        return {
            n: 0
        }
    },
    mounted() {
        this.getFullCreeen()
    },
    methods: {
        goBack() {
            this.$router.push({
                path: '/'
            })
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

<style lang="less">
#data-view {
    width: 100%;
    height: 100%;
    background-color: #030409;
    color: #fff;

    #dv-full-screen-container {
        background-image: url('./img/bg.png');
        background-size: 100% 100%;
        box-shadow: 0 0 3px blue;
        display: flex;
        flex-direction: column;
    }

    .main-header {
        height: 80px;
        display: flex;
        justify-content: space-around;
        align-items: flex-end;

        .mh-left {
            width: 450px;
            font-size: 20px;
            color: rgb(1, 134, 187);
            .el-icon-rank {
                font-size: 20px;
                cursor: pointer;
                color: #fff;
            }
            a:visited {
                color: rgb(1, 134, 187);
            }
        }

        .mh-middle {
            font-size: 30px;
        }

        .mh-right {
            width: 450px;
            .goHomeBtn {
                width: 100%;
                height: 100%;
                display: inline-block;
                cursor: pointer;
                color: #fff;
            }
        }
    }

    .main-container {
        height: calc(~'100% - 80px');

        .border-box-content {
            padding: 20px;
            box-sizing: border-box;
            display: flex;
        }
    }

    .left-chart-container {
        width: 22%;
        padding: 10px;
        box-sizing: border-box;

        .border-box-content {
            flex-direction: column;
        }
    }

    .right-main-container {
        width: 78%;
        padding-left: 5px;
        box-sizing: border-box;
    }

    .rmc-top-container {
        height: 65%;
        display: flex;
    }

    .rmctc-left-container {
        width: 65%;
    }

    .rmctc-right-container {
        width: 35%;
    }

    .rmc-bottom-container {
        height: 35%;
    }

    .rmctc-chart-1,
    .rmctc-chart-2 {
        height: 50%;
    }
}
</style>
