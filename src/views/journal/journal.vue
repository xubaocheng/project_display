<!-- journal日志管理 -->
<template>
    <div class="journal">
        <section class="app-container">
            <!--工具条-->
            <el-col :span="24" class="toolbar">
                <el-form :inline="true" :model="filters" @submit.native.prevent>
                    <el-form-item>
                        <el-input
                            v-model="filters.username"
                            placeholder="用户名称"
                        ></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-date-picker
                            type="date"
                            placeholder="选择开始日期"
                            format="yyyy-MM-dd"
                            v-model="filters.starttime"
                            :picker-options="pickerBeginDateBefore"
                        ></el-date-picker>
                    </el-form-item>
                    <el-form-item>
                        <el-date-picker
                            type="date"
                            placeholder="选择结束日期"
                            format="yyyy-MM-dd"
                            v-model="filters.endtime"
                            :picker-options="pickerBeginDateAfter"
                        ></el-date-picker>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" v-on:click="getPage(1)"
                            >查询</el-button
                        >
                    </el-form-item>
                </el-form>
            </el-col>

            <!--列表-->
            <el-table
                :data="logs"
                border
                highlight-current-row
                v-loading="listLoading"
                style="width: 100%;"
            >
                <el-table-column
                    prop="user.name"
                    label="用户名"
                    width="120"
                    sortable
                >
                </el-table-column>
                <el-table-column
                    prop="operation"
                    label="操作"
                    min-width="100"
                    sortable
                >
                </el-table-column>
                <el-table-column
                    prop="value"
                    label="值"
                    min-width="250"
                    sortable
                >
                </el-table-column>
                <el-table-column
                    prop="description"
                    label="描述"
                    min-width="120"
                    sortable
                >
                </el-table-column>
                <el-table-column
                    prop="ip"
                    label="IP地址"
                    min-width="80"
                    sortable
                >
                </el-table-column>
                <el-table-column
                    prop="date"
                    label="日期"
                    :formatter="dateFormat"
                    min-width="100"
                    sortable
                >
                </el-table-column>
            </el-table>

            <!--工具条-->
            <el-col :span="24" class="toolbar">
                <el-pagination
                    background
                    layout="prev, pager, next"
                    @current-change="handleCurrentChange"
                    :page-size="10"
                    :total="total"
                    style="float:right;"
                >
                </el-pagination>
            </el-col>
        </section>
    </div>
</template>

<script>
import { getList } from '@/api/journal'
import util from '@/utils/table.js'
import moment from 'moment'
export default {
    name: 'journal',
    data() {
        return {
            filters: {
                username: '',
                starttime: '',
                endtime: ''
            },
            logs: [],
            total: 0,
            pageSize: 10,
            pageIndex: 1,
            listLoading: false,
            pickerBeginDateBefore: {
                disabledDate: time => {
                    const beginDateVal = this.filters.starttime
                    if (beginDateVal) {
                        return time.getTime() > beginDateVal
                    }
                }
            },
            pickerBeginDateAfter: {
                disabledDate: time => {
                    const beginDateVal = this.filters.endtime
                    if (beginDateVal) {
                        return time.getTime() < beginDateVal
                    }
                }
            }
        }
    },
    methods: {
        // 时间格式化
        dateFormat: function(row, column) {
            var date = row[column.property]
            if (date === undefined) {
                return ''
            }
            return moment(date).format('YYYY-MM-DD HH:mm:ss')
        },
        //分页
        handleCurrentChange(val) {
            this.getPage(val)
        },
        // 获取日志列表
        getPage(val) {
            this.listLoading = true
            this.pageIndex = val
            const param = {
                username: this.filters.username,
                starttime: this.filters.starttime,
                endtime: this.filters.endtime,
                pageIndex: this.pageIndex,
                pageSize: this.pageSize
            }
            param.starttime =
                !param.starttime || param.starttime === ''
                    ? ''
                    : util.formatDate.format(
                          new Date(param.starttime),
                          'yyyy-MM-dd hh:mm:ss'
                      )
            param.endtime =
                !param.endtime || param.endtime === ''
                    ? ''
                    : util.formatDate.format(
                          new Date(param.endtime),
                          'yyyy-MM-dd hh:mm:ss'
                      )
            getList(param).then(res => {
                if (res.code == '200') {
                    this.listLoading = false
                    this.total = res.data.totalRecords
                    this.logs = res.data.list
                } else {
                    this.listLoading = false
                    this.$message.error(res.message)
                }
            })
        }
    },
    mounted() {
        this.getPage(1)
    }
}
</script>
<style lang="less" scoped>
.journal {
    width: 100%;
    .toolbar {
        padding: 10px 10px 0 10px;
        background: #fff;
        text-align: right;
    }
}
</style>
