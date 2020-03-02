<!-- 角色列表 -->
<template>
    <div class="roles-list">
        <!--工具条-->
        <div class="toolbar">
            <el-row>
                <el-col :span="6">
                    <el-button type="danger" @click="rolesRemove"
                        >批量删除</el-button
                    >
                    <el-button type="primary" @click="addrole"
                        >添加角色</el-button
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
                    <el-button type="primary" @click="getRolesList"
                        >搜索</el-button
                    >
                </el-col>
            </el-row>
        </div>
        <!--列表-->
        <el-table
            :data="rolesData"
            highlight-current-row
            v-loading="listLoading"
            @selection-change="selsChange"
            style="width: 100%;"
        >
            <el-table-column type="selection" width="55"> </el-table-column>
            <el-table-column prop="name" label="名称" width="300" sortable>
            </el-table-column>
            <el-table-column prop="describe" label="描述" width="600" sortable>
            </el-table-column>
            <el-table-column label="操作" width="300" fixed="right">
                <template slot-scope="scope">
                    <el-button
                        size="small"
                        @click="handleEdit(scope.$index, scope.row)"
                        >编辑</el-button
                    >
                    <el-button
                        type="danger"
                        size="small"
                        @click="handleDel(scope.$index, scope.row)"
                        >删除</el-button
                    >
                    <el-button
                        type="primary"
                        size="small"
                        @click="handleModule(scope.$index, scope.row)"
                        >权限</el-button
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
        <!-- 添加、编辑角色弹框 -->
        <el-dialog :title="textMap[roleStatus]" :visible.sync="roleDialog">
            <el-form
                :model="roleForm"
                :label-width="formLabelWidth"
                :rules="roleFormRules"
                ref="roleForm"
            >
                <el-form-item label="名称" prop="name">
                    <el-input
                        v-model="roleForm.name"
                        auto-complete="off"
                    ></el-input>
                </el-form-item>
                <el-form-item label="描述" prop="describe">
                    <el-input v-model="roleForm.describe"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="cancelBtnFn('roleForm')">取 消</el-button>
                <el-button
                    v-if="roleStatus == 'create'"
                    type="primary"
                    @click="submitBtnFn('roleForm')"
                    >确认</el-button
                >
                <el-button v-else type="primary" @click="editBtnFn('roleForm')"
                    >确认</el-button
                >
            </div>
        </el-dialog>
        <!--权限界面-->
        <el-dialog
            :title="module"
            :visible.sync="dialogModuleFormVisible"
            :close-on-click-modal="false"
            top="4vh"
        >
            <el-tree
                :data="tree"
                show-checkbox
                default-expand-all
                node-key="id"
                ref="tree"
                highlight-current
                :props="defaultProps"
            >
            </el-tree>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="dialogModuleFormVisible = false"
                    >取消</el-button
                >
                <el-button @click="getCheckedNodes">添加</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import {
    rolesList,
    del,
    add,
    getDetail,
    getRoleModule,
    saveRoleModule,
    moduleTree
} from '../../api/role'
export default {
    name: 'roleslist',
    components: {},
    data() {
        return {
            total: 1000,
            pageIndex: 1,
            pageSize: 10,
            rolesData: [],
            searchInput: '',
            listLoading: false,
            // 列表选中列
            sels: [],
            // 添加用户参数
            roleStatus: '', //弹框是新增或者编辑状态
            textMap: {
                update: '编辑',
                create: '添加'
            },
            roleDialog: false, //控制弹框是否显示
            roleForm: { id: '', name: '', describe: '' },
            roleFormRules: {
                name: [
                    {
                        required: true,
                        message: '请输入角色名称',
                        trigger: 'blur'
                    }
                ]
            },
            formLabelWidth: '120px',
            //权限弹框
            dialogModuleFormVisible: false,
            module: '权限',
            tree: [],
            check: [],
            defaultProps: {
                children: 'children',
                label: 'label'
            }
        }
    },
    mounted() {
        this.getRolesList()
        this.moduleTree()
    },
    methods: {
        //获取角色列表
        getRolesList() {
            this.listLoading = true
            let params = {
                name: this.searchInput,
                pageIndex: this.pageIndex,
                pageSize: this.pageSize
            }
            rolesList(params).then(res => {
                if (res.code == '200') {
                    this.rolesData = res.data.list
                    this.total = res.data.totalRecords
                    this.listLoading = false
                } else {
                    this.$message.error(res.message)
                    this.listLoading = false
                }
            })
        },
        //批量删除
        rolesRemove() {
            if (this.sels.length < 1) return false
            let arr = this.sels.map(item => {
                return item.id
            })
            let params = { roleid: arr }
            del(params).then(res => {
                if (res.code === '200') {
                    this.$message.success(res.message)
                    this.getRolesList()
                }
            })
        },
        //添加角色
        addrole() {
            this.roleStatus = 'create'
            this.roleDialog = true
            this.roleForm.id = ''
        },
        //新增提交方法
        submitBtnFn(formName) {
            let params = {
                id: this.roleForm.id,
                name: this.roleForm.name, //用户名
                describe: this.roleForm.describe //描述
            }
            add(params).then(res => {
                if (res.code === '200') {
                    this.roleDialog = false
                    this.$refs[formName].resetFields()
                    this.$message.success(res.message)
                    this.getRolesList()
                } else {
                    this.$message.error(res.message)
                }
            })
        },
        //编辑
        handleEdit(index, row) {
            this.roleStatus = 'update'
            this.roleDialog = true
            this.getItemDetail(index, row)
        },
        //获取详情
        getItemDetail(index, row) {
            this.roleForm.id = row.id
            let params = { roleid: this.roleForm.id }
            getDetail(params).then(res => {
                if (res.code === '200') {
                    this.roleForm = res.data[0]
                    console.log(this.roleForm)
                }
            })
        },
        //编辑修改提交
        editBtnFn(formName) {
            let params = this.roleForm
            add(params).then(res => {
                if (res.code === '200') {
                    this.roleDialog = false
                    this.$refs[formName].resetFields()
                    this.$message.success(res.message)
                    this.getRolesList()
                } else {
                    this.$message.error(res.message)
                }
            })
        },
        //
        //取消弹框 重置表单
        cancelBtnFn(formName) {
            this.roleDialog = false
            this.$refs[formName].resetFields()
        },
        //删除
        handleDel(index, row) {
            let arr = []
            arr.push(row.id)
            let params = { roleid: arr }
            del(params).then(res => {
                if (res.code === '200') {
                    this.$message.success(res.message)
                    this.getRolesList()
                } else {
                    this.$message.error(res.message)
                    this.getRolesList()
                }
            })
        },
        // 全选单选多选
        selsChange(sels) {
            this.sels = sels
        },
        //分页
        handleCurrentChange(val) {
            this.pageIndex = val
            this.getRolesList()
        },
        //权限树形
        moduleTree() {
            moduleTree().then(res => {
                this.tree = res.data
                // this.tree.forEach(item => {
                //     if (item.label === '首页') {
                //         item.disabled = true
                //     }
                // })
            })
        },
        //权限确认事件
        getCheckedNodes() {
            console.log(this.$refs.tree.getCheckedNodes(false, true))
            this.$confirm('确认提交吗？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
                .then(() => {
                    let menuids = this.$refs.tree
                        .getCheckedNodes(false, true)
                        .map(item => {
                            return item.id
                        })
                    let params = {
                        roleid: this.roleid,
                        menuids: menuids
                    }
                    saveRoleModule(params).then(res => {
                        if (res.code === '200') {
                            this.dialogModuleFormVisible = false
                            this.$message.success(res.message)
                            this.getRolesList()
                        } else {
                            this.$message.error(res.message)
                        }
                    })
                })
                .catch(err => {
                    // 打印一下错误
                    console.log(err)
                })
        },
        // 显示权限界面-
        handleModule(index, row) {
            this.check = []
            this.roleid = row.id
            const para = JSON.stringify({
                roleid: row.id
            })
            getRoleModule(para).then(res => {
                var rolemodule = res.data

                var test = this.filterRolesFn(this.tree, rolemodule)
                for (let i = 0; i < test.length; i++) {
                    if (test[i].children) {
                        var a = rolemodule.map(item => {
                            return item.menuid
                        })
                        var b = test[i].children.map(item => {
                            return item.id
                        })
                        if (!this.isContained(a, b)) {
                            rolemodule = rolemodule.filter(item => {
                                return item.menuid !== test[i].id
                            })
                        }
                    }
                }
                for (var i = 0; i < rolemodule.length; i++) {
                    this.check.push(rolemodule[i].menuid)
                }
                this.$refs.tree.setCheckedKeys(this.check)
            })
            this.dialogModuleFormVisible = true
        },
        //过滤角色权限一
        filterRolesFn(allRoles, currentRole) {
            return allRoles.filter(item => {
                for (let i = 0; i < currentRole.length; i++) {
                    if (item.id == currentRole[i].menuid) {
                        return item
                    }
                }
            })
        },
        //是否被包含,是返回true,不是返回false
        isContained(a, b) {
            if (!(a instanceof Array) || !(b instanceof Array)) return false
            if (a.length < b.length) return false
            var aStr = a.toString()
            for (var i = 0, len = b.length; i < len; i++) {
                if (aStr.indexOf(b[i]) == -1) return false
            }
            return true
        }
    }
}
</script>
<style lang="less" scoped>
.roles-list {
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
