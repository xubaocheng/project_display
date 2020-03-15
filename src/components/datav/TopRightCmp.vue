<template>
    <div class="top-right-cmp">
        <div class="chart-name">
            统计收费类课程
            <dv-decoration-3 style="width:200px;height:20px;" />
        </div>
        <dv-charts :option="option" />
    </div>
</template>

<script>
export default {
    name: 'TopRightCmp',
    data() {
        return {
            option: {
                legend: {
                    data: [
                        { name: '已售出', color: 'red' },
                        { name: '未售出', color: 'blue' }
                    ],

                    textStyle: {
                        fill: '#fff'
                    }
                },
                xAxis: {
                    name: '课程分类',
                    data: [
                        '地质类',
                        '儿童类',
                        '资源类',
                        '新闻类',
                        '理论类',
                        '政策类',
                        '法规类'
                    ],
                    axisLine: {
                        style: {
                            stroke: '#999'
                        }
                    },
                    axisLabel: {
                        style: {
                            fill: '#999'
                        }
                    },
                    axisTick: {
                        show: false
                    }
                },
                yAxis: {
                    name: '销售额',
                    data: 'value',
                    splitLine: {
                        show: false
                    },
                    axisLine: {
                        style: {
                            stroke: '#999'
                        }
                    },
                    axisLabel: {
                        style: {
                            fill: '#999'
                        }
                    },
                    axisTick: {
                        show: false
                    }
                },
                series: [
                    {
                        name: '已售出',
                        data: [1200, 2230, 1900, 2100, 3500, 4200, 3985],
                        type: 'bar',
                        stack: 'a',
                        gradient: {
                            color: ['red']
                        }
                    },
                    {
                        name: '未售出',
                        data: [1200, 2230, 1900, 2100, 3500, 4200, 3985],
                        type: 'bar',
                        stack: 'a',
                        gradient: {
                            color: ['blue']
                        }
                    }
                ]
            }
        }
    }
}
</script>

<style lang="less">
.top-right-cmp {
    width: 100%;
    height: 50%;
    position: relative;
    box-sizing: border-box;
    .chart-name {
        position: absolute;
        right: 70px;
        text-align: right;
        font-size: 20px;
        top: 10px;
    }
}
</style>
