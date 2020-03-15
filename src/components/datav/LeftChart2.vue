<template>
    <div class="left-chart-2">
        <div class="lc2-header">用户行为统计</div>
        <div class="lc2-details">
            提问处理情况
            <span> <i></i>未处理 </span>
            <span> <i></i>已处理 </span>
        </div>
        <dv-charts class="lc2-chart" :option="option" />
        <dv-decoration-2 style="height:10px;" />
    </div>
</template>

<script>
export default {
    name: 'LeftChart2',
    data() {
        return {
            option: {
                series: [
                    {
                        type: 'pie',
                        data: [
                            { name: '未处理', value: 65 },
                            { name: '已处理', value: 52 }
                        ],
                        radius: ['45%', '65%'],
                        insideLabel: {
                            show: false
                        },
                        outsideLabel: {
                            labelLineEndLength: 10,
                            formatter: '{percent}%\n{name}',
                            style: {
                                fontSize: 14,
                                fill: '#fff'
                            }
                        }
                    }
                ],
                color: ['#fff', '#469f4b']
            }
        }
    }
}
</script>

<style lang="less">
.left-chart-2 {
    width: 100%;
    height: 30%;
    // background-color: rgba(6, 30, 93, 0.5);
    display: flex;
    flex-direction: column;

    .lc2-header {
        height: 20px;
        line-height: 20px;
        font-size: 16px;
        text-indent: 20px;
        margin-top: 10px;
    }

    .lc2-details {
        height: 40px;
        font-size: 16px;
        display: flex;
        align-items: center;
        text-indent: 20px;
        color: #096dd9;
        span {
            color: #fff;
            font-weight: bold;
            font-size: 16px;
            margin-left: 20px;
            i {
                display: inline-block;
                width: 15px;
                height: 15px;
                background: #fff;
                margin-right: 10px;
            }
        }
        span:nth-child(2) {
            color: #469f4b;
            i {
                background-color: #469f4b;
            }
        }
    }

    .lc2-chart {
        height: calc(~'100% - 80px');
    }
}
</style>
