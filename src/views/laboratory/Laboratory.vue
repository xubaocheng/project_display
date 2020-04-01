<!-- 实验室轮播图 -->
<template>
    <div class="laboratory">
        <div class="laboratory-list">
            <!--工具条-->
            <div class="toolbar">
                <el-row>
                    <el-col :span="6">
                        <el-button type="danger" @click="labRemove"
                            >批量删除</el-button
                        >
                        <el-button type="primary" @click="labAdd"
                            >添加</el-button
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
                        <el-button type="primary" @click="getLabList"
                            >搜索</el-button
                        >
                    </el-col>
                </el-row>
            </div>
            <!--列表-->
            <el-table
                :data="labList"
                highlight-current-row
                v-loading="listLoading"
                @selection-change="selsChange"
                style="width: 100%;"
            >
                <el-table-column type="selection" width="55"> </el-table-column>
                <el-table-column prop="name" label="姓名" width="120" sortable>
                </el-table-column>
                <el-table-column
                    prop="email"
                    label="邮箱"
                    min-width="150"
                    sortable
                >
                </el-table-column>
                <el-table-column
                    prop="phone"
                    label="电话"
                    min-width="150"
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
                        <el-button type="primary" size="small">查看</el-button>
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
        <!-- 添加用户弹框 -->
        <el-dialog :title="textMap[labStatus]" :visible.sync="labDialog">
            <el-form
                :model="ruleForm"
                :rules="rules"
                ref="ruleForm"
                label-width="100px"
                class="demo-ruleForm"
            >
                <el-form-item label="标题" prop="name">
                    <el-input v-model="ruleForm.name"></el-input>
                </el-form-item>
                <el-form-item label="摘要" prop="desc">
                    <el-input
                        type="textarea"
                        v-model="ruleForm.desc"
                    ></el-input>
                </el-form-item>
                <el-form-item label="来源" prop="source">
                    <el-input v-model="ruleForm.source"></el-input>
                </el-form-item>
                <el-form-item label="发布时间" required>
                    <el-col :span="11">
                        <el-form-item prop="date">
                            <el-date-picker
                                type="date"
                                placeholder="选择日期"
                                v-model="ruleForm.date"
                                style="width: 100%;"
                            ></el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-form-item>
                <el-form-item label="轮播图片" prop="fileList">
                    <el-upload
                        action="#"
                        list-type="picture-card"
                        :auto-upload="false"
                        :file-list="ruleForm.fileList"
                        :on-change="handleChangeAdd"
                        ref="upload"
                    >
                        <i slot="default" class="el-icon-plus"></i>
                        <div slot="file" slot-scope="{ file }">
                            <img
                                class="el-upload-list__item-thumbnail"
                                :src="file.url"
                                alt=""
                            />
                            <span class="el-upload-list__item-actions">
                                <span
                                    class="el-upload-list__item-preview"
                                    @click="handlePictureCardPreview(file)"
                                >
                                    <i class="el-icon-zoom-in"></i>
                                </span>
                                <span
                                    v-if="!disabled"
                                    class="el-upload-list__item-delete"
                                    @click="handleRemove(file)"
                                >
                                    <i class="el-icon-delete"></i>
                                </span>
                            </span>
                        </div>
                    </el-upload>
                    <el-dialog :visible.sync="dialogVisible">
                        <img width="100%" :src="dialogImageUrl" alt="" />
                    </el-dialog>
                </el-form-item>
                <el-form-item label="轮播时间" prop="num">
                    <el-input-number
                        v-model="ruleForm.num"
                        @change="handleChange"
                        size="mini"
                        :min="1"
                        :max="10"
                        label="描述文字"
                    ></el-input-number>
                    秒
                </el-form-item>
                <el-form-item label="是否推荐" prop="recommend">
                    <el-radio-group v-model="ruleForm.recommend">
                        <el-radio label="是"></el-radio>
                        <el-radio label="否"></el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')"
                        >立即创建</el-button
                    >
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
import { userList } from '../../api/user'
export default {
    name: 'Laboratory',
    components: {},
    data() {
        return {
            // 添加用户参数
            labStatus: '', //弹框是新增或者编辑状态
            textMap: {
                update: '编辑',
                create: '添加'
            },
            labDialog: false, //控制弹框是否显示
            ruleForm: {
                name: '',
                date: '',
                desc: '',
                fileList: [],
                num: 1,
                recommend: '是',
                source: ''
            },
            rules: {
                name: [
                    {
                        required: true,
                        message: '请输入活动名称',
                        trigger: 'blur'
                    }
                ],
                date: [
                    {
                        type: 'date',
                        required: true,
                        message: '请选择日期',
                        trigger: 'change'
                    }
                ],
                desc: [
                    {
                        required: true,
                        message: '请填写摘要',
                        trigger: 'blur'
                    }
                ],
                fileList: [
                    {
                        type: 'array',
                        required: true,
                        message: '请至少上传一个轮播图片',
                        trigger: 'change'
                    }
                ],
                num: [
                    {
                        required: true,
                        trigger: 'blur'
                    }
                ],
                recommend: [
                    {
                        required: true,
                        message: '请选择活动资源',
                        trigger: 'change'
                    }
                ],
                source: [
                    {
                        required: true,
                        message: '请输入来源',
                        trigger: 'blur'
                    }
                ]
            },
            dialogImageUrl: '',
            dialogVisible: false,
            disabled: false,
            imgUrl: [],

            labList: [],
            listLoading: false,
            pageIndex: 1,
            pageSize: 10,
            total: 0,
            searchInput: '',
            // 列表选中列
            sels: []
        }
    },
    mounted() {
        this.getLabList()
    },
    methods: {
        //获取列表
        getLabList() {
            this.listLoading = true
            let params = {
                name: this.searchInput,
                pageIndex: this.pageIndex,
                pageSize: this.pageSize
            }
            userList(params).then(res => {
                if (res.code == '200') {
                    this.labList = res.data.list
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
        labRemove() {
            // if (this.sels.length < 1) return false
            // let arr = this.sels.map(item => {
            //     return item.id
            // })
            // let params = { userid: arr }
            // del(params).then(res => {
            //     if (res.code === '200') {
            //         this.$message.success(res.message)
            //         this.getUserList()
            //     }
            // })
        },
        //添加
        labAdd() {
            this.labStatus = 'create'
            this.labDialog = true
            this.ruleForm.id = ''
        },
        //编辑
        handleEdit(index, row) {
            this.labStatus = 'update'
            this.labDialog = true
            this.getItemDetail(index, row)
        },
        //获取详情
        getItemDetail(index, row) {
            this.ruleForm.id = row.id
            // let params = { userid: this.ruleForm.id }
            // getDetail(params).then(res => {
            //     if (res.code === '200') {
            //         this.ruleForm = res.data[0]
            //     }
            // })
        },
        //编辑修改提交
        editBtnFn(formName) {
            console.log(formName)
            this.ruleForm.password = ''
            // let params = this.ruleForm
            // add(params).then(res => {
            //     if (res.code === '200') {
            //         this.userDialog = false
            //         this.$refs[formName].resetFields()
            //         this.$message.success(res.message)
            //         this.getUserList()
            //     } else {
            //         this.$message.error(res.message)
            //     }
            // })
        },
        //分页
        handleCurrentChange(val) {
            this.pageIndex = val
            this.getLabList()
        },
        //轮播时间
        handleChange(value) {
            console.log(value)
        },
        //删除上传文件
        handleRemove(file) {
            console.log(file)
            this.$confirm('确定移除该文件？?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
                .then(() => {
                    //filter 返回true表示保留该元素（通过测试），false则不保留
                    this.imgUrl = this.ruleForm.fileList.filter(item => {
                        if (file.uid !== item.uid) {
                            return true
                        }
                    })
                    this.ruleForm.fileList = this.ruleForm.fileList.filter(
                        item => {
                            if (file.uid !== item.uid) {
                                return true
                            }
                        }
                    )
                })
                .catch(() => {
                    this.$message({
                        type: 'info',
                        message: '取消删除操作'
                    })
                })
            return false
        },
        //查看文件调用
        handlePictureCardPreview(file) {
            console.log(file)
            this.type = file.raw.type
            this.dialogImageUrl = file.url
            this.dialogVisible = true
        },
        //上传文件成功后的响应
        handleChangeAdd(file, fileList) {
            let param = new FormData()
            param.append('fileName', file.raw)
            console.log(file, fileList)
            // uploadFile(param).then(res => {
            //     this.imgUrl.push({
            //         name: file.name,
            //         uid: file.uid,
            //         url: res
            //     })
            // })
            this.ruleForm.fileList = fileList
        },
        //提交
        submitForm(formName) {
            console.log(this.ruleForm)
            this.$refs[formName].validate(valid => {
                if (valid) {
                    alert('submit!')
                } else {
                    console.log('error submit!!')
                    return false
                }
            })
        },
        //重置
        resetForm(formName) {
            this.$refs[formName].resetFields()
        }
    }
}
</script>
<style lang="less" scoped>
.laboratory {
    width: 100%;
    padding: 20px 10px;
    box-sizing: border-box;
    &-list {
        width: 100%;
        height: 100%;
    }
}
</style>
