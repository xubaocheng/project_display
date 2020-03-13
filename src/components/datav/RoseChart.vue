<template>
    <div id="rose-chart">
        <div class="rose-chart-title">分类课程浏览情况统计</div>
        <dv-charts :option="option" />
    </div>
</template>

<script>
export default {
    name: 'RoseChart',
    data() {
        return {
            option: {}
        }
    },
    methods: {
        createData() {
            const { randomExtend } = this
            this.option = {
                series: [
                    {
                        type: 'pie',
                        radius: '80%',
                        roseSort: false,
                        data: [
                            { name: '地质类', value: randomExtend(40, 70) },
                            { name: '儿童类', value: randomExtend(20, 30) },
                            { name: '资源类', value: randomExtend(10, 50) },
                            { name: '新闻类', value: randomExtend(5, 20) },
                            { name: '理论类', value: randomExtend(40, 50) },
                            { name: '政策类', value: randomExtend(20, 30) },
                            { name: '法规类', value: randomExtend(5, 10) },
                            { name: '其他类', value: randomExtend(20, 35) },
                        ],
                        insideLabel: {
                            show: false
                        },
                        outsideLabel: {
                            formatter: '{name} {percent}%',
                            labelLineEndLength: 20,
                            style: {
                                fill: '#fff'
                            },
                            labelLineStyle: {
                                stroke: '#fff'
                            }
                        },
                        roseType: true
                    }
                ],
                color: [
                    'rgb(130,120,233)',
                    'rgb(33,150,240)',
                    'rgb(50,200,230)',
                    'rgb(20,210,170)',
                    'rgb(250,200,55)',
                    'rgb(255,130,100)',
                    'rgb(250,115,247)',
                    'rgb(230,190,240)',
                ]
            }
        },
        randomExtend(minNum, maxNum) {
            if (arguments.length === 1) {
                return parseInt(Math.random() * minNum + 1, 10)
            } else {
                return parseInt(
                    Math.random() * (maxNum - minNum + 1) + minNum,
                    10
                )
            }
        }
    },
    mounted() {
        const { createData } = this
        createData()
        setInterval(createData, 3000)
    }
}
</script>

<style lang="less">
#rose-chart {
    width: 100%;
    height: 100%;
    background-color: rgba(6, 30, 93, 0.5);
    border-top: 2px solid rgba(1, 153, 209, 0.5);
    box-sizing: border-box;
    .rose-chart-title {
        height: 50px;
        font-weight: bold;
        text-indent: 20px;
        font-size: 20px;
        display: flex;
        align-items: center;
    }
    .dv-charts-container {
        height: calc(~'100% - 50px');
    }
}
</style>
