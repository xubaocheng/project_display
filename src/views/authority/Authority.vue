<!-- 用户列表 -->
<template>
    <div class="authority-list">
        <!--工具条-->
        <div class="toolbar">
            <el-row>
                <el-col :span="6">
                    <el-button type="danger" @click="batchRemove"
                        >批量删除</el-button
                    >
                    <el-button type="primary" @click="handleAdd"
                        >添加页面</el-button
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
                    <el-button type="primary" @click="getAuthorityList"
                        >搜索</el-button
                    >
                </el-col>
            </el-row>
        </div>
        <!--列表-->
        <el-table
            :data="listData"
            highlight-current-row
            v-loading="listLoading"
            @selection-change="selsChange"
            style="width: 100%;"
        >
            <el-table-column type="selection" width="55"> </el-table-column>
            <el-table-column prop="name" label="名称" width="150" sortable>
            </el-table-column>
            <el-table-column
                prop="parentName"
                label="父级名称"
                width="150"
                sortable
            >
            </el-table-column>
            <el-table-column prop="url" label="地址" min-width="200" sortable>
            </el-table-column>
            <el-table-column prop="level" label="等级" min-width="80" sortable>
            </el-table-column>
            <el-table-column
                prop="isdisplay"
                label="状态"
                min-width="80"
                :formatter="statuFormat"
                sortable
            >
            </el-table-column>
            <el-table-column
                prop="description"
                label="描述"
                min-width="300"
                sortable
            >
            </el-table-column>
            <el-table-column label="操作" width="300" fixed="right">
                <template slot-scope="scope">
                    <el-button size="small" @click="handleEdit(scope.row)"
                        >编辑</el-button
                    >
                    <el-button
                        type="danger"
                        size="small"
                        @click="handleDel(scope.row)"
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
        <!--新增、编辑界面-->
        <el-dialog
            :title="textMap[dialogStatus]"
            :visible.sync="dialogFormVisible"
            :close-on-click-modal="false"
            top="4vh"
        >
            <el-form
                :model="editForm"
                label-width="80px"
                :rules="editFormRules"
                ref="editForm"
            >
                <el-form-item label="名称" prop="name">
                    <el-input
                        v-model="editForm.name"
                        auto-complete="off"
                    ></el-input>
                </el-form-item>
                <el-form-item label="URL" prop="url">
                    <el-input
                        v-model="editForm.url"
                        auto-complete="off"
                    ></el-input>
                </el-form-item>
                <el-form-item label="排序" prop="displayOrder">
                    <el-input
                        v-model="editForm.displayOrder"
                        auto-complete="off"
                    ></el-input>
                </el-form-item>
                <el-form-item label="父级" prop="parentid">
                    <el-select
                        v-model="editForm.parentid"
                        placeholder="请选择"
                        style="width:555px;"
                        @change="parentChange"
                    >
                        <el-option
                            v-for="item in parent"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id"
                        >
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="是否显示">
                    <el-switch
                        v-model="editForm.isDisplay"
                        active-color="#13ce66"
                        inactive-color="#ff4949"
                        :active-value="1"
                        :inactive-value="0"
                    ></el-switch>
                </el-form-item>
                <el-form-item label="描述" prop="description">
                    <el-input
                        v-model="editForm.description"
                        auto-complete="off"
                    ></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="cancelBtnFn('editForm')">取消</el-button>
                <el-button
                    v-if="dialogStatus == 'create'"
                    type="primary"
                    @click="submitBtnFn('editForm')"
                    >添加</el-button
                >
                <el-button
                    v-else
                    type="primary"
                    @click="submitBtnFn('editForm')"
                    >修改</el-button
                >
            </div>
        </el-dialog>
    </div>
</template>

<script>
import {
    authorityList,
    parentData,
    add,
    del,
    getDetail
} from '../../api/module'
export default {
    name: 'authoritylist',
    components: {},
    data() {
        return {
            total: 1,
            pageIndex: 1,
            pageSize: 10,
            listData: [],
            searchInput: '',
            listLoading: false,
            //新增、编辑弹框
            dialogStatus: '', //是新增或者编辑状态
            dialogFormVisible: false,
            textMap: {
                update: '编辑',
                create: '添加'
            },
            //下拉框父级数据
            parent: [],
            //弹框表单验证规则
            editFormRules: {
                name: [
                    {
                        required: true,
                        message: '请输入权限名称',
                        trigger: 'blur'
                    }
                ],
                displayOrder: [
                    { required: true, message: '请输入排序', trigger: 'blur' },
                    {
                        validator: function(rule, value, callback) {
                            if (/^[0-9]*[1-9][0-9]*$/.test(value) === false) {
                                callback(new Error('请输入数字'))
                            } else {
                                callback()
                            }
                        },
                        trigger: 'blur'
                    }
                ]
            },
            // 新增、编辑界面数据
            editForm: {
                id: '', //id
                name: '', //	权限名
                parentid: '', //	父级id
                parentName: '', //	父级名字
                isDisplay: 1, //	是否可用
                displayOrder: '', //	排序
                url: '', //	路径
                description: '', //	备注
                level: '' //	级别
            },
            // 列表选中列
            sels: []
        }
    },
    mounted() {
        this.getAuthorityList()
        this.getParentData()
    },
    methods: {
        //获取权限列表、搜索权限
        getAuthorityList() {
            let params = {
                name: this.searchInput,
                pageIndex: this.pageIndex,
                pageSize: this.pageSize
            }
            this.listLoading = true
            authorityList(params).then(res => {
                if (res.code == '200') {
                    this.listData = res.data.list
                    this.total = res.data.totalRecords
                    this.listLoading = false
                } else {
                    this.$message.error(res.message)
                    this.listLoading = false
                }
            })
        },
        // 状态显示转换
        statuFormat: function(row) {
            return row.isdisplay === true
                ? '显示'
                : row.isdisplay === false
                ? '不显示'
                : '未知'
        },
        // 获取父级下拉框数据
        getParentData() {
            parentData().then(res => {
                this.parent = res.data
            })
        },
        //父级下拉选择事件
        parentChange(val) {
            console.log(val)
        },
        // 显示新增界面
        handleAdd() {
            this.dialogStatus = 'create'
            this.dialogFormVisible = true
            this.editForm.id = ''
        },
        //新增/编辑提交方法
        submitBtnFn(formName) {
            let parentName = this.parent.filter(
                item => item.id == this.editForm.parentid
            )[0].name
            let level = this.parent.filter(
                item => item.id === this.editForm.parentid
            )[0].level
            let params = {
                id: this.editForm.id, //id
                name: this.editForm.name, //	权限名
                parentid: this.editForm.parentid, //	父级id
                parentName: parentName, //	父级名字
                isDisplay: this.editForm.isDisplay, //	是否可用
                displayOrder: this.editForm.displayOrder, //	排序
                url: this.editForm.url, //	路径
                description: this.editForm.description, //	备注
                level: level + 1 //	级别
            }
            add(params).then(res => {
                if (res.code === '200') {
                    this.dialogFormVisible = false
                    this.$refs[formName].resetFields()
                    this.$message.success(res.message)
                    this.getAuthorityList()
                } else {
                    this.$message.error(res.message)
                }
            })
        },
        //编辑按钮
        handleEdit(row) {
            this.dialogStatus = 'update'
            this.dialogFormVisible = true
            this.getItemDetail(row)
        },
        //获取详情
        getItemDetail(row) {
            this.editForm.id = row.id
            let params = { menuid: this.editForm.id }
            getDetail(params).then(res => {
                if (res.code === '200') {
                    this.editForm = res.data[0]
                }
            })
        },
        //取消弹框 重置表单
        cancelBtnFn(formName) {
            this.dialogFormVisible = false
            this.$refs[formName].resetFields()
        },
        // 全选单选多选
        selsChange(sels) {
            this.sels = sels
        },
        // 批量删除
        batchRemove() {
            if (this.sels.length < 1) return false
            let arr = this.sels.map(item => {
                return item.id
            })
            let params = { menuid: arr }
            del(params).then(res => {
                if (res.code === '200') {
                    this.$message.success(res.message)
                    this.getAuthorityList()
                } else {
                    this.$message.error(res.message)
                    this.getAuthorityList()
                }
            })
        },
        //删除
        handleDel(row) {
            let arr = []
            arr.push(row.id)
            let params = { menuid: arr }
            del(params).then(res => {
                if (res.code === '200') {
                    this.$message.success(res.message)
                    this.getAuthorityList()
                } else {
                    this.$message.error(res.message)
                    this.getAuthorityList()
                }
            })
        },
        //分页
        handleCurrentChange(val) {
            this.pageIndex = val
            this.getAuthorityList()
        }
    }
}
</script>
<style lang="less" scoped>
.authority-list {
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
