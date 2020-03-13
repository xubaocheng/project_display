<template>
    <div class="flop-box">
        <div class="flop-box-title">用户概况</div>
        <div id="digital-flop">
            <div
                class="digital-flop-item"
                v-for="item in digitalFlopData"
                :key="item.title"
            >
                <div class="digital-flop">
                    <dv-digital-flop
                        :config="item.number"
                        style="width:80px;height:50px;"
                    />
                    <!-- <div class="unit">{{ item.unit }}</div> -->
                </div>
                <div class="digital-flop-title">{{ item.title }}</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'DigitalFlop',
    data() {
        return {
            digitalFlopData: []
        }
    },
    methods: {
        createData() {
            const { randomExtend } = this

            this.digitalFlopData = [
                {
                    title: '本月新增',
                    number: {
                        number: [randomExtend(2000, 3000)],
                        content: '{nt}',
                        textAlign: 'right',
                        style: {
                            fill: '#4d99fc',
                            fontWeight: 'bold'
                        }
                    },
                    unit: '个'
                },
                {
                    title: '半年新增',
                    number: {
                        number: [randomExtend(20, 30)],
                        content: '{nt}',
                        textAlign: 'right',
                        style: {
                            fill: '#f46827',
                            fontWeight: 'bold'
                        }
                    },
                    unit: '个'
                },
                {
                    title: '本年度新增',
                    number: {
                        number: [randomExtend(20, 30)],
                        content: '{nt}',
                        textAlign: 'right',
                        style: {
                            fill: '#40faee',
                            fontWeight: 'bold'
                        }
                    },
                    unit: '个'
                },
                {
                    title: '用户总数',
                    number: {
                        number: [randomExtend(10, 20)],
                        content: '{nt}',
                        textAlign: 'right',
                        style: {
                            fill: '#4d99fc',
                            fontWeight: 'bold'
                        }
                    },
                    unit: '个'
                }
            ]
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

        setInterval(createData, 30000)
    }
}
</script>

<style lang="less">
.flop-box {
    width: 100%;
    height: 20%;
    &-title {
        line-height: 28px;
        text-indent: 20px;
        font-size: 16px;
    }
    #digital-flop {
        position: relative;
        flex-shrink: 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: rgba(6, 30, 93, 0.5);

        .digital-flop-item {
            height: 80%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            border-left: 3px solid rgb(6, 30, 93);
            border-right: 3px solid rgb(6, 30, 93);
        }

        .digital-flop-title {
            width: 100%;
            line-height: 40px;
            text-align: center;
            font-size: 13px;
            margin-bottom: 20px;
        }

        .digital-flop {
            display: flex;
        }

        .unit {
            margin-left: 10px;
            display: flex;
            align-items: flex-end;
            box-sizing: border-box;
            padding-bottom: 13px;
        }
    }
}
</style>
