<!-- 用户列表 -->
<template>
    <div class="user-list">
        <!--工具条-->
        <div class="toolbar">
            <el-row>
                <el-col :span="6">
                    <el-button type="danger" @click="userRemove"
                        >批量删除</el-button
                    >
                    <el-button type="primary" @click="addUser"
                        >添加用户</el-button
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
                    <el-button type="primary" @click="getUserList"
                        >搜索</el-button
                    >
                </el-col>
            </el-row>
        </div>
        <!--列表-->
        <el-table
            :data="usersData"
            highlight-current-row
            v-loading="listLoading"
            @selection-change="selsChange"
            style="width: 100%;"
        >
            <el-table-column type="selection" width="55"> </el-table-column>
            <el-table-column prop="name" label="姓名" width="120" sortable>
            </el-table-column>
            <el-table-column prop="email" label="邮箱" min-width="150" sortable>
            </el-table-column>
            <el-table-column prop="phone" label="电话" min-width="150" sortable>
            </el-table-column>
            <el-table-column
                prop="code"
                label="状态"
                :formatter="codeFormat"
                width="80"
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
                        type="warning"
                        size="small"
                        @click="handleEditPassword(scope.$index, scope.row)"
                        >修改密码</el-button
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
                        @click="handleRole(scope.$index, scope.row)"
                        >角色</el-button
                    >
                    <el-button
                        type="success"
                        size="small"
                        @click="auditUser(scope.row)"
                        >{{ scope.row.state ? '停用' : '启用' }}</el-button
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

        <!-- 添加用户弹框 -->
        <el-dialog :title="textMap[userStatus]" :visible.sync="userDialog">
            <el-form
                :model="userForm"
                :label-width="formLabelWidth"
                :rules="userFormRules"
                ref="userForm"
            >
                <el-form-item label="用户名" prop="name">
                    <el-input v-model="userForm.name"></el-input>
                </el-form-item>
                <el-form-item
                    label="密码"
                    prop="password"
                    v-if="userStatus === 'create'"
                >
                    <el-input
                        type="password"
                        v-model="userForm.password"
                    ></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="userForm.email"></el-input>
                </el-form-item>
                <el-form-item label="电话" prop="phone">
                    <el-input v-model="userForm.phone"></el-input>
                </el-form-item>
                <el-form-item label="启用">
                    <el-switch
                        v-model="userForm.state"
                        active-color="#13ce66"
                        inactive-color="#ff4949"
                        :active-value="1"
                        :inactive-value="0"
                    ></el-switch>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="cancelBtnFn('userForm')">取 消</el-button>
                <el-button
                    v-if="userStatus == 'create'"
                    type="primary"
                    @click="submitBtnFn('userForm')"
                    >确认</el-button
                >
                <el-button v-else type="primary" @click="editBtnFn('userForm')"
                    >确认</el-button
                >
            </div>
        </el-dialog>
        <!--修改密码界面-->
        <el-dialog
            title="修改密码"
            :visible.sync="passwordFormVisible"
            :close-on-click-modal="false"
        >
            <el-form
                :model="passwordForm"
                :rules="passwordRules"
                label-width="100px"
                ref="passwordForm"
            >
                <el-form-item label="新密码" prop="newPassword">
                    <el-input
                        :type="typeIsPass"
                        v-model="passwordForm.newPassword"
                    ></el-input>
                    <span class="show-pwd" @click="eyeHandler"
                        ><i
                            :class="
                                showOrHide
                                    ? 'icon-myicon-test'
                                    : 'icon-myicon-test1'
                            "
                        ></i
                    ></span>
                </el-form-item>
                <el-form-item label="确认密码" prop="checkPass">
                    <el-input
                        type="password"
                        v-model="passwordForm.checkPass"
                        autocomplete="off"
                    ></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="PasswordResetForm('passwordForm')"
                    >取消</el-button
                >
                <el-button @click="changePassword('passwordForm')"
                    >确定</el-button
                >
            </div>
        </el-dialog>
        <!--角色界面-->
        <el-dialog
            :title="role"
            :visible.sync="roleFormVisible"
            :close-on-click-modal="false"
        >
            <el-form :model="roleForm" label-width="80px" ref="roleForm">
                <el-input
                    v-model="roleForm.userid"
                    style="display: block"
                    v-if="false"
                ></el-input>
                <el-form-item label="角色">
                    <el-select
                        v-model="roleForm.roleids"
                        multiple
                        placeholder="请选择"
                        style="width:555px;"
                    >
                        <el-option
                            v-for="item in roles"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id"
                        >
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="roleFormVisible = false"
                    >取消</el-button
                >
                <el-button @click="createRole">确定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import {
    userList,
    add,
    getDetail,
    del,
    changeUserPassword,
    changeState,
    rolesList,
    getUserRolesList,
    addUserRoles
} from '../../api/user'
export default {
    name: 'userlist',
    components: {},
    data() {
        return {
            total: 1000,
            pageIndex: 1,
            pageSize: 10,
            usersData: [],
            searchInput: '',
            listLoading: false,

            // 添加用户参数
            userStatus: '', //弹框是新增或者编辑状态
            textMap: {
                update: '编辑',
                create: '添加'
            },
            userDialog: false, //控制弹框是否显示
            userForm: {
                id: '',
                name: '', //用户名
                password: '', //密码
                email: '', //邮箱
                phone: '', //电话
                state: 0 //0不可用，1可用
            },
            userFormRules: {
                name: [
                    {
                        required: true,
                        message: '请输入用户账号',
                        trigger: 'blur'
                    },
                    {
                        validator: function(rule, value, callback) {
                            if (/^[a-zA-Z0-9_-]{4,16}$/.test(value) === false) {
                                callback(new Error('请输入正确的用户名'))
                            } else {
                                callback()
                            }
                        },
                        trigger: 'blur'
                    }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    {
                        validator: function(rule, value, callback) {
                            if (
                                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[\S]{6,18}$/.test(
                                    value
                                ) === false
                            ) {
                                callback(
                                    new Error(
                                        '密码至少8-16个字符，包含至少1个大写字母，1个小写字母和1个数字'
                                    )
                                )
                            } else {
                                callback()
                            }
                        },
                        trigger: 'blur'
                    }
                ],
                email: [
                    { required: true, message: '请输入邮箱', trigger: 'blur' },
                    {
                        validator: function(rule, value, callback) {
                            if (
                                /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/.test(
                                    value
                                ) === false
                            ) {
                                callback(new Error('请输入正确的邮箱'))
                            } else {
                                callback()
                            }
                        },
                        trigger: 'blur'
                    }
                ],
                phone: [
                    {
                        required: true,
                        message: '请输入电话号码',
                        trigger: 'blur'
                    },
                    {
                        validator: function(rule, value, callback) {
                            if (/^1[34578]\d{9}$/.test(value) === false) {
                                callback(new Error('请输入正确的手机号'))
                            } else {
                                callback()
                            }
                        },
                        trigger: 'blur'
                    }
                ]
            },
            formLabelWidth: '120px',
            //修改密码
            passwordFormVisible: false,
            passwordForm: {
                newPassword: '',
                checkPass: ''
            },
            userPasswordId: '',
            typeIsPass: 'password',
            showOrHide: false,
            passwordRules: {
                newPassword: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    {
                        validator: function(rule, value, callback) {
                            if (
                                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[\S]{6,18}$/.test(
                                    value
                                ) === false
                            ) {
                                callback(
                                    new Error(
                                        '密码至少8-16个字符，包含至少1个大写字母，1个小写字母和1个数字'
                                    )
                                )
                            } else {
                                callback()
                            }
                        },
                        trigger: 'blur'
                    }
                ],
                checkPass: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    {
                        validator: (rule, value, callback) => {
                            if (value === '') {
                                callback(new Error('请再次输入密码'))
                            } else if (
                                value !== this.passwordForm.newPassword
                            ) {
                                callback(new Error('两次输入密码不一致!'))
                            } else {
                                callback()
                            }
                        },
                        trigger: 'blur'
                    }
                ]
            },
            //角色
            role: '角色',
            roleFormVisible: false,
            roleForm: {
                userid: '',
                roleids: []
            },
            ids: [],
            roles: [],
            // 列表选中列
            sels: []
        }
    },
    mounted() {
        this.getUserList()
        this.getRolesList()
    },
    methods: {
        //获取用户列表
        getUserList() {
            this.listLoading = true
            let params = {
                name: this.searchInput,
                pageIndex: this.pageIndex,
                pageSize: this.pageSize
            }
            userList(params).then(res => {
                if (res.code == '200') {
                    this.usersData = res.data.list
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
        userRemove() {
            if (this.sels.length < 1) return false
            let arr = this.sels.map(item => {
                return item.id
            })
            let params = { userid: arr }
            del(params).then(res => {
                if (res.code === '200') {
                    this.$message.success(res.message)
                    this.getUserList()
                }
            })
        },
        //添加用户
        addUser() {
            this.userStatus = 'create'
            this.userDialog = true
            this.userForm.id = ''
        },
        //新增提交方法
        submitBtnFn(formName) {
            let params = {
                id: this.userForm.id,
                name: this.userForm.name, //用户名
                password: this.$md5(this.userForm.password), //密码
                email: this.userForm.email, //邮箱
                phone: this.userForm.phone, //电话
                state: this.userForm.state //0不可用，1可用
            }
            add(params).then(res => {
                if (res.code === '200') {
                    this.userDialog = false
                    this.$refs[formName].resetFields()
                    this.$message.success(res.message)
                    this.getUserList()
                } else {
                    this.$message.error(res.message)
                }
            })
        },
        //编辑
        handleEdit(index, row) {
            this.userStatus = 'update'
            this.userDialog = true
            this.getItemDetail(index, row)
        },
        //获取详情
        getItemDetail(index, row) {
            this.userForm.id = row.id
            let params = { userid: this.userForm.id }
            getDetail(params).then(res => {
                if (res.code === '200') {
                    this.userForm = res.data[0]
                    console.log(this.userForm)
                }
            })
        },
        //编辑修改提交
        editBtnFn(formName) {
            this.userForm.password = ''
            let params = this.userForm
            add(params).then(res => {
                if (res.code === '200') {
                    this.userDialog = false
                    this.$refs[formName].resetFields()
                    this.$message.success(res.message)
                    this.getUserList()
                } else {
                    this.$message.error(res.message)
                }
            })
        },
        //
        //取消弹框 重置表单
        cancelBtnFn(formName) {
            this.userDialog = false
            this.$refs[formName].resetFields()
        },
        //是否显示密码
        eyeHandler: function() {
            this.showOrHide = !this.showOrHide
            this.showOrHide
                ? (this.typeIsPass = 'text')
                : (this.typeIsPass = 'password')
        },
        //显示修改密码界面
        handleEditPassword(index, row) {
            console.log(row)
            this.userPasswordId = row.id
            this.passwordFormVisible = true
        },
        //密码取消按钮事件
        PasswordResetForm(formName) {
            this.$refs[formName].resetFields()
            this.passwordFormVisible = false
        },
        //密码修改确认按钮
        changePassword(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    const params = {
                        userid: this.userPasswordId,
                        password: this.$md5(this.passwordForm.newPassword)
                    }
                    changeUserPassword(params).then(res => {
                        if (res.code === '200') {
                            this.passwordFormVisible = false
                            this.$message.success(res.message)
                            this.PasswordResetForm(formName)
                            this.getUserList()
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
        //删除
        handleDel(index, row) {
            let arr = []
            arr.push(row.id)
            let params = { userid: arr }
            del(params).then(res => {
                if (res.code === '200') {
                    this.$message.success(res.message)
                    this.getUserList()
                } else {
                    this.$message.error(res.message)
                    this.getUserList()
                }
            })
        },
        //启用/禁用
        auditUser(row) {
            console.log(row)
            let params = {
                userid: row.id,
                state: row.state ? 0 : 1
            }
            changeState(params).then(res => {
                if (res.code === '200') {
                    this.$message.success(res.message)
                    this.getUserList()
                } else {
                    this.$message.error(res.message)
                }
            })
        },
        // 状态显示转换
        codeFormat: function(row) {
            return row.state === 1
                ? '已审核'
                : row.state === 0
                ? '已禁用'
                : '未知'
        },
        //分页
        handleCurrentChange(val) {
            this.pageIndex = val
            this.getUserList()
        },
        //获取角色下拉框
        getRolesList() {
            rolesList().then(res => {
                if (res.code === '200') {
                    this.roles = res.data
                } else {
                    this.$message.error(res.message)
                }
            })
        },
        //获取角色列表
        handleRole(index, row) {
            this.roleFormVisible = true
            this.roleForm.userid = row.id
            // this.roleForm = Object.assign({}, row)
            let params = {
                userid: this.roleForm.userid
            }
            getUserRolesList(params).then(res => {
                const result = res.data
                for (var i = 0; i < result.length; i++) {
                    this.ids.push(res.data[i].roleid)
                }
                this.roleForm.roleids = this.ids
                this.ids = []
            })
        },
        // 添加角色
        createRole() {
            this.$refs.roleForm.validate(valid => {
                if (valid) {
                    const param = {
                        userid: this.roleForm.userid,
                        roleids: this.roleForm.roleids
                    }
                    addUserRoles(param).then(res => {
                        if (res.code === '200') {
                            this.$message.success(res.message)
                        } else {
                            this.$message.error(res.message)
                        }
                        this.roleFormVisible = false
                    })
                }
            })
        }
    }
}
</script>
<style lang="less" scoped>
.user-list {
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
    .show-pwd {
        position: absolute;
        right: 10px;
        top: 0;
        font-size: 16px;
        color: #889aa4;
        cursor: pointer;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }
}
</style>
