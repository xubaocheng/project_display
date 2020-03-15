<template>
    <div id="ranking-board">
        <div class="ranking-board-title">模块访问统计</div>
        <dv-charts :option="option" />
    </div>
</template>

<script>
export default {
    name: 'RankingBoard',
    data() {
        return {
            option: {
                series: [
                    {
                        type: 'pie',
                        data: [
                            { name: '课程', value: 55 },
                            { name: '课件', value: 120 },
                            { name: '解读', value: 78 },
                            { name: '分享', value: 66 }
                        ],
                        insideLabel: {
                            show: true
                        }
                    }
                ]
            }
        }
    }
}
</script>

<style lang="less">
#ranking-board {
    width: 100%;
    height: 100%;
    box-shadow: 0 0 3px blue;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    padding: 0px 30px;

    .ranking-board-title {
        font-weight: bold;
        height: 50px;
        display: flex;
        align-items: center;
        font-size: 20px;
    }
}
</style>
