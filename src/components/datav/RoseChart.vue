<template>
    <div id="rose-chart">
        <div class="rose-chart-title">项目</div>
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
                            { name: '类型一', value: randomExtend(40, 70) },
                            { name: '类型二', value: randomExtend(20, 30) },
                            { name: '类型三', value: randomExtend(10, 50) },
                            { name: '类型四', value: randomExtend(5, 20) },
                            { name: '类型五', value: randomExtend(40, 50) },
                            { name: '类型六', value: randomExtend(20, 30) },
                            { name: '类型七', value: randomExtend(5, 10) },
                            { name: '类型八', value: randomExtend(20, 35) },
                            { name: '类型九', value: randomExtend(5, 10) }
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
                    '#da2f00',
                    '#fa3600',
                    '#ff4411',
                    '#ff724c',
                    '#541200',
                    '#801b00',
                    '#a02200',
                    '#5d1400',
                    '#b72700'
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
