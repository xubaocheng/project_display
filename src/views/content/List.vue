<!-- 内容列表 -->
<template>
    <div class="contentList">
        <!--工具条-->
        <div class="toolbar">
            <el-row>
                <el-col :span="6">
                    <el-button type="danger" @click="formRemove"
                        >批量删除</el-button
                    >
                    <el-button type="primary" @click="addForm"
                        >创建表单</el-button
                    >
                </el-col>
                <el-col :span="12">
                    <el-input
                        placeholder="请输入标题"
                        v-model="searchTitle"
                        clearable
                        style="width:200px;margin-right:10px;"
                    >
                    </el-input>
                    <el-select
                        v-model="searchLabel"
                        placeholder="请选择标签"
                        style="width:200px;margin-right:10px;"
                    >
                        <el-option
                            v-for="(item, index) in tabsData"
                            :key="`tabItem_${index}`"
                            :label="item.name"
                            :value="item.id"
                        ></el-option>
                    </el-select>
                    <el-button type="primary" @click="geFormList"
                        >搜索</el-button
                    >
                </el-col>
            </el-row>
        </div>
        <el-table
            :data="tableData"
            v-loading="listLoading"
            @selection-change="selsChange"
            border
            style="width: 100%"
        >
            <el-table-column type="selection" width="55"> </el-table-column>
            <el-table-column prop="title" label="标题"> </el-table-column>
            <el-table-column prop="labeName" label="标签"> </el-table-column>
            <el-table-column prop="content" label="内容"> </el-table-column>
            <el-table-column fixed="right" label="操作">
                <template slot-scope="scope">
                    <el-button
                        type="text"
                        size="small"
                        @click="handleDel(scope.$index, scope.row)"
                        >删除</el-button
                    >
                    <el-button
                        type="text"
                        size="small"
                        @click="editForm(scope.$index, scope.row)"
                        >编辑</el-button
                    >
                </template>
            </el-table-column>
        </el-table>
        <!--分页-->
        <div class="pageTools clearFix">
            <el-col :span="24">
                <el-pagination
                    layout="prev, pager, next"
                    @current-change="handleCurrentChange"
                    :page-size="pageSize"
                    :total="total"
                >
                </el-pagination>
            </el-col>
        </div>
    </div>
</template>

<script>
import { getTagList, contentList, del } from '../../api/content'
export default {
    name: 'contentList',
    components: {},
    data() {
        return {
            total: 1000,
            pageIndex: 1,
            pageSize: 10,
            tabsData: [],
            tableData: [],
            searchTitle: '',
            searchLabel: '',
            listLoading: false,
            // 列表选中列
            sels: []
        }
    },
    mounted() {
        // this.getTagList()
        this.geFormList()
    },
    methods: {
        //获取标签列表
        getTagList(data) {
            getTagList().then(res => {
                if (res.code == '200') {
                    this.tabsData = res.data
                    this.tableData = data
                    this.tableData.forEach(itemA => {
                        this.tabsData.forEach(itemB => {
                            if (itemA.labelId === itemB.id) {
                                itemA.labeName = itemB.name
                            }
                        })
                    })
                } else {
                    this.$message.error('标签' + res.message)
                }
            })
        },
        // 全选单选多选
        selsChange(sels) {
            this.sels = sels
        },
        //批量删除
        formRemove() {
            if (this.sels.length < 1) return false
            let arr = this.sels.map(item => {
                return item.id
            })
            let params = { contentid: arr }
            del(params).then(res => {
                if (res.code === '200') {
                    this.$message.success(res.message)
                    this.geFormList()
                }
            })
        },
        //单个删除
        handleDel(index, row) {
            let arr = []
            arr.push(row.id)
            let params = { contentid: arr }
            del(params).then(res => {
                if (res.code === '200') {
                    this.$message.success(res.message)
                    this.geFormList()
                } else {
                    this.$message.error(res.message)
                    this.geFormList()
                }
            })
        },
        //添加表单
        addForm() {
            this.$router.push({
                name: 'form',
                params: { name: 'add' }
            })
        },
        //编辑表单
        editForm(ixdex, row) {
            this.$router.push({
                name: 'form',
                params: { name: 'edit', id: row.id }
            })
        },
        //获取列表
        geFormList() {
            this.listLoading = true
            let params = {
                title: this.searchTitle,
                labelId: this.searchLabel,
                pageIndex: this.pageIndex,
                pageSize: this.pageSize
            }
            contentList(params).then(res => {
                if (res.code == '200') {
                    this.getTagList(res.data.list)
                    this.total = res.data.totalRecords
                    this.listLoading = false
                } else {
                    this.$message.error(res.message)
                    this.listLoading = false
                }
            })
        },
        //分页
        handleCurrentChange(val) {
            this.pageIndex = val
            this.geFormList()
        }
    }
}
</script>
<style lang="less" scoped>
.contentList {
    width: 100%;
    .toolbar {
        padding: 20px 10px;
        background: #fff;
    }
    .pageTools {
        width: 100%;
        background: #fff;
        text-align: right;
        padding-right: 50px;
        box-sizing: border-box;
    }
}
</style>
