<template>
    <div id="scroll-board">
        <dv-scroll-board :config="config" />
    </div>
</template>

<script>
export default {
    name: 'ScrollBoard',
    data() {
        return {
            config: {
                header: ['时间', '类型', '数量', '进度'],
                data: [
                    ['2019-07-01 19:25:00', '类型一', '5', 'xxxxxxx'],
                    ['2019-07-02 17:25:00', '类型二', '13', 'xxxxxxx'],
                    ['2019-07-03 16:25:00', '类型三', '6', 'xxxxxxx'],
                    ['2019-07-04 15:25:00', '类型四', '2', 'xxxxxxx'],
                    ['2019-07-05 14:25:00', '类型五', '1', 'xxxxxxx'],
                    ['2019-07-06 13:25:00', '类型六', '3', 'xxxxxxx'],
                    ['2019-07-07 12:25:00', '类型七', '4', 'xxxxxxx'],
                    ['2019-07-08 11:25:00', '类型八', '2', 'xxxxxxx'],
                    ['2019-07-09 10:25:00', '类型九', '5', 'xxxxxxx'],
                    ['2019-07-10 09:25:00', '类型十', '3', 'xxxxxxx']
                ],
                index: true,
                columnWidth: [50, 170, 100],
                align: ['center'],
                rowNum: 7,
                headerBGC: '#1981f6',
                headerHeight: 45,
                oddRowBGC: 'rgba(0, 44, 81, 0.8)',
                evenRowBGC: 'rgba(10, 29, 50, 0.8)'
            }
        }
    }
}
</script>

<style lang="less">
#scroll-board {
    width: 100%;
    box-sizing: border-box;
    height: 100%;
    overflow: hidden;
}
</style>
