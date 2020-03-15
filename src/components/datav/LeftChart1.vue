<template>
    <div class="left-chart-1">
        <div class="lc1-details">APP下载情况</div>
        <dv-capsule-chart class="lc1-chart" :config="config" />
        <dv-decoration-2 style="height:10px;" />
    </div>
</template>

<script>
export default {
    name: 'LeftChart1',
    data() {
        return {
            config: {
                data: [
                    {
                        name: '本月下载',
                        value: 167
                    },
                    {
                        name: '本年下载',
                        value: 267
                    },
                    {
                        name: '总下载',
                        value: 823
                    }
                ],
                colors: ['#00baff', '#3de7c9', '#469f4b'],
                unit: '个'
            }
        }
    }
}
</script>

<style lang="less">
.left-chart-1 {
    width: 100%;
    height: 100%;
    display: flex;
    flex-grow: 0;
    flex-direction: column;

    .lc1-details {
        font-weight: bold;
        height: 40px;
        display: flex;
        align-items: center;
        font-size: 20px;
        margin-bottom: 10px;

        span {
            color: #096dd9;
            font-weight: bold;
            font-size: 35px;
            margin-left: 20px;
        }
    }

    .lc1-chart {
        flex: 1;
    }
}
</style>
