<!-- 数据分类列表 -->
<template>
    <div class="Classified-list">
        <!--工具条-->
        <div class="toolbar">
            <el-row>
                <el-col :span="6">
                    <el-button type="danger" @click="tabRemove"
                        >批量删除</el-button
                    >
                    <el-button type="primary" @click="addTab"
                        >添加数据分类</el-button
                    >
                </el-col>
                <el-col :span="6">
                    <el-input
                        placeholder="请输入内容"
                        v-model="searchInput"
                        clearable
                        style="width:200px;margin-right:10px;"
                    >
                    </el-input>
                    <el-button type="primary" @click="getList">搜索</el-button>
                </el-col>
            </el-row>
        </div>
        <!--列表-->
        <el-table
            :data="tabsData"
            highlight-current-row
            v-loading="listLoading"
            @selection-change="selsChange"
            style="width: 100%;"
        >
            <el-table-column type="selection" width="55"> </el-table-column>
            <el-table-column
                prop="name"
                label="数据类型名称"
                width="120"
                sortable
            >
            </el-table-column>
            <el-table-column label="操作" min-width="450" fixed="right">
                <template slot-scope="scope">
                    <el-button
                        size="small"
                        type="info"
                        @click="handleEdit(scope.$index, scope.row)"
                        >编辑</el-button
                    >
                    <el-button
                        type="danger"
                        size="small"
                        @click="handleDel(scope.$index, scope.row)"
                        >删除</el-button
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

        <!-- 添加数据分类弹框 -->
        <el-dialog :title="textMap[tabStatus]" :visible.sync="tabDialog">
            <el-form
                :model="tabForm"
                :label-width="formLabelWidth"
                :rules="tabFormRules"
                ref="tabForm"
            >
                <el-form-item label="数据分类名称" prop="name">
                    <el-input v-model="tabForm.name"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="cancelBtnFn('tabForm')">取 消</el-button>
                <el-button
                    v-if="tabStatus == 'create'"
                    type="primary"
                    @click="submitBtnFn('tabForm')"
                    >确认</el-button
                >
                <el-button v-else type="primary" @click="editBtnFn('tabForm')"
                    >确认</el-button
                >
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { getList, add, getDetail, del } from '../../api/Classified'
export default {
    name: 'Classifiedlist',
    components: {},
    data() {
        return {
            total: 1000,
            pageIndex: 1,
            pageSize: 10,
            tabsData: [],
            searchInput: '',
            listLoading: false,

            // 添加数据分类参数
            tabStatus: '', //弹框是新增或者编辑状态
            textMap: {
                update: '编辑',
                create: '添加'
            },
            tabDialog: false, //控制弹框是否显示
            tabForm: {
                id: '',
                name: '' //数据分类名
            },
            tabFormRules: {
                name: [
                    {
                        required: true,
                        message: '请输入数据分类名称',
                        trigger: 'blur'
                    },
                    {
                        min: 3,
                        max: 5,
                        message: '长度在 3 到 5 个字符',
                        trigger: 'blur'
                    }
                ]
            },
            formLabelWidth: '120px',
            // 列表选中列
            sels: []
        }
    },
    mounted() {
        this.getList()
    },
    methods: {
        //获取数据分类列表
        getList() {
            this.listLoading = true
            let params = {
                name: this.searchInput,
                pageIndex: this.pageIndex,
                pageSize: this.pageSize
            }
            getList(params).then(res => {
                if (res.code == '200') {
                    this.tabsData = res.data.list
                    this.total = res.data.totalRecords
                    this.listLoading = false
                } else {
                    this.$message.error(res.message)
                    this.listLoading = false
                }
            })
        },
        // 全选单选多选
        selsChange(sels) {
            this.sels = sels
            console.log(this.sels)
        },
        //批量删除
        tabRemove() {
            if (this.sels.length < 1) return false
            let arr = this.sels.map(item => {
                return item.id
            })
            let params = { labelids: arr }
            del(params).then(res => {
                if (res.code === '200') {
                    this.$message.success(res.message)
                    this.getList()
                }
            })
        },
        //添加数据分类
        addTab() {
            this.tabStatus = 'create'
            this.tabDialog = true
            this.tabForm.id = ''
        },
        //新增提交方法
        submitBtnFn(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    let params = {
                        id: this.tabForm.id,
                        name: this.tabForm.name //名称
                    }
                    add(params).then(res => {
                        if (res.code === '200') {
                            this.tabDialog = false
                            this.$refs[formName].resetFields()
                            this.$message.success(res.message)
                            this.getList()
                        } else {
                            this.$message.error(res.message)
                        }
                    })
                } else {
                    console.log('error submit!!')
                    return false
                }
            })
        },
        //编辑
        handleEdit(index, row) {
            this.tabStatus = 'update'
            this.tabDialog = true
            this.handleItemDetail(index, row)
        },
        //获取详情
        handleItemDetail(index, row) {
            this.tabForm.id = row.id
            let params = { labelid: this.tabForm.id }
            getDetail(params).then(res => {
                if (res.code === '200') {
                    this.tabForm = res.data
                    console.log(this.tabForm)
                }
            })
        },
        //编辑修改提交
        editBtnFn(formName) {
            this.tabForm.password = ''
            let params = this.tabForm
            add(params).then(res => {
                if (res.code === '200') {
                    this.tabDialog = false
                    this.$refs[formName].resetFields()
                    this.$message.success(res.message)
                    this.getList()
                } else {
                    this.$message.error(res.message)
                }
            })
        },
        //
        //取消弹框 重置表单
        cancelBtnFn(formName) {
            this.tabDialog = false
            this.$refs[formName].resetFields()
        },
        //删除
        handleDel(index, row) {
            let arr = []
            arr.push(row.id)
            let params = { labelids: arr }
            del(params).then(res => {
                if (res.code === '200') {
                    this.$message.success(res.message)
                    this.getList()
                } else {
                    this.$message.error(res.message)
                    this.getList()
                }
            })
        },
        //分页
        handleCurrentChange(val) {
            this.pageIndex = val
            this.getList()
        }
    }
}
</script>
<style lang="less" scoped>
.Classified-list {
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
